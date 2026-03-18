# Changelog

## 2024-06-11

- Brand updated throughout app to "LeadFlow" (homepage, navbar, dashboard shell, onboarding, content/home.ts, dashboard page title).
- Dashboard sidebar updated: new CRM module with Leads, Contacts, Companies, Pipeline nav sections.
- CRM data schema added in lib/db/schema.ts for leads, contacts, companies, pipeline stages, notes, and join tables with audit/ownership and team scope.
- Drizzle migration for CRM module: drizzle/0003_crm_modules.sql (plus meta journal update).
- Prepared dashboard layout, navigation, and home content for LeadFlow CRM positioning.
- No core auth, settings, or team management reimplemented (per rules).