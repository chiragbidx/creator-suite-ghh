import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";

const { team } = homeContent;

export default function LayoutTeamSection() {
  return (
    <section id="layout-team" className="py-12 bg-muted/60">
      <div className="container max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">{team.heading}</h2>
        <p className="mb-8 text-muted-foreground">{team.description}</p>
        <div className="flex flex-wrap gap-8 justify-center">
          {team.members.map((member, i) => (
            <div key={i} className="w-64 flex flex-col items-center rounded-lg shadow p-6 bg-background">
              <Image
                src={`/team${i + 1}.jpg`}
                alt={member.name}
                width={100}
                height={100}
                className="rounded-full mb-3"
              />
              <span className="font-bold text-lg">{member.name}</span>
              <span className="text-muted-foreground">{member.role}</span>
              <Link
                href={`mailto:${member.email}`}
                className="text-primary mt-2 text-sm"
              >
                {member.email}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}