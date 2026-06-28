import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Bug, HelpCircle, Clock, Shield, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import supportHero from '@/assets/support-helpdesk-hero.jpg';

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
    q: "Do you offer managed NOC services for enterprise networks?",
    a: "Yes. Our managed services cover 24×7 NOC monitoring, incident management, fault resolution, performance reporting, and vendor coordination for enterprise WAN, telecom, and structured-cabling environments.",
  },
  {
    q: "What payment terms apply to product purchases?",
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
      description: "Account, registration, or general product enquiries — routed to our customer-success team.",
      icon: HelpCircle,
      subject: "General Support",
    },
    {
      title: "Technical Issues",
      description: "Field incidents, product faults, or deployment escalations — routed to engineering on-call.",
      icon: Bug,
      subject: "Technical Issue Report",
    },
  ];

  const slaCards = [
    { icon: Clock, title: "4-hour acknowledgement", desc: "Every email is acknowledged within 4 business hours." },
    { icon: Headphones, title: "24-hour resolution target", desc: "Standard requests are resolved within 24 hours on business days." },
    { icon: Shield, title: "Contractual SLAs", desc: "Managed-service customers operate on contracted response & uptime SLAs." },
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
        description="Enterprise customer support for ConnectLH™ products and uConnect managed services. 4-hour acknowledgement, 24-hour resolution, contractual SLAs for managed customers."
        path="/support"
        image="https://uconnecttech.com/og/support.jpg"
        jsonLd={faqJsonLd}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Support", path: "/support" }]}
      />
      <Header />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" decoding="async"
            src={supportHero}
            alt="uConnect Technologies enterprise support helpdesk team"
            className="w-full h-full object-cover"
            width={1600}
            height={1024}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/85 to-foreground/40" />
        </div>

        <div className="relative container mx-auto px-4 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-5">
              Customer Support
            </div>
            <h1 className="display-headline text-background text-4xl sm:text-5xl lg:text-7xl leading-[1.05]">
              Support that keeps your{" "}
              <span className="text-accent">network running.</span>
            </h1>
            <p className="mt-7 text-base lg:text-lg text-background/80 leading-relaxed max-w-2xl">
              Our helpdesk is the single point of contact for every uConnect customer — from
              ConnectLH™ product warranty queries and on-site engineering escalations to
              managed-service incident tickets. Backed by 200+ Tier-1 engineers across 18 circles
              and 5 regional warehouses, we are built to respond fast and resolve in full.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                variant="ctaAccent"
                size="xl"
                onClick={() => handleEmailSupport("General Support")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <Button
                variant="ctaOutlineOnDark"
                size="xl"
                onClick={() => handleEmailSupport("Technical Issue Report")}
              >
                Report an Incident
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <main>
        {/* WRITE-UP / About Support */}
        <section className="py-20 lg:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12 lg:gap-16">
              <div className="lg:col-span-2">
                <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">
                  About Our Support
                </div>
                <h2 className="display-headline text-foreground text-3xl sm:text-4xl lg:text-5xl">
                  One desk.{" "}
                  <span className="text-muted-foreground">Every uConnect customer.</span>
                </h2>
              </div>
              <div className="lg:col-span-3 space-y-5 text-base lg:text-lg text-muted-foreground leading-relaxed">
                <p>
                  uConnect Support exists to make sure every product we ship and every
                  service we deliver continues to perform in the field. Whether you are an
                  enterprise running a managed network, a Tier-1 carrier operating microwave links
                  we installed, or an ISP rolling out FTTH with ConnectLH™ equipment — your support
                  request lands with engineers who know your account.
                </p>
                <p>
                  Every ticket is logged, routed by the helpdesk to the right specialist —
                  product, deployment, NOC, or commercial — and tracked through to closure. For
                  customers on managed-service contracts, response and uptime commitments are
                  defined contractually and reported monthly.
                </p>
                <p>
                  We don't outsource support. The team you reach is the same team that designs,
                  manufactures, and deploys our solutions — which means faster diagnosis,
                  fewer handoffs, and real ownership of the outcome.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SLA strip */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-4">
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
          </div>
        </section>

        {/* Support Options */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="display-headline text-foreground text-3xl sm:text-4xl mb-3">
                  How can we help you?
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Pick the channel that matches your request — we'll get back within 4 business hours.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
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
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-10">
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
            </div>
          </div>
        </section>

        {/* Direct Contact */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
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
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
