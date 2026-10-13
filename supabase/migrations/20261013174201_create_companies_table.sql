create table public.companies (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name                  text not null,
  website               text,
  evidence              text,   -- specific observation you identified
  hypothetical_problem text,   -- what could be improved and why
  possible_services     text[] not null default '{}',
  score                 smallint check (score between 0 and 10),
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  constraint valid_services check (
    possible_services <@ array['website','maintenance','integration','automation']
  )
);