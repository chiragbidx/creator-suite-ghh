# LeadFlow CRM Folder Overview

Key CRM entity routes and their responsibilities:

/dashboard/crm/leads
  - List, search/filter, sort, add/edit/archive/delete leads
  - Assign owner, relate to contacts and companies, manage stage and status

/dashboard/crm/contacts
  - List/search CRUD, relate to companies and leads

/dashboard/crm/companies
  - Manage companies, link contacts and leads

/dashboard/crm/pipeline
  - Configure pipeline stages (create, update, reorder, archive)

Shared:
  - All routes are server-preferred with client-side interactive islands
  - Actions enforce strict tenant/team scoping and role checks

Notes:
  - Each page includes loading, empty, error, and success UI states
  - Notes are in crm_notes table (see README in notes/)
  - Bulk actions (archive/delete) are included as TODO for later passes

Types, UI forms, and server actions will be expanded in subsequent builds.