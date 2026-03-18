import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { homeContent } from "@/content/home";

const { benefits } = homeContent;

export default function LayoutBenefitsSection() {
  return (
    <section id="layout-benefits" className="bg-muted/60 py-16">
      <div className="container max-w-screen-xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Why LeadFlow?</h2>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item, i) => (
            <Card key={i} className="h-full shadow-none border-gray-200">
              <CardHeader>
                <CardTitle>
                  <Icon name="check-circle" className="mr-2 text-primary" />
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>{item.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}