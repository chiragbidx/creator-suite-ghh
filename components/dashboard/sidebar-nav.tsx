"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Users,
  Building2,
  Pipeline,
  LayoutKanban,
  Contact,
} from "lucide-react";

export const SIDEBAR_LINKS = [
  {
    title: "Overview",
    icon: LayoutKanban,
    href: "/dashboard",
    section: "overview",
  },
  {
    title: "CRM",
    icon: Briefcase,
    section: "crm",
    children: [
      {
        title: "Leads",
        icon: Pipeline,
        href: "/dashboard/crm/leads",
        section: "leads",
      },
      {
        title: "Contacts",
        icon: Contact,
        href: "/dashboard/crm/contacts",
        section: "contacts",
      },
      {
        title: "Companies",
        icon: Building2,
        href: "/dashboard/crm/companies",
        section: "companies",
      },
      {
        title: "Pipeline",
        icon: LayoutKanban,
        href: "/dashboard/crm/pipeline",
        section: "pipeline",
      },
    ],
  },
  {
    title: "Team",
    icon: Users,
    href: "/dashboard/team",
    section: "team",
  },
  // ... add other permanent links/settings here
];

export default function SidebarNav() {
  const pathname = usePathname();

  function isActive(link: any): boolean {
    if (link.href && pathname === link.href) return true;
    if (
      link.children &&
      link.children.some((child: any) => pathname === child.href)
    )
      return true;
    return false;
  }

  return (
    <nav aria-label="Sidebar" className="flex flex-col gap-4">
      <ul className="space-y-1">
        {SIDEBAR_LINKS.map((link) => (
          <li key={link.section}>
            {"children" in link && link.children ? (
              <details
                open={isActive(link)}
                className={cn(
                  "group rounded-md px-2 py-1",
                  isActive(link) ? "bg-muted" : ""
                )}
              >
                <summary className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-foreground hover:bg-muted focus:bg-muted">
                  <link.icon
                    size={18}
                    className="text-muted-foreground mr-2"
                  />
                  {link.title}
                </summary>
                <ul className="ml-4 mt-1 space-y-1">
                  {link.children.map((child) => (
                    <li key={child.section}>
                      <Link
                        href={child.href}
                        className={cn(
                          "flex items-center gap-2 rounded px-2 py-1.5 text-[15px] transition-colors",
                          pathname === child.href
                            ? "bg-primary/10 text-primary font-semibold"
                            : "hover:bg-accent hover:text-foreground"
                        )}
                      >
                        <child.icon size={16} className="mr-2" />
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ) : (
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-2 rounded px-2 py-2 text-[15px] font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary font-semibold"
                    : "hover:bg-accent hover:text-foreground"
                )}
              >
                <link.icon size={18} className="mr-2" />
                {link.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}