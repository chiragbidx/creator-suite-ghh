import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { homeContent } from "@/content/home";

const { services } = homeContent;

export default function LayoutServicesSection() {
  return (
    <section id="layout-services" className="py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Everything Your Team Needs
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((group, idx) => (
            <Card key={idx} className="h-full shadow-none border-gray-200">
              <CardHeader>
                <CardTitle>{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}