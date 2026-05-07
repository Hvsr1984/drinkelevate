import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';

async function tgSend(chatId: number | string, text: string) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')!;
  const TELEGRAM_API_KEY = Deno.env.get('TELEGRAM_API_KEY')!;
  const r = await fetch(`${GATEWAY_URL}/sendMessage`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': TELEGRAM_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
  return { ok: r.ok, status: r.status, body: await r.json() };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    // --- Authentication: require a valid signed-in Supabase user ---
    const authHeader = req.headers.get('Authorization') ?? '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!token) return json({ error: 'Unauthorized' }, 401);

    const authClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: `Bearer ${token}` } } },
    );
    const { data: userData, error: userErr } = await authClient.auth.getUser();
    if (userErr || !userData?.user) return json({ error: 'Unauthorized' }, 401);

    const { mode, chat_id, text } = await req.json();
    if (!text || typeof text !== 'string' || text.length > 4000) {
      return json({ error: 'text required (max 4000 chars)' }, 400);
    }

    if (mode === 'broadcast') {
      const supabase = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      );
      const { data: subs, error } = await supabase
        .from('telegram_subscribers').select('chat_id');
      if (error) throw error;

      let sent = 0, failed = 0;
      for (const s of subs ?? []) {
        const res = await tgSend(s.chat_id, text);
        if (res.ok) sent++; else failed++;
        await new Promise((r) => setTimeout(r, 40));
      }
      return json({ ok: true, sent, failed });
    }

    if (!chat_id) return json({ error: 'chat_id required' }, 400);
    const res = await tgSend(chat_id, text);
    return json({ ok: res.ok, status: res.status }, res.ok ? 200 : 502);
  } catch (e) {
    console.error('telegram-send error', e);
    return json({ error: 'Internal server error' }, 500);
  }
});
