import { useState, useEffect } from "react";
import { ArrowRight, Clock, Menu, X } from "lucide-react";
import { Swirl, ChromaFlow, FlutedGlass, FilmGrain, Shader } from "shaders/react";

const starburstIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-[#E8704E]">
    <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"/>
  </svg>
);

const linkSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:rotate-0 -rotate-45">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

const HoverButton = ({ text, bgColor, textColor = "text-white", arrowColor = "text-[#F26522]", className = "" }: { text: string; bgColor: string; textColor?: string; arrowColor?: string; className?: string }) => (
  <button className={`group inline-flex items-center rounded-full ${className}`} style={{ backgroundColor: bgColor }}>
    <div className="overflow-hidden h-[20px] flex flex-col">
      <span className={`block transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2 ${textColor} text-[13px] sm:text-[14px] font-medium leading-[20px]`}>
        {text}
      </span>
      <span className={`block transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2 ${textColor} text-[13px] sm:text-[14px] font-medium leading-[20px]`}>
        {text}
      </span>
    </div>
    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center ml-2 sm:ml-3 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45`}>
      <ArrowRight className={`w-4 h-4 ${arrowColor}`} />
    </div>
  </button>
);

function LondonTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

const AxionStudio = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) { document.body.style.overflow = "hidden"; } else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* SECTION 1: HERO */}
      <section className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "#EFEFEF" }}>
        {/* Shader Background */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Shader>
            <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
            <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
            <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
            <FilmGrain strength={0.05} />
          </Shader>
        </div>

        {/* Navigation */}
        <nav className="relative z-20 max-w-[1440px] mx-auto p-2 sm:p-3">
          <div className="bg-white rounded-full flex items-center justify-between p-[5px]">
            {/* Left */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] sm:text-[11px] font-bold tracking-tight">AX</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                {["Projects", "Studio", "Journal", "Connect"].map((link) => (
                  <a key={link} href="#" className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300">{link}</a>
                ))}
              </div>
            </div>

            {/* Right Desktop */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <span className="hidden lg:inline text-[13px] text-gray-600">Taking on projects for Q1 2026</span>
              <div className="hidden lg:flex items-center gap-1.5">
                <Clock className="w-[14px] h-[14px] text-gray-600" />
                <span className="text-[13px] text-gray-600"><LondonTime /> in London</span>
              </div>
              <HoverButton text="Book a strategy call" bgColor="#111827" className="pl-5 pr-2 py-2" />
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setMenuOpen(true)} className="md:hidden bg-gray-900 rounded-full w-9 h-9 flex items-center justify-center" aria-label="Open menu">
              <Menu className="w-4 h-4 text-white" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
          <div className={`absolute bottom-0 left-0 right-0 bg-white rounded-2xl mx-3 mb-3 p-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${menuOpen ? "translate-y-0" : "translate-y-full"}`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-[13px] text-gray-600">
                <Clock className="w-[14px] h-[14px]" />
                <span><LondonTime /> in London</span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="bg-gray-900 rounded-full w-8 h-8 flex items-center justify-center">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            {["Projects", "Studio", "Journal", "Connect"].map((link, i) => (
              <a key={link} href="#" className="block text-[28px] sm:text-[32px] font-medium text-gray-900 py-2 border-b border-gray-100 transition-all duration-300 hover:pl-2" style={{ transitionDelay: `${i * 50}ms` }}>{link}</a>
            ))}
            <button className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white rounded-full px-6 py-3 text-sm font-medium">
              Start a project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex flex-col h-full">
          <div className="flex-1" />
          <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
            <p className="text-[13px] sm:text-[14px] text-gray-900 tracking-wide mb-5 sm:mb-8">Axion Studio</p>

            <h1 className="font-medium leading-[1.08] tracking-[-0.03em] text-gray-900"
              style={{ fontSize: "clamp(1.75rem,7vw,4.2rem)" }}>
              We craft digital experiences
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>for brands ready to dominate
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>their category online.
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mt-8 sm:mt-12">
              <HoverButton text="Start a project" bgColor="#F26522" className="pl-5 sm:pl-6 pr-2 py-2" arrowColor="text-[#F26522]" />

              <div className="flex items-center gap-2 sm:gap-3 bg-white rounded-[4px] px-3 sm:px-4 py-2 sm:py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow">
                {starburstIcon}
                <span className="text-[13px] sm:text-[14px] font-medium">Certified Partner</span>
                <span className="bg-gray-900 text-white text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded font-medium">Featured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-[12px] font-semibold">1</div>
            <span className="text-[12px] sm:text-[13px] font-medium border border-gray-200 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">Introducing Axion</span>
          </div>

          <h2 className="px-5 sm:px-8 lg:px-12 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-12 sm:mb-16 lg:mb-28"
            style={{ fontSize: "clamp(1.5rem,4vw,3.2rem)" }}>
            Strategy-led creatives, delivering
            <br />
            results in digital and beyond.
          </h2>

          {/* Mobile/Tablet */}
          <div className="lg:hidden px-5 sm:px-8">
            <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-gray-900 max-w-lg">
              Through research, creative thinking and iteration we help growing brands realize their digital full potential.
            </p>
            <div className="mt-6">
              <HoverButton text="About our studio" bgColor="#F26522" className="pl-5 pr-2 py-2" arrowColor="text-[#F26522]" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8">
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85" alt="" className="sm:w-[45%] aspect-[438/346] rounded-xl sm:rounded-2xl object-cover" />
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85" alt="" className="sm:w-[55%] aspect-[900/600] rounded-xl sm:rounded-2xl object-cover" />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8 px-5 sm:px-8 lg:px-12">
            <div className="self-end">
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85" alt="" className="aspect-[438/346] rounded-2xl object-cover w-full" />
            </div>
            <div className="self-start flex justify-end">
              <div>
                <p className="text-[16px] leading-[1.65] font-medium text-gray-900 whitespace-nowrap">
                  Through research, creative thinking<br />
                  and iteration we help growing brands<br />
                  realize their digital full potential.
                </p>
                <div className="mt-6">
                  <HoverButton text="About our studio" bgColor="#F26522" className="pl-5 pr-2 py-2" arrowColor="text-[#F26522]" />
                </div>
              </div>
            </div>
            <div className="self-end">
              <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85" alt="" className="aspect-[3/2] rounded-2xl object-cover w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CASE STUDIES */}
      <section className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto">
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-[12px] font-semibold">2</div>
            <span className="text-[12px] sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">Featured client work</span>
          </div>

          <h2 className="px-5 sm:px-8 lg:px-12 font-medium leading-[1.08] tracking-[-0.03em] mb-10 sm:mb-14 lg:mb-16"
            style={{ fontSize: "clamp(1.75rem,7vw,4.2rem)", color: "#111827" }}>
            Our projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7 px-5 sm:px-8 lg:px-12">
            {/* Card 1: Narrativ */}
            <div>
              <div className="aspect-[329/246] rounded-2xl overflow-hidden bg-[#1a1d2e] group cursor-pointer relative">
                <video src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 h-9 bg-white rounded-full flex items-center transition-all duration-300 ease-in-out overflow-hidden group-hover:w-[148px] w-9">
                  <div className="flex items-center gap-2 px-2.5">
                    <span className="text-[13px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">Learn more</span>
                    <span className="shrink-0">{linkSvg}</span>
                  </div>
                </div>
              </div>
              <p className="text-[13px] sm:text-[14px] text-gray-600 mt-4 leading-relaxed">Winner of Site of the Month 2025 — an interactive 3D showcase driving record engagement</p>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">Narrativ</h3>
            </div>

            {/* Card 2: Luminar */}
            <div>
              <div className="aspect-square rounded-2xl overflow-hidden bg-[#6b6b6b] group cursor-pointer relative">
                <video src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 h-9 bg-gray-900 rounded-full flex items-center transition-all duration-300 ease-in-out overflow-hidden group-hover:w-[168px] w-9">
                  <div className="flex items-center gap-2 px-2.5">
                    <span className="text-[13px] font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">View case study</span>
                    <ArrowRight className="w-[14px] h-[14px] text-white shrink-0" />
                  </div>
                </div>
              </div>
              <p className="text-[13px] sm:text-[14px] text-gray-600 mt-4 leading-relaxed">Transforming a dated platform into a conversion-focused brand experience</p>
              <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mt-1">Luminar</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AxionStudio;
