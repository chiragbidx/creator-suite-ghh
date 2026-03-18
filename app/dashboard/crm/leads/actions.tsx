"use server";
import { z } from "zod";
import { leads } from "@/lib/db/schema";
import { db } from "@/lib/db/client";
import { getAuthSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

// Zod schema for validating incoming lead data
export const LeadSchema = z.object({
  name: z.string().min(2, "Name required"),
  companyId: z.number().optional(),
  ownerId: z.string().uuid(),
  stageId: z.number(),
  status: z.enum(["open", "won", "lost", "archived"]),
  value: z.string().optional(), // Should be decimal-compatible string
});

export async function createLeadAction(formData: FormData) {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  const userId = session.userId;
  const teamId = session.teamId;

  const parsed = LeadSchema.safeParse({
    name: formData.get("name"),
    companyId: Number(formData.get("companyId")) || undefined,
    ownerId: String(formData.get("ownerId")),
    stageId: Number(formData.get("stageId")),
    status: formData.get("status"),
    value: formData.get("value") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  // Check permissions (owner must be a team member, stage must belong to team)
  // TODO: Add DB queries for strict enforcement

  await db.insert(leads).values({
    ...parsed.data,
    teamId,
    createdBy: userId,
    updatedBy: userId,
  });

  revalidatePath("/dashboard/crm/leads");
  return { success: true };
}

// TODO: Implement updateLeadAction, archiveLeadAction, deleteLeadAction, assignLeadAction, and lead fetchers