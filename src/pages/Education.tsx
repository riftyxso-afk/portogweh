import { useEffect, useState } from "react";
import { GraduationCap, School, BookOpen, MapPin, Calendar } from "lucide-react";
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
    educationTitle: "Riwayat Pendidikan",
    present: "Sekarang",
    activeStudent: "Mahasiswa Aktif",
    scienceProgram: "Program IPA (Ilmu Pengetahuan Alam)",
  },
  en: {
    home: "Home",
    education: "Education",
    projects: "Projects",
    portfolio: "Portfolio",
    gallery: "Gallery",
    notes: "Notes",
    more: "More",
    educationTitle: "Education History",
    present: "Present",
    activeStudent: "Active Student",
    scienceProgram: "Science Program",
  }
};

const educationData = [
  {
    icon: BookOpen,
    date: "2025 - present",
    title: "Universitas Terbuka - Indonesia",
    subtitle: "Active Student – Sistem Informasi",
    location: "Indonesia",
    gradient: "from-[#2563EB] to-[#7C3AED]",
    tags: ["S1", "Sistem Informasi"],
  },
  {
    icon: School,
    date: "Juli 2022 - April 2025",
    title: "SMA Negeri 1 Pupuan, Bali",
    subtitle: "Science Program (Ilmu Pengetahuan Alam)",
    location: "Pupuan, Tabanan, Bali",
    gradient: "from-[#059669] to-[#10B981]",
    tags: ["SMA", "IPA"],
  },
  {
    icon: School,
    date: "Juli 2019 - April 2022",
    title: "SMP Negeri 6 Pupuan Satu Atap",
    subtitle: "Pupuan, Tabanan, Bali",
    location: "Pupuan, Tabanan, Bali",
    gradient: "from-[#D97706] to-[#F59E0B]",
    tags: ["SMP"],
  },
  {
    icon: School,
    date: "Juli 2013 - April 2019",
    title: "SD Negeri 6 Pujungan",
    subtitle: "Pujungan, Tabanan, Bali",
    location: "Pujungan, Tabanan, Bali",
    gradient: "from-[#DC2626] to-[#EF4444]",
    tags: ["SD"],
  },
];

const Education = () => {
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
              className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mb-10 flex items-center gap-3"
            >
              <GraduationCap className="w-4 h-4" />
              {t.educationTitle}
            </motion.h2>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-[#2563EB] via-[#7C3AED] to-transparent dark:from-[#60A5FA] dark:via-[#A78BFA] dark:to-transparent" />

              <div className="space-y-8">
                {educationData.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative pl-12 group"
                  >
                    {/* Timeline dot */}
                    <div className={`absolute left-[9px] top-1 w-[21px] h-[21px] rounded-full bg-gradient-to-br ${item.gradient} p-[2px] shadow-lg`}>
                      <div className="w-full h-full rounded-full bg-white dark:bg-[#111113] flex items-center justify-center">
                        <item.icon className="w-2.5 h-2.5 text-[#2563EB] dark:text-[#60A5FA]" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F8F9FA] dark:bg-[#18181B] p-5 md:p-6 hover:border-[#D1D5DB] dark:hover:border-[#3F3F46] hover:shadow-md transition-all duration-300">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[#6B7280] dark:text-[#9CA3AF] mb-1.5">
                            <Calendar className="w-3 h-3" />
                            <span className="text-[11px] font-medium">{item.date}</span>
                          </div>
                          <h3 className="text-base md:text-lg font-semibold text-[#111111] dark:text-[#F4F4F5] mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-[#111113] border border-[#E5E7EB] dark:border-[#27272A] text-[#6B7280] dark:text-[#9CA3AF] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        <div className="flex items-center gap-1 text-[10px] text-[#9CA3AF] dark:text-[#6B7280] ml-auto">
                          <MapPin className="w-2.5 h-2.5" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Education;
