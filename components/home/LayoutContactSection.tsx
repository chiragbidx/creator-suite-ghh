import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { homeContent } from "@/content/home";

const { contact } = homeContent;

export default function LayoutContactSection() {
  return (
    <section id="layout-contact" className="py-16">
      <div className="container max-w-screen-md mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          {contact.heading}
        </h2>
        <Card className="shadow-none border-gray-200 max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              action="#"
              method="post"
              className="flex flex-col gap-4"
              // Replace with real server action or endpoint
            >
              <Input type="text" name="name" placeholder="Your Name" required />
              <Input type="email" name="email" placeholder="Your Email" required />
              <Select name="topic" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
              <Textarea name="message" rows={4} placeholder="Your message" required />
              <Button type="submit" className="w-full mt-2">{contact.cta}</Button>
            </form>
            <div className="text-muted-foreground text-sm mt-4">
              <div>
                <b>Support:</b>{" "}
                <a className="underline" href={`mailto:${contact.supportEmail}`}>
                  {contact.supportEmail}
                </a>
              </div>
              {contact.info.map(
                (info, i) =>
                  info.value && (
                    <div key={i}>
                      <b>{info.label}:</b> {info.value}
                    </div>
                  )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}