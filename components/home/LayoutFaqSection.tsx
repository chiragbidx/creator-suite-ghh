import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { homeContent } from "@/content/home";

const { faq } = homeContent;

export default function LayoutFaqSection() {
  return (
    <section id="layout-faq" className="py-8">
      <div className="container max-w-screen-md mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">FAQs</h2>
        <Accordion type="single" collapsible>
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`faq-item-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}