import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Send, Shield, Headphones, Clock3 } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", company: "", message: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitToGoogleForm = (): Promise<void> => {
    return new Promise((resolve) => {
      const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSf2xt_DyU4tBAwcbxio49zuUtMsUSU9taac-5HN5MkLNKFZyw/formResponse";
      const iframeName = `gform_iframe_${Date.now()}`;

      // Hidden iframe receives Google's response — bypasses CORS entirely
      const iframe = document.createElement("iframe");
      iframe.name = iframeName;
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Native form POST is treated as a top-level navigation by Google (not blocked)
      const form = document.createElement("form");
      form.action = GOOGLE_FORM_ACTION;
      form.method = "POST";
      form.target = iframeName;
      form.style.display = "none";

      const fields: Record<string, string> = {
        "entry.1858826821": formData.fullName,
        "entry.915319340": formData.email,
        "entry.602424569": formData.phone || "Not provided",
        "entry.1474328581": formData.company || "Not provided",
        "entry.99606719": formData.message,
      };
      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        try { document.body.removeChild(form); } catch {}
        try { document.body.removeChild(iframe); } catch {}
        resolve();
      }, 1500);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Primary: Google Forms (always works, even if Supabase is paused)
      await submitToGoogleForm();

      // Backup: Supabase (silent fail — don't block user on backend issues)
      supabase.functions.invoke('send-contact-email', { body: formData }).catch(() => {});

      toast({ title: "Message Received!", description: "Thank you for contacting us. Our team will respond within 24 hours." });
      setFormData({ fullName: "", email: "", phone: "", company: "", message: "" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
              <Mail className="h-4 w-4" />
              <span className="font-semibold text-sm">Get In Touch</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              Let's Build Something <span className="text-gradient">Extraordinary</span> Together
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Whether you're looking for enterprise-grade technology infrastructure, managed services, 
              or strategic workforce solutions — our team of experts is ready to architect the perfect 
              solution for your organization.
            </p>

            {/* Trust signals */}
            <div className="space-y-6">
              {[
                { icon: Headphones, title: "Dedicated Account Manager", desc: "Every client is assigned a senior account manager for personalized, white-glove service." },
                { icon: Clock3, title: "Rapid Response Guarantee", desc: "We respond to all enterprise inquiries within 4 hours during business days." },
                { icon: Shield, title: "Enterprise-Grade Security", desc: "ISO 27001 compliant processes ensuring your data and operations are always protected." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full bg-accent/20 border-2 border-background flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">{["JM","SK","RP","AT"][i-1]}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Join 500+ organizations</p>
                <p className="text-xs text-muted-foreground">that trust uConnect Technologies</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="border-border rounded-2xl premium-shadow">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2 text-card-foreground">Start a Conversation</h3>
                <p className="text-muted-foreground text-sm mb-6">Fill out the form and our solutions team will reach out promptly.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-foreground">Full Name *</Label>
                      <Input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} placeholder="John Smith" className="mt-2 rounded-xl" required />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">Work Email *</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@company.com" className="mt-2 rounded-xl" required />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" className="mt-2 rounded-xl" />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium text-foreground">Organization</Label>
                      <Input id="company" name="company" type="text" value={formData.company} onChange={handleInputChange} placeholder="Company name" className="mt-2 rounded-xl" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-foreground">How can we help? *</Label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your project requirements, timeline, and any specific challenges..." className="mt-2 min-h-[120px] rounded-xl" required />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl h-12 shadow-lg shadow-accent/25" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : (<>Submit Inquiry <Send className="ml-2 h-5 w-5" /></>)}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">By submitting, you agree to our privacy policy. We never share your data with third parties.</p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
