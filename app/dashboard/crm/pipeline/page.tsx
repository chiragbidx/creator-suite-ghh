import { getAuthSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import PipelineClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pipeline | LeadFlow CRM",
  description: "Configure deal stages and workflow in LeadFlow.",
  openGraph: {
    title: "Pipeline | LeadFlow CRM",
    description: "Manage and reorder pipeline stages for your team.",
  },
};

export default async function PipelinePage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  // TODO: Server-side fetch, admin role for config
  return (
    <section>
      <h1 className="text-2xl font-bold mb-3">Pipeline Stages</h1>
      <PipelineClient />
    </section>
  );
}