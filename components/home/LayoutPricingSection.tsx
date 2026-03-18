import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { homeContent } from "@/content/home";

const { pricing } = homeContent;

export default function LayoutPricingSection() {
  return (
    <section id="layout-pricing" className="py-16 bg-muted/50">
      <div className="container max-w-screen-md mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {pricing.heading}
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {pricing.plans.map((plan, idx) => (
            <Card
              key={plan.name}
              className="flex-1 min-w-[240px] max-w-[350px] mx-auto"
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{plan.price}</div>
                <ul className="space-y-1 mb-4">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="text-primary w-4 h-4" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {/* Add CTA or badge here if needed */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}