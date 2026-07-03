import { useState, useEffect, useRef } from "react";
import { Menu, X, User } from "lucide-react";
import { toast } from "sonner";

const videos = [
  { url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081127_0992a171-d3c6-4978-8213-0ec5df8b6d63.mp4", label: "Golden Hour" },
  { url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_092026_dd05b805-ea0f-40b2-8c52-332b88502592.mp4", label: "Still Water" },
  { url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_081042_df7202bf-bd80-4b2b-bbc6-1f09ba2870e9.mp4", label: "Deep Woods" },
  { url: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260702_080959_4cac5234-3573-464e-a5b7-76b94b8a7d61.mp4", label: "Quiet Dawn" },
];

const navLinks = ["How It Works", "Features", "Pricing", "Community"];

const therapists = [
  {
    name: "Dr. Sarah Chen",
    title: "Clinical Psychologist, 12+ years experience",
    specialization: "Specializes in anxiety & mindfulness",
    color: "bg-rose-500/80",
  },
  {
    name: "Michael Rivera",
    title: "Meditation Coach, Certified MBSR",
    specialization: "Focuses on breathwork & stress reduction",
    color: "bg-blue-500/80",
  },
  {
    name: "Aisha Patel",
    title: "Wellness Counselor, Holistic Approach",
    specialization: "Integrative therapy & life balance",
    color: "bg-emerald-500/80",
  },
];

const sessionTypes = ["Individual", "Group", "Corporate"];

const SereneMind = () => {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    therapist: "",
    sessionType: "",
    date: "",
    time: "",
    notes: "",
  });
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("serenemind_sessions");
      if (stored) setSessions(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const switchVideo = (index: number) => {
    if (index === activeVideo || isTransitioning) return;
    setIsTransitioning(true);
    setActiveVideo(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry = { ...form, id: Date.now(), createdAt: new Date().toISOString() };
    const updated = [...sessions, entry];
    setSessions(updated);
    localStorage.setItem("serenemind_sessions", JSON.stringify(updated));
    toast.success("Session booked successfully!");
    setForm({ fullName: "", email: "", therapist: "", sessionType: "", date: "", time: "", notes: "" });
  };

  return (
    <div className="relative min-h-screen bg-black">
      <style>{`
        .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%,
            rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .train-bob {
          animation: trainBob 3s ease-in-out infinite;
        }
        @keyframes trainBob {
          0%, 100% { transform: translateY(0) scale(1.03); }
          50% { transform: translateY(-6px) scale(1.03); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Video Background Layer */}
        <div className="absolute inset-0">
          {videos.map((v, i) => (
            <video
              key={i}
              ref={(el) => { videoRefs.current[i] = el; }}
              autoPlay
              loop
              muted
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === activeVideo ? "opacity-100" : "opacity-0"}`}
            >
              <source src={v.url} type="video/mp4" />
            </video>
          ))}
        </div>

        {/* PNG Overlay */}
        <div
          className="absolute inset-0 z-[1] train-bob"
          style={{
            backgroundImage: "url('https://soft-zoom-63098134.figma.site/_assets/v11/0b4a435b2df2747593c43d7a1c9b4578f7d8d90c.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Content Layer */}
        <div className="relative z-[2] flex flex-col h-full text-white">
          {/* Navigation */}
          <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 md:py-5 shrink-0">
            <span className="font-instrument-serif italic text-xl sm:text-2xl text-white">SereneMind</span>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-2 py-1">
              {navLinks.map((link) => (
                <a key={link} href="#" className="text-white/80 hover:text-white text-sm px-3 py-1.5 transition-colors duration-200" style={{ fontFamily: "system-ui, sans-serif" }}>
                  {link}
                </a>
              ))}
              <a
                href="#"
                className="bg-white text-black rounded-full px-5 py-1.5 text-sm font-medium hover:bg-white/90 transition-colors ml-1"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Get Started
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden liquid-glass rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Open menu"
            >
              <div className="relative w-5 h-5">
                <Menu
                  className={`absolute inset-0 w-5 h-5 text-white transition-all duration-300 ${menuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
                />
                <X
                  className={`absolute inset-0 w-5 h-5 text-white transition-all duration-300 ${menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`}
                />
              </div>
            </button>
          </nav>

          {/* Hero Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
            {/* Badge */}
            <div
              className={`liquid-glass rounded-full px-4 py-1.5 mb-4 md:mb-6 transition-colors duration-700`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              <span className={`text-xs sm:text-sm transition-colors duration-700 ${activeVideo === 2 ? "text-[#182C41]" : "text-white/80"}`}>
                Over 10,000 minds already finding their clarity
              </span>
            </div>

            {/* Heading */}
            <h1
              className={`font-instrument-serif text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] max-w-4xl transition-colors duration-700 ${activeVideo === 2 ? "text-[#182C41]" : "text-white"}`}
            >
              Clarity in an Endlessly
              <br />
              Noisy Universe
            </h1>

            {/* Subtext */}
            <p
              className={`mt-4 md:mt-5 max-w-xl leading-relaxed text-sm sm:text-base transition-colors duration-700 ${activeVideo === 2 ? "text-[#182C41]/80" : "text-white/60"}`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Rise above the chaos of pings, infinite scrolling, and relentless demands. Discover how to protect your presence and create with intention.
            </p>

            {/* Email Input */}
            <div
              className={`liquid-glass rounded-full mt-6 md:mt-8 flex items-center justify-between w-full max-w-[320px] sm:max-w-sm px-1 pl-4 transition-colors duration-700`}
            >
              <input
                type="email"
                placeholder="Your Best Email"
                className={`bg-transparent text-sm outline-none flex-1 min-w-0 transition-colors duration-700 ${activeVideo === 2 ? "text-[#182C41] placeholder:text-[#182C41]/50" : "text-white placeholder:text-white/50"}`}
                style={{ fontFamily: "system-ui, sans-serif" }}
              />
              <button
                className="bg-white text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-white/90 transition-colors shrink-0"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                Get Early Access
              </button>
            </div>

            {/* Video Switcher */}
            <div
              className={`flex items-center gap-4 md:gap-6 mt-6 md:mt-8 transition-colors duration-700 ${activeVideo === 2 ? "text-[#182C41]" : "text-white"}`}
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              {videos.map((v, i) => (
                <button
                  key={i}
                  onClick={() => switchVideo(i)}
                  disabled={isTransitioning}
                  className={`text-xs sm:text-sm font-medium transition-all duration-300 pb-1 ${
                    i === activeVideo
                      ? activeVideo === 2
                        ? "text-[#182C41] border-b-2 border-[#182C41]"
                        : "text-white border-b-2 border-white"
                      : activeVideo === 2
                        ? "text-[#182C41]/50 hover:text-[#182C41]/80 border-b-2 border-transparent"
                        : "text-white/50 hover:text-white/80 border-b-2 border-transparent"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="shrink-0 pb-4 md:pb-5 px-4 sm:px-6 md:px-10">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-white/70 text-xs sm:text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>
              <span>60+ Deep Sessions</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span>12,000+ Creators</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span>4.8 User Satisfaction</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span>Intentional-First Design</span>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setMenuOpen(false)}
                className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <nav className="flex flex-col items-center gap-2 w-full max-w-xs">
              {navLinks.map((link, i) => (
                <a
                  key={link}
                  href="#"
                  className={`text-white text-3xl font-instrument-serif py-2 transition-all duration-500 ${
                    menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: menuOpen ? `${100 + i * 50}ms` : "0ms",
                    transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {link}
                </a>
              ))}
            </nav>
            <a
              href="#"
              className={`bg-white text-black rounded-full px-8 py-3 text-sm font-medium mt-8 transition-all duration-500 ${
                menuOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
              style={{
                transitionDelay: menuOpen ? "300ms" : "0ms",
                transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Therapists Section */}
      <section className="relative px-4 sm:px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-instrument-serif text-3xl sm:text-4xl md:text-5xl text-white text-center mb-12 md:mb-16">
            Meet Our Therapists
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {therapists.map((t, i) => (
              <div
                key={i}
                className="liquid-glass rounded-2xl p-6 md:p-8 flex flex-col items-center text-center"
              >
                <div className={`w-20 h-20 rounded-full ${t.color} flex items-center justify-center mb-5`}>
                  <User className="w-9 h-9 text-white" />
                </div>
                <h3 className="font-instrument-serif text-xl md:text-2xl text-white mb-1">{t.name}</h3>
                <p className="text-white/70 text-sm mb-2" style={{ fontFamily: "system-ui, sans-serif" }}>{t.title}</p>
                <p className="text-white/50 text-xs mb-6" style={{ fontFamily: "system-ui, sans-serif" }}>{t.specialization}</p>
                <button
                  className="bg-white text-black rounded-full px-6 py-2 text-sm font-medium hover:bg-white/90 transition-colors"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  Book Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="relative px-4 sm:px-6 md:px-10 pb-20 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-instrument-serif text-3xl sm:text-4xl md:text-5xl text-white text-center mb-12 md:mb-16">
            Book a Session
          </h2>

          <form onSubmit={handleSubmit} className="liquid-glass rounded-2xl p-6 md:p-10 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/80 text-sm mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateForm("fullName", e.target.value)}
                  required
                  className="w-full bg-white/5 text-white rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 focus:border-white/30 transition-colors"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  required
                  className="w-full bg-white/5 text-white rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 focus:border-white/30 transition-colors"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Select Therapist</label>
                <select
                  value={form.therapist}
                  onChange={(e) => updateForm("therapist", e.target.value)}
                  required
                  className="w-full bg-white/5 text-white rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 focus:border-white/30 transition-colors"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  <option value="" disabled className="bg-black">Choose a therapist</option>
                  {therapists.map((t, i) => (
                    <option key={i} value={t.name} className="bg-black">{t.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Session Type</label>
                <select
                  value={form.sessionType}
                  onChange={(e) => updateForm("sessionType", e.target.value)}
                  required
                  className="w-full bg-white/5 text-white rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 focus:border-white/30 transition-colors"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                >
                  <option value="" disabled className="bg-black">Select type</option>
                  {sessionTypes.map((t) => (
                    <option key={t} value={t} className="bg-black">{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Preferred Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => updateForm("date", e.target.value)}
                  required
                  className="w-full bg-white/5 text-white rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 focus:border-white/30 transition-colors [color-scheme:dark]"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                />
              </div>
              <div>
                <label className="block text-white/80 text-sm mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Preferred Time</label>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => updateForm("time", e.target.value)}
                  required
                  className="w-full bg-white/5 text-white rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 focus:border-white/30 transition-colors [color-scheme:dark]"
                  style={{ fontFamily: "system-ui, sans-serif" }}
                />
              </div>
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-1.5" style={{ fontFamily: "system-ui, sans-serif" }}>Additional Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => updateForm("notes", e.target.value)}
                rows={3}
                className="w-full bg-white/5 text-white rounded-xl px-4 py-2.5 text-sm outline-none border border-white/10 focus:border-white/30 transition-colors resize-none"
                style={{ fontFamily: "system-ui, sans-serif" }}
                placeholder="Any specific concerns or preferences..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-white text-black rounded-full py-3 text-sm font-medium hover:bg-white/90 transition-colors"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Confirm Booking
            </button>
          </form>

          {/* Upcoming Sessions */}
          {sessions.length > 0 && (
            <div className="mt-10">
              <h3 className="font-instrument-serif text-xl md:text-2xl text-white mb-6">Your Upcoming Sessions</h3>
              <div className="space-y-4">
                {sessions.toReversed().map((s: any) => (
                  <div key={s.id} className="liquid-glass rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <p className="text-white font-medium text-sm" style={{ fontFamily: "system-ui, sans-serif" }}>{s.fullName}</p>
                      <p className="text-white/60 text-xs" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {s.therapist} &middot; {s.sessionType}
                      </p>
                      <p className="text-white/40 text-xs" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {s.date} at {s.time}
                      </p>
                    </div>
                    {s.notes && (
                      <p className="text-white/50 text-xs sm:text-right max-w-[200px]" style={{ fontFamily: "system-ui, sans-serif" }}>
                        {s.notes}
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

export default SereneMind;
