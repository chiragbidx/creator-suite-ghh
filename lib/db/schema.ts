import {
  pgTable,
  serial,
  varchar,
  uuid,
  integer,
  boolean,
  text,
  timestamp,
  decimal,
  jsonb,
  pgEnum,
  primaryKey,
  unique,
  foreignKey,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { users } from "./schema";

// --- Pipeline stages ---

export const pipelineStages = pgTable("pipeline_stages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  order: integer("order").notNull(),
  teamId: uuid("team_id").notNull(),
  isArchived: boolean("is_archived").notNull().default(false),
  createdBy: uuid("created_by").notNull(),
  updatedBy: uuid("updated_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const pipelineStageRelations = relations(pipelineStages, ({ many }) => ({
  leads: many(() => leads),
}));

// --- Companies ---

export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  website: varchar("website", { length: 256 }),
  teamId: uuid("team_id").notNull(),
  createdBy: uuid("created_by").notNull(),
  updatedBy: uuid("updated_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const companyRelations = relations(companies, ({ many }) => ({
  contacts: many(() => contactsToCompanies),
  leads: many(() => leads),
}));

// --- Contacts ---

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 32 }),
  teamId: uuid("team_id").notNull(),
  createdBy: uuid("created_by").notNull(),
  updatedBy: uuid("updated_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const contactRelations = relations(contacts, ({ many }) => ({
  companies: many(() => contactsToCompanies),
  leads: many(() => contactsToLeads),
  notes: many(() => notes),
}));

// --- Leads ---

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  companyId: integer("company_id").references(() => companies.id),
  ownerId: uuid("owner_id").notNull(),
  stageId: integer("stage_id").references(() => pipelineStages.id).notNull(),
  status: varchar("status", { length: 32 }).notNull(),
  value: decimal("value", { precision: 12, scale: 2 }),
  teamId: uuid("team_id").notNull(),
  createdBy: uuid("created_by").notNull(),
  updatedBy: uuid("updated_by").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const leadRelations = relations(leads, ({ many, one }) => ({
  contacts: many(() => contactsToLeads),
  notes: many(() => notes),
  company: one(() => companies, {
    fields: [leads.companyId],
    references: [companies.id],
  }),
  stage: one(() => pipelineStages, {
    fields: [leads.stageId],
    references: [pipelineStages.id],
  }),
  owner: one(() => users, {
    fields: [leads.ownerId],
    references: [users.id],
  }),
}));

// --- Join Tables ---

export const contactsToCompanies = pgTable("contacts_to_companies", {
  contactId: integer("contact_id").references(() => contacts.id).notNull(),
  companyId: integer("company_id").references(() => companies.id).notNull(),
  teamId: uuid("team_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactsToLeads = pgTable("contacts_to_leads", {
  contactId: integer("contact_id").references(() => contacts.id).notNull(),
  leadId: integer("lead_id").references(() => leads.id).notNull(),
  teamId: uuid("team_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// --- Notes ---

export const notes = pgTable("crm_notes", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  entityType: varchar("entity_type", { length: 32 }).notNull(), // "lead" | "contact"
  entityId: integer("entity_id").notNull(),
  userId: uuid("user_id").notNull(),
  teamId: uuid("team_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const noteRelations = relations(notes, ({ one }) => ({
  user: one(() => users, {
    fields: [notes.userId],
    references: [users.id],
  }),
}));