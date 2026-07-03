import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Index from "./pages/Index.tsx";
import Education from "./pages/Education.tsx";
import Projects from "./pages/Projects.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import StudioKreatif from "./pages/StudioKreatif.tsx";
import PetCareHub from "./pages/PetCareHub.tsx";
import SereneMind from "./pages/SereneMind.tsx";
import VitaNatura from "./pages/VitaNatura.tsx";
import DesignLab from "./pages/DesignLab.tsx";
import CyberGuard from "./pages/CyberGuard.tsx";
import Gallery from "./pages/Gallery.tsx";
import Guestbook from "./pages/Guestbook.tsx";
import NotFound from "./pages/NotFound.tsx";
import { CommandMenu } from "./components/CommandMenu";
import { NoteModal } from "./components/NoteModal";

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/education" element={<Education />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/studio-kreatif" element={<StudioKreatif />} />
        <Route path="/petcare-hub" element={<PetCareHub />} />
        <Route path="/serene-mind" element={<SereneMind />} />
        <Route path="/vita-natura" element={<VitaNatura />} />
        <Route path="/design-lab" element={<DesignLab />} />
        <Route path="/cyber-guard" element={<CyberGuard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/notes" element={<Guestbook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [language, setLanguage] = useState<"id" | "en">("id");

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred-language") as "id" | "en";
    if (savedLang) setLanguage(savedLang);

    const handleOpenNote = () => setNoteModalOpen(true);
    window.addEventListener("open-note-modal", handleOpenNote);
    return () => window.removeEventListener("open-note-modal", handleOpenNote);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CommandMenu />
          <NoteModal 
            isOpen={noteModalOpen} 
            onOpenChange={setNoteModalOpen} 
            language={language}
          />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
