import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  MapPin, Clock, Users, Award, Heart, Zap, GraduationCap, Lightbulb, Radio, Server,
  Network, Wrench, ShieldCheck, ArrowRight, Rocket, BookOpen, Trophy, Briefcase, Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import JobApplicationForm from "@/components/careers/JobApplicationForm";
import careersHero from "@/assets/teamwork.jpg";
import imgPower from "@/assets/sector-power.jpg";
import imgRail from "@/assets/sector-railways.jpg";
import imgDataCentre from "@/assets/networks-datacenter.png";
import imgEnterprise from "@/assets/usecase-enterprise.jpg";
import imgLogistics from "@/assets/film-logistics.jpg";
import imgSmartCity from "@/assets/usecase-smartcity.jpg";
import imgPlanning from "@/assets/planning.jpg";
import imgWorkforce from "@/assets/workforce-management.jpg";
import imgOffice from "@/assets/smart-office.jpg";
import imgInfra from "@/assets/infra-hero.jpg";
import imgManaged from "@/assets/managed-hero.jpg";

interface Job {
  id: string;
  title: string;
  job_type: string;
  employment_type: string;
  experience_required: string;
  location_city: string;
  location_state: string;
  department: string;
  created_at: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const CareersPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [candidateProfile, setCandidateProfile] = useState<any>(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchJobs();
    if (user) fetchCandidateProfile();
  }, [user]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      setJobs((data as any) || []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCandidateProfile = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from("candidate_profiles")
        .select("id, user_id")
        .eq("user_id", user.id)
        .maybeSingle();
      setCandidateProfile(data);
      if (data) fetchAppliedJobs(data.id);
    } catch (error) {
      console.error("Error in fetchCandidateProfile:", error);
    }
  };

  const fetchAppliedJobs = async (candidateId: string) => {
    try {
      const { data } = await supabase
        .from("job_applications")
        .select("job_id")
        .eq("candidate_id", candidateId);
      setAppliedJobs(new Set(data?.map((a) => a.job_id) || []));
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  const handleApplyJob = async (jobId: string) => {
    if (!user) {
      toast({ title: "Login Required", description: "Please login to apply for jobs.", variant: "destructive" });
      navigate("/auth");
      return;
    }
    if (!candidateProfile) {
      toast({ title: "Complete Your Profile", description: "Please complete your profile setup to apply.", variant: "destructive" });
      navigate("/profile");
      return;
    }
    try {
      const { error } = await supabase.from("job_applications").insert({
        job_id: jobId,
        candidate_id: candidateProfile.id,
        cover_letter: "",
        application_status: "applied",
      });
      if (error) throw error;
      setAppliedJobs((prev) => new Set([...prev, jobId]));
      toast({ title: "Application Submitted 🎉", description: "Track status under 'My Applications'." });
    } catch (error: any) {
      toast({
        title: "Application Failed",
        description: error?.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    { value: "200+", label: "Engineers & specialists" },
    { value: "18", label: "Operating circles" },
    { value: "30+", label: "Projects delivered" },
    { value: "2017", label: "Building since" },
  ];

  const sectors = [
    { image: imgPower, title: "Energy & Utilities" },
    { image: imgRail, title: "Rail & Transportation" },
    { image: imgDataCentre, title: "Digital Infrastructure" },
    { image: imgEnterprise, title: "Enterprise & Industrial" },
    { image: imgSmartCity, title: "Government & Public Safety" },
    { image: imgLogistics, title: "Logistics & Manufacturing" },
  ];

  const pillars = [
    { icon: Zap, title: "Work across sectors", description: "Move between energy, transport, public infrastructure, industry and digital projects instead of one narrow domain." },
    { icon: BookOpen, title: "Certification sponsored", description: "We fund technical, OEM, project management and safety certifications, with paid study time before exams." },
    { icon: Users, title: "Engineer-led culture", description: "Flat teams, senior specialists on call as mentors, and real ownership from month one." },
    { icon: Heart, title: "Care that shows up", description: "Health cover, field allowances, and a safety-first culture on every site." },
  ];

  const disciplines = [
    { icon: Server, title: "Design & Engineering", roles: "Solution design · Systems engineering · Documentation", image: imgPlanning },
    { icon: Wrench, title: "Deployment & Field Operations", roles: "Installation · Commissioning · Site supervision", image: imgInfra },
    { icon: Radio, title: "Technology & Integration", roles: "IT/OT integration · Automation · Systems testing", image: imgDataCentre },
    { icon: Network, title: "Managed Services & Operations", roles: "Operations centres · Maintenance · Service desk", image: imgManaged },
    { icon: Users, title: "Resource & Project Management", roles: "Project managers · Planners · Workforce leads", image: imgWorkforce },
    { icon: ShieldCheck, title: "Quality, HSE & Governance", roles: "QA/QC · Safety · Audit & compliance", image: imgOffice },
    { icon: Briefcase, title: "Supply Chain & Warehousing", roles: "Procurement · Logistics · Inventory control", image: imgLogistics },
    { icon: Award, title: "Commercial & Client Facing", roles: "Pre-sales · Bids & proposals · Account management", image: imgEnterprise },
    { icon: GraduationCap, title: "Corporate & Support", roles: "Finance · People · Legal · IT", image: imgSmartCity },
  ];

  const talentTracks = [
    {
      icon: GraduationCap,
      tag: "0–1 year",
      title: "Graduate Engineer Trainee",
      duration: "12-month programme",
      description:
        "For B.E./B.Tech and diploma graduates across ECE, EEE, Mechanical, Civil, CSE and IT. Structured fundamentals first, then rotation across design, deployment, operations and project delivery before you specialise.",
      points: ["Stipend + certification sponsorship", "Assigned senior mentor", "Conversion to full-time on completion"],
    },
    {
      icon: Rocket,
      tag: "Students",
      title: "Summer & Semester Internships",
      duration: "8–24 weeks",
      description:
        "Pre-final and final year students — engineering and non-engineering — work on a real deliverable such as a design study, automation script, site survey pack, market study or process improvement, reviewed by the team that uses it.",
      points: ["Live project, not shadowing", "Certificate + letter of recommendation", "Remote or on-site options"],
    },
    {
      icon: Wrench,
      tag: "ITI / Diploma",
      title: "Technician Apprenticeship",
      duration: "6 months",
      description:
        "Hands-on apprenticeship in installation, commissioning, cabling and passive infrastructure across our project sites and regional warehouses, run by certified trainers.",
      points: ["Tool kit and safety gear provided", "On-site supervised practice", "Priority hiring for delivery teams"],
    },
  ];

  const innovation = [
    { icon: Lightbulb, title: "Innovation Challenge", description: "Anyone — including interns — can pitch an idea each quarter. Winning ideas get budget, engineering time and a named owner." },
    { icon: Trophy, title: "Build Days", description: "Two-day builds on automation, monitoring dashboards, field apps and process tooling that go into real operations." },
    { icon: BookOpen, title: "uConnect Labs", description: "A live lab of active and passive equipment, tools and test kits available to every engineer for practice and certification prep." },
    { icon: Award, title: "Campus Collaborations", description: "Guest lectures, capstone project mentoring and lab tours with colleges across our operating regions." },
  ];

  const process = [
    { step: "01", title: "Apply online", detail: "Share your profile and CV. Applies to open roles and speculative applications alike." },
    { step: "02", title: "Online screening", detail: "Role-specific assessment — timed, proctored and fair to every candidate." },
    { step: "03", title: "Technical discussion", detail: "A conversation with the team you'd work alongside, focused on real scenarios." },
    { step: "04", title: "Offer & onboarding", detail: "Transparent offer, documentation support and a structured first-90-days plan." },
  ];

  const faqs = [
    { q: "Do you hire freshers with no experience?", a: "Yes. Our Graduate Engineer Trainee programme and internships are designed for candidates with no prior industry experience — we train on fundamentals first." },
    { q: "Do you only hire network and telecom profiles?", a: "No. We are a product and services integrator working across energy and utilities, rail and transportation, government and public safety, enterprise and industrial, and digital infrastructure — so we hire design, deployment, operations, project management, supply chain, quality, commercial and corporate profiles too." },
    { q: "Can I apply if there is no matching open role?", a: "Absolutely. Use the Apply Now form below; we keep profiles on file and reach out when a matching requirement opens in your preferred location." },
    { q: "Is the screening test mandatory?", a: "It applies to specific technical roles and is the fastest route forward for them. Other roles are assessed through the standard application and interview process." },
    { q: "Are internships paid?", a: "Internship stipends depend on the project scope and duration. Terms are confirmed in writing before you start." },
    { q: "Which locations do you hire for?", a: "We operate across 18 circles in India with five regional warehouses, so roles span metro, tier-2 and field locations." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Careers at uConnect Technologies — Engineering, Graduate & Internships"
        description="Careers at uConnect Technologies, a multi-sector product and services integrator. Roles across design, deployment, operations, project management, supply chain and corporate functions in India."
        path="/careers"
        image="https://uconnecttech.com/og/careers.jpg"
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Careers", path: "/careers" }]}
      />
      <Header />
      <main>
        {/* Cinematic hero */}
        <section className="relative min-h-[72vh] flex items-end overflow-hidden">
          <img
            src={careersHero}
            alt="uConnect Technologies teams collaborating on multi-sector infrastructure projects"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10 pb-16 pt-40">
            <motion.div {...fadeUp} className="max-w-4xl">
              <div className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-6">
                Careers at uConnect
              </div>
              <h1 className="display-headline text-foreground text-4xl sm:text-6xl lg:text-7xl">
                Many sectors. Many roles.
                <br />
                <span className="text-accent">One integrator.</span>
              </h1>
              <p className="mt-8 text-base lg:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                We are a product and services integrator delivering across energy and utilities, rail
                and transportation, public infrastructure, enterprise and industrial, and digital
                infrastructure. That means careers in design, deployment, operations, project and
                resource management, supply chain, quality and corporate functions — for experienced
                professionals and for people just starting out.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                  <a href="#open-roles">
                    See open roles <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#graduates">Graduates &amp; internships</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats band */}
        <section className="border-y border-border bg-card/50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
              {stats.map((s) => (
                <div key={s.label} className="py-10 px-6 text-center">
                  <div className="text-3xl lg:text-4xl font-bold text-foreground">{s.value}</div>
                  <div className="mt-2 text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sectors we hire for */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div {...fadeUp} className="max-w-3xl mb-14">
              <div className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Sectors we hire for</div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
                Not one industry — several
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Our projects span multiple sectors, so your experience compounds across domains
                instead of narrowing into one.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              {sectors.map((s, i) => (
                <motion.div
                  key={s.title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative rounded-2xl overflow-hidden border border-border group"
                >
                  <img
                    src={s.image}
                    alt={`${s.title} projects at uConnect Technologies`}
                    loading="lazy"
                    className="h-48 lg:h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-base lg:text-lg font-semibold text-foreground">{s.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why work here */}
        <section className="py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div {...fadeUp} className="max-w-3xl mb-16">
              <div className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Life here</div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
                Serious infrastructure. Sane teams.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                As a product and services integrator, our people touch products, design, deployment
                and operations across several sectors rather than a single narrow slice.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((p, i) => (
                <motion.div key={p.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.07 }}>
                  <Card className="h-full border-border bg-card/60 backdrop-blur hover:border-accent/40 transition-colors">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <p.icon className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle className="text-lg">{p.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Disciplines */}
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div {...fadeUp} className="max-w-3xl mb-14">
              <div className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Where you fit</div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground">Career areas & profiles</h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Technical and non-technical, field and office, entry level and senior — we hire across
                the full delivery chain.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disciplines.map((d, i) => (
                <motion.div
                  key={d.title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className="rounded-2xl overflow-hidden border border-border bg-card/60 backdrop-blur hover:border-accent/40 transition-colors group"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={d.image}
                      alt={`${d.title} careers at uConnect Technologies`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 h-10 w-10 rounded-xl bg-accent/15 backdrop-blur flex items-center justify-center">
                      <d.icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{d.roles}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Graduates & internships */}
        <section id="graduates" className="py-24 scroll-mt-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div {...fadeUp} className="max-w-3xl mb-16">
              <div className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                Emerging talent
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
                Starting out? Start on a real project.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Three structured routes in for students, graduates and diploma holders — each with
                training, a mentor and a real project you can point to afterwards.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {talentTracks.map((t, i) => (
                <motion.div key={t.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}>
                  <Card className="h-full flex flex-col border-border bg-card/60 backdrop-blur">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                          <t.icon className="h-6 w-6 text-accent" />
                        </div>
                        <Badge variant="secondary">{t.tag}</Badge>
                      </div>
                      <CardTitle className="text-xl">{t.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                        <Clock className="h-4 w-4" /> {t.duration}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.description}</p>
                      <ul className="mt-6 space-y-2">
                        {t.points.map((pt) => (
                          <li key={pt} className="flex gap-2 text-sm text-foreground/80">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="outline" className="mt-8 w-full">
                        <a href="#apply">
                          Apply for this track <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...fadeUp}
              className="mt-10 rounded-2xl border border-border bg-muted/40 p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Are you a college placement coordinator?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                  We run campus drives, guest lectures and capstone mentoring across our operating
                  circles. Write to us with your institution and preferred window.
                </p>
              </div>
              <Button asChild className="bg-accent hover:bg-accent/90 shrink-0">
                <a href="mailto:reachus@youconnecttech.com?subject=Campus%20Partnership">
                  <Mail className="mr-2 h-4 w-4" /> Talk to our talent team
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Innovation */}
        <section className="py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div {...fadeUp} className="max-w-3xl mb-16">
              <div className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                Ideas welcome
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
                Room to build something new
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {innovation.map((it, i) => (
                <motion.div
                  key={it.title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="rounded-2xl border border-border bg-background p-8 flex gap-5"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <it.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{it.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{it.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Screening test CTA (kept) */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card/60 backdrop-blur p-10 text-center">
              <div className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
                Prove your skills
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
                Take the L2 Network Engineer Screening Test
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Complete our short technical screening to fast-track your application and stand out to our hiring team.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                <Link to="/careers/screening/l2-network-engineer">
                  Take Screening Test — L2 Network Engineer
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Open roles */}
        <section id="open-roles" className="py-24 scroll-mt-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div {...fadeUp} className="max-w-3xl mb-12">
              <div className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">Openings</div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground">Current opportunities</h2>
            </motion.div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : jobs.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card/50 p-10 text-center">
                <p className="text-muted-foreground">
                  No roles are listed right now — submit the form below and we'll contact you when a
                  matching requirement opens.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border border-y border-border">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="py-6 flex flex-col md:flex-row md:items-center gap-4 justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                        {(job.location_city || job.location_state) && (
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4" />
                            {[job.location_city, job.location_state].filter(Boolean).join(", ")}
                          </span>
                        )}
                        {job.employment_type && (
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-4 w-4" /> {job.employment_type}
                          </span>
                        )}
                        {job.experience_required && <span>{job.experience_required}</span>}
                      </div>
                    </div>
                    <div className="flex gap-3 shrink-0">
                      <Button asChild variant="outline">
                        <Link to={`/jobs/${job.id}`}>View details</Link>
                      </Button>
                      <Button
                        onClick={() => handleApplyJob(job.id)}
                        disabled={appliedJobs.has(job.id)}
                        className="bg-accent hover:bg-accent/90"
                      >
                        {appliedJobs.has(job.id) ? "Applied" : "Apply"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Hiring process */}
        <section className="py-24 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div {...fadeUp} className="max-w-3xl mb-14">
              <div className="text-sm font-semibold text-accent uppercase tracking-[0.2em] mb-4">
                How hiring works
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground">Four steps, no guesswork</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {process.map((p, i) => (
                <motion.div key={p.step} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.07 }}>
                  <div className="text-4xl font-bold text-accent/30">{p.step}</div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Apply Now (kept) */}
        <section id="apply" className="py-24 scroll-mt-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Apply Now</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't see a role that fits? Submit your details — including for graduate, internship
                and apprenticeship tracks — and we'll get in touch when the right opportunity opens.
              </p>
            </div>
            <JobApplicationForm />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-muted/30 border-t border-border">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-10">
              Questions candidates ask
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CareersPage;
