import { getAuthSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import LeadsClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leads | LeadFlow CRM",
  description: "View and manage your sales leads with LeadFlow.",
  openGraph: {
    title: "Leads | LeadFlow CRM",
    description: "Collaboratively manage leads for your team in LeadFlow.",
  },
};

export default async function LeadsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  // TODO: Server-side fetch of leads for current user/team before hydrated client UI.
  return (
    <section>
      <h1 className="text-2xl font-bold mb-3">Leads</h1>
      <LeadsClient />
    </section>
  );
}