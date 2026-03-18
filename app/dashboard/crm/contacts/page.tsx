import { getAuthSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import ContactsClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts | LeadFlow CRM",
  description: "Manage contacts, emails, numbers, and links.",
  openGraph: {
    title: "Contacts | LeadFlow CRM",
    description: "All of your team’s contact people, linked to leads and companies.",
  },
};

export default async function ContactsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");

  // TODO: Server-side contacts fetcher here
  return (
    <section>
      <h1 className="text-2xl font-bold mb-3">Contacts</h1>
      <ContactsClient />
    </section>
  );
}