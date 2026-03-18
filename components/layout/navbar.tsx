"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-2">
        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className={cn(
              "text-xl font-bold tracking-tight text-primary transition-colors hover:text-primary/90"
            )}
            aria-label="LeadFlow"
          >
            {/* TODO: Add logo here if available */}
            LeadFlow
          </Link>
        </div>
        <nav className="flex items-center space-x-4">
          <Link
            href="#features"
            className={cn(
              "text-[15px] font-medium transition-colors hover:text-primary hover:underline",
              pathname === "/#features" && "text-primary"
            )}
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className={cn(
              "text-[15px] font-medium transition-colors hover:text-primary hover:underline",
              pathname === "/#pricing" && "text-primary"
            )}
          >
            Pricing
          </Link>
          <Link
            href="#contact"
            className={cn(
              "text-[15px] font-medium transition-colors hover:text-primary hover:underline",
              pathname === "/#contact" && "text-primary"
            )}
          >
            Contact
          </Link>
          {/* Add more nav items if needed */}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}