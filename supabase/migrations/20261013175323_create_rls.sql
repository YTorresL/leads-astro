alter table public.companies enable row level security;
alter table public.contacts enable row level security;

create policy "users_own_companies" on public.companies
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "users_own_contacts" on public.contacts
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());