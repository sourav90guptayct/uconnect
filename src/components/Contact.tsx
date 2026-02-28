import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", company: "", message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data: result, error: functionError } = await supabase.functions.invoke('send-contact-email', { body: formData });
      if (functionError) throw new Error('Failed to submit your message');
      if (result?.error) throw new Error(result.error);
      toast({ title: "Message Received!", description: "Thank you for contacting us. We'll get back to you soon." });
      setFormData({ fullName: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      toast({ title: "Error", description: error instanceof Error ? error.message : "Failed to send message.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
            <Mail className="h-4 w-4" />
            <span className="font-semibold text-sm">Contact Us</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Ready to Transform Your <span className="text-gradient">Workforce?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our experts to discuss your requirements and discover how we can help.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="w-full max-w-2xl">
            <Card className="border-border rounded-2xl premium-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-card-foreground text-center">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name *</Label>
                      <Input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name" className="mt-2 rounded-xl" required />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className="mt-2 rounded-xl" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Enter your phone number" className="mt-2 rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium text-foreground">Company/Organization</Label>
                      <Input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} placeholder="Enter your company name" className="mt-2 rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-foreground">Message *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your requirements..." className="mt-2 min-h-[120px] rounded-xl" required />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl h-12 shadow-lg shadow-accent/25" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : (<>Send Message <Send className="ml-2 h-5 w-5" /></>)}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: MapPin, title: "Visit Us", content: "Plot No 1398 Air Force Road\nGovindpur\nDistt. Saharanpur Uttar Pradesh" },
            { icon: Phone, title: "Call Us", content: "+918800417443\nMon-Fri 9AM-6PM" },
            { icon: Clock, title: "Business Hours", content: "Monday - Friday\n9:00 AM - 6:00 PM" },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="text-center p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 hover:premium-shadow-hover">
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <card.icon className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="font-semibold mb-2">{card.title}</h4>
                  <p className="text-muted-foreground text-sm whitespace-pre-line">{card.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Contact;
