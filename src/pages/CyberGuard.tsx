import { useState, useEffect } from "react";
import { Shield, ClipboardCheck, Radar, Lock, GraduationCap, AlertTriangle, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const services = [
  {
    icon: Shield,
    title: "Penetration Testing",
    description: "Simulated attacks to identify vulnerabilities",
  },
  {
    icon: ClipboardCheck,
    title: "Compliance & Audit",
    description: "GDPR, SOC 2, ISO 27001 compliance",
  },
  {
    icon: Radar,
    title: "Threat Monitoring",
    description: "24/7 real-time threat detection and response",
  },
  {
    icon: Lock,
    title: "Data Encryption",
    description: "End-to-end encryption solutions",
  },
  {
    icon: GraduationCap,
    title: "Security Training",
    description: "Employee security awareness programs",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    description: "Rapid breach containment and forensics",
  },
];

const pricingOptions = [
  { id: "pentest", label: "Penetration Testing", price: 2000 },
  { id: "compliance", label: "Compliance Audit", price: 3500 },
  { id: "monitoring", label: "Threat Monitoring (monthly)", price: 500 },
  { id: "encryption", label: "Data Encryption", price: 1500 },
  { id: "training", label: "Security Training", price: 800 },
  { id: "incident", label: "Incident Response", price: 2500 },
];

const companySizes = ["1-10", "11-50", "51-200", "200+"];

const serviceOptions = [
  "Penetration Testing",
  "Compliance & Audit",
  "Threat Monitoring",
  "Data Encryption",
  "Security Training",
  "Incident Response",
];

const CyberGuard = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    services: [] as string[],
    companySize: "",
    concerns: "",
  });
  const [requests, setRequests] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<string[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cyberguard_requests") || "[]");
    setRequests(stored);
    const storedQuotes = JSON.parse(localStorage.getItem("cyberguard_quotes") || "[]");
    setQuotes(storedQuotes);
  }, []);

  const toggleService = (id: string) => {
    setSelectedPricing((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleFormService = (svc: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(svc)
        ? prev.services.filter((s) => s !== svc)
        : [...prev.services, svc],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("cyberguard_requests") || "[]");
    const newRequest = { ...formData, id: Date.now(), timestamp: new Date().toISOString() };
    const updated = [...stored, newRequest];
    localStorage.setItem("cyberguard_requests", JSON.stringify(updated));
    setRequests(updated);
    toast.success("Assessment request submitted!");
    setFormData({ name: "", company: "", email: "", phone: "", services: [], companySize: "", concerns: "" });
  };

  const handleQuote = () => {
    if (selectedPricing.length === 0) {
      toast.error("Select at least one service");
      return;
    }
    const selected = pricingOptions.filter((o) => selectedPricing.includes(o.id));
    const total = selected.reduce((sum, o) => sum + o.price, 0);
    const quote = { items: selected, total, id: Date.now(), timestamp: new Date().toISOString() };
    const stored = JSON.parse(localStorage.getItem("cyberguard_quotes") || "[]");
    const updated = [...stored, quote];
    localStorage.setItem("cyberguard_quotes", JSON.stringify(updated));
    setQuotes(updated);
    toast.success(`Quote generated: $${total.toLocaleString()}`);
  };

  const total = pricingOptions
    .filter((o) => selectedPricing.includes(o.id))
    .reduce((sum, o) => sum + o.price, 0);

  return (
    <div className="min-h-screen bg-black" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Hero Section — identical to Securify */}
      <section className="relative h-screen w-full overflow-hidden bg-black" style={{ fontFamily: "'Readex Pro', system-ui, -apple-system, sans-serif" }}>
        <style>{`
          .hero-title {
            letter-spacing: -0.04em;
            line-height: 0.95;
          }
        `}</style>

        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4"
            type="video/mp4"
          />
        </video>

        <nav className="absolute z-20 px-6 md:px-10 pt-6 top-0 left-0 right-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-neutral-900/90 backdrop-blur rounded-full pl-4 pr-6 py-3">
              <Shield className="h-5 w-5 text-white" />
              <span className="text-white text-sm font-normal tracking-tight">CyberGuard</span>
            </div>
            <div className="hidden md:flex items-center gap-1 bg-neutral-900/90 backdrop-blur rounded-full px-3 py-2">
              {["platform", "solutions", "company", "support"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full"
                >
                  {link}
                </a>
              ))}
            </div>
            <a
              href="#"
              className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
            >
              get started
            </a>
          </div>
        </nav>

        <div className="relative h-full w-full text-white antialiased">
          <div className="absolute right-6 md:right-24 top-[14%] flex flex-col items-end">
            <div className="flex items-center gap-3">
              <span className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]" />
              <span className="text-4xl md:text-5xl font-medium tracking-tight">+65k</span>
            </div>
            <p className="text-xs md:text-sm text-white/70 mt-1 text-right">startups use</p>
          </div>

          <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-4 md:left-10 top-[18%]">
            protect
          </h1>
          <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] right-4 md:right-10 top-[38%]">
            your
          </h1>
          <h1 className="hero-title absolute text-white font-medium text-[14vw] md:text-[13vw] left-[18%] md:left-[28%] top-[58%]">
            data
          </h1>

          <p className="absolute left-6 md:left-10 top-[46%] max-w-[240px] text-[15px] leading-snug text-white/90">
            we can guarding your data with utmost care, empowering you with privacy everywhere
          </p>

          <div className="absolute left-6 md:left-20 bottom-20 md:bottom-24">
            <div className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl font-medium tracking-tight">+1.5b</span>
              <span className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
            </div>
            <p className="text-xs md:text-sm text-white/70 mt-1">gb data was protected</p>
          </div>

          <div className="absolute right-6 md:right-20 bottom-16 md:bottom-20 flex flex-col items-end">
            <div className="flex items-center gap-3">
              <span className="hidden md:block h-px w-24 bg-white/40 rotate-[-20deg]" />
              <span className="text-4xl md:text-5xl font-medium tracking-tight">+300k</span>
            </div>
            <p className="text-xs md:text-sm text-white/70 mt-1">downloads</p>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* A. Services Grid */}
      <section className="px-6 md:px-20 py-24 text-white">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">
          Our Security Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="group bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 hover:border-neutral-600 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-800 flex items-center justify-center mb-5 group-hover:bg-neutral-700 transition-colors">
                <svc.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{svc.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">{svc.description}</p>
              <button className="text-sm text-white border border-neutral-700 rounded-full px-5 py-2 hover:bg-white hover:text-black transition-all">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* B. Assessment Request Form */}
      <section className="px-6 md:px-20 py-24 text-white bg-neutral-950/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight">
            Request a Security Assessment
          </h2>
          <p className="text-neutral-400 text-center mb-12 max-w-xl mx-auto">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Company</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                  placeholder="Acme Corp"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                  placeholder="john@acme.com"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors"
                  placeholder="+1 555 0000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-2">Service Interest</label>
              <div className="flex flex-wrap gap-3">
                {serviceOptions.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => toggleFormService(svc)}
                    className={`text-sm border rounded-full px-4 py-2 transition-all ${
                      formData.services.includes(svc)
                        ? "bg-white text-black border-white"
                        : "bg-neutral-900 text-neutral-300 border-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    {svc}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-2">Company Size</label>
              <select
                required
                value={formData.companySize}
                onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neutral-500 transition-colors appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 1rem center",
                }}
              >
                <option value="" disabled>Select size</option>
                {companySizes.map((s) => (
                  <option key={s} value={s}>{s} employees</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-neutral-400 mb-2">Current Security Concerns</label>
              <textarea
                rows={4}
                value={formData.concerns}
                onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                placeholder="Describe your security concerns..."
              />
            </div>

            <button
              type="submit"
              className="bg-white text-black font-medium rounded-full px-8 py-3 hover:bg-neutral-200 transition-colors"
            >
              Submit Request
            </button>
          </form>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className="mt-8 text-sm text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
          >
            {showHistory ? "Hide" : "Show"} previous requests ({requests.length})
          </button>

          {showHistory && requests.length > 0 && (
            <div className="mt-4 space-y-3">
              {[...requests].reverse().map((req: any) => (
                <div key={req.id} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-sm">
                  <p className="text-white font-medium">{req.name} — {req.company}</p>
                  <p className="text-neutral-400 mt-1">{req.email} {req.phone && `| ${req.phone}`}</p>
                  {req.services.length > 0 && (
                    <p className="text-neutral-500 mt-1">Services: {req.services.join(", ")}</p>
                  )}
                  {req.concerns && <p className="text-neutral-500 mt-1">{req.concerns}</p>}
                  <p className="text-neutral-600 text-xs mt-2">{new Date(req.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* C. Pricing Calculator */}
      <section className="px-6 md:px-20 py-24 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight">
            Estimate Your Security Package
          </h2>
          <p className="text-neutral-400 text-center mb-12 max-w-xl mx-auto">
            Select the services you need and get an instant estimate.
          </p>

          <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8">
            <div className="space-y-4">
              {pricingOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                    selectedPricing.includes(option.id)
                      ? "bg-neutral-800 border border-neutral-600"
                      : "bg-neutral-900 border border-neutral-800 hover:border-neutral-600"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        selectedPricing.includes(option.id)
                          ? "bg-white text-black"
                          : "bg-neutral-800 border border-neutral-600"
                      }`}
                    >
                      {selectedPricing.includes(option.id) && <Check className="h-3 w-3" />}
                    </div>
                    <span className="text-sm md:text-base">{option.label}</span>
                  </div>
                  <span className="text-sm text-neutral-300 font-mono">
                    ${option.price.toLocaleString()}{option.id === "monitoring" ? "/mo" : ""}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-lg font-semibold">Total Estimate</span>
              <span className="text-2xl font-bold font-mono">${total.toLocaleString()}</span>
            </div>

            <button
              onClick={handleQuote}
              className="mt-6 w-full bg-white text-black font-medium rounded-full py-3 hover:bg-neutral-200 transition-colors"
            >
              Get Quote
            </button>
          </div>

          {quotes.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Previous Quotes ({quotes.length})</h3>
              <div className="space-y-3">
                {[...quotes].reverse().slice(0, 5).map((q: any) => (
                  <div key={q.id} className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 text-sm">
                    <p className="text-white font-medium font-mono">${q.total.toLocaleString()}</p>
                    <p className="text-neutral-400 mt-1">{q.items.map((i: any) => i.label).join(", ")}</p>
                    <p className="text-neutral-600 text-xs mt-1">{new Date(q.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-20 py-12 border-t border-neutral-900 text-center text-neutral-500 text-sm">
        <p>&copy; {new Date().getFullYear()} CyberGuard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CyberGuard;
