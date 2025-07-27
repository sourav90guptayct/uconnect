import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MessageCircle, FileText, Bug, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Support = () => {
  const { toast } = useToast();

  const handleEmailSupport = () => {
    window.location.href = 'mailto:Support@youconnecttech.com?subject=Support Request';
    toast({
      title: "Email client opened",
      description: "Your email client should open with our support email address.",
    });
  };

  const supportOptions = [
    {
      title: "General Support",
      description: "Get help with general questions and account issues",
      icon: HelpCircle,
      action: handleEmailSupport,
      buttonText: "Email Support"
    },
    {
      title: "Technical Issues",
      description: "Report bugs, technical problems, or system errors",
      icon: Bug,
      action: handleEmailSupport,
      buttonText: "Report Issue"
    },
    {
      title: "Account Management",
      description: "Help with profile, registration, or account settings",
      icon: MessageCircle,
      action: handleEmailSupport,
      buttonText: "Get Account Help"
    },
    {
      title: "Job Applications",
      description: "Questions about job postings, applications, or career guidance",
      icon: FileText,
      action: handleEmailSupport,
      buttonText: "Career Support"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              How can we help you?
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose the type of support you need and we'll get back to you as soon as possible
            </p>
          </div>

          {/* Support Options Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {supportOptions.map((option, index) => {
              const IconComponent = option.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{option.title}</CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {option.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      onClick={option.action}
                      className="w-full"
                    >
                      {option.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Direct Contact Section */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Direct Contact</span>
              </CardTitle>
              <CardDescription>
                You can also reach us directly at our support email
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-4">
                <div className="text-lg font-medium">
                  <a 
                    href="mailto:Support@youconnecttech.com" 
                    className="text-primary hover:underline"
                  >
                    Support@youconnecttech.com
                  </a>
                </div>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 24 hours during business days
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleEmailSupport}
                  className="mt-4"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Support;