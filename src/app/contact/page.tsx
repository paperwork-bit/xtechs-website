import { Contact2 } from "@/components/ui/contact-2"
import { BookingCalendar } from "@/components/ui/booking-calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MessageSquare } from "lucide-react"

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

          <TabsContent value="contact">
            <Contact2 
              title="Contact Us"
              description="Have questions about our services? Send us a message and we'll get back to you as soon as possible."
              submitUrl="/api/contact"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
