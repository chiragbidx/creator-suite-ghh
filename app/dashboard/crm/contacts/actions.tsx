"use server";
import { z } from "zod";
import { contacts } from "@/lib/db/schema";
import { db } from "@/lib/db/client";
import { getAuthSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export const ContactSchema = z.object({
  name: z.string().min(2, "Contact name required"),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export async function createContactAction(formData: FormData) {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  const userId = session.userId;
  const teamId = session.teamId;

  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  // TODO: Check for duplicates within team

  await db.insert(contacts).values({
    ...parsed.data,
    teamId,
    createdBy: userId,
    updatedBy: userId,
  });

  revalidatePath("/dashboard/crm/contacts");
  return { success: true };
}

// TODO: Implement update, delete actions, company/lead linking