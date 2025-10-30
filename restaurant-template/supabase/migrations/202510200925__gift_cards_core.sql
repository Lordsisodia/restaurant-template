-- Gift cards core tables
create table if not exists gift_card (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  code text not null unique,
  initial_value integer not null check (initial_value >= 0),
  balance integer not null check (balance >= 0),
  purchaser_email text,
  recipient_email text,
  message text,
  status text not null default 'active' check (status in ('active','redeemed','cancelled','expired')),
  created_at timestamptz not null default now()
);

create index if not exists idx_gift_card_restaurant on gift_card(restaurant_id);

create table if not exists gift_card_transaction (
  id uuid primary key default gen_random_uuid(),
  gift_card_id uuid not null references gift_card(id) on delete cascade,
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  amount integer not null,
  transaction_type text not null check (transaction_type in ('issue','redeem','adjust','refund')),
  note text,
  created_at timestamptz not null default now()
);

create index if not exists idx_gift_card_transaction_card on gift_card_transaction(gift_card_id);

create table if not exists gift_card_redemption (
  id uuid primary key default gen_random_uuid(),
  gift_card_id uuid not null references gift_card(id) on delete cascade,
  restaurant_id uuid not null references restaurants(id) on delete cascade,
  order_reference text,
  amount integer not null,
  redeemed_at timestamptz not null default now()
);

create index if not exists idx_gift_card_redemption_restaurant on gift_card_redemption(restaurant_id);
