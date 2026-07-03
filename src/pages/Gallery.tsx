import { useEffect, useState } from "react";
import { Video, Play, Film } from "lucide-react";
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
    videoGallery: "Galeri Video",
    introducing: "Video Perkenalan",
    microAgentDemo: "Demo Micro Agent",
  },
  en: {
    home: "Home",
    education: "Education",
    projects: "Projects",
    portfolio: "Portfolio",
    gallery: "Gallery",
    notes: "Notes",
    more: "More",
    videoGallery: "Video Gallery",
    introducing: "Introducing Video",
    microAgentDemo: "Micro Agent Demo",
  }
};

const videos = [
  {
    id: "introducing",
    src: "/0330.mp4",
    titleKey: "introducing" as const,
    aspect: "aspect-video",
    gradient: "from-[#2563EB] to-[#7C3AED]",
  },
  {
    id: "micro-agent",
    src: "/micro-agent.mp4",
    titleKey: "noirAiDemo" as const,
    aspect: "aspect-video",
    gradient: "from-[#059669] to-[#10B981]",
  },
];

const Gallery = () => {
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

          <div className="px-8 md:px-14 py-10 md:py-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mb-8 flex items-center gap-3"
            >
              <Film className="w-4 h-4" />
              {t.videoGallery}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <div className="relative rounded-xl overflow-hidden bg-black border border-[#E5E7EB] dark:border-[#27272A] shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${video.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none z-[1]`} />
                    <video
                      src={video.src}
                      controls
                      className={`w-full ${video.aspect} relative z-0`}
                      preload="metadata"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${video.gradient} flex items-center justify-center shrink-0`}>
                      <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                    </div>
                    <p className="text-sm font-medium text-[#111111] dark:text-[#F4F4F5]">
                      {t[video.titleKey]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Gallery;
