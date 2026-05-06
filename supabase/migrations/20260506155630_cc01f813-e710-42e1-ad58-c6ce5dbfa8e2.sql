
create table public.telegram_messages (
  update_id bigint primary key,
  chat_id bigint not null,
  user_id bigint,
  username text,
  first_name text,
  text text,
  raw_update jsonb not null,
  created_at timestamptz not null default now()
);
create index idx_telegram_messages_chat_id on public.telegram_messages (chat_id);
create index idx_telegram_messages_created_at on public.telegram_messages (created_at desc);

create table public.telegram_subscribers (
  chat_id bigint primary key,
  username text,
  first_name text,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.telegram_messages enable row level security;
alter table public.telegram_subscribers enable row level security;

-- No public policies: only service role (edge functions) can access.
