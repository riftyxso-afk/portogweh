import { useState, useEffect } from "react";
import { Search, ShoppingBag, CornerUpLeft, ArrowUpRight, Menu, X, FlaskConical, Leaf, Droplets, Sun, ShoppingCart, Trash2, Plus, Minus, Sprout, Pill, Fish, Heart, Moon, Droplet } from "lucide-react";
import { toast } from "sonner";

const cards = [
  { icon: FlaskConical, color: "bg-black", text: "Experience our newly enhanced natural formula" },
  { icon: Leaf, color: "bg-emerald-800", text: "Pure organic ingredients sourced sustainably" },
  { icon: Droplets, color: "bg-cyan-800", text: "Advanced bioavailability for maximum absorption" },
  { icon: Sun, color: "bg-amber-700", text: "Clinically tested for daily energy & vitality" },
];

const products = [
  { id: 1, name: "VitaNatura Daily Greens", description: "Organic greens powder", price: 39.99, icon: Leaf },
  { id: 2, name: "VitaNatura Vitamin D3+K2", description: "Bone & immune support", price: 24.99, icon: Sun },
  { id: 3, name: "VitaNatura Omega-3", description: "Brain & heart health", price: 34.99, icon: Fish },
  { id: 4, name: "VitaNatura Probiotics", description: "Gut health support", price: 29.99, icon: Heart },
  { id: 5, name: "VitaNatura Magnesium Glycinate", description: "Sleep & relaxation", price: 27.99, icon: Moon },
  { id: 6, name: "VitaNatura Collagen Peptides", description: "Skin & joint support", price: 44.99, icon: Droplet },
];

const paymentMethods = ["Bank Transfer", "E-Wallet", "COD"];

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  customer: { name: string; email: string; address: string; city: string; postalCode: string; paymentMethod: string };
}

const VitaNatura = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", postalCode: "", paymentMethod: "Bank Transfer" });

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

  useEffect(() => {
    const stored = localStorage.getItem("vitanatura_orders");
    if (stored) setOrders(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (cartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  useEffect(() => {
    if (cart.length === 0) setShowCheckout(false);
  }, [cart]);

  const addToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setShowCheckout(false);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const order: Order = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      items: cart,
      subtotal,
      customer: form,
    };
    const updated = [order, ...orders];
    setOrders(updated);
    localStorage.setItem("vitanatura_orders", JSON.stringify(updated));
    toast.success("Order placed successfully!");
    setCart([]);
    setShowCheckout(false);
    setForm({ name: "", email: "", address: "", city: "", postalCode: "", paymentMethod: "Bank Transfer" });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
          <span className="text-white" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "30px", letterSpacing: "-0.05em" }}>VitaNatura</span>
          <div className="hidden lg:flex items-center gap-10 animate-fade-in delay-400">
            {["About", "Products", "Promotions", "Contact"].map((link) => (
              <a key={link} href="#" className="text-white/90 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "18px" }}>{link}</a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 lg:gap-4 animate-slide-right delay-300">
          <button className="hidden sm:flex text-white/80 hover:text-white"><Search className="w-5 h-5" strokeWidth={1.5} /></button>
          <button onClick={() => setCartOpen(true)} className="relative text-white/80 hover:text-white">
            <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
            )}
          </button>
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
          <span className="text-white" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "30px", letterSpacing: "-0.05em" }}>VitaNatura</span>
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

      {/* Product Catalog */}
      <section className="relative z-10 bg-white px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-2" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.05em" }}>Our Products</h2>
          <p className="text-center text-black/60 mb-10 sm:mb-12" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: "clamp(0.875rem, 1.5vw, 1.125rem)" }}>Produk Kami</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl border border-black/10 p-6 flex flex-col items-center text-center hover:shadow-lg hover:border-black/20 transition-all duration-300">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                  <product.icon className="w-8 h-8 text-emerald-700" />
                </div>
                <h3 className="font-medium mb-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.25rem)", letterSpacing: "-0.03em" }}>{product.name}</h3>
                <p className="text-black/60 text-sm mb-3" style={{ fontFamily: "Inter, sans-serif" }}>{product.description}</p>
                <p className="text-lg font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>${product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-black/90 transition-colors"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
            <h2 className="text-xl font-medium" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>Shopping Cart</h2>
            <button onClick={() => setCartOpen(false)} className="text-black/60 hover:text-black"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-black/40">
                <ShoppingCart className="w-12 h-12 mb-3" />
                <p style={{ fontFamily: "Inter, sans-serif" }}>Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl bg-black/5">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>{item.name}</p>
                      <p className="text-sm text-black/60" style={{ fontFamily: "Inter, sans-serif" }}>${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center text-sm font-medium" style={{ fontFamily: "Inter, sans-serif" }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded-full border border-black/20 flex items-center justify-center hover:bg-black/5"><Plus className="w-3 h-3" /></button>
                    </div>
                    <p className="text-sm font-medium w-16 text-right" style={{ fontFamily: "'DM Sans', sans-serif" }}>${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-black/10 px-6 py-4 space-y-3">
              <div className="flex items-center justify-between text-base font-medium" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => { setShowCheckout(true); setCartOpen(false); }}
                className="w-full bg-black text-white rounded-lg py-3 text-sm font-medium hover:bg-black/90 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full text-sm text-black/40 hover:text-black/60 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Section */}
      {showCheckout && (
        <section className="relative z-10 bg-[#F8F9F7] px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-center mb-8" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.05em" }}>Complete Your Order</h2>

            <div className="bg-white rounded-2xl border border-black/10 p-6 sm:p-8 mb-8">
              <h3 className="font-medium mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.125rem", letterSpacing: "-0.03em" }}>Order Summary</h3>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-black/10 font-medium" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleCheckout} className="bg-white rounded-2xl border border-black/10 p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5 text-black/70" style={{ fontFamily: "Inter, sans-serif" }}>Full Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-black/30 transition-colors text-sm" style={{ fontFamily: "Inter, sans-serif" }} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5 text-black/70" style={{ fontFamily: "Inter, sans-serif" }}>Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-black/30 transition-colors text-sm" style={{ fontFamily: "Inter, sans-serif" }} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5 text-black/70" style={{ fontFamily: "Inter, sans-serif" }}>Address</label>
                  <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-black/30 transition-colors text-sm" style={{ fontFamily: "Inter, sans-serif" }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-black/70" style={{ fontFamily: "Inter, sans-serif" }}>City</label>
                  <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-black/30 transition-colors text-sm" style={{ fontFamily: "Inter, sans-serif" }} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-black/70" style={{ fontFamily: "Inter, sans-serif" }}>Postal Code</label>
                  <input required value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-black/30 transition-colors text-sm" style={{ fontFamily: "Inter, sans-serif" }} />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5 text-black/70" style={{ fontFamily: "Inter, sans-serif" }}>Payment Method</label>
                  <select value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-black/30 transition-colors text-sm bg-white" style={{ fontFamily: "Inter, sans-serif" }}>
                    {paymentMethods.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-black text-white rounded-xl py-4 text-base font-medium hover:bg-black/90 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>
                Place Order — ${subtotal.toFixed(2)}
              </button>
            </form>

            {/* Order History */}
            {orders.length > 0 && (
              <div className="mt-10">
                <h3 className="text-center mb-6" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "clamp(1.125rem, 2vw, 1.5rem)", letterSpacing: "-0.05em" }}>Order History</h3>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl border border-black/10 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>Order #{order.id.slice(-6)}</span>
                        <span className="text-xs text-black/50" style={{ fontFamily: "Inter, sans-serif" }}>{order.date}</span>
                      </div>
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm py-1" style={{ fontFamily: "Inter, sans-serif" }}>
                          <span>{item.name} x{item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-black/10 font-medium text-sm" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.03em" }}>
                        <span>Total</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      <p className="text-xs text-black/50 mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
                        {order.customer.name} · {order.customer.paymentMethod}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default VitaNatura;
