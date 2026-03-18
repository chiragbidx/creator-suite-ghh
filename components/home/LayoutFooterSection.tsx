import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";
import { homeContent } from "@/content/home";

const { footer } = homeContent;

export default function LayoutFooterSection() {
  if (!footer) return null;
  return (
    <footer id="layout-footer" className="py-8 bg-background mt-auto">
      <div className="container max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-muted-foreground text-sm">
          {footer?.copyright}
        </div>
        <div className="flex gap-4">
          {footer.links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="text-muted-foreground text-sm hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-center pt-4">
        <ChevronsDownIcon className="w-5 h-5 text-muted-foreground" />
      </div>
    </footer>
  );
}