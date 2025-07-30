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
  const {
    toast
  } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
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
      const {
        data: result,
        error: functionError
      } = await supabase.functions.invoke('send-contact-email', {
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
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
            <Mail className="h-5 w-5" />
            <span className="font-semibold">Contact Us</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Ready to Transform Your
            <span className="text-primary"> Workforce?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get in touch with our experts to discuss your manpower requirements and discover 
            how we can help you build the perfect team for your organization.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Contact Form - Centered */}
          <div className="w-full max-w-2xl">
            <Card className="border-border">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-card-foreground text-center">
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
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : (
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
        </div>

        {/* Contact Information Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Visit Us</h4>
              <p className="text-muted-foreground text-sm">
                123 Business Street<br />
                City, State 12345
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Call Us</h4>
              <p className="text-muted-foreground text-sm">
                +1 (555) 123-4567<br />
                Mon-Fri 9AM-6PM
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Business Hours</h4>
              <p className="text-muted-foreground text-sm">
                Monday - Friday<br />
                9:00 AM - 6:00 PM
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Contact;