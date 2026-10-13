export type Contact = {
  id: string;
  company_id: string;
  name: string;
  job_title: string | null;
  linkedin_url: string | null;
  connection_date: string | null;
  status: string;
  next_action: string | null;
  next_action_date: string | null;
  outcome: string | null;
};

export type Company = {
  id: string;
  name: string;
  website: string | null;
  evidence: string | null;
  hypothetical_problem: string | null;
  possible_services: string[];
  score: number | null;
};

export type CompanyWithContacts = Company & { contacts: Contact[] };
