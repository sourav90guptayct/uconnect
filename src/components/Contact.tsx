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
    <section id="contact" className="py-20 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 uconnect-tech-pattern opacity-10"></div>
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-accent/20 blur-2xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-primary/20 blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 uconnect-card px-4 py-2 rounded-full mb-6">
            <Mail className="h-5 w-5 text-primary" />
            <span className="font-semibold text-primary uconnect-orange-text">Contact Us</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="uconnect-orange-gradient bg-clip-text text-transparent uconnect-orange-text">
              Connect to the
            </span>
            <br />
            <span className="text-foreground uconnect-orange-text">
              Future
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to transform your workforce? <span className="text-secondary uconnect-orange-text">Initialize contact protocol</span> and discover 
            how we can help you build the perfect team for your organization.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="uconnect-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 uconnect-orange-text text-primary">
                  Send us a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
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
                  
                  <div className="grid md:grid-cols-2 gap-6">
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
                      className="mt-2 min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground uconnect-border hover:uconnect-orange-glow transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Transmitting..."
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
            <Card className="uconnect-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 uconnect-orange-glow">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2 uconnect-orange-text">Office Address</h4>
                    <p className="text-muted-foreground">
                      Plot No 1398 Air Force Road<br />
                      Govindpur<br />
                      Distt. Saharanpur Uttar Pradesh
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="uconnect-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 uconnect-orange-glow">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2 uconnect-orange-text">Phone Numbers</h4>
                    <p className="text-muted-foreground">
                      Main: +91 8979199267<br />
                      HR Dept: +91 8755980465<br />
                      Support: +91 7895154327
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="uconnect-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 uconnect-orange-glow">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2 uconnect-orange-text">Email Addresses</h4>
                    <p className="text-muted-foreground">
                      General: reachus@youconnecttech.com<br />
                      HR: Shivani.s@youconnecttech.com<br />
                      Support: a_singh@youconnecttech.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card className="uconnect-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0 uconnect-orange-glow">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-2 uconnect-orange-text">Business Hours</h4>
                    <p className="text-muted-foreground">
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
          <div className="uconnect-card p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 uconnect-orange-text text-primary">
              Need Immediate Assistance?
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Our <span className="text-secondary uconnect-orange-text">tech specialists</span> are ready to help you with urgent requirements or any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/80 uconnect-border hover:uconnect-orange-glow transition-all duration-300"
              >
                Call Now: +91 8979199267
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-secondary text-secondary hover:bg-secondary/10 uconnect-border transition-all duration-300"
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