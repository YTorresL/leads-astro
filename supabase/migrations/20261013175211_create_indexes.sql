create index on public.companies (user_id);
create index on public.contacts (user_id);
create index on public.contacts (company_id);
create index on public.contacts (status);
create index on public.contacts (next_action_date);