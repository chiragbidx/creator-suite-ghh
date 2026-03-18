"use server";
import { z } from "zod";
import { pipelineStages } from "@/lib/db/schema";
import { db } from "@/lib/db/client";
import { getAuthSession } from "@/lib/auth/session";
import { revalidatePath } from "next/cache";

export const PipelineStageSchema = z.object({
  name: z.string().min(2, "Pipeline stage name required"),
  order: z.number().int().min(1),
});

export async function createPipelineStageAction(formData: FormData) {
  const session = await getAuthSession();
  if (!session) throw new Error("Unauthorized");
  const userId = session.userId;
  const teamId = session.teamId;

  const parsed = PipelineStageSchema.safeParse({
    name: formData.get("name"),
    order: Number(formData.get("order")) || 1,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  await db.insert(pipelineStages).values({
    ...parsed.data,
    teamId,
    createdBy: userId,
    updatedBy: userId,
  });

  revalidatePath("/dashboard/crm/pipeline");
  return { success: true };
}

// TODO: Implement update, reorder, archive actions, enforce role: admin