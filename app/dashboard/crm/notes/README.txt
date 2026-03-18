LeadFlow CRM supports entity-linked notes via the crm_notes table.
Each note is:
- Linked to a parent entity (lead or contact)
- Attributed to a user
- Linked to a team
- Timestamped for auditing

Entity shape (see schema):
  id, content, entity_type, entity_id, user_id, team_id, created_at, updated_at

To add notes support, see:
- lib/db/schema.ts (crm_notes)
- Each detail page for leads/contacts (WIP, forms/UI pending)

All future notes logic—CRUD, audit, UI—follows the pattern established here.