import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { homeContent } from "@/content/home";

const { testimonials } = homeContent;

export default function LayoutTestimonialSection() {
  if (!testimonials) return null;
  return (
    <section id="layout-testimonials" className="bg-background pb-20 pt-10">
      <div className="container max-w-screen-md mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <Carousel>
          <CarouselContent>
            {testimonials.map((testimonial, i) => (
              <CarouselItem key={i}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="fill-primary/80 text-primary w-5 h-5" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-4">&ldquo;{testimonial.quote}&rdquo;</blockquote>
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-muted-foreground">{testimonial.title}</div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}