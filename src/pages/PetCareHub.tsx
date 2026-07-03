import { Search, ShoppingCart, Star, ArrowUpRight, Play, ArrowRight, Plus, Scissors, Stethoscope, Sun, Footprints } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const servicesList = [
  {
    icon: Scissors,
    title: "Pet Grooming",
    description: "Full grooming package including bath, haircut, nail trim",
    price: "$45",
  },
  {
    icon: Stethoscope,
    title: "Veterinary Care",
    description: "Check-ups, vaccinations, and health consultations",
    price: "$35",
  },
  {
    icon: Sun,
    title: "Pet Daycare",
    description: "Safe and fun daycare for your furry friends",
    price: "$25/day",
  },
  {
    icon: Footprints,
    title: "Dog Walking",
    description: "Professional dog walking service",
    price: "$20/session",
  },
];

interface Booking {
  petName: string;
  ownerName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

const PetCareHub = () => {
  const [form, setForm] = useState<Booking>({
    petName: "",
    ownerName: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("petcarehub_bookings") || "[]");
    } catch {
      return [];
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...bookings, form];
    setBookings(updated);
    localStorage.setItem("petcarehub_bookings", JSON.stringify(updated));
    toast.success("Appointment booked successfully!");
    setForm({ petName: "", ownerName: "", email: "", phone: "", service: "", date: "", time: "", notes: "" });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#EFFDF0" }}>
      <style>{`
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes text-reveal {
          0% { opacity: 0; transform: translateY(40px) skewY(3deg) blur(4px); }
          100% { opacity: 1; transform: translateY(0) skewY(0) blur(0); }
        }
        @keyframes word-pop {
          0% { opacity: 0; transform: translateY(60px) scale(0.7) rotate(-4deg) blur(8px); }
          60% { opacity: 1; transform: translateY(-8px) scale(1.05) rotate(0) blur(0); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotate(0) blur(0); }
        }
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes photo-reveal {
          0% { opacity: 0; transform: translateY(80px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fade-up { animation: fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-fade-in { animation: fade-in 0.6s ease-out both; }
        .animate-slide-up { animation: slide-up 0.9s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-slide-in-left { animation: slide-in-left 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-slide-in-right { animation: slide-in-right 0.8s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-text-reveal { animation: text-reveal 1s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-word-pop { animation: word-pop 0.9s cubic-bezier(0.34,1.56,0.64,1) both; }
        .animate-scale-in { animation: scale-in 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .animate-photo-reveal { animation: photo-reveal 1.1s cubic-bezier(0.16,1,0.3,1) both; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-900 { animation-delay: 900ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1100 { animation-delay: 1100ms; }
        .delay-1200 { animation-delay: 1200ms; }

        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* Header */}
      <header className="shrink-0 relative z-30 px-4 md:px-12 py-4 flex items-center justify-between">
        <span
          className="text-2xl md:text-3xl font-bold tracking-tight animate-fade-in delay-100"
          style={{ color: "#1a3d1a" }}
        >
          PetCareHub
        </span>

        <nav className="hidden md:flex items-center gap-8 animate-fade-in delay-200">
          {["Home", "Shop", "Delivery and payment", "Brands", "Blog"].map((item, i) => (
            <a
              key={item}
              href="#"
              className={`text-sm font-medium ${i === 0 ? "text-gray-900" : "text-gray-600"} hover:text-gray-900 transition-colors`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3 animate-fade-in delay-300">
          <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
            <Search className="w-4 h-4" />
          </button>
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: "#E86A10" }}>
            <Star className="w-4 h-4 text-white fill-white" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2" style={{ backgroundColor: "#E86A10", borderColor: "#EFFDF0" }}>4</span>
          </button>
          <button className="relative flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors">
            <ShoppingCart className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2" style={{ backgroundColor: "#E86A10", borderColor: "#EFFDF0" }}>1</span>
          </button>
          <img
            src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128"
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex flex-col overflow-hidden relative">
        {/* Desktop Heading (hidden below md) */}
        <div className="hidden md:block relative z-5 px-4 md:px-12 pt-[2rem] md:pt-[5.4rem]">
          <h1 className="font-serif-display tracking-tight" style={{ color: "#1a3d1a", fontSize: "clamp(60px,7.5vw,110px)", lineHeight: "0.95" }}>
            <span className="inline-block animate-word-pop delay-200">Everything</span>
            <br />
            <span className="inline-block animate-word-pop delay-500">Your Pets Love</span>
          </h1>
        </div>

        {/* Mobile Heading (shown below md) */}
        <div className="md:hidden flex flex-col items-center text-center px-6 pt-6">
          <h1 className="font-serif-display text-[36px] leading-[1] tracking-tight animate-word-pop delay-200" style={{ color: "#1a3d1a" }}>
            Everything<br />Your Pets Love
          </h1>
          <p className="mt-3 text-sm text-gray-500 animate-fade-up delay-400">Find the best products for your furry friends</p>
          <button
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white animate-scale-in delay-500"
            style={{ backgroundColor: "#E86A10" }}
          >
            Explore Products
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Left Product Card - Desktop */}
        <div className="hidden lg:block absolute top-[50px] left-12 z-10 animate-slide-in-left delay-600" style={{ width: "clamp(160px,14vw,260px)" }}>
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "260/257" }}>
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png"
              alt="Cozy Cat House"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: "#1a3d1a" }}
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
          <p className="mt-2 text-sm" style={{ color: "#4B5563" }}>Cozy Cat House</p>
          <p className="font-bold text-sm" style={{ color: "#1a3d1a" }}>$49.99</p>
        </div>

        {/* Right Video Card - Desktop */}
        <div className="hidden lg:block absolute top-[50px] right-12 z-10 animate-slide-in-right delay-600" style={{ width: "clamp(120px,10vw,177px)" }}>
          <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "177/287" }}>
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/76be6ec3a93a703b15e9cc01e764a4e3f9d7d2c0.png"
              alt="Watch Product Reviews"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full mx-auto -mt-4 relative z-10 cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: "#1a3d1a" }}
          >
            <Play className="w-4 h-4 text-white fill-white" />
          </div>
          <p className="text-xs text-center mt-3" style={{ color: "#4B5563" }}>Watch Product Reviews on TikTok and YouTube</p>
        </div>

        {/* Mobile Cards (shown below md) */}
        <div className="md:hidden flex gap-3 px-6 mt-4">
          <div className="flex-1 animate-slide-in-left delay-500">
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/3e5158dad63d392ade022e81890edc9f54d750bc.png"
                alt="Cozy Cat House"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-1 text-xs" style={{ color: "#4B5563" }}>Cozy Cat House</p>
            <p className="font-bold text-xs" style={{ color: "#1a3d1a" }}>$49.99</p>
          </div>
          <div className="flex-1 animate-slide-in-right delay-500">
            <div className="rounded-2xl overflow-hidden relative" style={{ aspectRatio: "3/4" }}>
              <img
                src="https://polo-pecan-73837341.figma.site/_assets/v11/76be6ec3a93a703b15e9cc01e764a4e3f9d7d2c0.png"
                alt="Watch Product Reviews"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="flex items-center justify-center w-6 h-6 rounded-full mx-auto -mt-3 relative z-10"
              style={{ backgroundColor: "#1a3d1a" }}
            >
              <Play className="w-3 h-3 text-white fill-white" />
            </div>
            <p className="text-[10px] text-center mt-1" style={{ color: "#4B5563" }}>Reviews on TikTok & YouTube</p>
          </div>
        </div>

        {/* Mobile Stats (shown below md) */}
        <div className="md:hidden flex items-center justify-center gap-6 px-6 mt-3 animate-fade-up delay-600">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <img src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128" className="w-6 h-6 rounded-full object-cover border-2 border-white -mr-1.5" alt="" />
              <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 border-white -mr-1.5" style={{ backgroundColor: "#1a3d1a" }}>
                <Plus className="w-3 h-3 text-white" />
              </div>
            </div>
            <div>
              <p className="font-bold text-xs" style={{ color: "#1a3d1a" }}>98K+</p>
              <p className="text-[10px] text-gray-500">Followers</p>
            </div>
          </div>
          <div className="w-px h-8" style={{ backgroundColor: "#BFC8BF" }} />
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-current" style={{ color: "#E86A10" }} />
            <div>
              <p className="font-bold text-xs" style={{ color: "#1a3d1a" }}>4.6</p>
              <p className="text-[10px] text-gray-500">Rating</p>
            </div>
          </div>
        </div>

        {/* Desktop Stats Row (shown md+) */}
        <div className="hidden md:flex absolute left-0 right-0 bottom-0 z-20">
          {/* Left Image */}
          <div className="flex-1 relative overflow-hidden" style={{ maxHeight: "min(70vh, 55vw)" }}>
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png"
              alt=""
              className="w-full h-auto block animate-photo-reveal delay-700"
            />
            <div className="absolute bottom-[clamp(20px,4vh,50px)] left-4 animate-scale-in delay-1000">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <img src="https://polo-pecan-73837341.figma.site/_assets/v11/e62173d41f91350a59628e8a9a55ae078a886fb9.png?w=128" className="w-8 h-8 rounded-full object-cover border-2 border-white -mr-2" alt="" />
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 border-white" style={{ backgroundColor: "#1a3d1a" }}>
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-sm text-white">98K+</p>
                  <p className="text-xs text-white/80">Followers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Image (tallest) */}
          <div className="flex-[1.265] relative overflow-hidden" style={{ maxHeight: "min(85vh, 70vw)" }}>
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024"
              alt=""
              className="w-full h-auto block animate-photo-reveal delay-600"
            />
            <div className="absolute bottom-[clamp(20px,4vh,50px)] left-1/2 -translate-x-1/2 text-center animate-scale-in delay-1100 w-full px-4">
              <h3 className="text-white font-semibold text-lg md:text-xl lg:text-2xl leading-tight">Best Products for Your Pet</h3>
              <button
                className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white mx-auto animate-scale-in delay-1200"
                style={{ backgroundColor: "#E86A10" }}
              >
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 relative overflow-hidden" style={{ maxHeight: "min(70vh, 55vw)" }}>
            <img
              src="https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png"
              alt=""
              className="w-full h-auto block animate-photo-reveal delay-800"
            />
            <div className="absolute bottom-[clamp(20px,4vh,50px)] right-4 animate-scale-in delay-1000">
              <div className="flex items-center gap-1.5">
                <Star className="w-5 h-5 fill-current" style={{ color: "#E86A10" }} />
                <div>
                  <p className="font-bold text-sm text-white">4.6</p>
                  <p className="text-xs text-white/80">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Images */}
        <div className="md:hidden mt-auto flex items-end">
          <div className="flex-1">
            <img src="https://polo-pecan-73837341.figma.site/_assets/v11/8d44b25186ef45a5789c74668fb781cea4e1ff49.png" alt="" className="w-full h-auto block" />
          </div>
          <div className="flex-[1.265]">
            <img src="https://polo-pecan-73837341.figma.site/_assets/v11/96745c4e72ad5c5208e53a885df797fd82cd854a.png?h=1024" alt="" className="w-full h-auto block" />
          </div>
          <div className="flex-1">
            <img src="https://polo-pecan-73837341.figma.site/_assets/v11/81bd2e7a66b58f3d8f3ad78fd1ebf01af8dfdee1.png" alt="" className="w-full h-auto block" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 md:px-12 py-16 md:py-24" style={{ backgroundColor: "#EFFDF0" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#1a3d1a" }}>
            Our <span style={{ color: "#E86A10" }}>Services</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="rounded-xl border bg-white p-6 flex flex-col items-start hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ borderColor: "#e0e8e0" }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: "#EFFDF0" }}>
                    <Icon className="w-6 h-6" style={{ color: "#E86A10" }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: "#1a3d1a" }}>{service.title}</h3>
                  <p className="text-sm flex-1" style={{ color: "#4B5563" }}>{service.description}</p>
                  <p className="mt-3 text-lg font-bold" style={{ color: "#E86A10" }}>{service.price}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Appointment Booking Section */}
      <section className="px-4 md:px-12 py-16 md:py-24" style={{ backgroundColor: "#EFFDF0" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: "#1a3d1a" }}>
            Book an <span style={{ color: "#E86A10" }}>Appointment</span>
          </h2>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 md:p-8 space-y-5" style={{ borderColor: "#e0e8e0" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#1a3d1a" }}>Pet Name</label>
                <input
                  type="text"
                  name="petName"
                  value={form.petName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition"
                  style={{ borderColor: "#d0d8d0", color: "#1a3d1a" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#1a3d1a" }}>Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={form.ownerName}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition"
                  style={{ borderColor: "#d0d8d0", color: "#1a3d1a" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#1a3d1a" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition"
                  style={{ borderColor: "#d0d8d0", color: "#1a3d1a" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#1a3d1a" }}>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition"
                  style={{ borderColor: "#d0d8d0", color: "#1a3d1a" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#1a3d1a" }}>Service</label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition"
                  style={{ borderColor: "#d0d8d0", color: "#1a3d1a" }}
                >
                  <option value="">Select a service</option>
                  {servicesList.map((s) => (
                    <option key={s.title} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#1a3d1a" }}>Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition"
                  style={{ borderColor: "#d0d8d0", color: "#1a3d1a" }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: "#1a3d1a" }}>Preferred Time</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition"
                  style={{ borderColor: "#d0d8d0", color: "#1a3d1a" }}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1" style={{ color: "#1a3d1a" }}>Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 transition resize-none"
                  style={{ borderColor: "#d0d8d0", color: "#1a3d1a" }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "#E86A10" }}
            >
              Book Appointment
            </button>
          </form>

          {/* Booking History */}
          {bookings.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4" style={{ color: "#1a3d1a" }}>Booking History</h3>
              <div className="space-y-3">
                {bookings.map((b, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl border p-4 flex flex-wrap gap-x-6 gap-y-1 text-sm"
                    style={{ borderColor: "#e0e8e0" }}
                  >
                    <span><strong>Pet:</strong> {b.petName}</span>
                    <span><strong>Owner:</strong> {b.ownerName}</span>
                    <span><strong>Service:</strong> {b.service}</span>
                    <span><strong>Date:</strong> {b.date}</span>
                    <span><strong>Time:</strong> {b.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PetCareHub;
