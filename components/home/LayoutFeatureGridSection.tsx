import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { homeContent } from "@/content/home";

const { features } = homeContent;

export default function LayoutFeatureGridSection() {
  return (
    <section id="layout-features" className="py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          LeadFlow CRM Modules
        </h2>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((f, i) => (
            <Card key={i} className="h-full shadow-none border-gray-200">
              <CardHeader>
                <CardTitle>
                  <Icon name="check-circle" className="mr-2 text-primary" />
                  {f.title}
                </CardTitle>
              </CardHeader>
              <CardContent>{f.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}