import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Call edge function for secure submission (handles both database and email)
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
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset form
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
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute inset-0 quess-pattern opacity-20"></div>
      <div className="absolute top-10 right-10 w-40 h-40 border border-secondary/30 transform rotate-12"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent/10 rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/20 border border-secondary/30 px-4 py-2 rounded-full mb-6">
            <Mail className="h-5 w-5 text-secondary" />
            <span className="font-semibold text-secondary">Contact Us</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-primary-foreground">Get in Touch with </span>
            <span className="golden-accent">Industry Leaders</span>
          </h2>
          
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Ready to transform your business with our technology solutions? 
            Our expert team is here to help you succeed.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="quess-card bg-card/10 backdrop-blur-sm border border-primary-foreground/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-primary-foreground">
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName" className="text-sm font-medium text-primary-foreground">
                        Full Name *
                      </Label>
                      <Input 
                        id="fullName" 
                        name="fullName"
                        type="text" 
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="mt-2 bg-card/20 border-primary-foreground/20 text-primary-foreground"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-primary-foreground">
                        Email Address *
                      </Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="mt-2 bg-card/20 border-primary-foreground/20 text-primary-foreground"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-primary-foreground">
                        Phone Number
                      </Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        type="tel" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="mt-2 bg-card/20 border-primary-foreground/20 text-primary-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-sm font-medium text-primary-foreground">
                        Company/Organization
                      </Label>
                      <Input 
                        id="company" 
                        name="company"
                        type="text" 
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Enter your company name"
                        className="mt-2 bg-card/20 border-primary-foreground/20 text-primary-foreground"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-primary-foreground">
                      Message *
                    </Label>
                    <Textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your technology requirements..."
                      className="mt-2 min-h-[120px] bg-card/20 border-primary-foreground/20 text-primary-foreground"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Office Address */}
            <Card className="quess-card bg-card/10 backdrop-blur-sm border border-primary-foreground/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary rounded-lg p-3 flex-shrink-0">
                    <MapPin className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-2">Office Address</h4>
                    <p className="text-primary-foreground/80">
                      Plot No 1398 Air Force Road<br />
                      Govindpur<br />
                      Distt. Saharanpur Uttar Pradesh
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="quess-card bg-card/10 backdrop-blur-sm border border-primary-foreground/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent rounded-lg p-3 flex-shrink-0">
                    <Phone className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-2">Phone Numbers</h4>
                    <p className="text-primary-foreground/80">
                      Main: +91 8979199267<br />
                      HR Dept: +91 8755980465<br />
                      Support: +91 7895154327
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="quess-card bg-card/10 backdrop-blur-sm border border-primary-foreground/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary rounded-lg p-3 flex-shrink-0">
                    <Mail className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-2">Email Addresses</h4>
                    <p className="text-primary-foreground/80">
                      General: reachus@youconnecttech.com<br />
                      HR: Shivani.s@youconnecttech.com<br />
                      Support: a_singh@youconnecttech.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="quess-card bg-card/10 backdrop-blur-sm border border-primary-foreground/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent rounded-lg p-3 flex-shrink-0">
                    <Clock className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-2">Business Hours</h4>
                    <p className="text-primary-foreground/80">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 text-center">
          <div className="quess-card bg-card/10 backdrop-blur-sm border border-primary-foreground/20 p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              <span className="text-primary-foreground">Need </span>
              <span className="golden-accent">Immediate Assistance?</span>
            </h3>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              Our expert team is ready to help you with urgent requirements or any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
              >
                Call Now: +91 8979199267
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={() => {
                  const contactForm = document.querySelector('form');
                  if (contactForm) {
                    contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;