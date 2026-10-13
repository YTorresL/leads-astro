create or replace view public.prospect_view
with (security_invoker = true) as
select
  co.name                 as company,
  co.website,
  ct.name                 as contact_person,
  ct.job_title,
  ct.linkedin_url,
  co.evidence,
  co.hypothetical_problem,
  co.possible_services,
  co.score,
  ct.connection_date,
  ct.status,
  ct.next_action,
  ct.next_action_date,
  ct.outcome
from public.companies co
left join public.contacts ct on ct.company_id = co.id
order by co.score desc nulls last, co.name;