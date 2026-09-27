import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Globe2, Mail, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

const REGIONS = [
  "United States",
  "Canada",
  "Europe",
  "Middle East",
  "South America",
  "India",
  "Asia Pacific",
  "Other",
];

const INTERESTS = [
  "ConnectLH™ Antennas",
  "ConnectLH™ FTTH Products",
  "ConnectLH™ Cable Assemblies",
  "ConnectLH™ Racks & Power",
  "Teltonika Routers / Gateways",
  "Teltonika Switches",
  "Distribution Partnership",
  "Bulk / Project Order",
  "Other",
];

interface RequestQuoteProps {
  product?: string;
}

const RequestQuote = ({ product }: RequestQuoteProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    region: "",
    interest: product || "",
    quantity: "",
    message: "",
  });

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Product Enquiry — ${form.interest || "ConnectLH™ Products"} — ${form.company || form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Country / Region: ${form.region}`,
      `Interested in: ${form.interest}`,
      `Estimated quantity: ${form.quantity}`,
      "",
      "Message:",
      form.message,
    ].join("\n");
    window.location.href = `mailto:reachus@youconnecttech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const inputCls =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition";

  return (
    <section id="request-quote" className="scroll-mt-24">
      <div className="grid lg:grid-cols-5 gap-8 items-stretch">
        {/* Left: pitch */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 bg-primary text-primary-foreground rounded-3xl p-8 lg:p-10 flex flex-col justify-between"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
              Talk to our sales team
            </div>
            <h2 className="display-headline text-primary-foreground text-3xl lg:text-4xl leading-tight">
              Get pricing, stock &amp; delivery for your project
            </h2>
            <p className="mt-5 text-primary-foreground/80 leading-relaxed text-sm lg:text-base">
              Tell us what you need and our sales engineers will respond with
              pricing, lead times and technical guidance — usually within one
              business day.
            </p>
          </div>
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Globe2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span className="text-primary-foreground/85">
                We supply & support customers across the{" "}
                <strong className="text-primary-foreground">USA, Canada, Europe, Middle East, South America</strong> and India.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Handshake className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <span className="text-primary-foreground/85">
                Distributor & reseller partnerships available with regional pricing and marketing support.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <a
                href="mailto:reachus@youconnecttech.com"
                className="text-primary-foreground/85 hover:text-accent transition-colors break-all"
              >
                reachus@youconnecttech.com
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Right: form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3 bg-card border border-border rounded-3xl p-8 lg:p-10"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input required placeholder="Your name *" className={inputCls} value={form.name} onChange={set("name")} />
            <input required type="email" placeholder="Work email *" className={inputCls} value={form.email} onChange={set("email")} />
            <input placeholder="Company" className={inputCls} value={form.company} onChange={set("company")} />
            <select required className={inputCls} value={form.region} onChange={set("region")}>
              <option value="" disabled>Country / Region *</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <select required className={inputCls} value={form.interest} onChange={set("interest")}>
              <option value="" disabled>Product of interest *</option>
              {INTERESTS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
            <input placeholder="Estimated quantity" className={inputCls} value={form.quantity} onChange={set("quantity")} />
          </div>
          <textarea
            rows={4}
            placeholder="Tell us about your project, timeline or technical requirements…"
            className={`${inputCls} mt-4 resize-none`}
            value={form.message}
            onChange={set("message")}
          />
          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Button type="submit" variant="cta" size="lg">
              Send enquiry to sales <Send className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-xs text-muted-foreground">
              Opens your email app with the enquiry pre-filled — no account needed.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RequestQuote;
