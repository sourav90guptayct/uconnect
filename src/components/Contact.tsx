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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data: result, error: functionError } = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (functionError) {
        console.error('Function error:', functionError);
        throw new Error('Failed to submit your message');
      }

      if (result?.error) {
        console.error('Function returned error:', result.error);
        throw new Error(result.error);
      }

      toast({
        title: "Message Received!",
        description: "Thank you for contacting us. We'll get back to you soon."
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Visit Us",
      lines: ["Plot No 1398 Air Force Road", "Govindpur", "Distt. Saharanpur, Uttar Pradesh"]
    },
    {
      icon: Phone,
      title: "Call Us",
      lines: ["+91-8800417443", "Mon-Fri 9AM-6PM"]
    },
    {
      icon: Clock,
      title: "Business Hours",
      lines: ["Monday - Friday", "9:00 AM - 6:00 PM"]
    }
  ];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
            <Mail className="h-5 w-5" />
            <span className="font-semibold">Contact Us</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Ready to Transform Your
            <span className="text-primary"> Workforce?</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our experts to discuss your manpower requirements and discover 
            how we can help you build the perfect team for your organization.
          </p>
        </motion.div>

        <div className="flex justify-center">
          {/* Contact Form - Centered */}
          <motion.div 
            className="w-full max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-border shadow-lg">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold mb-6 text-card-foreground text-center">
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
                        Full Name *
                      </Label>
                      <Input 
                        id="fullName" 
                        name="fullName" 
                        type="text" 
                        value={formData.fullName} 
                        onChange={handleInputChange} 
                        placeholder="Enter your full name" 
                        className="mt-2" 
                        required 
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email Address *
                      </Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="Enter your email" 
                        className="mt-2" 
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                        Phone Number
                      </Label>
                      <Input 
                        id="phone" 
                        name="phone" 
                        type="tel" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="Enter your phone number" 
                        className="mt-2" 
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium text-foreground">
                        Company/Organization
                      </Label>
                      <Input 
                        id="company" 
                        name="company" 
                        type="text" 
                        value={formData.company} 
                        onChange={handleInputChange} 
                        placeholder="Enter your company name" 
                        className="mt-2" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message *
                    </Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      placeholder="Tell us about your manpower requirements..." 
                      className="mt-2 min-h-[120px] resize-none" 
                      required 
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Contact Information Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {contactCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center p-5 sm:p-6 hover:shadow-lg transition-shadow hover-lift">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <card.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2 text-base sm:text-lg">{card.title}</h4>
                  <div className="text-muted-foreground text-xs sm:text-sm space-y-0.5">
                    {card.lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;