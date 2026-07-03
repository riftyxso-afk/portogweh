import { useState, useEffect } from "react";
import { ArrowRight, Play, Palette, Layers, Lightbulb, Code } from "lucide-react";
import { toast } from "sonner";

const navItems = ["Projects", "Expertise", "Studio", "Insights"];

const services = [
  {
    icon: Palette,
    title: "UX Design",
    description: "Research-driven user experiences that delight",
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description: "Pixel-perfect interfaces with meaningful interactions",
  },
  {
    icon: Lightbulb,
    title: "Brand Strategy",
    description: "Bold brand identities that stand out",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Fast, responsive, modern web applications",
  },
];

const budgetOptions = ["< 5jt", "5 - 15jt", "15 - 50jt", "> 50jt"];

const StudioKreatif = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    description: "",
  });
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const stored = localStorage.getItem("studiokreatif_inquiries");
    if (stored) {
      try {
        setInquiries(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("studiokreatif_inquiries") || "[]");
    const newInquiry = { ...formData, id: Date.now(), timestamp: new Date().toISOString() };
    const updated = [...stored, newInquiry];
    localStorage.setItem("studiokreatif_inquiries", JSON.stringify(updated));
    setInquiries(updated);
    setFormData({ name: "", email: "", service: "", budget: "", description: "" });
    toast.success("Inquiry submitted successfully!");
  };

  return (
    <div className="w-full relative">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204103_f607742e-09da-4cf5-bb06-4e67b0a531de.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col h-full">
          <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-5 md:py-6">
            <div className="flex items-center gap-8 md:gap-10">
              <span className="text-white font-semibold text-lg tracking-tight font-sans">
                Studio Kreatif
              </span>
              <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-white/80 hover:text-white text-sm font-light transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="hidden md:block text-white/80 hover:text-white text-sm font-light transition-colors duration-200"
              >
                Reach Out
              </a>
              <a
                href="#"
                className="hidden md:inline-flex items-center bg-white text-black rounded-full px-5 py-2 text-sm font-medium hover:bg-white/90 transition-colors duration-200"
              >
                Let's Talk
              </a>
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden flex flex-col items-end gap-[5px] p-2"
                aria-label="Open menu"
              >
                <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }} />
                <span className="block w-4 h-[2px] bg-white rounded-full transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }} />
                <span className="block w-6 h-[2px] bg-white rounded-full transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }} />
              </button>
            </div>
          </nav>

          <div className="flex-1 flex flex-col items-center justify-start pt-4 sm:pt-6 md:pt-8 lg:pt-10 px-6 text-center">
            <h1 className="font-instrument-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] max-w-5xl">
              UX <span className="italic font-instrument-serif">and</span> APP
              <br />
              DESIGN <span className="italic font-instrument-serif">for</span> BOLD
              <br />
              VENTURES
            </h1>
            <p className="mt-4 md:mt-5 text-white/70 text-sm md:text-base font-light max-w-md leading-relaxed">
              We shape digital products that define brands
              <span className="hidden sm:block" />
              and unlock exponential growth.
            </p>
            <div className="mt-5 md:mt-6 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="#"
                className="group inline-flex items-center gap-2 bg-white text-black rounded-full px-7 py-3 text-sm font-medium hover:bg-white/90 transition-all duration-200"
              >
                See Cases
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-white/40 text-white rounded-full px-7 py-3 text-sm font-medium hover:bg-white/10 hover:border-white/60 transition-all duration-200"
              >
                <Play className="w-4 h-4 fill-current" />
                Watch Reel
              </a>
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white/20 text-xs font-mono tracking-[0.2em] uppercase select-none">
            STUDIO KREATIF
          </div>
        </div>

        <div
          className={`fixed inset-0 z-50 md:hidden transition-opacity duration-700 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
        >
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <div
            className={`relative z-10 flex flex-col h-full transition-opacity duration-700 ${menuOpen ? "opacity-100" : "opacity-0"}`}
            style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="text-white font-semibold text-lg tracking-tight font-sans">
                Studio Kreatif
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <div className="relative w-6 h-6">
                  <span className="absolute top-1/2 left-0 w-6 h-[2px] bg-white rounded-full -translate-y-1/2 rotate-45 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }} />
                  <span className="absolute top-1/2 left-0 w-6 h-[2px] bg-white rounded-full -translate-y-1/2 -rotate-45 transition-all duration-500" style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }} />
                </div>
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6">
              {[...navItems, "Reach Out"].map((item, i) => (
                <a
                  key={item}
                  href="#"
                  className={`text-4xl sm:text-5xl font-instrument-serif text-white border-b border-white/10 py-4 transition-all duration-300 hover:pl-4 ${menuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                  style={{
                    transitionDelay: menuOpen ? `${150 + i * 80}ms` : "0ms",
                    transitionDuration: "700ms",
                    transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)",
                    transform: menuOpen ? "translateY(0)" : "translateY(2rem)",
                    opacity: menuOpen ? 1 : 0,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>

            <div
              className="px-6 pb-8"
              style={{
                transitionDelay: menuOpen ? "550ms" : "0ms",
                transitionDuration: "700ms",
                transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              <a
                href="#"
                className="block w-full bg-white text-black text-center rounded-full py-4 text-sm font-medium"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-black py-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-white text-center mb-4">
            Our Services
          </h2>
          <p className="text-white/60 text-center mb-16 text-sm md:text-base font-light">
            Layanan Kami
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-lg font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Inquiry Form Section */}
      <section className="bg-black py-24 px-6 md:px-12 lg:px-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-white text-center mb-4">
            Start Your Project
          </h2>
          <p className="text-white/60 text-center mb-16 text-sm md:text-base font-light">
            Mulai Proyek Anda
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Service
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                >
                  <option value="" disabled className="bg-black">
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s.title} value={s.title} className="bg-black">
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Budget Range
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                >
                  <option value="" disabled className="bg-black">
                    Select budget range
                  </option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b} className="bg-black">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Project Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black rounded-full py-3 text-sm font-medium hover:bg-white/90 transition-all duration-200"
            >
              Submit Inquiry
            </button>
          </form>

          {inquiries.length > 0 && (
            <div className="mt-16">
              <h3 className="text-xl md:text-2xl font-instrument-serif text-white mb-6">
                Previous Inquiries
              </h3>
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-medium">{inquiry.name}</span>
                      <span className="text-white/40 text-xs">
                        {new Date(inquiry.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm">{inquiry.email}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-white/50 bg-white/10 rounded-full px-3 py-1">
                        {inquiry.service}
                      </span>
                      <span className="text-xs text-white/50 bg-white/10 rounded-full px-3 py-1">
                        {inquiry.budget}
                      </span>
                    </div>
                    {inquiry.description && (
                      <p className="text-white/50 text-sm mt-3 line-clamp-2">
                        {inquiry.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudioKreatif;
