"use server";
import { z } from "zod";
import { companies } from "@/lib/db/schema";
import { db } from "@/lib/db/client";
import { getAuthSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export const CompanySchema = z.object({
  name: z.string().min(2, "Company name required"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
});

export async function createCompanyAction(formData: FormData) {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  const userId = session.userId;
  const teamId = session.teamId;

  const parsed = CompanySchema.safeParse({
    name: formData.get("name"),
    website: formData.get("website") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  // TODO: Check for duplicates within team

  await db.insert(companies).values({
    ...parsed.data,
    teamId,
    createdBy: userId,
    updatedBy: userId,
  });

  revalidatePath("/dashboard/crm/companies");
  return { success: true };
}

// TODO: Implement update, archive, delete actions