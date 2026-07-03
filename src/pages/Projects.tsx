import { useEffect, useState } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Header } from "@/components/Header";

const translations = {
  id: {
    home: "Beranda",
    education: "Pendidikan",
    projects: "Proyek",
    portfolio: "Portofolio",
    gallery: "Galeri",
    notes: "Catatan",
    more: "Lainnya",
    projectsTitle: "Proyek",
    present: "Sekarang",
    freelanceTitle: "Freelance Web Developer",
    freelanceDesc: "Merancang dan mengembangkan aplikasi web responsif dan landing page dengan desain mobile-first. Mengintegrasikan REST API serta mengembangkan fungsionalitas backend dasar.",
    monitoringTitle: "Monitoring Tanah Otomatis",
    monitoringDesc: "Mengembangkan perangkat monitoring kelembaban tanah otomatis. Bertanggung jawab atas desain sistem, integrasi sensor, dan pengujian. Meraih Juara 2 Tingkat Kabupaten.",
    microAgentDesc: "Asisten AI cerdas yang dirancang menyerupai pengalaman ChatGPT, Claude, dan Perplexity. Menghadirkan interaksi percakapan natural dan pencarian informasi tingkat lanjut.",
    noirDevDesc: "Layanan pengembangan aplikasi dan web profesional. Dirancang dengan estetika minimalis dan performa tinggi untuk berbagai kebutuhan bisnis.",
    ravoraDesc: "Sistem aplikasi web modern yang cepat dan interaktif. Menyediakan solusi cerdas untuk manajemen konten dan pengalaman pengguna tingkat lanjut.",
  },
  en: {
    home: "Home",
    education: "Education",
    projects: "Projects",
    portfolio: "Portfolio",
    gallery: "Gallery",
    notes: "Notes",
    more: "More",
    projectsTitle: "Projects",
    present: "Present",
    freelanceTitle: "Freelance Web Developer",
    freelanceDesc: "Designing and developing responsive web applications and landing pages with mobile-first design. Integrating REST APIs and developing basic backend functionality.",
    monitoringTitle: "Automated Soil Monitoring",
    monitoringDesc: "Developed an automated soil moisture monitoring device. Responsible for system design, sensor integration, and testing. Won 2nd Place at the Regency Level.",
    microAgentDesc: "Intelligent AI assistant designed to resemble experiences like ChatGPT, Claude, and Perplexity. Delivers natural conversational interactions and advanced information retrieval.",
    noirDevDesc: "Professional application and web development services. Designed with minimalist aesthetics and high performance for various business needs.",
    ravoraDesc: "Fast and interactive modern web application system. Provides smart solutions for content management and advanced user experiences.",
  }
};

const Projects = () => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language") as "id" | "en";
    if (savedLang) setLanguage(savedLang);
  }, []);

  const t = translations[language];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const projects = [
    {
      title: t.freelanceTitle,
      period: "Jan 2023 – " + t.present,
      desc: t.freelanceDesc,
      tags: ["React", "Next.js", "Node.js"],
      gradient: "from-violet-500/10 to-transparent",
      link: "#",
    },
    {
      title: t.monitoringTitle,
      period: "November 2025",
      desc: t.monitoringDesc,
      tags: ["IoT", "Hardware/Sensor"],
      gradient: "from-emerald-500/10 to-transparent",
    },
    {
      title: "Micro Agent",
      period: "Web Application",
      desc: t.microAgentDesc,
      tags: ["Best Project", "Solo Dev", "Web", "Full-Stack"],
      gradient: "from-blue-500/10 to-transparent",
      github: "https://github.com/radzfoundation-gif/NEVRA_BETA.git",
      demo: "https://frontend-omega-sand-52.vercel.app/",
      badge: true,
    },
    {
      title: "Noir Dev",
      period: "Web Development",
      desc: t.noirDevDesc,
      tags: ["Development", "Agency"],
      gradient: "from-zinc-500/10 to-transparent",
      github: "https://github.com/radzfoundation-gif/noir.dev.git",
      demo: "https://www.noir-code.biz.id/",
    },
  ];

  const featuredProject = {
    title: "Ravora",
    period: "Web Platform",
    desc: t.ravoraDesc,
    tags: ["Platform", "Vercel"],
    gradient: "from-indigo-500/10 to-transparent",
    demo: "https://ravora.vercel.app/",
  };

  return (
    <PageTransition>
      <div className="min-h-screen w-full relative py-8 md:py-12 px-4 md:px-8 bg-[#F8F9FA] dark:bg-[#0A0A0B] transition-colors duration-300 overflow-hidden">
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

          <div className="mx-8 md:mx-14 h-px bg-[#E5E7EB] dark:bg-[#27272A]"></div>

          <div className="px-8 md:px-14 py-10 md:py-14">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-lg bg-[#F3F4F6] dark:bg-[#1F1F23] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#6B7280] dark:text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-[#111111] dark:text-[#F4F4F5] tracking-tight">{t.projectsTitle}</h1>
                <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF]">Things I've built</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, i) => (
                <div key={i} className="group rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F8F9FA] dark:bg-[#18181B] hover:border-[#D1D5DB] dark:hover:border-[#3F3F46] transition-all overflow-hidden">
                  <div className={`h-36 bg-gradient-to-br ${project.gradient} relative flex items-center justify-center`}>
                    <div className="w-10 h-10 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <svg className="w-5 h-5 text-[#6B7280] dark:text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 12h12M6 18h12" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">{project.period}</span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {"github" in project && project.github && (
                          <a href={project.github} target="_blank" rel="noreferrer" className="text-[#9CA3AF] hover:text-[#111] dark:hover:text-white transition-colors">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {"demo" in project && project.demo && (
                          <a href={project.demo} target="_blank" rel="noreferrer" className="text-[#9CA3AF] hover:text-[#111] dark:hover:text-white transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <h3 className="text-base font-semibold text-[#111111] dark:text-[#F4F4F5] mb-2">{project.title}</h3>
                    <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4 line-clamp-2">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, j) => (
                        <span key={j} className={`text-[10px] px-2 py-0.5 rounded-md ${
                          tag === "Best Project" 
                            ? "bg-[#2563EB]/10 text-[#2563EB] font-semibold" 
                            : "bg-white dark:bg-[#111113] border border-[#E5E7EB] dark:border-[#27272A] text-[#6B7280] dark:text-[#9CA3AF]"
                        }`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Featured - Ravora (spans 2 columns) */}
              <div className="md:col-span-2 group rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F8F9FA] dark:bg-[#18181B] hover:border-[#D1D5DB] dark:hover:border-[#3F3F46] transition-all overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-40 md:h-auto bg-gradient-to-br from-indigo-500/10 to-transparent flex items-center justify-center">
                    <div className="w-12 h-12 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      <svg className="w-6 h-6 text-[#6B7280] dark:text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 12h12M6 18h12" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-[11px] text-[#6B7280] dark:text-[#9CA3AF]">{featuredProject.period}</span>
                      <a href={featuredProject.demo} target="_blank" rel="noreferrer" className="text-[#9CA3AF] hover:text-[#111] dark:hover:text-white transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <h3 className="text-lg font-semibold text-[#111111] dark:text-[#F4F4F5] mb-2">{featuredProject.title}</h3>
                    <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed mb-4 flex-1">{featuredProject.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {featuredProject.tags.map((tag, j) => (
                        <span key={j} className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-[#111113] border border-[#E5E7EB] dark:border-[#27272A] text-[#6B7280] dark:text-[#9CA3AF]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;
