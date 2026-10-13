create table public.contacts (
  id                 uuid primary key default gen_random_uuid(),
  user_id            uuid not null default auth.uid() references auth.users(id) on delete cascade,
  company_id         uuid not null references public.companies(id) on delete cascade,
  name               text not null,
  job_title          text,
  linkedin_url       text,
  connection_date    date,   -- date the connection request was sent
  status             text not null default 'to_research' check (
    status in ('to_research','invitation_sent','accepted',
               'conversation','opportunity','closed')
  ),
  next_action        text,
  next_action_date   date,
  outcome            text,   -- actual response, confirmed need, or next step
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);