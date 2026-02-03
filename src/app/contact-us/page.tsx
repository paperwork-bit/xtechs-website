import { Contact2 } from "@/components/ui/contact-2";
import { BookingCalendar } from "@/components/ui/booking-calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageSquare } from "lucide-react";
import { MapFrame } from "@/components/MapFrame";

export default function ContactPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your clean energy journey? Book a site assessment for a detailed quote,
            or contact us for a consultation. We're here to help you make the switch to renewable energy.
          </p>
        </div>

        <Tabs defaultValue="booking" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="booking" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Book Assessment
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Contact Us
            </TabsTrigger>
          </TabsList>

          <TabsContent value="booking">
            <BookingCalendar />
            
          </TabsContent>

          <TabsContent value="contact" className="space-y-8">
            <Contact2
              title="Contact Us"
              description="Have questions about our services? Send us a message and we'll get back to you as soon as possible."
              submitUrl="/api/contact"
            />

            <section aria-labelledby="map-heading" className="space-y-4">
              <h2 id="map-heading" className="text-2xl font-semibold">Find Us</h2>

              <MapFrame
                src={
                  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.058486054349!2d145.11353587619786!3d-38.02241597192406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66db36c6b8917%3A0x81ad2dc996edb760!2sxTechs%20Renewables!5e0!3m2!1sen!2s!4v1770078343341!5m2!1sen!2s"
                }
              />
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}