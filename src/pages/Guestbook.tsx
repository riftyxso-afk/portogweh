import { useEffect, useState } from "react";
import { MessageSquare, Send, User, Clock } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
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
    guestbookTitle: "Buku Tamu",
    guestbookDesc: "Tinggalkan pesan atau kesan Anda di sini!",
    namePlaceholder: "Nama Anda",
    messagePlaceholder: "Tulis pesan...",
    submit: "Kirim Pesan",
    loading: "Memuat...",
    noMessages: "Belum ada pesan. Jadi yang pertama!",
    success: "Pesan terkirim!",
    error: "Gagal mengirim pesan.",
  },
  en: {
    home: "Home",
    education: "Education",
    projects: "Projects",
    portfolio: "Portfolio",
    gallery: "Gallery",
    notes: "Notes",
    more: "More",
    guestbookTitle: "Guestbook",
    guestbookDesc: "Leave a message or your thoughts here!",
    namePlaceholder: "Your Name",
    messagePlaceholder: "Write a message...",
    submit: "Send Message",
    loading: "Loading...",
    noMessages: "No messages yet. Be the first!",
    success: "Message sent!",
    error: "Failed to send message.",
  }
};

interface Message {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

const Guestbook = () => {
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language") as "id" | "en";
    if (savedLang) setLanguage(savedLang);
    fetchMessages();

    const handleRefresh = () => fetchMessages();
    window.addEventListener("refresh-guestbook", handleRefresh);
    return () => window.removeEventListener("refresh-guestbook", handleRefresh);
  }, []);

  const t = translations[language];

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newMessage) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("guestbook")
        .insert([{ name: newName, message: newMessage }]);

      if (error) throw error;

      toast({ title: t.success });
      setNewName("");
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      toast({ title: t.error, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      "from-[#2563EB] to-[#7C3AED]",
      "from-[#059669] to-[#10B981]",
      "from-[#D97706] to-[#F59E0B]",
      "from-[#DC2626] to-[#EF4444]",
      "from-[#0891B2] to-[#06B6D4]",
      "from-[#7C3AED] to-[#EC4899]",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-[#6B7280] dark:text-[#9CA3AF] mb-2 flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                {t.guestbookTitle}
              </h2>
              <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] mb-8">{t.guestbookDesc}</p>
            </motion.div>

            {/* Message Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="mb-12 p-6 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F8F9FA] dark:bg-[#18181B]"
            >
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder={t.namePlaceholder}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-white dark:bg-[#111113] border border-[#E5E7EB] dark:border-[#27272A] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#111] dark:text-[#F4F4F5] placeholder:text-[#9CA3AF] transition-shadow"
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder={t.messagePlaceholder}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full bg-white dark:bg-[#111113] border border-[#E5E7EB] dark:border-[#27272A] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent text-[#111] dark:text-[#F4F4F5] placeholder:text-[#9CA3AF] h-24 resize-none transition-shadow"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-[#111111] dark:bg-white text-white dark:text-[#111111] px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#2a2a2a] dark:hover:bg-[#E4E4E7] transition-all disabled:opacity-50 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? t.loading : t.submit}
                  </button>
                </div>
              </div>
            </motion.form>

            {/* Messages List */}
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-6 h-6 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-[#6B7280] dark:text-[#9CA3AF] py-16"
                >
                  {t.noMessages}
                </motion.p>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F8F9FA] dark:bg-[#18181B] p-4 hover:border-[#D1D5DB] dark:hover:border-[#3F3F46] hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${getAvatarColor(msg.name)} flex items-center justify-center shrink-0 shadow-sm`}>
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-0.5">
                          <span className="text-sm font-semibold text-[#111111] dark:text-[#F4F4F5]">
                            {msg.name}
                          </span>
                          <span className="flex items-center gap-1 text-[10px] text-[#9CA3AF] dark:text-[#6B7280]">
                            <Clock className="w-2.5 h-2.5" />
                            {format(new Date(msg.created_at), "MMM d, yyyy")}
                          </span>
                        </div>
                        <p className="text-sm text-[#4B5563] dark:text-[#A1A1AA] leading-relaxed">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default Guestbook;
