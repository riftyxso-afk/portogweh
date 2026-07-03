import { useState, useEffect } from "react";
import { ArrowRight, Play, X, Menu } from "lucide-react";

const navItems = ["Projects", "Expertise", "Studio", "Insights"];

const Atelier = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Background Video */}
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-5 md:py-6">
          <div className="flex items-center gap-8 md:gap-10">
            <span className="text-white font-semibold text-lg tracking-tight font-sans">
              Atelier
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
            {/* Hamburger */}
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

        {/* Hero Content */}
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

        {/* RADZZZ Watermark */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-white/20 text-xs font-mono tracking-[0.2em] uppercase select-none">
          RADZZZ
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-700 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
        <div
          className={`relative z-10 flex flex-col h-full transition-opacity duration-700 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.76,0,0.24,1)" }}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between px-6 py-5">
            <span className="text-white font-semibold text-lg tracking-tight font-sans">
              Atelier
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

          {/* Nav Links */}
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

          {/* Footer */}
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
    </div>
  );
};

export default Atelier;
