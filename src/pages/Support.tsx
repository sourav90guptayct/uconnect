import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, MessageCircle, FileText, Bug, HelpCircle, Clock, Shield, Headphones } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const FAQS = [
  {
    q: "How do I request a quote for ConnectLH™ products or telecom equipment?",
    a: "Email reachus@youconnecttech.com with the product category (sector antennas, BTS equipment, FTTH, PoE, cables, racks), quantity, and target deployment location. We respond with pricing, lead time, and datasheets within one business day.",
  },
  {
    q: "What is your typical response time for support requests?",
    a: "General queries are acknowledged within 4 business hours and resolved within 24 hours on business days. Critical-network incidents for customers on managed-service contracts follow the SLA defined in the contract — typically 30-minute response.",
  },
  {
    q: "Do you provide installation, commissioning, and ongoing support across India?",
    a: "Yes. We operate across 18 telecom circles with 200+ Tier-1 field engineers and 5 regional warehouses. Services include I&C, UBR, MW link installation, FTTH rollout, structured cabling, and post-deployment managed services.",
  },
  {
    q: "Are ConnectLH™ products certified and warranty-backed?",
    a: "All ConnectLH™ products ship with manufacturer datasheets, factory test reports, and a standard 12-month warranty against manufacturing defects. Extended warranties and AMC packages are available on request.",
  },
  {
    q: "What information should I include when reporting a technical issue?",
    a: "Include the product model number or service reference, site/circle, a description of the issue, the time it started, any error indicators or logs, and contact details for the on-site engineer. Photos or screenshots speed up diagnosis.",
  },
  {
    q: "Can you handle large-scale, multi-site rollouts?",
    a: "Yes. We have delivered 10,000+ Link deployments and 30+ ongoing pan-India projects for Tier-1 carriers, tower operators, and ISPs. We assign a dedicated PM, share weekly progress dashboards, and manage logistics from our regional warehouses.",
  },
  {
    q: "How do I follow up on a job application submitted through the Careers page?",
    a: "Application status is visible on your profile under \"My Applications\". For follow-ups or additional documents, email reachus@youconnecttech.com with the job title and application reference.",
  },
  {
    q: "Do you offer managed NOC services for enterprise networks?",
    a: "Yes. Our managed services cover 24×7 NOC monitoring, incident management, fault resolution, performance reporting, and vendor coordination for enterprise WAN, telecom, and structured-cabling environments.",
  },
  {
    q: "What payment terms and order minimums apply to product purchases?",
    a: "Payment terms are agreed per PO — typically net-30 for established enterprise customers and advance/LC for new accounts. No fixed MOQ for most ConnectLH™ SKUs; project pricing applies for bulk orders.",
  },
  {
    q: "How can I become a partner, channel reseller, or vendor?",
    a: "Email reachus@youconnecttech.com with your company profile, geographic coverage, and area of interest (reselling, sub-contracting field work, OEM supply). Our partnerships team responds within two business days.",
  },
];

const Support = () => {
  const { toast } = useToast();

  const handleEmailSupport = (subject = "Support Request") => {
    window.location.href = `mailto:support@youconnecttech.com?subject=${encodeURIComponent(subject)}`;
    toast({
      title: "Email client opened",
      description: "Your email client should open with our support email address.",
    });
  };

  const supportOptions = [
    {
      title: "General Support",
      description: "Account, registration, or general product enquiries",
      icon: HelpCircle,
      subject: "General Support",
    },
    {
      title: "Technical Issues",
      description: "Field incidents, product faults, or deployment escalations",
      icon: Bug,
      subject: "Technical Issue Report",
    },
    {
      title: "Sales & Quotations",
      description: "Pricing, datasheets, and project proposals for ConnectLH™ and services",
      icon: MessageCircle,
      subject: "Sales Enquiry",
    },
    {
      title: "Careers Support",
      description: "Help with job applications, interviews, or candidate profiles",
      icon: FileText,
      subject: "Careers Support",
    },
  ];

  const slaCards = [
    { icon: Clock, title: "4-hour acknowledgement", desc: "All support emails are acknowledged within 4 business hours." },
    { icon: Headphones, title: "24-hour resolution target", desc: "Standard requests are resolved within 24 hours on business days." },
    { icon: Shield, title: "Contractual SLAs", desc: "Managed-service customers operate on contracted response and uptime SLAs." },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Support — Help, FAQs & Contact | uConnect Technologies"
        description="Get help from uConnect Technologies: technical support, ConnectLH™ product enquiries, sales quotations, and careers assistance. 4-hour response on business days."
        path="/support"
        jsonLd={faqJsonLd}
      />
      <Header />
      <main>
        <div className="container mx-auto px-4 py-16 lg:py-20">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-14">
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                Customer Support
              </div>
              <h1 className="display-headline text-foreground text-4xl sm:text-5xl lg:text-6xl mb-5">
                How can we help you?
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Reach the right team directly — for technical incidents, ConnectLH™ enquiries, sales,
                or careers. We respond within 4 business hours.
              </p>
            </div>

            {/* SLA strip */}
            <div className="grid sm:grid-cols-3 gap-4 mb-14">
              {slaCards.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-border bg-muted/30 p-5 flex gap-4 items-start"
                >
                  <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <s.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm mb-1">{s.title}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Support Options Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {supportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Card key={option.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{option.title}</CardTitle>
                      </div>
                      <CardDescription>{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={() => handleEmailSupport(option.subject)} className="w-full">
                        Email this team
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* FAQ */}
            <section className="mb-16">
              <div className="max-w-3xl mb-8">
                <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
                  Frequently Asked Questions
                </div>
                <h2 className="display-headline text-foreground text-3xl sm:text-4xl">
                  Answers to common product, support, and partnership questions.
                </h2>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((f, i) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger className="text-left text-base lg:text-lg font-semibold">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Direct Contact */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Direct Contact</span>
                </CardTitle>
                <CardDescription>
                  Prefer to write directly? Use the addresses below.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <div className="text-base">
                  <span className="text-muted-foreground">Support: </span>
                  <a href="mailto:support@youconnecttech.com" className="text-primary hover:underline font-medium">
                    support@youconnecttech.com
                  </a>
                </div>
                <div className="text-base">
                  <span className="text-muted-foreground">Sales & general: </span>
                  <a href="mailto:reachus@youconnecttech.com" className="text-primary hover:underline font-medium">
                    reachus@youconnecttech.com
                  </a>
                </div>
                <p className="text-sm text-muted-foreground pt-2">
                  We typically respond within 4 business hours on weekdays.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
