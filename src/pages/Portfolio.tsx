import { useEffect, useState } from "react";
import { ExternalLink, Globe, Monitor, Bot, Sparkles, Building2, GraduationCap, Rocket, Cpu } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Header } from "@/components/Header";
import { motion } from "framer-motion";

const translations = {
  id: {
    home: "Beranda",
    education: "Pendidikan",
    projects: "Proyek",
    portfolio: "Portofolio",
    gallery: "Galeri",
    notes: "Catatan",
    more: "Lainnya",
    portfolioTitle: "Portofolio",
    portfolioSub: "Kumpulan proyek dan contoh web yang saya tawarkan",
    viewProject: "Lihat Proyek",
    all: "Semua",
    aiApp: "AI Application",
    company: "Company Profile",
    landing: "Landing Page",
    platform: "Web Platform",
  },
  en: {
    home: "Home",
    education: "Education",
    projects: "Projects",
    portfolio: "Portfolio",
    gallery: "Gallery",
    notes: "Notes",
    more: "More",
    portfolioTitle: "Portfolio",
    portfolioSub: "Collection of projects and web examples I offer",
    viewProject: "View Project",
    all: "All",
    aiApp: "AI Application",
    company: "Company Profile",
    landing: "Landing Page",
    platform: "Web Platform",
  }
};

const categoryConfig: Record<string, { icon: any; label: string }> = {
  aiApp: { icon: Bot, label: "AI Application" },
  company: { icon: Building2, label: "Company Profile" },
  landing: { icon: Rocket, label: "Landing Page" },
  platform: { icon: Monitor, label: "Web Platform" },
};

const portfolioItems = [
  {
    title: "Micro Agent",
    category: "aiApp",
    desc: "AI Super Workspace — asisten cerdas untuk produktivitas maksimal.",
    image: "/previews/micro-agent.png",
    link: "https://frontend-omega-sand-52.vercel.app/",
    icon: Bot,
  },
  {
    title: "Karier In",
    category: "aiApp",
    desc: "Platform AI yang membimbing Anda meraih karier impian.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600&h=400",
    link: "https://themicroagentcompany.biz.id",
    icon: Sparkles,
  },
  {
    title: "The Micro Agent Company",
    category: "company",
    desc: "Company profile & brand landing page untuk Micro Agent.",
    image: "/previews/micro-agent-company.png",
    link: "https://themicroagentcompany.biz.id",
    icon: Globe,
  },
  {
    title: "Monitoring Tanah",
    category: "platform",
    desc: "Sistem monitoring kelembaban tanah otomatis berbasis IoT.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600&h=400",
    link: null,
    icon: Cpu,
  },
  {
    title: "StudioKreatif",
    category: "landing",
    desc: "Creative agency landing page dengan project inquiry form, services grid, dan localStorage submissions.",
    image: "/previews/studio-kreatif.png",
    link: "/studio-kreatif",
    icon: Rocket,
  },
  {
    title: "PetCareHub",
    category: "landing",
    desc: "Pet services landing page dengan appointment booking form, services cards, dan booking history.",
    image: "/previews/petcare-hub.png",
    link: "/petcare-hub",
    icon: Rocket,
  },
  {
    title: "SereneMind",
    category: "landing",
    desc: "Wellness app landing page dengan therapist cards, session booking form, dan video slides hero.",
    image: "/previews/serene-mind.png",
    link: "/serene-mind",
    icon: Rocket,
  },
  {
    title: "VitaNatura",
    category: "landing",
    desc: "Supplement e-commerce landing page dengan product catalog, cart sidebar, dan checkout form.",
    image: "/previews/vita-natura.png",
    link: "/vita-natura",
    icon: Rocket,
  },
  {
    title: "DesignLab",
    category: "landing",
    desc: "Design agency landing page dengan shader hero, case study videos, dan contact inquiry form.",
    image: "/previews/design-lab.png",
    link: "/design-lab",
    icon: Rocket,
  },
  {
    title: "CyberGuard",
    category: "landing",
    desc: "Cybersecurity landing page dengan assessment form, pricing calculator, dan services grid.",
    image: "/previews/cyber-guard.png",
    link: "/cyber-guard",
    icon: Rocket,
  },
  {
    title: "prmpt",
    category: "landing",
    desc: "Scroll-driven fashion archive landing page dengan GSAP video scrub, RAF gallery cards, dan mix-blend-mode overlay UI.",
    image: "/previews/prmpt.png",
    link: "/prmpt",
    icon: Rocket,
  },
  {
    title: "NusaStay",
    category: "platform",
    desc: "Platform booking villa & akomodasi di Bali. Traveloka-inspired design, 14 routes, admin dashboard dengan recharts, PWA-ready. Next.js + shadcn/ui + Zustand.",
    image: "/previews/nusastay.png",
    link: "https://nusa-stay.vercel.app",
    icon: Building2,
  },
  {
    title: "EduSchool",
    category: "company",
    desc: "Website sekolah modern di Bali dengan design system Universitas Terbuka. 14 halaman, bilingual ID/EN, animasi Framer Motion, sticky navbar, counters interaktif. Next.js + Tailwind CSS v4.",
    image: "/previews/eduschool.png",
    link: "https://eduschool-liart.vercel.app",
    icon: GraduationCap,
  },
];

const categories = ["all", "aiApp", "company", "landing", "platform"] as const;

const Portfolio = () => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language") as "id" | "en";
    if (savedLang) setLanguage(savedLang);
  }, []);

  const t = translations[language];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const filtered = activeFilter === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <PageTransition>
      <div className="min-h-screen w-full relative py-8 md:py-12 px-4 md:px-8 bg-[#F8F9FA] dark:bg-[#0A0A0B] transition-colors duration-300 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 opacity-[0.15] dark:opacity-[0.2] pointer-events-none"
          style={{
            backgroundImage: `url('/bg.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="mx-auto max-w-[1000px] bg-white dark:bg-[#111113] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] relative overflow-hidden rounded-2xl z-10 border border-[#E8E8EC] dark:border-[#1F1F23]">

          <Header t={t} isDark={isDark} setIsDark={setIsDark} />

          <div className="px-8 md:px-14 py-10 md:py-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <h1 className="text-lg font-semibold text-[#111111] dark:text-[#F4F4F5] tracking-tight mb-1">{t.portfolioTitle}</h1>
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">{t.portfolioSub}</p>
            </motion.div>

            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => {
                const CatIcon = cat === "all" ? null : categoryConfig[cat]?.icon;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      activeFilter === cat
                        ? "bg-[#111111] dark:bg-white text-white dark:text-[#111111] border-[#111111] dark:border-white font-medium"
                        : "bg-white dark:bg-[#111113] text-[#6B7280] dark:text-[#9CA3AF] border-[#E5E7EB] dark:border-[#27272A] hover:border-[#D1D5DB] dark:hover:border-[#3F3F46]"
                    }`}
                  >
                    {cat === "all" ? null : <CatIcon className="w-3.5 h-3.5" />}
                    {cat === "all" ? t.all : (t as any)[cat]}
                  </button>
                );
              })}
            </div>

            {/* Disclaimer */}
            <div className="mb-8 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                <span lang="id">Ini hanyalah demo untuk menunjukkan kemampuan teknis. Saya dapat membangun landing page yang lebih kompleks, fungsional, dan sesuai kebutuhan spesifik Anda.</span>
                <br />
                <span lang="en" className="text-amber-700 dark:text-amber-400">This is only a demo showcasing technical capability. I can build more complex, functional landing pages tailored to your specific needs.</span>
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filtered.map((item, i) => {
                const CatIcon = categoryConfig[item.category]?.icon;
                return (
                  <motion.div
                    key={item.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F8F9FA] dark:bg-[#18181B] hover:border-[#D1D5DB] dark:hover:border-[#3F3F46] hover:shadow-md transition-all overflow-hidden relative"
                  >
                    <div className="aspect-[3/2] overflow-hidden bg-[#F3F4F6] dark:bg-[#1F1F23] relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md bg-white/90 dark:bg-black/60 text-[#6B7280] dark:text-[#9CA3AF] font-medium backdrop-blur-sm">
                          <CatIcon className="w-3 h-3" />
                          {(t as any)[item.category]}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-[#F3F4F6] dark:bg-[#1F1F23] flex items-center justify-center shrink-0">
                            <item.icon className="w-3.5 h-3.5 text-[#6B7280] dark:text-[#9CA3AF]" />
                          </div>
                          <h3 className="text-sm font-semibold text-[#111111] dark:text-[#F4F4F5] truncate">{item.title}</h3>
                        </div>
                        {item.link && item.link.startsWith("http") ? (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#9CA3AF] hover:text-[#111] dark:hover:text-white transition-colors shrink-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : item.link ? (
                          <Link
                            to={item.link}
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#9CA3AF] hover:text-[#111] dark:hover:text-white transition-colors shrink-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        ) : null}
                      </div>
                      <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed line-clamp-2">{item.desc}</p>
                    </div>
                    {item.link && item.link.startsWith("http") ? (
                      <a href={item.link} target="_blank" rel="noreferrer" className="absolute inset-0" />
                    ) : item.link ? (
                      <Link to={item.link} className="absolute inset-0" />
                    ) : null}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Portfolio;
