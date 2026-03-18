-- CRM Module: LeadFlow

CREATE TABLE pipeline_stages (
  id serial PRIMARY KEY,
  name varchar(128) NOT NULL,
  "order" integer NOT NULL,
  team_id uuid NOT NULL,
  is_archived boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL,
  updated_by uuid NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE companies (
  id serial PRIMARY KEY,
  name varchar(128) NOT NULL,
  website varchar(256),
  team_id uuid NOT NULL,
  created_by uuid NOT NULL,
  updated_by uuid NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE contacts (
  id serial PRIMARY KEY,
  name varchar(128) NOT NULL,
  email varchar(256),
  phone varchar(32),
  team_id uuid NOT NULL,
  created_by uuid NOT NULL,
  updated_by uuid NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE leads (
  id serial PRIMARY KEY,
  name varchar(128) NOT NULL,
  company_id integer REFERENCES companies(id),
  owner_id uuid NOT NULL,
  stage_id integer REFERENCES pipeline_stages(id) NOT NULL,
  status varchar(32) NOT NULL,
  value decimal(12, 2),
  team_id uuid NOT NULL,
  created_by uuid NOT NULL,
  updated_by uuid NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE contacts_to_companies (
  contact_id integer REFERENCES contacts(id) NOT NULL,
  company_id integer REFERENCES companies(id) NOT NULL,
  team_id uuid NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE contacts_to_leads (
  contact_id integer REFERENCES contacts(id) NOT NULL,
  lead_id integer REFERENCES leads(id) NOT NULL,
  team_id uuid NOT NULL,
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE crm_notes (
  id serial PRIMARY KEY,
  content text NOT NULL,
  entity_type varchar(32) NOT NULL,
  entity_id integer NOT NULL,
  user_id uuid NOT NULL,
  team_id uuid NOT NULL,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);