import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/telegram';

async function deriveSecret(key: string): Promise<string> {
  const data = new TextEncoder().encode(`telegram-webhook:${key}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function safeEqual(a: string | null, b: string): boolean {
  if (!a || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function sendMessage(chatId: number, text: string) {
  const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')!;
  const TELEGRAM_API_KEY = Deno.env.get('TELEGRAM_API_KEY')!;
  await fetch(`${GATEWAY_URL}/sendMessage`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'X-Connection-Api-Key': TELEGRAM_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  });
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  const TELEGRAM_API_KEY = Deno.env.get('TELEGRAM_API_KEY');
  if (!TELEGRAM_API_KEY) return new Response('Not configured', { status: 500 });

  const expected = await deriveSecret(TELEGRAM_API_KEY);
  if (!safeEqual(req.headers.get('X-Telegram-Bot-Api-Secret-Token'), expected)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  const update = await req.json();
  const message = update.message ?? update.edited_message;
  if (!message?.chat?.id || typeof update.update_id !== 'number') {
    return new Response(JSON.stringify({ ok: true, ignored: true }));
  }

  const chatId = message.chat.id as number;
  const text = (message.text ?? '') as string;

  await supabase.from('telegram_messages').upsert({
    update_id: update.update_id,
    chat_id: chatId,
    user_id: message.from?.id ?? null,
    username: message.from?.username ?? null,
    first_name: message.from?.first_name ?? null,
    text,
    raw_update: update,
  }, { onConflict: 'update_id' });

  await supabase.from('telegram_subscribers').upsert({
    chat_id: chatId,
    username: message.from?.username ?? null,
    first_name: message.from?.first_name ?? null,
    last_seen_at: new Date().toISOString(),
  }, { onConflict: 'chat_id' });

  // Auto-reply for common commands
  const lower = text.trim().toLowerCase();
  try {
    if (lower === '/start') {
      await sendMessage(chatId,
        `✨ Welcome to <b>ELEVATE Water</b>!\n\nLuxury hydration, delivered.\n\n` +
        `🛒 To order, message us here or on WhatsApp: +91 9509878807\n` +
        `🎁 First-time? Use code <b>WELCOME15</b> for 15% off.`);
    } else if (lower === '/menu' || lower === '/products') {
      await sendMessage(chatId,
        `🍶 <b>Our Collection</b>\n\n• ELEVATE Pure\n• ELEVATE Sparkling\n• ELEVATE Minerals+\n` +
        `• ELEVATE Alkaline\n• ELEVATE Glacier\n• ELEVATE Coconut\n\nReply with a name to order.`);
    } else if (lower === '/help') {
      await sendMessage(chatId, `Commands:\n/start – Welcome\n/menu – Our products\n/help – This message`);
    } else if (text) {
      // Notify owner of new inquiry (owner chat id stored as subscriber after they /start)
      await sendMessage(chatId, `Thanks for reaching out! 💧 We'll respond shortly. For instant orders: wa.me/919509878807`);
    }
  } catch (e) {
    console.error('reply failed', e);
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
