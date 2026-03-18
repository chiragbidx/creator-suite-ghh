import { Icon } from "@/components/ui/icon";
import { homeContent } from "@/content/home";

const { sponsors } = homeContent;

export default function LayoutSponsorsSection() {
  if (!sponsors) return null;
  return (
    <section id="layout-sponsors" className="py-10 bg-background">
      <div className="container max-w-screen-xl mx-auto px-4 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Powered by</h2>
        <div className="flex gap-8 items-center">
          {sponsors.map((s, i) => (
            <div key={i} title={s.label} className="flex items-center gap-2">
              <Icon name={s.iconName} size={32} />
              <span className="text-muted-foreground text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}