import { useState, useEffect } from "react";
import { Search, ShoppingBag, CornerUpLeft, ArrowUpRight, Menu, X, FlaskConical, Leaf, Droplets, Sun } from "lucide-react";

const cards = [
  { icon: FlaskConical, color: "bg-black", text: "Experience our newly enhanced natural formula" },
  { icon: Leaf, color: "bg-emerald-800", text: "Pure organic ingredients sourced sustainably" },
  { icon: Droplets, color: "bg-cyan-800", text: "Advanced bioavailability for maximum absorption" },
  { icon: Sun, color: "bg-amber-700", text: "Clinically tested for daily energy & vitality" },
];

const TerraElix = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % cards.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const words = [
    { text: "The", delay: 0.3, highlight: true },
    { text: "Power", delay: 0.4, highlight: true },
    { text: "of", delay: 0.5, highlight: false },
    { text: "Nature", delay: 0.6, highlight: false },
    { text: "in", delay: 0.7, highlight: false },
    { text: "Every", delay: 0.8, highlight: true },
    { text: "Capsule", delay: 0.9, highlight: true },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ backgroundImage: "url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_110248_b62f758d-f68c-4045-a7b4-91771d6d0a0f.png&w=1280&q=85')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes wordReveal { from { opacity: 0; transform: translateY(100%); filter: blur(4px); } to { opacity: 1; transform: translateY(0); filter: blur(0px); } }
        .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-slide-left { animation: slideInLeft 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-slide-right { animation: slideInRight 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-scale-in { animation: scaleIn 1s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-word-reveal { opacity: 0; }
        .animate-word-reveal > span { display: inline-block; animation: wordReveal 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-900 { animation-delay: 0.9s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-1100 { animation-delay: 1.1s; }
      `}</style>

      {/* Navbar */}
      <nav className="shrink-0 flex items-center justify-between px-5 sm:px-8 lg:px-10 py-4 lg:py-5 relative z-20 animate-fade-in">
        <div className="flex items-center gap-10">
          <span className="text-white" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "30px", letterSpacing: "-0.05em" }}>TerraElix</span>
          <div className="hidden lg:flex items-center gap-10 animate-fade-in delay-400">
            {["About", "Products", "Promotions", "Contact"].map((link) => (
              <a key={link} href="#" className="text-white/90 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "18px" }}>{link}</a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 lg:gap-4 animate-slide-right delay-300">
          <button className="hidden sm:flex text-white/80 hover:text-white"><Search className="w-5 h-5" strokeWidth={1.5} /></button>
          <button className="hidden sm:flex text-white/80 hover:text-white"><ShoppingBag className="w-5 h-5" strokeWidth={1.5} /></button>
          <button className="hidden sm:flex text-white/80 hover:text-white"><CornerUpLeft className="w-5 h-5" strokeWidth={1.5} /></button>
          <img src="https://polo-pecan-73837341.figma.site/_assets/v11/ca8093996e970200cbcf8bde8744175e52da5a79.png" alt="" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover" />
          <button onClick={() => setMenuOpen(true)} className="md:hidden text-white" aria-label="Open menu">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black/90 z-30 md:hidden transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="flex items-center justify-between px-5 py-4">
          <span className="text-white" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "30px", letterSpacing: "-0.05em" }}>TerraElix</span>
          <button onClick={() => setMenuOpen(false)} className="text-white"><X className="w-6 h-6" /></button>
        </div>
        <div className="flex flex-col items-center justify-center h-[80vh] gap-6">
          {["About", "Products", "Promotions", "Contact"].map((link) => (
            <a key={link} href="#" className="text-white text-2xl" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>{link}</a>
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <section className="flex-1 flex flex-col justify-center px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Headline */}
        <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4 lg:gap-x-5" style={{ fontSize: "clamp(48px, 10vw, 155px)", lineHeight: "clamp(50px, 8vw, 125px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: "-0.05em" }}>
          {words.slice(0, 3).map((w) => (
            <span key={w.text} className="animate-word-reveal" style={{ animationDelay: `${w.delay}s`, color: w.highlight ? "white" : "rgba(255,255,255,0.45)" }}>
              <span>{w.text}</span>
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-4 lg:gap-x-5" style={{ fontSize: "clamp(48px, 10vw, 155px)", lineHeight: "clamp(50px, 8vw, 125px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: "-0.05em" }}>
          {words.slice(3, 6).map((w) => (
            <span key={w.text} className="animate-word-reveal" style={{ animationDelay: `${w.delay}s`, color: w.highlight ? "white" : "rgba(255,255,255,0.45)" }}>
              <span>{w.text}</span>
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 lg:gap-x-5" style={{ fontSize: "clamp(48px, 10vw, 155px)", lineHeight: "clamp(50px, 8vw, 125px)", fontFamily: "'DM Sans', sans-serif", fontWeight: 400, letterSpacing: "-0.05em" }}>
          {words.slice(6).map((w) => (
            <span key={w.text} className="animate-word-reveal" style={{ animationDelay: `${w.delay}s`, color: w.highlight ? "white" : "rgba(255,255,255,0.45)" }}>
              <span>{w.text}</span>
            </span>
          ))}
          <img
            src="https://polo-pecan-73837341.figma.site/_assets/v11/6a7de4fbe9c9e2315040607320a9ff5e93117bf4.png"
            alt=""
            className="hidden sm:inline-block align-middle ml-2 lg:ml-4 animate-scale-in delay-1000"
            style={{ height: "clamp(60px, 10vw, 160px)", width: "auto" }}
          />
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 lg:gap-[50px] mt-8 sm:mt-12 lg:mt-[75px] animate-fade-up delay-600">
          <button className="flex items-center justify-center gap-2 bg-black text-white rounded-md w-full sm:w-[240px] md:w-[280px] lg:w-[310px] h-14 sm:h-16 lg:h-[72px] hover:bg-black/90 transition-colors" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500, fontSize: "clamp(1rem, 2vw, 1.5rem)", letterSpacing: "-0.03em" }}>
            Explore Now
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
          </button>
          <p className="text-white max-w-[310px]" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)", lineHeight: 1.45, letterSpacing: "-0.03em" }}>
            Discover our new plant-based supplements for daily balance and clean energy.
          </p>
        </div>
      </section>

      {/* Mobile/Tablet Product Image */}
      <div className="lg:hidden relative z-0 flex justify-center animate-scale-in delay-800">
        <img
          src="https://polo-pecan-73837341.figma.site/_assets/v11/50ad042b3cd48a2e120ea3ba17c8cfeaf3cc334c.png"
          alt=""
          className="w-[180%] sm:w-[151%] max-w-[1296px] object-contain mx-auto drop-shadow-2xl"
          style={{ marginBottom: "-180px", marginTop: "-20px" }}
        />
      </div>

      {/* Desktop Floating Product */}
      <img
        src="https://polo-pecan-73837341.figma.site/_assets/v11/50ad042b3cd48a2e120ea3ba17c8cfeaf3cc334c.png"
        alt=""
        className="hidden lg:block absolute z-0 animate-scale-in delay-700"
        style={{ width: "clamp(600px, 80vw, 1412px)", height: "auto", bottom: "-10%", right: "clamp(-400px, -20vw, -100px)" }}
      />

      {/* Bottom 3-Panel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] relative z-10">
        {/* Panel 1 */}
        <div className="bg-[#ECEDEC] p-6 sm:p-8 lg:p-10 relative overflow-hidden animate-fade-up delay-900">
          <p className="max-w-[350px]" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 2.188rem)", lineHeight: 1.1, letterSpacing: "-0.05em" }}>
            Start your personalized path to natural balance
          </p>
          <a href="#" className="inline-block mt-4 underline" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(1rem, 1.5vw, 1.125rem)", letterSpacing: "-0.03em" }}>
            Personal Assessment
          </a>
          <img src="https://polo-pecan-73837341.figma.site/_assets/v11/6736cbe6e26afa2cd7c04a91892a79f7640785b5.png" alt="" className="absolute right-0 bottom-0 h-full mix-blend-multiply pointer-events-none" />
        </div>

        {/* Panel 2 */}
        <div className="bg-[#FEFDF9] p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[200px] animate-fade-up delay-1000">
          <div className="relative flex-1">
            {cards.map((card, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 sm:gap-4 transition-all duration-500 ${i === activeCard ? "opacity-100 translate-y-0 relative" : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"}`}
              >
                <div className={`${card.color} w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-black/80" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)", lineHeight: 1.2, letterSpacing: "-0.03em" }}>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-6">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveCard(i)}
                className={`h-0.5 flex-1 rounded-full transition-colors duration-300 ${i === activeCard ? "bg-black" : "bg-black/20"}`}
              />
            ))}
          </div>
        </div>

        {/* Panel 3 */}
        <div className="bg-black p-6 sm:p-8 lg:p-10 flex items-center gap-4 sm:gap-6 animate-fade-up delay-1100">
          <img
            src="https://polo-pecan-73837341.figma.site/_assets/v11/30e8f38d1f993c357a3be2721557fc899d5640fc.png"
            alt=""
            className="w-[120px] h-[82px] sm:w-[160px] sm:h-[110px] lg:w-[208px] lg:h-[142px] object-contain"
          />
          <div>
            <p className="text-white" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(1.5rem, 3vw, 2.188rem)", letterSpacing: "-0.05em" }}>+14K</p>
            <p className="text-white/60" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)", lineHeight: 1.2 }}>People have already optimized their wellness</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerraElix;
