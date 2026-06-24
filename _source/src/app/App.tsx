import { useState, useEffect, useRef, useCallback } from "react";
import {
  Globe, Zap, MessageCircle, Phone, ChevronDown,
  Check, ArrowRight, Monitor, ShoppingBag, Target, Search,
  Image, Wrench, RefreshCw, MapPin, Cpu, TrendingUp, Shield,
  Smartphone, ExternalLink, Facebook, Users, Clock,
  Star, BarChart2, Layers, Award, FileText, PenTool, Palette,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const WA_LINK = "https://wa.me/916206108923?text=Hi%20AlterLabs%2C%20I%20want%20to%20discuss%20a%20website%2C%20CRM%20or%20automation%20build";
const PHONE = "tel:+916206108923";
const EMAIL = "mailto:hello@alterlabs.in";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cx(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0 rounded-2xl"
      style={{
        width: size,
        height: size,
        background: "conic-gradient(from 210deg, #60a5fa, #7c3aed, #10b981, #60a5fa)",
        boxShadow: "0 0 22px rgba(124,58,237,0.48), inset 0 1px 0 rgba(255,255,255,0.35)",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-[2px] rounded-[0.9rem] flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(145deg, rgba(3,5,15,0.96), rgba(12,18,48,0.94))" }}
      >
        <span
          className="font-black tracking-tight"
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: Math.max(13, size * 0.34),
            color: "#f8fbff",
            textShadow: "0 0 14px rgba(147,197,253,0.62)",
          }}
        >
          AL
        </span>
        <span className="absolute left-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-emerald-300" style={{ boxShadow: "0 0 10px rgba(16,185,129,0.9)" }} />
        <span className="absolute bottom-1.5 right-1.5 h-5 w-px rotate-45 bg-blue-300/50" />
      </div>
    </div>
  );
}

function LogoLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <LogoMark size={compact ? 38 : 52} />
      <div>
        <div
          className={cx(compact ? "text-[1.25rem]" : "text-[1.55rem]", "font-bold leading-none tracking-wider")}
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            background: "linear-gradient(120deg, #dbeafe, #c4b5fd 55%, #86efac)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          AlterLabs
        </div>
        <div className="mt-1 text-[9px] uppercase tracking-[0.24em] text-blue-200/42">
          Digital systems studio
        </div>
      </div>
    </div>
  );
}

const glass = {
  background: "rgba(6, 12, 36, 0.72)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(59,130,246,0.16)",
};

const glassBright = {
  background: "rgba(10, 20, 60, 0.80)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(59,130,246,0.22)",
};

function GradText({ children, from = "#60a5fa", to = "#a78bfa", deg = 120 }: {
  children: React.ReactNode; from?: string; to?: string; deg?: number;
}) {
  return (
    <span style={{
      background: `linear-gradient(${deg}deg, ${from}, ${to})`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>
      {children}
    </span>
  );
}

// ─── Animated Particle Canvas ─────────────────────────────────────────────────

function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animId: number;
    let isVisible = true;
    const stars: { x: number; y: number; r: number; speed: number; opacity: number; twinkle: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const starCount = window.innerWidth < 768 ? 36 : 84;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        speed: Math.random() * 0.25 + 0.05,
        opacity: Math.random() * 0.6 + 0.1,
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      stars.forEach((s) => {
        s.twinkle += 0.02;
        const op = s.opacity * (0.5 + 0.5 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${op})`;
        ctx.fill();
        s.y += s.speed;
        if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
      });
      if (!reduceMotion && isVisible && !document.hidden) {
        animId = requestAnimationFrame(draw);
      }
    };
    draw();

    const resume = () => {
      cancelAnimationFrame(animId);
      if (isVisible && !document.hidden && !reduceMotion) animId = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      resume();
    }, { threshold: 0.01 });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", resume);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true" />;
}

// ─── Animated Counter ─────────────────────────────────────────────────────────

function Counter({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.floor(ease * to));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionTag({ children, color = "#3b82f6" }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.15em] font-bold mb-5"
      style={{ background: `${color}14`, border: `1px solid ${color}35`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: color }} />
      {children}
    </div>
  );
}

// ─── Animated Glow Border Card ────────────────────────────────────────────────

function GlowCard({ children, className = "", color = "#3b82f6", style: extraStyle = {} }: {
  children: React.ReactNode; className?: string; color?: string; style?: React.CSSProperties;
}) {
  return (
    <div
      className={cx("relative rounded-2xl transition-all duration-300 hover:-translate-y-1 group", className)}
      style={{
        ...glass,
        boxShadow: `0 4px 28px rgba(0,0,0,0.45)`,
        ...extraStyle,
      }}
    >
      {/* Animated top edge glow on hover */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
        style={{ width: "70%", background: `linear-gradient(90deg, transparent, ${color}, transparent)`, boxShadow: `0 0 12px ${color}` }}
      />
      {children}
    </div>
  );
}

// ─── Floating Card ────────────────────────────────────────────────────────────

function FloatCard({ children, style, delay = "0s" }: {
  children: React.ReactNode; style?: React.CSSProperties; delay?: string;
}) {
  return (
    <div
      className="absolute rounded-2xl px-3 py-2.5 flex items-center gap-2.5"
      style={{ ...glassBright, boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.15)", animation: `float 5s ease-in-out infinite`, animationDelay: delay, ...style }}
    >
      {children}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────

function Nav() {
  const links = [
    { label: "Audit", short: "Audit", href: "/audit/system-audit.html", icon: <Search size={15} /> },
    { label: "BNS", short: "BNS", href: "/bns/", icon: <Layers size={15} /> },
    { label: "Pricing", short: "Price", href: "#products", icon: <ShoppingBag size={15} /> },
    { label: "Systems", short: "Systems", href: "#systems", icon: <Cpu size={15} /> },
    { label: "Industries", short: "Use", href: "/industries/interior-design-crm-website.html", icon: <Users size={15} /> },
    { label: "Work", short: "Work", href: "#portfolio", icon: <Monitor size={15} /> },
    { label: "Resources", short: "Read", href: "#resources", icon: <ExternalLink size={15} /> },
    { label: "FAQ", short: "FAQ", href: "#faq", icon: <MessageCircle size={15} /> },
  ];

  return (
    <header
      className="fixed inset-x-0 bottom-3 md:bottom-5 z-50 px-3 md:px-8 pointer-events-none"
    >
      <div
        className="relative mx-auto flex w-full max-w-6xl items-center gap-2 rounded-2xl px-2.5 py-2 md:gap-3 md:px-3 pointer-events-auto"
        style={{
          ...glassBright,
          background: "linear-gradient(135deg, rgba(10,20,60,0.82), rgba(6,8,26,0.72))",
          boxShadow: "0 18px 70px rgba(0,0,0,0.62), 0 0 0 1px rgba(147,197,253,0.16), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <div
          className="pointer-events-none absolute -inset-1 -z-10 rounded-[1.35rem]"
          style={{
            background: "linear-gradient(90deg, rgba(59,130,246,0.16), rgba(124,58,237,0.26), rgba(16,185,129,0.10))",
            filter: "blur(18px)",
          }}
        />

        <a href="#top" className="flex shrink-0 items-center gap-2 rounded-xl px-1.5 py-1.5 transition-colors hover:bg-white/10" aria-label="AlterLabs home">
          <LogoMark size={38} />
          <span className="hidden lg:block text-[1.15rem] font-bold tracking-wider" style={{
            fontFamily: "'Rajdhani', sans-serif",
            background: "linear-gradient(120deg, #93c5fd, #c4b5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            AlterLabs
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto px-0.5 md:justify-center"
          style={{ scrollbarWidth: "none" }}
        >
          {links.map(l => (
            <a
              key={l.label}
              href={l.href}
              title={l.label}
              aria-label={l.label}
              className="flex h-10 shrink-0 items-center gap-1.5 rounded-xl px-2.5 text-[10px] font-semibold text-blue-100/62 transition-all duration-200 hover:bg-white/10 hover:text-white md:px-3 md:text-[12px]"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <span className="text-blue-200/75 transition-colors">{l.icon}</span>
              <span className="sm:hidden">{l.short}</span>
              <span className="hidden sm:inline">{l.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <a
            href={PHONE}
            data-analytics-event="call_click"
            title="Call"
            aria-label="Call AlterLabs"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-blue-200/75 transition-all hover:bg-white/10 hover:text-white"
          >
            <Phone size={15} />
          </a>
          <a
            href={WA_LINK} target="_blank" rel="noopener noreferrer"
            data-analytics-event="whatsapp_click"
            title="WhatsApp Us"
            aria-label="WhatsApp AlterLabs"
            className="flex h-10 w-10 items-center justify-center gap-2 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 md:w-auto md:px-4"
            style={{ background: "linear-gradient(135deg, #059669, #10b981)", boxShadow: "0 0 20px rgba(16,185,129,0.35)" }}
          >
            <MessageCircle size={15} />
            <span className="hidden md:inline">WhatsApp Us</span>
          </a>
        </div>
      </div>
    </header>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="top" className="relative min-h-[88svh] flex items-center justify-center overflow-hidden pt-4 md:pt-0">
      {/* Deep space background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 90% 70% at 50% -5%, rgba(59,130,246,0.20) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 85% 60%, rgba(124,58,237,0.14) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 15% 70%, rgba(16,185,129,0.07) 0%, transparent 55%), #03050f",
      }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: "linear-gradient(rgba(99,179,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
        zIndex: 1,
      }} />

      <StarField />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-14 items-center py-10 md:py-10">
        {/* Copy */}
        <div className="text-center md:text-left">
          <div className="mb-5 flex justify-center md:justify-start">
            <LogoLockup />
          </div>
          <SectionTag color="#a78bfa">CRM automation + business websites · India</SectionTag>

          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.03] mb-5" style={{ fontFamily: "'Rajdhani', sans-serif", letterSpacing: "-0.01em" }}>
            Stop losing leads{" "}
            <span className="block">
              <GradText from="#c084fc" to="#60a5fa">between enquiry and follow-up</GradText>
            </span>
          </h1>

          <p className="text-[15px] md:text-base text-blue-100/80 mb-8 max-w-[540px] leading-[1.75]" style={{ fontFamily: "'Manrope', sans-serif" }}>
            AlterLabs helps Indian service businesses capture enquiries, route them into a clean CRM, automate follow-up, and launch conversion-focused websites that turn attention into usable pipeline.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-10">
            <a
              href="/services/crm-automation-india.html"
              data-analytics-event="service_page_cta_click"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-white text-sm transition-all hover:scale-[1.03] hover:shadow-2xl"
              style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", boxShadow: "0 0 40px rgba(59,130,246,0.45), 0 4px 20px rgba(0,0,0,0.4)" }}
            >
              <Target size={16} /> Explore CRM automation <ArrowRight size={14} />
            </a>
            <a
              href="/audit/system-audit.html"
              data-analytics-event="audit_page_click"
              className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:scale-[1.03]"
              style={{ ...glassBright, color: "#d8b4fe", border: "1px solid rgba(216,180,254,0.34)", boxShadow: "0 0 24px rgba(168,85,247,0.16)" }}
            >
              <Search size={16} /> Run system audit
            </a>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-8 justify-center md:justify-start">
            {[
              { n: 2, suf: "", label: "Core Offers" },
              { n: 4, suf: " hrs", label: "Fastest Launch" },
              { n: 100, suf: "%", label: "Human Review" },
            ].map(({ n, suf, label }) => (
              <div key={label} className="flex flex-col items-center md:items-start">
                <div className="text-2xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", background: "linear-gradient(120deg, #93c5fd, #c4b5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  <Counter to={n} suffix={suf} />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-blue-100/75">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: floating dashboard mockup */}
        <div className="relative h-[420px] hidden md:block">
          {/* Main screen */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] rounded-2xl overflow-hidden"
            style={{ ...glassBright, boxShadow: "0 0 60px rgba(59,130,246,0.30), 0 20px 60px rgba(0,0,0,0.7)", border: "1px solid rgba(59,130,246,0.3)" }}
          >
            {/* Browser bar */}
            <div className="flex items-center gap-1.5 px-3 py-2.5 border-b" style={{ borderColor: "rgba(59,130,246,0.15)", background: "rgba(0,0,0,0.4)" }}>
              <span className="w-2 h-2 rounded-full bg-red-500/60" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/60" />
              <span className="w-2 h-2 rounded-full bg-green-500/60" />
              <div className="flex-1 ml-2 h-4 rounded-md bg-white/5 flex items-center justify-center">
                <span className="text-[8px] text-white/25">alterlabs.in/system</span>
              </div>
            </div>
            {/* Page content simulation */}
            <div className="p-3 space-y-2.5" style={{ background: "linear-gradient(180deg, rgba(15,23,60,0.9) 0%, rgba(8,12,40,0.9) 100%)" }}>
              {/* Hero block */}
              <div className="h-16 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.3), rgba(124,58,237,0.2))" }}>
                <div className="text-center space-y-1">
                  <div className="h-2 w-28 rounded bg-blue-300/30 mx-auto" />
                  <div className="h-1.5 w-20 rounded bg-blue-200/20 mx-auto" />
                </div>
              </div>
              {/* Cards row */}
              <div className="grid grid-cols-3 gap-1.5">
                {["#3b82f6", "#7c3aed", "#10b981"].map((c) => (
                  <div key={c} className="h-12 rounded-lg flex items-center justify-center" style={{ background: `${c}18`, border: `1px solid ${c}25` }}>
                    <div className="w-4 h-4 rounded" style={{ background: `${c}40` }} />
                  </div>
                ))}
              </div>
              {/* Text lines */}
              {[70, 90, 60].map((w, i) => (
                <div key={i} className="h-1.5 rounded bg-blue-200/10" style={{ width: `${w}%` }} />
              ))}
              {/* CTA button */}
              <div className="h-7 w-full rounded-lg flex items-center justify-center text-[9px] font-bold text-white" style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}>
                Website + CRM + WhatsApp →
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <FloatCard delay="0s" style={{ top: "4%", left: "0%" }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1877f2, #064ca1)" }}>
              <Facebook size={15} className="text-white" />
            </div>
            <div>
              <div className="text-[9px] text-blue-200/40 leading-none mb-0.5">Meta Ads</div>
              <div className="text-xs font-bold text-white">₹2,999</div>
            </div>
          </FloatCard>

          <FloatCard delay="0.6s" style={{ top: "4%", right: "-2%" }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #ea4335, #fbbc05)" }}>
              <Search size={15} className="text-white" />
            </div>
            <div>
              <div className="text-[9px] text-blue-200/40 leading-none mb-0.5">Google Ads</div>
              <div className="text-xs font-bold text-white">₹3,999</div>
            </div>
          </FloatCard>

          <FloatCard delay="1.2s" style={{ bottom: "24%", left: "-2%" }}>
            <div className="w-6 h-6 rounded-lg flex items-center justify-center bg-green-500/20">
              <MessageCircle size={12} className="text-green-400" />
            </div>
            <div>
              <div className="text-[9px] text-green-400/70 leading-none mb-0.5">New lead</div>
              <div className="text-[11px] font-semibold text-white">CRM routed</div>
            </div>
          </FloatCard>

          <FloatCard delay="1.8s" style={{ bottom: "10%", right: "-2%" }}>
            <TrendingUp size={15} className="text-blue-400" />
            <div>
              <div className="text-[9px] text-blue-300/50 leading-none mb-0.5">Today</div>
              <div className="text-[11px] font-bold text-white">Dashboard live</div>
            </div>
          </FloatCard>

          <FloatCard delay="0.3s" style={{ top: "44%", right: "-4%" }}>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={8} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <div className="text-[9px] text-blue-200/50">Human review ready</div>
          </FloatCard>

          <FloatCard delay="2.4s" style={{ top: "22%", left: "3%" }}>
            <Clock size={13} className="text-purple-400" />
            <div className="text-[10px] font-semibold text-white">Live in <span className="text-purple-400">4 hrs</span></div>
          </FloatCard>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-35 z-10">
        <span className="text-[9px] uppercase tracking-[0.2em] text-blue-300">Scroll</span>
        <ChevronDown size={13} className="text-blue-300 animate-bounce" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(0.3deg); }
          66% { transform: translateY(-4px) rotate(-0.3deg); }
        }
      `}</style>
    </section>
  );
}

// ─── MARQUEE TRUST BAR ────────────────────────────────────────────────────────

function MarqueeTrustBar() {
  const badges = [
    { icon: <Zap size={12} />, label: "4-Hour Website Launch" },
    { icon: <Globe size={12} />, label: "Domain + Hosting Included" },
    { icon: <MessageCircle size={12} />, label: "WhatsApp Lead Capture" },
    { icon: <Search size={12} />, label: "SEO Ready" },
    { icon: <Smartphone size={12} />, label: "Mobile First Design" },
    { icon: <Shield size={12} />, label: "Affordable for Startups" },
    { icon: <Award size={12} />, label: "Premium Quality" },
    { icon: <Users size={12} />, label: "Indian Business Focused" },
  ];

  const doubled = [...badges, ...badges];

  return (
    <div className="relative overflow-hidden py-5 border-y" style={{ borderColor: "rgba(59,130,246,0.1)", background: "rgba(6,12,36,0.7)" }}>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, rgba(6,12,36,0.95), transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(-90deg, rgba(6,12,36,0.95), transparent)" }} />

      <div className="flex gap-4" style={{ animation: "marquee 30s linear infinite", width: "max-content" }}>
        {doubled.map((b, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-semibold whitespace-nowrap"
            style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)", color: "#93c5fd" }}
          >
            <span className="text-blue-400">{b.icon}</span>
            {b.label}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ─── STATS STRIP ─────────────────────────────────────────────────────────────

function StatsStrip() {
  const stats = [
    { n: 50, suf: "+", label: "Launch Surfaces", icon: <Globe size={20} />, color: "#3b82f6" },
    { n: 4, suf: " hrs", label: "Fastest Delivery", icon: <Clock size={20} />, color: "#10b981" },
    { n: 100, suf: "%", label: "Mobile Responsive", icon: <Smartphone size={20} />, color: "#7c3aed" },
    { n: 10, suf: "", label: "System Practices", icon: <Layers size={20} />, color: "#f59e0b" },
    { n: 1, suf: "", label: "Build Owner", icon: <Shield size={20} />, color: "#ec4899" },
  ];

  return (
    <section className="py-14 relative" style={{ background: "linear-gradient(90deg, rgba(37,99,235,0.04) 0%, rgba(124,58,237,0.04) 100%)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center p-5 rounded-2xl transition-all hover:-translate-y-0.5"
              style={{ ...glass, boxShadow: `0 4px 20px rgba(0,0,0,0.3)` }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}18`, color: s.color }}>
                {s.icon}
              </div>
              <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Rajdhani', sans-serif", color: s.color }}>
                <Counter to={s.n} suffix={s.suf} />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-blue-200/40">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SYSTEMS / OLD CONTENT MERGE ─────────────────────────────────────────────

function CoreOffers() {
  const offers = [
    {
      href: "/services/crm-automation-india.html",
      title: "CRM automation for service teams",
      body: "Capture, qualify, route and follow up with every enquiry from one operating pipeline.",
      color: "#c084fc",
      icon: <Target size={18} />,
    },
    {
      href: "/services/business-website-development-india.html",
      title: "Business websites that capture demand",
      body: "Conversion-focused websites with clear offers, WhatsApp paths, analytics and SEO structure.",
      color: "#60a5fa",
      icon: <Globe size={18} />,
    },
    {
      href: "/bns/",
      title: "BNS: Business Network System",
      body: "Connect website, CRM, WhatsApp, content, dashboards, automation and AI into one operating network.",
      color: "#a78bfa",
      icon: <Layers size={18} />,
    },
    {
      href: "/services/workflow-automation-india.html",
      title: "Workflow automation",
      body: "Connect forms, WhatsApp, email, CRM and internal approvals without losing human control.",
      color: "#34d399",
      icon: <RefreshCw size={18} />,
    },
    {
      href: "/services/revops-dashboard-india.html",
      title: "Reporting and RevOps dashboards",
      body: "Give owners and operators a daily view of leads, pipeline, follow-up and revenue movement.",
      color: "#f59e0b",
      icon: <BarChart2 size={18} />,
    },
  ];

  return (
    <section className="border-y py-20" style={{ borderColor: "rgba(147,197,253,0.12)", background: "rgba(8,13,35,0.54)" }} aria-labelledby="core-offers-title">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="max-w-3xl mb-10">
          <SectionTag color="#c084fc">Business starting points</SectionTag>
          <h2 id="core-offers-title" className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Choose the outcome your team needs first.
          </h2>
          <p className="text-blue-100/80 text-sm md:text-base leading-relaxed">
            Start with the pressure you can already feel: missed enquiries, weak website conversion, slow follow-up or reporting that takes too much manual effort. Each path explains what we build, what it costs and how the first release moves you closer to a cleaner sales system.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {offers.map((offer) => (
            <a key={offer.href} href={offer.href} data-analytics-event="service_page_cta_click" className="group block rounded-lg border p-5 transition-transform hover:-translate-y-1" style={{ ...glass, borderColor: `${offer.color}38` }}>
              <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg" style={{ color: offer.color, background: `${offer.color}18` }}>
                {offer.icon}
              </span>
              <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{offer.title}</h3>
              <p className="mt-2 text-[12px] leading-relaxed text-blue-100/80">{offer.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold" style={{ color: offer.color }}>
                View service <ArrowRight size={13} />
              </span>
            </a>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-blue-100/80">
          <span className="font-bold text-white">Common problems:</span>
          <a className="font-semibold text-purple-300 hover:text-white" href="/audit/system-audit.html" data-analytics-event="audit_page_click">System audit</a>
          <a className="font-semibold text-purple-300 hover:text-white" href="/bns/">Business Network System</a>
          <a className="font-semibold text-purple-300 hover:text-white" href="/solutions/whatsapp-lead-follow-up-automation.html">WhatsApp lead follow-up</a>
          <a className="font-semibold text-purple-300 hover:text-white" href="/solutions/missed-lead-follow-up-service-businesses.html">Missed lead recovery</a>
          <a className="font-semibold text-purple-300 hover:text-white" href="/proof/">Proof signals</a>
        </div>
      </div>
    </section>
  );
}

function SystemsSignalGraphic() {
  const nodes = [
    { label: "Website", icon: <Globe size={15} />, color: "#3b82f6", x: "5%", y: "18%" },
    { label: "Content", icon: <FileText size={15} />, color: "#c084fc", x: "58%", y: "8%" },
    { label: "CRM", icon: <Target size={15} />, color: "#7c3aed", x: "22%", y: "58%" },
    { label: "Dashboard", icon: <BarChart2 size={15} />, color: "#10b981", x: "68%", y: "58%" },
  ];

  return (
    <div
      className="mt-8 hidden lg:block overflow-hidden rounded-2xl p-4"
      style={{ ...glassBright, boxShadow: "0 18px 60px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.08)" }}
    >
      <div className="relative h-56">
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(147,197,253,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.12) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 220" fill="none" aria-hidden="true">
          <path d="M82 58 C160 18 230 28 305 42" stroke="url(#signalA)" strokeWidth="1.4" strokeDasharray="6 8" />
          <path d="M96 70 C130 122 176 146 216 150" stroke="url(#signalB)" strokeWidth="1.4" strokeDasharray="6 8" />
          <path d="M266 62 C306 112 312 135 332 152" stroke="url(#signalC)" strokeWidth="1.4" strokeDasharray="6 8" />
          <path d="M164 156 C214 188 280 188 334 158" stroke="url(#signalD)" strokeWidth="1.4" strokeDasharray="6 8" />
          <defs>
            <linearGradient id="signalA" x1="82" y1="58" x2="305" y2="42"><stop stopColor="#3b82f6" /><stop offset="1" stopColor="#c084fc" /></linearGradient>
            <linearGradient id="signalB" x1="96" y1="70" x2="216" y2="150"><stop stopColor="#3b82f6" /><stop offset="1" stopColor="#7c3aed" /></linearGradient>
            <linearGradient id="signalC" x1="266" y1="62" x2="332" y2="152"><stop stopColor="#c084fc" /><stop offset="1" stopColor="#10b981" /></linearGradient>
            <linearGradient id="signalD" x1="164" y1="156" x2="334" y2="158"><stop stopColor="#7c3aed" /><stop offset="1" stopColor="#10b981" /></linearGradient>
          </defs>
        </svg>
        {nodes.map((node) => (
          <div
            key={node.label}
            className="absolute rounded-2xl px-3 py-2.5"
            style={{
              left: node.x,
              top: node.y,
              background: "rgba(3,5,15,0.74)",
              border: `1px solid ${node.color}45`,
              boxShadow: `0 0 28px ${node.color}22`,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ color: node.color, background: `${node.color}16` }}>
                {node.icon}
              </span>
              <span className="text-[11px] font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{node.label}</span>
            </div>
          </div>
        ))}
        <div className="absolute bottom-3 left-4 right-4 rounded-xl px-4 py-3" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.14), rgba(124,58,237,0.12))", border: "1px solid rgba(147,197,253,0.16)" }}>
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-blue-200/45">operating loop</span>
            <span className="h-px flex-1 bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-emerald-400/40" />
            <span className="text-[10px] font-bold text-emerald-300">live</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemsStack() {
  const layers = [
    {
      icon: <Layers size={20} />,
      title: "Business Network System",
      body: "The connected layer across website, CRM, WhatsApp, content, dashboards, automation and AI so the business runs as one network.",
      tags: ["BNS", "AI-ready", "system"],
      color: "#a78bfa",
    },
    {
      icon: <Globe size={20} />,
      title: "Conversion website development",
      body: "Marketing sites, landing pages and product surfaces built with lead capture, SEO structure, analytics and real handoff workflows.",
      tags: ["SEO", "lead forms", "analytics"],
      color: "#3b82f6",
    },
    {
      icon: <PenTool size={20} />,
      title: "Content generation",
      body: "Website copy, service pages, captions, blog drafts, ad angles and SEO metadata shaped around the same offer strategy.",
      tags: ["copy", "SEO", "offers"],
      color: "#c084fc",
    },
    {
      icon: <Target size={20} />,
      title: "CRM automation",
      body: "Lead capture, routing, scoring, follow-up reminders and account views shaped around how your team actually sells.",
      tags: ["pipelines", "routing", "CRM hygiene"],
      color: "#7c3aed",
    },
    {
      icon: <BarChart2 size={20} />,
      title: "RevOps dashboards",
      body: "Operational, sales and finance views that surface the few numbers that actually change decisions.",
      tags: ["RevOps", "ops", "alerts"],
      color: "#10b981",
    },
    {
      icon: <RefreshCw size={20} />,
      title: "Automation workflows",
      body: "Forms, WhatsApp, email, CRM and dashboards connected through reliable workflows with manual fallback paths.",
      tags: ["n8n", "Zapier", "webhooks"],
      color: "#f59e0b",
    },
    {
      icon: <Cpu size={20} />,
      title: "AI workflow assistants",
      body: "Classifiers, enrichers, drafters and internal assistants embedded into your workflow with human review.",
      tags: ["LLM", "RAG", "review"],
      color: "#ec4899",
    },
    {
      icon: <Wrench size={20} />,
      title: "Internal tools",
      body: "Quote, intake, booking, approval and inventory flows turned into clean internal tools your team can operate.",
      tags: ["portals", "approvals", "inventory"],
      color: "#14b8a6",
    },
  ];

  return (
    <section id="systems" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 70% 60% at 18% 40%, rgba(59,130,246,0.08) 0%, transparent 64%), radial-gradient(ellipse 60% 50% at 82% 70%, rgba(124,58,237,0.07) 0%, transparent 60%)",
      }} />
      <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div className="lg:sticky lg:top-24">
            <SectionTag color="#c084fc">Two core offers, one operating system</SectionTag>
            <h2 className="text-3xl md:text-[2.8rem] font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Start with CRM automation or a conversion-focused website.
            </h2>
            <h3 className="text-2xl md:text-[2.3rem] font-bold leading-tight mb-6" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <GradText from="#c084fc" to="#60a5fa">Add dashboards, content and AI only where the workflow needs them.</GradText>
            </h3>
            <p className="text-blue-100/80 text-sm leading-[1.9] max-w-lg">
              Most teams need one of two fixes first: a website that turns attention into enquiries, or a CRM workflow that makes sure every enquiry gets captured, assigned and followed up. Dashboards, content and AI come in when they make that path easier to run.
            </p>
            <SystemsSignalGraphic />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {layers.map((item) => (
              <GlowCard key={item.title} color={item.color} className="p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}28` }}>
                    {item.icon}
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {item.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wider" style={{ color: item.color, background: `${item.color}12`, border: `1px solid ${item.color}22` }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.1rem" }}>{item.title}</h3>
                  <p className="text-[12px] text-blue-100/55 leading-relaxed">{item.body}</p>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PRICING ─────────────────────────────────────────────────────────────────

type Product = {
  icon: React.ReactNode;
  name: string;
  price: string;
  unit?: string;
  delivery: string;
  features: string[];
  customerOutcome: string;
  bestFor: string;
  purchaseNote: string;
  highlight?: boolean;
  accentColor: string;
  badge?: string;
};

const products: Product[] = [
  {
    icon: <Globe size={22} />,
    name: "Starter Website Pack",
    price: "₹3,500",
    delivery: "Same day / 4 hours",
    accentColor: "#3b82f6",
    badge: "Best for New Businesses",
    features: ["1-page business website", "Domain + hosting for 1 year", "Mobile responsive design", "Basic SEO setup", "WhatsApp lead button", "Google Map integration"],
    customerOutcome: "Launch a credible online presence and turn local interest into calls or WhatsApp enquiries.",
    bestFor: "New businesses, local services and professionals that need to go live quickly.",
    purchaseNote: "A focused one-page launch with the essentials included.",
  },
  {
    icon: <Monitor size={22} />,
    name: "Business Website + Lead System",
    price: "₹7,500",
    delivery: "2–3 days",
    highlight: true,
    accentColor: "#7c3aed",
    badge: "Most Popular",
    features: ["Up to 5 pages", "Premium design", "Lead form + WhatsApp", "Basic CRM-ready lead flow", "Contact page", "Service/product sections"],
    customerOutcome: "Explain your services clearly and route every enquiry into one follow-up path.",
    bestFor: "Growing service teams that need multiple pages, lead capture and CRM readiness.",
    purchaseNote: "The best balance of credibility, lead generation and future scalability.",
  },
  {
    icon: <ShoppingBag size={22} />,
    name: "E-Commerce Starter Pack",
    price: "₹14,999",
    delivery: "5–7 days",
    accentColor: "#f59e0b",
    features: ["Product listing website", "Up to 20 products", "Cart / WhatsApp order flow", "Payment gateway guidance", "Mobile friendly", "Basic SEO + analytics"],
    customerOutcome: "Show products clearly and let customers order through a cart or WhatsApp flow.",
    bestFor: "Small catalogs and businesses starting online sales without a complex store.",
    purchaseNote: "Start with up to 20 products and expand after validating demand.",
  },
  {
    icon: <Target size={22} />,
    name: "Landing Page for Ads",
    price: "₹2,999",
    delivery: "Same day",
    accentColor: "#10b981",
    badge: "High Converting",
    features: ["High-converting landing page", "Lead capture form", "WhatsApp CTA", "Fast loading design", "Ad campaign tracking ready"],
    customerOutcome: "Turn paid clicks into one focused enquiry, booking or purchase action.",
    bestFor: "Meta or Google campaigns promoting one offer to one audience.",
    purchaseNote: "A fast-loading campaign page with tracking-ready lead capture.",
  },
  {
    icon: <Facebook size={22} />,
    name: "Meta Ads Setup",
    price: "₹2,999",
    delivery: "1–2 days",
    accentColor: "#3b82f6",
    features: ["Campaign setup", "Audience targeting", "Creative direction", "Lead form setup", "Pixel guidance", "Ad copywriting"],
    customerOutcome: "Reach the right local audience with a campaign structured to generate enquiries.",
    bestFor: "Service businesses starting or restructuring Meta lead campaigns.",
    purchaseNote: "Includes campaign setup, targeting, lead form and ad copy.",
  },
  {
    icon: <Search size={22} />,
    name: "Google Search Ads",
    price: "₹3,999",
    delivery: "1–2 days",
    accentColor: "#ea4335",
    features: ["Keyword research", "Campaign setup", "Ad copy", "Location targeting", "Call extension", "Lead tracking guidance"],
    customerOutcome: "Appear when buyers actively search for your service in the target location.",
    bestFor: "High-intent local services with clear keywords and service areas.",
    purchaseNote: "Includes keyword research, ad copy and tracking guidance.",
  },
  {
    icon: <Image size={22} />,
    name: "Social Media Creatives",
    price: "₹999",
    unit: "onwards",
    delivery: "24 hours",
    accentColor: "#ec4899",
    features: ["Instagram/Facebook posts", "Offer creatives", "Business announcements", "Festival creatives", "Ad-ready creatives"],
    customerOutcome: "Keep offers, announcements and campaigns visually consistent and ready to publish.",
    bestFor: "Businesses needing social posts, promotional graphics or ad creatives.",
    purchaseNote: "Flexible creative packs starting from ₹999.",
  },
  {
    icon: <FileText size={22} />,
    name: "Content Generation Pack",
    price: "₹1,999",
    unit: "onwards",
    delivery: "24-48 hours",
    accentColor: "#c084fc",
    badge: "Copy + SEO",
    features: ["Website copy blocks", "Service descriptions", "SEO titles + meta descriptions", "Blog / guide draft", "Ad and social captions", "Human review ready"],
    customerOutcome: "Turn your expertise into clear website, blog, advertising and social content.",
    bestFor: "Teams that understand their offer but need consistent content production.",
    purchaseNote: "Human-reviewed drafts aligned with your real service and audience.",
  },
  {
    icon: <Wrench size={22} />,
    name: "Website Maintenance Pack",
    price: "₹5,000",
    unit: "/year",
    delivery: "Ongoing",
    accentColor: "#6366f1",
    features: ["10 website updates/year", "Content changes", "Image updates", "Offer changes", "Basic support + checks"],
    customerOutcome: "Keep your website accurate, current and conversion-ready throughout the year.",
    bestFor: "Businesses that need regular text, image and offer changes.",
    purchaseNote: "Includes 10 planned updates plus basic support and checks.",
  },
  {
    icon: <RefreshCw size={22} />,
    name: "Extra Website Update",
    price: "₹900",
    unit: "/update",
    delivery: "Same day",
    accentColor: "#14b8a6",
    features: ["Text / image / section update", "Offer change", "Small content correction"],
    customerOutcome: "Fix one important text, image, offer or section without a maintenance plan.",
    bestFor: "Small same-day changes with a clear and contained scope.",
    purchaseNote: "Useful for urgent corrections, new offers or seasonal updates.",
  },
];

function PriceCard({ p }: { p: Product }) {
  return (
    <div
      className="relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1.5 group cursor-default"
      style={{
        background: p.highlight
          ? "linear-gradient(155deg, rgba(20,15,60,0.95) 0%, rgba(12,8,40,0.95) 100%)"
          : "rgba(6,12,36,0.78)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${p.highlight ? p.accentColor + "50" : "rgba(59,130,246,0.14)"}`,
        boxShadow: p.highlight
          ? `0 0 60px ${p.accentColor}20, 0 8px 40px rgba(0,0,0,0.5)`
          : "0 4px 24px rgba(0,0,0,0.35)",
      }}
    >
      {/* Hover top beam */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-px opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full"
        style={{ width: "65%", background: `linear-gradient(90deg, transparent, ${p.accentColor}, transparent)`, boxShadow: `0 0 10px ${p.accentColor}` }}
      />

      {/* Badge */}
      {p.badge && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap"
          style={{ background: p.highlight ? `linear-gradient(90deg, ${p.accentColor}, #3b82f6)` : `${p.accentColor}22`, color: p.highlight ? "#fff" : p.accentColor, border: p.highlight ? "none" : `1px solid ${p.accentColor}40` }}
        >
          {p.badge}
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300" style={{ background: `${p.accentColor}18`, color: p.accentColor, border: `1px solid ${p.accentColor}28` }}>
        {p.icon}
      </div>

      {/* Name & price */}
      <div>
        <h3 className="font-bold text-white mb-1.5" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.05rem" }}>{p.name}</h3>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[1.75rem] font-bold leading-none" style={{ fontFamily: "'Rajdhani', sans-serif", color: p.accentColor }}>{p.price}</span>
          {p.unit && <span className="text-xs text-blue-200/35">{p.unit}</span>}
        </div>
        <div className="flex items-center gap-1 mt-1 text-[10px] text-blue-200/35">
          <Zap size={9} style={{ color: p.accentColor }} /> Delivery: {p.delivery}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.accentColor}30, transparent)` }} />

      {/* Features */}
      <ul className="flex flex-col gap-2 flex-1">
        {p.features.map(f => (
          <li key={f} className="flex items-start gap-2 text-[12px] text-blue-100/65">
            <div className="mt-0.5 shrink-0 w-4 h-4 rounded flex items-center justify-center" style={{ background: `${p.accentColor}18` }}>
              <Check size={10} style={{ color: p.accentColor }} />
            </div>
            {f}
          </li>
        ))}
      </ul>

      <div
        className="rounded-xl p-3.5 space-y-3"
        style={{
          background: `linear-gradient(145deg, ${p.accentColor}12, rgba(3,5,15,0.28))`,
          border: `1px solid ${p.accentColor}22`,
          boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 24px ${p.accentColor}0d`,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ background: `${p.accentColor}18`, color: p.accentColor }}>
            <TrendingUp size={13} />
          </div>
          <div>
            <div className="text-[9px] uppercase tracking-[0.18em] text-blue-200/35">What this helps you achieve</div>
            <div className="text-[11px] font-semibold leading-snug text-blue-50/78">{p.customerOutcome}</div>
          </div>
        </div>
        <div className="rounded-xl px-3 py-2" style={{ background: "rgba(255,255,255,0.035)" }}>
          <div className="text-[9px] uppercase tracking-[0.16em] text-blue-200/28">Best for</div>
          <div className="mt-1 text-[11px] leading-snug text-blue-100/62">{p.bestFor}</div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-blue-200/45">
          <Shield size={11} style={{ color: p.accentColor }} />
          <span>{p.purchaseNote}</span>
        </div>
      </div>

      {/* CTA */}
      <a
        href={WA_LINK} target="_blank" rel="noopener noreferrer"
        className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all hover:scale-105"
        style={p.highlight
          ? { background: `linear-gradient(135deg, ${p.accentColor}, #2563eb)`, color: "#fff", boxShadow: `0 0 20px ${p.accentColor}40` }
          : { background: `${p.accentColor}14`, color: p.accentColor, border: `1px solid ${p.accentColor}28` }
        }
      >
        <MessageCircle size={12} /> Ask About This Package
      </a>
    </div>
  );
}

function Pricing() {
  return (
    <section id="products" className="py-24 relative">
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "radial-gradient(rgba(99,179,237,1) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }} />
      <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
        <div className="text-center mb-14">
          <SectionTag color="#7c3aed">Products & Pricing</SectionTag>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Clear Products, Real Prices
          </h2>
          <p className="text-blue-200/45 max-w-xl mx-auto text-sm leading-relaxed">
            Choose a straightforward starting package with a clear price, delivery window and outcome. Add CRM, content or automation only when the business needs it.
          </p>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-3">
          {[
            { icon: <Check size={15} />, title: "Clear scope", body: "Know what is included, how long delivery takes and what the package costs before work starts." },
            { icon: <Target size={15} />, title: "Built to convert", body: "Every package gives customers a simple path to call, WhatsApp, enquire or purchase." },
            { icon: <TrendingUp size={15} />, title: "Ready to grow", body: "Start with what you need today and connect CRM, content or automation as the business grows." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl p-4" style={{ ...glass, boxShadow: "0 8px 30px rgba(0,0,0,0.24)" }}>
              <div className="mb-2 flex items-center gap-2 text-blue-100">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/12 text-blue-300">{item.icon}</span>
                <span className="text-sm font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{item.title}</span>
              </div>
              <p className="text-[12px] leading-relaxed text-blue-200/45">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map(p => <PriceCard key={p.name} p={p} />)}
        </div>

        <div className="mt-10 text-center">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #059669, #10b981)", boxShadow: "0 0 36px rgba(16,185,129,0.32)" }}>
            <MessageCircle size={16} /> Not sure which? Chat with us on WhatsApp →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { n: "01", title: "Share the messy brief", body: "Tell us what you sell, how leads arrive, and where the workflow currently breaks.", color: "#3b82f6", icon: <MessageCircle size={20} /> },
    { n: "02", title: "We map the system", body: "We shape the offer, page structure, lead path, CRM handoff and tracking before the screen is built.", color: "#7c3aed", icon: <Layers size={20} /> },
    { n: "03", title: "Website goes live", body: "Deployed with mobile-first design, domain/hosting guidance, WhatsApp CTA, SEO basics and analytics.", color: "#f59e0b", icon: <Globe size={20} /> },
    { n: "04", title: "Operations improve", body: "Leads move into the right CRM, dashboard, automation or human review flow as the business grows.", color: "#10b981", icon: <TrendingUp size={20} /> },
  ];

  return (
    <section id="how" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
        <div className="text-center mb-14">
          <SectionTag color="#3b82f6">Process</SectionTag>
          <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            How It <GradText>Works</GradText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {/* Connector line desktop */}
          <div className="absolute top-14 left-[12%] right-[12%] h-px hidden lg:block" style={{ background: "linear-gradient(90deg, rgba(59,130,246,0.3), rgba(124,58,237,0.3), rgba(245,158,11,0.3), rgba(16,185,129,0.3))" }} />

          {steps.map((s, i) => (
            <GlowCard key={s.n} color={s.color} className="p-6 flex flex-col items-center text-center gap-4">
              {/* Numbered orb */}
              <div
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center z-10"
                style={{ background: `linear-gradient(135deg, ${s.color}25, ${s.color}10)`, border: `1px solid ${s.color}40`, boxShadow: `0 0 28px ${s.color}25` }}
              >
                <span className="text-xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", color: s.color }}>{s.n}</span>
                {/* Connector arrow */}
                {i < 3 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 hidden lg:flex items-center justify-center" style={{ color: s.color, opacity: 0.5 }}>
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ color: s.color, background: `${s.color}14` }}>
                {s.icon}
              </div>
              <h3 className="font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{s.title}</h3>
              <p className="text-[12px] text-blue-200/45 leading-relaxed">{s.body}</p>
            </GlowCard>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", boxShadow: "0 0 30px rgba(59,130,246,0.35)" }}>
            Start Today <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── INDUSTRIES ───────────────────────────────────────────────────────────────

function Industries() {
  const items = [
    { icon: "🛋️", label: "Interior & Furniture", color: "#f59e0b" },
    { icon: "🏠", label: "Real Estate", color: "#3b82f6" },
    { icon: "💰", label: "Loan & Finance", color: "#10b981" },
    { icon: "💧", label: "Water Plant", color: "#06b6d4" },
    { icon: "⚙️", label: "Manufacturing", color: "#6366f1" },
    { icon: "🍽️", label: "Restaurants", color: "#ef4444" },
    { icon: "💪", label: "Gyms & Salons", color: "#ec4899" },
    { icon: "🏪", label: "Local Shops", color: "#f97316" },
    { icon: "👔", label: "Consultants", color: "#8b5cf6" },
    { icon: "📚", label: "Coaching Institutes", color: "#14b8a6" },
  ];

  return (
    <section id="industries" className="py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <SectionTag color="#10b981">Industries We Serve</SectionTag>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Built for <GradText from="#34d399" to="#60a5fa">Every Sector</GradText>
          </h2>
          <p className="text-blue-200/45 text-sm max-w-md mx-auto">
            From local shops to service businesses and manufacturers, we build lead capture and operating systems for Indian businesses of all kinds.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {items.map(item => (
            <GlowCard
              key={item.label}
              color={item.color}
              className="p-5 flex flex-col items-center gap-3 text-center cursor-default"
            >
              <div className="text-4xl transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
              <div className="w-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${item.color}50, transparent)` }} />
              <span className="text-[11px] font-semibold text-blue-100/65 group-hover:text-white transition-colors leading-tight">{item.label}</span>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────

function Portfolio() {
  const demos = [
    { label: "Modera Interiors", tag: "Interior website + content", color: "#c084fc", icon: <Palette size={30} />, from: "from-purple-900/30", to: "to-fuchsia-900/20" },
    { label: "Content generation system", tag: "Copy + SEO workflow", color: "#38bdf8", icon: <FileText size={30} />, from: "from-sky-900/30", to: "to-blue-900/20" },
    { label: "altercraft.in", tag: "Live website", color: "#f59e0b", icon: "🛋️", from: "from-amber-900/30", to: "to-orange-900/20" },
    { label: "Lead-tracking CRM", tag: "CRM routing", color: "#3b82f6", icon: "💰", from: "from-blue-900/30", to: "to-cyan-900/20" },
    { label: "Ops dashboard", tag: "RevOps view", color: "#6366f1", icon: "⚙️", from: "from-indigo-900/30", to: "to-purple-900/20" },
    { label: "Automation workflow", tag: "Forms to CRM", color: "#10b981", icon: "💧", from: "from-emerald-900/30", to: "to-teal-900/20" },
    { label: "E-Commerce Website", tag: "E-Commerce Pack", color: "#ec4899", icon: "🛍️", from: "from-pink-900/30", to: "to-rose-900/20" },
    { label: "Landing Page for Ads", tag: "Landing Page", color: "#7c3aed", icon: "🎯", from: "from-purple-900/30", to: "to-violet-900/20" },
  ];

  return (
    <section id="portfolio" className="py-24" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(8,15,40,0.4) 50%, transparent 100%)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <SectionTag color="#7c3aed">Portfolio</SectionTag>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            What We <GradText from="#a78bfa" to="#60a5fa">Build</GradText>
          </h2>
          <p className="text-blue-200/45 text-sm">Mobile-first pages, content systems, CRM flows, dashboards and automations built to turn visitors into usable business data.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {demos.map(d => (
            <GlowCard key={d.label} color={d.color} className="overflow-hidden">
              {/* Mock screenshot */}
              <div className={`h-48 bg-gradient-to-br ${d.from} ${d.to} relative overflow-hidden`}>
                {/* Scan lines overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.15) 5px, rgba(0,0,0,0.15) 6px)",
                }} />
                {/* Browser chrome */}
                <div className="absolute inset-3 rounded-xl overflow-hidden" style={{ background: "rgba(0,0,0,0.45)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-1 px-2 py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.4)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
                    <div className="flex-1 ml-2 h-2.5 rounded bg-white/5 flex items-center justify-center">
                      <span className="text-[7px] text-white/20">alterlabs.in</span>
                    </div>
                  </div>
                  <div className="p-2 space-y-1.5">
                    <div className="h-8 rounded-lg w-full" style={{ background: `linear-gradient(135deg, ${d.color}25, ${d.color}12)` }} />
                    <div className="grid grid-cols-3 gap-1">
                      {[...Array(3)].map((_, i) => <div key={i} className="h-5 rounded" style={{ background: `${d.color}18` }} />)}
                    </div>
                    <div className="h-1.5 w-3/4 rounded bg-white/8" />
                    <div className="h-1.5 w-full rounded bg-white/5" />
                    <div className="h-5 w-1/2 rounded-lg" style={{ background: `${d.color}35` }} />
                  </div>
                </div>
                <div
                  className="absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-2xl select-none"
                  style={{
                    color: d.color,
                    background: "rgba(3,5,15,0.46)",
                    border: `1px solid ${d.color}28`,
                    boxShadow: `0 0 28px ${d.color}20`,
                  }}
                >
                  {d.icon}
                </div>
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{d.label}</div>
                  <div className="text-[10px] font-semibold mt-0.5" style={{ color: d.color }}>{d.tag}</div>
                </div>
                <a
                  href={WA_LINK} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[10px] font-bold transition-all hover:scale-105"
                  style={{ background: `${d.color}16`, color: d.color, border: `1px solid ${d.color}28` }}
                >
                  Get Similar <ExternalLink size={9} />
                </a>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  const reviews = [
    { name: "Website launch", biz: "Starter and business packs", text: "Useful when a business needs a clean online surface, WhatsApp lead capture and basic SEO without a long agency cycle.", stars: 5, color: "#f59e0b" },
    { name: "Lead system", biz: "CRM and routing layer", text: "Useful when enquiries are scattered across forms, WhatsApp, calls and spreadsheets, and the team needs one follow-up path.", stars: 5, color: "#3b82f6" },
    { name: "Ops view", biz: "Dashboard and reporting layer", text: "Useful when owners need daily visibility into leads, pipeline, tasks, revenue or inventory without chasing manual updates.", stars: 5, color: "#10b981" },
    { name: "Automation assist", biz: "AI and workflow layer", text: "Useful when repeat steps can be classified, drafted, routed or reviewed faster while humans still control the final decision.", stars: 5, color: "#7c3aed" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.07) 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
        <div className="text-center mb-14">
          <SectionTag color="#ec4899">Engagement Snapshots</SectionTag>
          <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Pick the entry point, then <GradText from="#f472b6" to="#a78bfa">grow the system</GradText>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((r) => (
            <GlowCard key={r.name} color={r.color} className="p-6 flex flex-col gap-4">
              {/* Use-case label */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ color: r.color, background: `${r.color}16`, border: `1px solid ${r.color}30` }}>
                  use case
                </span>
              </div>
              {/* Quote */}
              <p className="text-sm text-blue-100/70 leading-relaxed" style={{ fontFamily: "'Manrope', sans-serif" }}>
                "{r.text}"
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "rgba(59,130,246,0.1)" }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ background: `${r.color}22`, color: r.color, border: `1px solid ${r.color}35` }}>
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{r.name}</div>
                  <div className="text-[10px] text-blue-200/40">{r.biz}</div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY ALTERLABS ────────────────────────────────────────────────────────────

function WhyAlterLabs() {
  const points = [
    { icon: <Zap size={18} />, title: "Fast Entry", body: "Start with a clear website, landing page or ad-ready surface when speed matters.", color: "#f59e0b", val: 4, suf: "hrs" },
    { icon: <Shield size={18} />, title: "Transparent Pricing", body: "Entry products show clear prices, while deeper systems are scoped before build.", color: "#3b82f6", val: 0, suf: "" },
    { icon: <Target size={18} />, title: "Lead-Focused", body: "Every page is connected to a lead path, not just a visual presentation.", color: "#10b981", val: 0, suf: "" },
    { icon: <Smartphone size={18} />, title: "Mobile-First", body: "The first experience is built for the phone screen where most buyers start.", color: "#ec4899", val: 100, suf: "%" },
    { icon: <MapPin size={18} />, title: "Built for India", body: "Content, WhatsApp behaviour, local search and pricing are shaped for Indian buyers.", color: "#f97316", val: 0, suf: "" },
    { icon: <MessageCircle size={18} />, title: "WhatsApp Ready", body: "Direct chat CTAs make enquiries easier to capture and route.", color: "#22c55e", val: 0, suf: "" },
    { icon: <Search size={18} />, title: "SEO Structured", body: "Pages are organized with metadata, content hierarchy and search intent in mind.", color: "#7c3aed", val: 0, suf: "" },
    { icon: <Cpu size={18} />, title: "System Ready", body: "The same surface can grow into content, CRM, dashboard, automation and AI workflows.", color: "#06b6d4", val: 0, suf: "" },
  ];

  return (
    <section id="why" className="py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          <div className="sticky top-24">
            <SectionTag color="#3b82f6">Why AlterLabs</SectionTag>
            <h2 className="text-3xl md:text-[2.8rem] font-bold mb-6 leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <span className="block text-white">We don't just design pages.</span>
              <GradText from="#60a5fa" to="#a78bfa">We create connected business systems.</GradText>
            </h2>
            <p className="text-blue-100/80 text-sm leading-[1.9] max-w-md mb-8">
              From a one-page starter to CRM routing, dashboards and AI-assisted workflows, every AlterLabs build is designed around the operating path behind the screen.
            </p>

            {/* Mini highlight stats */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { n: 50, suf: "+", l: "Websites" },
                { n: 4, suf: "hr", l: "Delivery" },
                { n: 5, suf: "★", l: "Rating" },
              ].map(({ n, suf, l }) => (
                <div key={l} className="rounded-xl p-4 text-center" style={glass}>
                  <div className="text-xl font-bold text-blue-300" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    <Counter to={n} suffix={suf} />
                  </div>
                  <div className="text-[9px] uppercase tracking-widest text-blue-200/35 mt-0.5">{l}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", boxShadow: "0 0 28px rgba(59,130,246,0.3)" }}>
                <MessageCircle size={14} /> WhatsApp Us
              </a>
              <a href={PHONE} className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-105" style={{ ...glass, color: "#93c5fd" }}>
                <Phone size={14} /> Call Now
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {points.map(p => (
              <GlowCard key={p.title} color={p.color} className="p-4 flex flex-col gap-2.5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${p.color}18`, color: p.color }}>
                  {p.icon}
                </div>
                <div className="font-bold text-white text-sm" style={{ fontFamily: "'Rajdhani', sans-serif" }}>{p.title}</div>
                <div className="text-[11px] text-blue-200/45 leading-relaxed">{p.body}</div>
              </GlowCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── RESOURCES ────────────────────────────────────────────────────────────────

function Resources() {
  const systemLinks = [
    { title: "Build a Business Network System", href: "/bns/", desc: "Connect website, CRM, WhatsApp, content, dashboards, automation and AI into one operating layer.", color: "#a78bfa", icon: <Layers size={15} /> },
    { title: "Run the system audit", href: "/audit/system-audit.html", desc: "Send a structured brief about lead sources, tools, leaks, urgency and budget.", color: "#c084fc", icon: <Search size={15} /> },
    { title: "Review proof signals", href: "/proof/", desc: "See the operating evidence we use: handoffs, dashboards, fallback paths and human review.", color: "#60a5fa", icon: <Shield size={15} /> },
    { title: "Interior business path", href: "/industries/interior-design-crm-website.html", desc: "A customer journey for interiors, furniture and home-service lead operations.", color: "#ec4899", icon: <Palette size={15} /> },
    { title: "Decision notifications", href: "/systems/decision-notification-system.html", desc: "Route only the decisions that need attention so alerts become useful, not noisy.", color: "#34d399", icon: <Zap size={15} /> },
  ];

  const links = [
    { title: "Leads are getting missed", href: "/insights/#missed-leads", desc: "Follow a path from lead-pipeline diagnosis to CRM readiness and implementation.", color: "#ec4899" },
    { title: "Manual work is slowing the team", href: "/insights/#manual-work", desc: "Map the current system, decide what to automate and plan a reliable first workflow.", color: "#a78bfa" },
    { title: "Reporting cannot be trusted", href: "/insights/#untrusted-reporting", desc: "Move from decorative dashboards to metrics, owners and exception handling.", color: "#60a5fa" },
    { title: "We want to use AI safely", href: "/insights/#responsible-ai", desc: "Prepare the data, add human review and control permissions before scaling AI.", color: "#c084fc" },
    { title: "The website is not creating pipeline", href: "/insights/#website-pipeline", desc: "Repair lead capture, source attribution and the handoff from website to CRM.", color: "#14b8a6" },
  ];

  const pricingLinks = [
    { title: "Website for ₹3,000", href: "/blog/website-for-3000-rupees-india.html", desc: "What a ₹3,000-ish website budget can actually launch.", color: "#60a5fa" },
    { title: "Website for ₹500?", href: "/blog/website-for-500-rupees-india.html", desc: "What ₹500 can and cannot buy for a business website.", color: "#f472b6" },
    { title: "Business website ₹7,500", href: "/blog/business-website-price-7500-india.html", desc: "What should be included in a serious small business website.", color: "#a78bfa" },
    { title: "E-commerce ₹14,999", href: "/blog/ecommerce-website-price-14999-india.html", desc: "A practical product catalog and WhatsApp order path.", color: "#f59e0b" },
    { title: "Landing page ₹2,999", href: "/blog/landing-page-price-2999-india.html", desc: "When a focused campaign page beats a full website.", color: "#10b981" },
    { title: "Meta Ads ₹2,999", href: "/blog/meta-ads-setup-price-2999-india.html", desc: "Campaign, creative direction, lead forms and copy.", color: "#3b82f6" },
    { title: "Google Ads ₹3,999", href: "/blog/google-ads-setup-price-3999-india.html", desc: "Search intent, keywords, ad copy and landing page match.", color: "#ef4444" },
    { title: "Creatives from ₹999", href: "/blog/social-media-creatives-price-999-india.html", desc: "Offer creatives, announcements and ad-ready social posts.", color: "#ec4899" },
    { title: "Content from ₹1,999", href: "/blog/content-generation-price-1999-india.html", desc: "Website copy, blogs, captions and SEO metadata.", color: "#c084fc" },
    { title: "Maintenance ₹5,000/year", href: "/blog/website-maintenance-price-5000-india.html", desc: "What a yearly website update plan should include.", color: "#6366f1" },
    { title: "Website update ₹900", href: "/blog/website-update-price-900-india.html", desc: "When a small same-day content update is enough.", color: "#14b8a6" },
  ];

  return (
    <section id="resources" className="py-24 relative" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(8,15,40,0.35) 52%, transparent 100%)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <SectionTag color="#60a5fa">Choose Your Starting Point</SectionTag>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Start with the problem <GradText from="#60a5fa" to="#a78bfa">your team can already see</GradText>
          </h2>
          <p className="text-blue-200/45 max-w-xl mx-auto text-sm leading-relaxed">
            Pick one symptom and follow an ordered route from diagnosis to planning to a practical implementation option.
          </p>
          <a href="/insights/" className="mt-6 inline-flex items-center gap-2 rounded-xl border border-purple-300/20 bg-purple-400/10 px-5 py-3 text-sm font-bold text-purple-100 transition-colors hover:bg-purple-400/20">
            Find the right path <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {systemLinks.map((item) => (
            <a key={item.href} href={item.href} className="block" data-analytics-event={item.href.includes("/audit/") ? "audit_page_click" : "service_page_cta_click"}>
              <GlowCard color={item.color} className="p-4 h-full flex flex-col gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ color: item.color, background: `${item.color}16`, border: `1px solid ${item.color}24` }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1.5" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.05rem" }}>{item.title}</h3>
                  <p className="text-[11px] text-blue-100/52 leading-relaxed">{item.desc}</p>
                </div>
              </GlowCard>
            </a>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((item) => (
            <a key={item.href} href={item.href} className="block">
              <GlowCard color={item.color} className="p-5 h-full flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest" style={{ color: item.color, background: `${item.color}14`, border: `1px solid ${item.color}28` }}>
                    start path
                  </span>
                  <ExternalLink size={13} style={{ color: item.color }} />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-2" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1.1rem" }}>{item.title}</h3>
                  <p className="text-[12px] text-blue-100/55 leading-relaxed">{item.desc}</p>
                </div>
              </GlowCard>
            </a>
          ))}
        </div>

        <div className="mt-14">
          <div className="mb-6 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Popular pricing guides
            </h3>
            <p className="mt-2 text-sm text-blue-200/45">
              Four common starting budgets. The complete pricing library is available inside Insights.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pricingLinks.slice(0, 4).map((item) => (
              <a key={item.href} href={item.href} className="block">
                <GlowCard color={item.color} className="p-4 h-full flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest" style={{ color: item.color, background: `${item.color}14`, border: `1px solid ${item.color}28` }}>
                      pricing
                    </span>
                    <ExternalLink size={12} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1.5" style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "1rem" }}>{item.title}</h4>
                    <p className="text-[11px] text-blue-100/52 leading-relaxed">{item.desc}</p>
                  </div>
                </GlowCard>
              </a>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="/insights/#pricing" className="inline-flex items-center gap-2 text-sm font-bold text-purple-200 hover:text-white transition-colors">
              Compare every pricing guide <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOUNDER CTA ──────────────────────────────────────────────────────────────

function FounderCTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Mesh background */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(37,99,235,0.13) 0%, rgba(124,58,237,0.09) 40%, transparent 70%), #03050f",
      }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(99,179,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,1) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }} />

      {/* Neon top line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 10%, rgba(59,130,246,0.6) 50%, transparent 90%)" }} />

      <div className="max-w-4xl mx-auto px-5 md:px-10 text-center relative z-10">
        <SectionTag color="#10b981">Ready to Grow?</SectionTag>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          Need a cleaner digital system?
        </h2>
        <p className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
          <GradText from="#60a5fa" to="#34d399">Start with a priced product, then scale into CRM, dashboards and automation.</GradText>
        </p>
        <p className="text-blue-200/45 text-sm mb-10 max-w-lg mx-auto leading-relaxed">
          Send the messy version first. We will help shape the simplest entry point and the next system layer your business actually needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#products" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-sm transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)", boxShadow: "0 0 48px rgba(59,130,246,0.45)" }}>
            <Globe size={16} /> Book My Website
          </a>
          <a href={PHONE} className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all hover:scale-105" style={glass}>
            <Phone size={16} /> Call Now
          </a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #059669, #10b981)", boxShadow: "0 0 36px rgba(16,185,129,0.35)" }}>
            <MessageCircle size={16} /> WhatsApp Now
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  { q: "How fast can my website go live?", a: "The Starter Website Pack is designed for same-day launch after payment and content approval. Larger business and e-commerce builds take longer because they include more structure." },
  { q: "Is domain and hosting included?", a: "Yes. Domain registration and one year of hosting are included in the Starter and Business Website entry packs, subject to normal domain availability." },
  { q: "Can you run ads also?", a: "Yes. Meta Ads Setup starts at ₹2,999 and Google Search Ads starts at ₹3,999, including campaign setup, targeting, ad copy and tracking guidance." },
  { q: "Can you connect the website to CRM or dashboards?", a: "Yes. That is the core AlterLabs systems offer: lead capture, CRM routing, dashboards, automation workflows and AI-assisted review layers can be scoped after the entry build." },
  { q: "Can I update my website later?", a: "Yes. The Website Maintenance Pack is ₹5,000/year for 10 updates, or extra website updates can be handled at ₹900/update." },
  { q: "Can I use WhatsApp for leads?", a: "Every website pack includes a WhatsApp click-to-chat path. We can also help route those enquiries into a CRM or follow-up workflow." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(8,15,40,0.4) 50%, transparent 100%)" }}>
      <div className="max-w-3xl mx-auto px-5 md:px-10">
        <div className="text-center mb-14">
          <SectionTag color="#3b82f6">FAQ</SectionTag>
          <h2 className="text-3xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
            Got <GradText>Questions?</GradText>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden transition-all duration-200 hover:border-blue-500/25"
              style={{ ...glass, border: open === i ? "1px solid rgba(59,130,246,0.30)" : "1px solid rgba(59,130,246,0.12)" }}
            >
              <button
                id={`faq-trigger-${i}`}
                type="button"
                className="flex w-full items-center justify-between p-5 gap-4 text-left"
                aria-expanded={open === i}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold" style={{ background: "rgba(59,130,246,0.12)", color: "#93c5fd" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span className="text-sm font-semibold text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>{faq.q}</span>
                </div>
                <ChevronDown
                  size={15}
                  className="shrink-0 text-blue-400 transition-transform duration-300"
                  style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              {open === i && (
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className="px-5 pb-5 pt-4 text-sm text-blue-100/80 leading-[1.8] border-t"
                  style={{ borderColor: "rgba(59,130,246,0.12)", fontFamily: "'Manrope', sans-serif" }}
                >
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-blue-100/75 mb-4">Still have questions?</p>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #059669, #10b981)", boxShadow: "0 0 24px rgba(16,185,129,0.28)" }}>
            <MessageCircle size={14} /> Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const footerServices = [
    ["BNS", "/bns/"],
    ["Websites", "/services/business-website-development-india.html"],
    ["Landing Pages", "/blog/landing-page-price-2999-india.html"],
    ["Content Generation", "/blog/content-generation-price-1999-india.html"],
    ["CRM Automation", "/services/crm-automation-india.html"],
    ["Dashboards", "/services/revops-dashboard-india.html"],
    ["AI Workflows", "/systems/ai-workflow-automation-human-review.html"],
    ["Decision Notifications", "/systems/decision-notification-system.html"],
    ["Internal Tools", "/systems/internal-tools-service-businesses.html"],
    ["Maintenance", "/blog/website-maintenance-price-5000-india.html"],
  ];
  const footerIndustries = [
    ["Interior & Furniture", "/industries/interior-design-crm-website.html"],
    ["Real Estate", "/industries/real-estate-whatsapp-lead-follow-up.html"],
    ["Coaching", "/industries/coaching-consulting-crm-automation.html"],
    ["Restaurants", "/audit/system-audit.html"],
    ["Manufacturing", "/audit/system-audit.html"],
    ["Local Shops", "/audit/system-audit.html"],
    ["Finance", "/audit/system-audit.html"],
  ];

  return (
    <footer className="relative pt-16 pb-8 border-t" style={{ borderColor: "rgba(59,130,246,0.1)", background: "rgba(2,4,14,0.97)" }}>
      {/* Top neon line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 5%, rgba(59,130,246,0.5) 30%, rgba(124,58,237,0.5) 70%, transparent 95%)" }} />

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <LogoLockup compact />
            </div>
            <p className="text-[13px] text-blue-100/75 leading-[1.8] max-w-sm mb-3">
              CRM automation and conversion-focused websites for Indian service businesses, with dashboards, content and AI added where they improve the operating workflow.
            </p>
            <p className="text-xs text-blue-200/80 font-medium mb-1">alterlabs.in · hello@alterlabs.in</p>
            <p className="text-sm font-semibold" style={{ color: "#4ade80" }}>Start with the right entry product, then scale the system.</p>

            <div className="flex gap-3 mt-5">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #059669, #10b981)", boxShadow: "0 0 16px rgba(16,185,129,0.22)" }}>
                <MessageCircle size={12} /> WhatsApp
              </a>
              <a href={PHONE} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold" style={{ ...glass, color: "#93c5fd" }}>
                <Phone size={12} /> Call
              </a>
              <a href="/insights/" className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold" style={{ ...glass, color: "#c4b5fd" }}>
                <ExternalLink size={12} /> Insights
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-sm font-bold text-white mb-4" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Services</h2>
            <ul className="flex flex-col gap-2.5">
              {footerServices.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[12px] text-blue-100/75 hover:text-blue-300 transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-blue-500/40" />{label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h2 className="text-sm font-bold text-white mb-4" style={{ fontFamily: "'Rajdhani', sans-serif" }}>Industries</h2>
            <ul className="flex flex-col gap-2.5">
              {footerIndustries.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[12px] text-blue-100/75 hover:text-blue-300 transition-colors flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-purple-500/40" />{label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: "rgba(59,130,246,0.07)" }}>
          <p className="text-[11px] text-blue-100/70">© 2026 AlterLabs. GSTIN 09DPRPR7653F1Z2.</p>
          <p className="text-[11px] text-blue-100/70">Ghaziabad · Gurgaon · Jharkhand support locations</p>
        </div>
      </div>
    </footer>
  );
}

// ─── WHATSAPP FLOAT ───────────────────────────────────────────────────────────

function WAFloat() {
  const [label, setLabel] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLabel(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <a
      href={WA_LINK} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 py-3.5 rounded-full font-bold text-sm text-white transition-all hover:scale-110 group"
      style={{
        background: "linear-gradient(135deg, #059669, #10b981)",
        boxShadow: "0 0 40px rgba(16,185,129,0.55), 0 8px 28px rgba(0,0,0,0.45)",
        paddingLeft: label ? "1.25rem" : "1rem",
        paddingRight: "1.25rem",
      }}
    >
      <MessageCircle size={19} />
      <span
        className="overflow-hidden transition-all duration-500 whitespace-nowrap"
        style={{ maxWidth: label ? "120px" : "0px", opacity: label ? 1 : 0 }}
      >
        WhatsApp Us
      </span>
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ background: "#10b981" }} />
    </a>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div
      className="min-h-screen bg-background text-foreground overflow-x-hidden pb-28 md:pb-24"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content">
        <Hero />
        <CoreOffers />
        <SystemsStack />
        <Pricing />
        <HowItWorks />
        <Industries />
        <Portfolio />
        <WhyAlterLabs />
        <Resources />
        <FounderCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
