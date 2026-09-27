import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const enquiries: Record<string, { recipient: string; fields: string[] }> = {
  "Product Sales": { recipient: "reachus@youconnecttech.com", fields: ["Product category", "Product / model", "Estimated quantity", "Application", "Request type (quote, sample or datasheet)"] },
  "Distributor / Partner Enquiry": { recipient: "reachus@youconnecttech.com", fields: ["Company website", "Markets covered", "Brands represented", "Product categories of interest", "Sales / technical team size", "Estimated annual volume"] },
  "Technical Support": { recipient: "support@youconnecttech.com", fields: ["Product / service", "Model", "Serial number", "Firmware version", "Issue details"] },
  "OEM / Custom Engineering": { recipient: "reachus@youconnecttech.com", fields: ["Product type", "Target market", "Required specification", "Customization needed", "Estimated annual quantity", "Target timeline"] },
  "Network Services": { recipient: "reachus@youconnecttech.com", fields: ["Service required", "Network / project location", "Project scope", "Target timeline"] },
  "General Enquiry": { recipient: "reachus@youconnecttech.com", fields: [] },
};

export default function CompanyContact() {
  const [kind, setKind] = useState("Product Sales");
  const [values, setValues] = useState<Record<string, string>>({});
  const current = enquiries[kind];
  const set = (key: string, value: string) => setValues(prev => ({ ...prev, [key]: value }));
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const body = ["Name", "Company", "Country", "Business email", ...current.fields, "Message"].map(key => `${key}: ${values[key] || "—"}`).join("\n");
    window.location.href = `mailto:${current.recipient}?subject=${encodeURIComponent(kind + " | uConnect enquiry")}&body=${encodeURIComponent(body)}`;
  };
  return <div className="min-h-screen bg-background"><SEO title="Contact uConnect Technologies | Products, Partners & Network Services" description="Contact uConnect Technologies about ConnectLH products, distributor partnerships, OEM engineering, technical support or network services." path="/company/contact" breadcrumbs={[{ name: "Home", path: "/" }, { name: "Company", path: "/company/about" }, { name: "Contact", path: "/company/contact" }]} /><Header /><main>
    <section className="bg-foreground pt-32 pb-16"><div className="container mx-auto px-6 lg:px-8"><nav aria-label="Breadcrumb" className="mb-8 flex gap-2 text-sm text-background/70"><Link to="/">Home</Link><span>/</span><Link to="/company/about">Company</Link><span>/</span><span className="text-background">Contact</span></nav><p className="mb-4 text-sm font-semibold uppercase text-accent">Contact</p><h1 className="max-w-3xl text-4xl font-bold text-background sm:text-5xl lg:text-6xl">Let's talk about your network</h1><p className="mt-6 max-w-2xl text-lg text-background/80">Tell us what you need, from a product datasheet to a deployment partner. Your enquiry is addressed to the appropriate team.</p></div></section>
    <section className="py-16 lg:py-20"><div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8"><div><h2 className="text-2xl font-bold">Choose your enquiry</h2><p className="mt-3 text-muted-foreground">We communicate by email. For technical files or photos, attach them in your email after it opens.</p><div className="mt-10 space-y-4 border-t border-border pt-6"><p className="text-sm font-semibold text-foreground">Sales & partnerships</p><a className="block break-all text-accent hover:underline" href="mailto:reachus@youconnecttech.com">reachus@youconnecttech.com</a><p className="text-sm font-semibold text-foreground">Technical support</p><a className="block break-all text-accent hover:underline" href="mailto:support@youconnecttech.com">support@youconnecttech.com</a></div><p className="mt-10 text-sm text-muted-foreground">We welcome enquiries from India, USA & Canada, Europe, Latin America, Middle East & Africa, and Asia Pacific. No local office or distributor is implied.</p></div>
    <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={submit} className="space-y-6"><div><Label htmlFor="kind">Enquiry type</Label><Select value={kind} onValueChange={value => { setKind(value); setValues({}); }}><SelectTrigger id="kind" className="mt-2"><SelectValue /></SelectTrigger><SelectContent>{Object.keys(enquiries).map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent></Select></div><div className="grid gap-5 sm:grid-cols-2">{["Name", "Company", "Country", "Business email", ...current.fields].map(field => <div key={field}><Label htmlFor={field}>{field}{["Name", "Business email"].includes(field) ? " *" : ""}</Label><Input id={field} type={field === "Business email" ? "email" : "text"} className="mt-2" value={values[field] || ""} onChange={e => set(field, e.target.value)} required={["Name", "Business email"].includes(field)} maxLength={200} /></div>)}</div><div><Label htmlFor="message">Message *</Label><Textarea id="message" className="mt-2 min-h-32" value={values.Message || ""} onChange={e => set("Message", e.target.value)} required maxLength={2000} /></div><p className="text-sm text-muted-foreground">This opens your email app with the enquiry filled in. Review and send it there; nothing is sent automatically.</p><Button type="submit" variant="ctaAccent" size="lg"><Mail className="h-4 w-4" /> Prepare email <ArrowRight className="h-4 w-4" /></Button></motion.form></div></section>
  </main><Footer /></div>;
}
