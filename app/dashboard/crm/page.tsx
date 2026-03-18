import { redirect } from "next/navigation";

export default function CrmRootPage() {
  // Always redirect to leads first as default CRM entry
  redirect("/dashboard/crm/leads");
}