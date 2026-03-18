import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";

const { hero } = homeContent;

export default function LayoutHeroSection() {
  return (
    <section id="layout-hero" className="pt-8 md:pt-16 pb-12 md:pb-24">
      <div className="container max-w-screen-xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        <div className="flex-1">
          <h1 className="font-extrabold text-4xl md:text-5xl text-foreground mb-4">
            {hero.title}
          </h1>
          <p className="text-muted-foreground text-lg mb-6">{hero.subtitle}</p>
          <div className="flex gap-4 mt-4">
            <Link
              href="#"
              className="inline-flex items-center rounded px-6 py-3 font-semibold text-base bg-primary text-primary-foreground shadow hover:bg-primary/80 transition"
            >
              {hero.primaryCta}
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center rounded px-6 py-3 font-semibold text-base bg-muted text-foreground shadow hover:bg-accent transition"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            src="/hero-image-light.jpeg"
            alt="LeadFlow CRM interface"
            width={450}
            height={400}
            className="rounded-lg object-contain dark:hidden"
            priority
          />
          <Image
            src="/hero-image-dark.jpeg"
            alt="LeadFlow CRM dark mode interface"
            width={450}
            height={400}
            className="rounded-lg object-contain hidden dark:block"
            priority
          />
        </div>
      </div>
    </section>
  );
}