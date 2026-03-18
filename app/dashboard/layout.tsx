import { ReactNode } from "react";
import SidebarNav from "@/components/dashboard/sidebar-nav";
import { getAuthSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "LeadFlow Dashboard",
  description: "Your LeadFlow CRM dashboard",
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getAuthSession();

  if (!session) redirect("/auth#signin");

  return (
    <div className="flex min-h-screen bg-muted/20 flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:block w-64 px-2 py-8 border-r border-border bg-background">
          <SidebarNav />
        </aside>
        <main className="flex-1 h-full overflow-y-auto px-4 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}