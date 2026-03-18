import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | LeadFlow",
  description: "Welcome to your LeadFlow CRM dashboard.",
};

export default function DashboardPage() {
  return (
    <section>
      <h1 className="text-3xl mb-4 font-bold">LeadFlow Dashboard Overview</h1>
      <p className="text-muted-foreground mb-6">
        Welcome to LeadFlow! Use the sidebar to access your CRM — manage leads, contacts, companies, and pipeline stages easily.
      </p>
      {/* Add onboard cards, demo metrics, and quick links here */}
    </section>
  );
}