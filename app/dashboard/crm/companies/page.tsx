import { getAuthSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import CompaniesClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companies | LeadFlow CRM",
  description: "Manage companies and accounts in LeadFlow.",
  openGraph: {
    title: "Companies | LeadFlow CRM",
    description: "Track companies, see linked leads and contacts.",
  },
};

export default async function CompaniesPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  // TODO: Server-side companies fetcher here
  return (
    <section>
      <h1 className="text-2xl font-bold mb-3">Companies</h1>
      <CompaniesClient />
    </section>
  );
}