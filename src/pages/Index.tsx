import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Sun, Moon, BadgeCheck, Eye, Download, Briefcase, ExternalLink, Github, Play, Pause, Code2, Award, ArrowUpRight, Bot } from "lucide-react";
import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiSupabase, SiVite, SiLinux, SiJavascript, SiHtml5, SiCss3, SiOpenai, SiClaude, SiGithubcopilot, SiGooglegemini, SiWindsurf, SiPerplexity, SiLaravel, SiFastapi } from "react-icons/si";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CVModal } from "@/components/CVModal";
import PageTransition from "@/components/PageTransition";
import { Header } from "@/components/Header";
import { TourGuide } from "@/components/TourGuide";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const translations = {
  id: {
    home: "Beranda",
    education: "Pendidikan",
    projects: "Proyek",
    portfolio: "Portofolio",
    gallery: "Galeri",
    notes: "Catatan",
    more: "Lainnya",
    downloadCV: "Unduh CV",
    viewCV: "Lihat CV",
    about: "Tentang",
    techStack: "Tech Stack",
    certificates: "Sertifikat",
    featuredProject: "Proyek Unggulan",
    aiTools: "AI Tools",
    aiProjects: "Proyek AI",
    connect: "Ayo Terhubung",
    name: "Nama",
    email: "Email",
    message: "Pesan",
    sendMessage: "Kirim Pesan",
    nowPlaying: "Sedang Diputar",
    paused: "Jeda",
    openToWork: "Open to Work",
    aboutList: [
      "Junior Full-Stack Developer dengan pengalaman langsung dalam membangun aplikasi web responsif menggunakan framework JavaScript modern.",
      "Memiliki fondasi kuat dalam pengembangan frontend dengan React serta pengalaman mengintegrasikan REST API dan layanan backend dasar. Terbiasa bekerja dengan Git, lingkungan Linux, dan alur kerja tim secara kolaboratif.",
      "Sangat termotivasi, cepat belajar, dan antusias untuk berkembang sambil berkontribusi pada aplikasi yang bersih, mudah dipelihara, dan berfokus pada pengguna."
    ],
    projectDescription: "Asisten AI cerdas yang dirancang menyerupai pengalaman ChatGPT, Claude, dan Perplexity. Menghadirkan interaksi percakapan natural dan pencarian informasi tingkat lanjut.",
    videoDemo: "Demo Video",
    introducingVideo: "Video Perkenalan",
    microAgentDemo: "Demo Micro Agent",
    watchVideo: "Tonton Video",
    microAgentTech: "Next.js, React.js, Tailwind CSS, TypeScript, Node.js, Firebase, LLM API (OpenAI/Anthropic)",
    microCompanyDesc: "Perusahaan teknologi yang mengembangkan solusi AI inovatif untuk membantu individu dan bisnis mencapai potensi maksimal mereka.",
    karierInDesc: "Platform AI yang membimbing Anda mendapatkan karier impian dengan strategi cerdas dan panduan personal.",
    placeholderName: "Nama Anda",
    placeholderEmail: "email@anda.com",
    placeholderMessage: "Bagaimana saya bisa membantu Anda?",
  },
  en: {
    home: "Home",
    education: "Education",
    projects: "Projects",
    portfolio: "Portfolio",
    gallery: "Gallery",
    notes: "Notes",
    more: "More",
    downloadCV: "Download CV",
    viewCV: "View CV",
    about: "About",
    techStack: "Tech Stack",
    certificates: "Certificates",
    featuredProject: "Featured Project",
    aiTools: "AI Tools",
    aiProjects: "AI Projects",
    connect: "Let's Connect",
    name: "Name",
    email: "Email",
    message: "Message",
    sendMessage: "Send Message",
    nowPlaying: "Now Playing",
    paused: "Paused",
    openToWork: "Open to Work",
    aboutList: [
      "Junior Full-Stack Developer with hands-on experience in building responsive web applications using modern JavaScript frameworks.",
      "Solid foundation in frontend development with React and experience integrating REST APIs and basic backend services. Familiar with Git, Linux environments, and collaborative team workflows.",
      "Highly motivated, fast learner, and enthusiastic about growing while contributing to clean, maintainable, and user-focused applications."
    ],
    projectDescription: "Intelligent AI assistant designed to resemble experiences like ChatGPT, Claude, and Perplexity. Delivers natural conversational interactions and advanced information retrieval.",
    videoDemo: "Video Demo",
    introducingVideo: "Introducing Video",
    microAgentDemo: "Micro Agent Demo",
    watchVideo: "Watch Video",
    microAgentTech: "Next.js, React.js, Tailwind CSS, TypeScript, Node.js, Firebase, LLM API (OpenAI/Anthropic)",
    microCompanyDesc: "A technology company developing innovative AI solutions to help individuals and businesses reach their maximum potential.",
    karierInDesc: "An AI platform that guides you to your dream career with smart strategies and personalized guidance.",
    placeholderName: "Your Name",
    placeholderEmail: "your@email.com",
    placeholderMessage: "How can I help you?",
  }
};

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvLang, setCvLang] = useState<"id" | "en" | null>(null);
  const [welcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<"introducing" | "micro-agent" | null>(null);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const t = translations[language];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "6285155031983";
    const text = encodeURIComponent(
      `Halo, saya ${contactName || "(tanpa nama)"} (${contactEmail || "(tanpa email)"}).\n\n${contactMessage || "(tanpa pesan)"}`
    );
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  // Audio Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language") as "id" | "en";
    if (!savedLang) {
      setWelcomeModalOpen(true);
    } else {
      setLanguage(savedLang);
      const isTourCompleted = localStorage.getItem("tour-completed");
      if (!isTourCompleted) {
        localStorage.setItem("tour-completed", "true");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("start-tour"));
        }, 1000);
      }
    }
  }, []);

  const selectLanguage = (lang: "id" | "en") => {
    localStorage.setItem("preferred-language", lang);
    setLanguage(lang);
    setWelcomeModalOpen(false);
    
    const isTourCompleted = localStorage.getItem("tour-completed");
    if (!isTourCompleted) {
      localStorage.setItem("tour-completed", "true");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("start-tour"));
      }, 500);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openCV = (lang: "id" | "en") => {
    setCvLang(lang);
    setCvModalOpen(true);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

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
      {/* Main Container */}
      <div className="mx-auto max-w-[1000px] bg-white dark:bg-[#111113] shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)] relative overflow-hidden rounded-2xl z-10 border border-[#E8E8EC] dark:border-[#1F1F23]">
        
        <TourGuide language={language} />

        {/* Header */}
        <Header t={t} isDark={isDark} setIsDark={setIsDark} />

        {/* Profile Section */}
        <div className="px-8 md:px-14 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10 text-center md:text-left">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] p-[2px] shrink-0">
              <div className="w-full h-full rounded-[calc(1rem-2px)] overflow-hidden bg-white dark:bg-[#111113]">
                <video 
                  src="/avatar.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <span className="inline-flex items-center gap-1.5 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t.openToWork}
                </span>
              </div>
              <h1 className="text-[28px] md:text-[36px] font-semibold tracking-tight text-[#111111] dark:text-[#F4F4F5] leading-tight mb-1">
                I Wayan Radea
              </h1>
              <p className="text-[15px] text-[#6B7280] dark:text-[#9CA3AF] mb-5">Junior Full-Stack Developer</p>
              <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <a 
                  href="/I_Wayan_Radea_CV_ID.docx" 
                  download="I_Wayan_Radea_CV_ID.docx"
                  className="inline-flex items-center gap-2 bg-[#111111] dark:bg-white text-white dark:text-[#111111] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#2a2a2a] dark:hover:bg-[#E4E4E7] transition-all shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  {t.downloadCV}
                </a>
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex items-center gap-2 bg-[#F3F4F6] dark:bg-[#1F1F23] text-[#111111] dark:text-[#F4F4F5] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#E5E7EB] dark:hover:bg-[#2a2a2e] transition-all shadow-sm outline-none border border-[#E5E7EB] dark:border-[#2a2a2e]">
                    <Eye className="w-4 h-4" />
                    {t.viewCV}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => openCV("id")}>
                      Bahasa Indonesia
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => openCV("en")}>
                      English
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-8 md:mx-14 h-px bg-[#E5E7EB] dark:bg-[#27272A]"></div>

        {/* About Section */}
        <div className="px-8 md:px-14 py-10 md:py-14 space-y-14">
          <div>
            <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mb-5">{t.about}</h2>
            <div className="space-y-4 text-sm leading-relaxed text-[#4B5563] dark:text-[#A1A1AA] max-w-[65ch]">
              {t.aboutList.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mb-5">{t.techStack}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { icon: FaReact, name: "React", color: "text-[#61DAFB]" },
                { icon: SiTypescript, name: "TypeScript", color: "text-[#3178C6]" },
                { icon: SiTailwindcss, name: "Tailwind CSS", color: "text-[#06B6D4]" },
                { icon: SiNextdotjs, name: "Next.js", color: "dark:text-white text-[#111]" },
                { icon: FaNodeJs, name: "Node.js", color: "text-[#339933]" },
                { icon: SiSupabase, name: "Supabase", color: "text-[#3ECF8E]" },
                { icon: FaGitAlt, name: "Git", color: "text-[#F05032]" },
                { icon: SiLinux, name: "Linux", color: "dark:text-white text-[#111]" },
                { icon: FaFigma, name: "Figma", color: "text-[#F24E1E]" },
                { icon: SiVite, name: "Vite", color: "text-[#646CFF]" },
                { icon: SiLaravel, name: "Laravel", color: "text-[#FF2D20]" },
                { icon: SiFastapi, name: "FastAPI", color: "text-[#009688]" },
              ].map((tech, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E5E7EB] dark:border-[#27272A] hover:border-[#D1D5DB] dark:hover:border-[#3F3F46] hover:shadow-sm transition-all gap-3 group cursor-default">
                  <tech.icon className={`w-7 h-7 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                  <span className="text-[11px] font-medium text-[#6B7280] dark:text-[#9CA3AF]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mb-5">{t.aiTools}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {[
                { icon: SiClaude, name: "Claude Code", color: "text-[#D97757]" },
                { icon: SiOpenai, name: "OpenAI Codex", color: "text-[#10A37F]" },
                { icon: SiGithubcopilot, name: "GitHub Copilot", color: "text-[#8957E5]" },
                { icon: SiGooglegemini, name: "Gemini", color: "text-[#4285F4]" },
                { icon: SiWindsurf, name: "Windsurf", color: "text-[#0ABAB5]" },
                { icon: SiPerplexity, name: "Perplexity", color: "text-[#21A37F]" },
                { icon: Bot, name: "Cursor", color: "text-[#6B7280] dark:text-[#9CA3AF]" },
              ].map((tech, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 rounded-xl bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E5E7EB] dark:border-[#27272A] hover:border-[#D1D5DB] dark:hover:border-[#3F3F46] hover:shadow-sm transition-all gap-3 group cursor-default">
                  <tech.icon className={`w-7 h-7 ${tech.color} group-hover:scale-110 transition-transform duration-300`} />
                  <span className="text-[11px] font-medium text-[#6B7280] dark:text-[#9CA3AF]">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Projects */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mb-5">{t.aiProjects}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Micro Agent",
                  desc: t.projectDescription,
                  tags: ["Web", "Full-Stack", "LLM"],
                  gradient: "from-[#2563EB] to-[#7C3AED]",
                  link: "/projects",
                  external: false,
                  preview: "/previews/micro-agent.png",
                },
                {
                  title: "The Micro Agent Company",
                  desc: t.microCompanyDesc,
                  tags: ["Company", "Brand"],
                  gradient: "from-[#0ABAB5] to-[#06B6D4]",
                  link: "https://themicroagentcompany.biz.id",
                  external: true,
                  preview: null,
                },
                {
                  title: "Karier In",
                  desc: t.karierInDesc,
                  tags: ["AI", "Career", "Guidance"],
                  gradient: "from-[#EC4899] to-[#F43F5E]",
                  link: "https://themicroagentcompany.biz.id",
                  external: true,
                  preview: null,
                },
              ].map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F8F9FA] dark:bg-[#18181B] hover:border-[#D1D5DB] dark:hover:border-[#3F3F46] hover:shadow-md transition-all overflow-hidden relative"
                >
                  <div className="h-32 overflow-hidden relative">
                    {project.preview ? (
                      <>
                        <img
                          src={project.preview}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] dark:from-[#18181B] via-transparent to-transparent" />
                      </>
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h12M6 12h12M6 18h12" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-[#111111] dark:text-[#F4F4F5] mb-1">{project.title}</h4>
                    <p className="text-xs text-[#6B7280] dark:text-[#9CA3AF] leading-relaxed line-clamp-2 mb-3">{project.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-[#111113] border border-[#E5E7EB] dark:border-[#27272A] text-[#6B7280] dark:text-[#9CA3AF]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.external ? (
                    <a href={project.link} target="_blank" rel="noreferrer" className="absolute inset-0" />
                  ) : (
                    <Link to={project.link} className="absolute inset-0" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mb-5">{t.certificates}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { src: "/certificates/sertifikat1.jpg", title: "Acer Smart School Academy: Diskusi Tips Sukses Mendapatkan Beasiswa" },
                { src: "/certificates/sertifikat2.png", title: "IOE-Microsoft AI Fluency Training" },
              ].map((cert, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E5E7EB] dark:border-[#27272A]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={cert.src} 
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5">
                    <p className="text-xs font-medium text-[#111111] dark:text-[#F4F4F5] line-clamp-2 leading-relaxed">{cert.title}</p>
                  </div>
                  <a href={cert.src} target="_blank" rel="noreferrer" className="absolute inset-0" aria-label="View certificate" />
                </div>
              ))}
            </div>
          </div>

          {/* Featured Project */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mb-5">{t.featuredProject}</h3>
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] overflow-hidden bg-[#F8F9FA] dark:bg-[#18181B]">
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[11px] font-medium text-[#6B7280] dark:text-[#9CA3AF]">Web Application</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#2563EB]/10 text-[#2563EB] font-semibold">Best Project</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#F3F4F6] dark:bg-[#27272A] text-[#6B7280] dark:text-[#9CA3AF]">Solo Dev</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-[#111111] dark:text-[#F4F4F5]">Micro Agent</h3>
                  </div>
                  <div className="flex items-center gap-2.5 shrink-0">
                    <a href="https://github.com/radzfoundation-gif/NEVRA_BETA.git" target="_blank" rel="noreferrer" className="text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111] dark:hover:text-white transition-colors">
                      <Github className="w-[18px] h-[18px]" />
                    </a>
                    <a href="https://frontend-omega-sand-52.vercel.app/" target="_blank" rel="noreferrer" className="text-[#6B7280] dark:text-[#9CA3AF] hover:text-[#111] dark:hover:text-white transition-colors">
                      <ExternalLink className="w-[18px] h-[18px]" />
                    </a>
                  </div>
                </div>
                <p className="text-sm text-[#4B5563] dark:text-[#A1A1AA] leading-relaxed mb-5">{t.projectDescription}</p>
                
                <div className="mb-5">
                  <p className="text-[11px] font-medium text-[#6B7280] dark:text-[#9CA3AF] mb-3 uppercase tracking-wider">{t.videoDemo}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => { setSelectedVideo("introducing"); setVideoModalOpen(true); }}
                      className="relative group rounded-xl overflow-hidden bg-black aspect-video"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-white ml-1" fill="white" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs text-white font-medium">{t.introducingVideo}</p>
                      </div>
                    </button>
                    <button
                      onClick={() => { setSelectedVideo("micro-agent"); setVideoModalOpen(true); }}
                      className="relative group rounded-xl overflow-hidden bg-black aspect-video"
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-white ml-1" fill="white" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-xs text-white font-medium">{t.microAgentDemo}</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-white dark:bg-[#111113] border border-[#E5E7EB] dark:border-[#27272A] text-[#6B7280] dark:text-[#9CA3AF]">Web</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-white dark:bg-[#111113] border border-[#E5E7EB] dark:border-[#27272A] text-[#6B7280] dark:text-[#9CA3AF]">Full-Stack</span>
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-white dark:bg-[#111113] border border-[#E5E7EB] dark:border-[#27272A] text-[#6B7280] dark:text-[#9CA3AF]">React</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mb-5">{t.connect}</h3>
            <form onSubmit={handleContactSubmit} className="max-w-lg space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-[#111111] dark:text-[#F4F4F5]">{t.name}</label>
                  <input type="text" id="name" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E5E7EB] dark:border-[#27272A] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#111] dark:text-[#F4F4F5] placeholder:text-[#9CA3AF]" placeholder={t.placeholderName} required />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-[#111111] dark:text-[#F4F4F5]">{t.email}</label>
                  <input type="email" id="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E5E7EB] dark:border-[#27272A] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#111] dark:text-[#F4F4F5] placeholder:text-[#9CA3AF]" placeholder={t.placeholderEmail} required />
                </div>
              </div>
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-[#111111] dark:text-[#F4F4F5]">{t.message}</label>
                <textarea id="message" rows={4} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} className="w-full bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E5E7EB] dark:border-[#27272A] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent resize-none text-[#111] dark:text-[#F4F4F5] placeholder:text-[#9CA3AF]" placeholder={t.placeholderMessage} required></textarea>
              </div>
              <button type="submit" className="inline-flex items-center gap-2 bg-[#111111] dark:bg-white text-white dark:text-[#111111] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#2a2a2a] dark:hover:bg-[#E4E4E7] transition-all">
                {t.sendMessage}
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>
          
          {/* Music Player */}
          <div className="flex justify-center pt-4 pb-2">
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#F8F9FA] dark:bg-[#18181B] border border-[#E5E7EB] dark:border-[#27272A]">
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 relative cursor-pointer" onClick={togglePlay}>
                <img 
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=150" 
                  alt="Album Art" 
                  className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}
                />
              </div>
              <div className="min-w-0 max-w-[130px]">
                <p className="text-[11px] font-medium text-[#111] dark:text-[#F4F4F5] truncate leading-tight">We Are One (Ole Ola)</p>
                <p className="text-[10px] text-[#6B7280] dark:text-[#9CA3AF] truncate">Pitbull ft. Jennifer Lopez</p>
              </div>
              <button 
                onClick={togglePlay}
                className="w-7 h-7 rounded-full bg-[#111] dark:bg-white text-white dark:text-[#111] flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
              </button>
              <audio 
                ref={audioRef} 
                src="/we-are-one.mp3" 
                onEnded={() => setIsPlaying(false)}
              />
            </div>
          </div>
        </div>

      </div>

      {/* CV Viewer Modal */}
      <CVModal 
        isOpen={cvModalOpen} 
        onOpenChange={setCvModalOpen} 
        lang={cvLang} 
      />

      {/* Video Modal */}
      <Dialog open={videoModalOpen} onOpenChange={setVideoModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {selectedVideo === "introducing" ? t.introducingVideo : t.microAgentDemo}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <video
              src={selectedVideo === "introducing" ? "/0330.mp4" : "/micro-agent.mp4"}
              controls
              className="w-full aspect-video rounded-lg bg-black"
            />
            <div className="bg-[#F8F9FA] dark:bg-[#18181B] rounded-lg p-4 border border-[#E5E7EB] dark:border-[#27272A]">
              <h4 className="font-medium text-[#111] dark:text-[#F4F4F5] text-sm mb-2">{t.techStack}</h4>
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                {t.microAgentTech}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Language Selection Modal */}
      <Dialog open={welcomeModalOpen} onOpenChange={setWelcomeModalOpen}>
        <DialogContent className="sm:max-w-md" hideClose>
          <DialogHeader className="mb-4">
            <DialogTitle className="text-center text-xl font-semibold tracking-tight">Welcome to My Portfolio</DialogTitle>
            <DialogDescription className="text-center text-[#6B7280] dark:text-[#9CA3AF] pt-2 text-sm">
              Please select your preferred language to continue.
              <br />
              Silakan pilih bahasa yang Anda inginkan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => selectLanguage("id")}
              className="flex flex-col items-center justify-center p-6 border border-[#E5E7EB] dark:border-[#27272A] rounded-xl bg-[#F8F9FA] dark:bg-[#18181B] hover:border-[#2563EB] dark:hover:border-[#2563EB] transition-all gap-3 group"
            >
              <div className="text-2xl group-hover:scale-110 transition-transform">🇮🇩</div>
              <span className="font-medium text-sm text-[#111] dark:text-[#F4F4F5]">Bahasa Indonesia</span>
            </button>
            <button 
              onClick={() => selectLanguage("en")}
              className="flex flex-col items-center justify-center p-6 border border-[#E5E7EB] dark:border-[#27272A] rounded-xl bg-[#F8F9FA] dark:bg-[#18181B] hover:border-[#2563EB] dark:hover:border-[#2563EB] transition-all gap-3 group"
            >
              <div className="text-2xl group-hover:scale-110 transition-transform">🇺🇸</div>
              <span className="font-medium text-sm text-[#111] dark:text-[#F4F4F5]">English</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
</PageTransition>
  );
};

export default Index;
