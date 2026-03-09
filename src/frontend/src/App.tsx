import { Toaster } from "@/components/ui/sonner";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Branch, Program } from "./backend.d";
import { useActor } from "./hooks/useActor";

// ─── Decorative shapes ───────────────────────────────────────────────────────

const ConfettiDots = () => {
  const dots = [
    {
      size: 18,
      color: "oklch(0.88 0.18 92)",
      top: "12%",
      left: "8%",
      delay: "0s",
    },
    {
      size: 12,
      color: "oklch(0.82 0.1 220)",
      top: "25%",
      left: "3%",
      delay: "0.5s",
    },
    {
      size: 22,
      color: "oklch(0.92 0.1 155)",
      top: "60%",
      left: "5%",
      delay: "1s",
    },
    {
      size: 10,
      color: "oklch(0.88 0.1 10)",
      top: "75%",
      left: "12%",
      delay: "1.5s",
    },
    {
      size: 16,
      color: "oklch(0.78 0.18 50)",
      top: "88%",
      left: "7%",
      delay: "0.3s",
    },
    {
      size: 14,
      color: "oklch(0.88 0.18 92)",
      top: "10%",
      right: "5%",
      left: "auto",
      delay: "0.7s",
    },
    {
      size: 20,
      color: "oklch(0.82 0.1 220)",
      top: "30%",
      right: "3%",
      left: "auto",
      delay: "1.2s",
    },
    {
      size: 8,
      color: "oklch(0.92 0.1 155)",
      top: "55%",
      right: "7%",
      left: "auto",
      delay: "0.8s",
    },
    {
      size: 18,
      color: "oklch(0.88 0.1 10)",
      top: "80%",
      right: "4%",
      left: "auto",
      delay: "0.2s",
    },
    {
      size: 12,
      color: "oklch(0.88 0.18 92)",
      top: "45%",
      left: "1%",
      delay: "1.8s",
    },
  ];

  return (
    <div className="confetti-bg" aria-hidden="true">
      {dots.map((dot) => (
        <div
          key={`dot-${dot.top}-${dot.left}`}
          className="confetti-dot animate-twinkle"
          style={{
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
            top: dot.top,
            left: dot.left,
            right: dot.right as string | undefined,
            animationDelay: dot.delay,
            opacity: 0.35,
          }}
        />
      ))}
      {/* Stars */}
      {["10%", "35%", "65%", "85%"].map((top, idx) => (
        <div
          key={`star-${top}`}
          className="animate-twinkle"
          style={{
            position: "absolute",
            top,
            left: `${[15, 80, 20, 88][idx]}%`,
            fontSize: ["1.2rem", "0.9rem", "1.4rem", "1rem"][idx],
            opacity: 0.4,
            animationDelay: `${idx * 0.5}s`,
          }}
        >
          ⭐
        </div>
      ))}
    </div>
  );
};

// Wave SVG divider
const WaveDivider = ({
  fillColor = "white",
  flip = false,
}: {
  fillColor?: string;
  flip?: boolean;
}) => (
  <div
    style={{
      position: "absolute",
      [flip ? "bottom" : "top"]: "-2px",
      left: 0,
      width: "100%",
      overflow: "hidden",
      lineHeight: 0,
      transform: flip ? "rotate(180deg)" : undefined,
      zIndex: 1,
    }}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      style={{ display: "block", width: "100%", height: "60px" }}
      aria-hidden="true"
      focusable="false"
      role="presentation"
    >
      <path
        d="M0,0 C240,80 480,0 720,40 C960,80 1200,20 1440,50 L1440,0 Z"
        fill={fillColor}
      />
    </svg>
  </div>
);

// ─── Reveal hook ─────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinkClass =
    "text-navy-brand font-semibold hover:text-sun transition-colors px-2 py-1 rounded-lg hover:bg-primary/10";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav shadow-md" : "bg-transparent"}`}
      style={{ padding: "1rem 5%" }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 no-underline">
          <span
            className="animate-bounce-gentle inline-block"
            style={{ fontSize: "1.6rem" }}
          >
            🌟
          </span>
          <span
            className="font-display font-extrabold text-navy-brand"
            style={{ fontSize: "1.4rem", letterSpacing: "-0.02em" }}
          >
            <span style={{ color: "oklch(0.82 0.1 220)" }}>Oxford</span>{" "}
            <span style={{ color: "oklch(0.78 0.18 50)" }}>World</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <a href="#about" className={navLinkClass} data-ocid="nav.about_link">
            About
          </a>
          <a
            href="#programs"
            className={navLinkClass}
            data-ocid="nav.programs_link"
          >
            Programs
          </a>
          <a
            href="#admissions"
            className={navLinkClass}
            data-ocid="nav.admissions_link"
          >
            Admissions
          </a>
          <a
            href="#admissions"
            className="btn-sun ml-3"
            style={{ fontSize: "0.95rem", padding: "0.6rem 1.4rem" }}
            data-ocid="nav.apply_button"
          >
            Apply Now 🎒
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 rounded-xl bg-sun text-navy-brand font-bold"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu — clicking any link closes the menu */}
      {menuOpen && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: click on nav container handles close
        <div
          className="md:hidden glass-nav rounded-2xl shadow-kid mx-4 mt-2 p-4 flex flex-col gap-3"
          style={{ border: "2px solid oklch(var(--border))" }}
          onClick={() => setMenuOpen(false)}
        >
          <a href="#about" className={navLinkClass} data-ocid="nav.about_link">
            About
          </a>
          <a
            href="#programs"
            className={navLinkClass}
            data-ocid="nav.programs_link"
          >
            Programs
          </a>
          <a
            href="#admissions"
            className={navLinkClass}
            data-ocid="nav.admissions_link"
          >
            Admissions
          </a>
          <a
            href="#admissions"
            className="btn-sun text-center"
            data-ocid="nav.apply_button"
          >
            Apply Now 🎒
          </a>
        </div>
      )}
    </nav>
  );
};

// ─── Hero ────────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const ref = useReveal();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.95 0.06 220) 0%, oklch(0.98 0.04 90) 50%, oklch(0.97 0.04 155) 100%)",
        paddingTop: "7rem",
      }}
    >
      <ConfettiDots />

      {/* Extra floating shapes */}
      <div
        className="animate-sway"
        style={{
          position: "absolute",
          top: "15%",
          left: "5%",
          fontSize: "3rem",
          opacity: 0.5,
          animationDelay: "0.3s",
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        🌈
      </div>
      <div
        className="animate-float"
        style={{
          position: "absolute",
          top: "20%",
          right: "8%",
          fontSize: "2.5rem",
          opacity: 0.6,
          animationDelay: "0.7s",
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        ✨
      </div>
      <div
        className="animate-bounce-gentle"
        style={{
          position: "absolute",
          bottom: "25%",
          left: "8%",
          fontSize: "2rem",
          opacity: 0.5,
          animationDelay: "1s",
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        🎈
      </div>
      <div
        className="animate-twinkle"
        style={{
          position: "absolute",
          bottom: "30%",
          right: "12%",
          fontSize: "2rem",
          opacity: 0.5,
          animationDelay: "0.5s",
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        🌟
      </div>

      <div
        className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10"
        style={{ paddingBottom: "4rem" }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div ref={ref} className="reveal text-center lg:text-left">
            <div
              className="inline-block mb-4 rounded-full px-4 py-2 font-semibold"
              style={{
                background: "oklch(0.92 0.1 155 / 0.3)",
                color: "oklch(0.35 0.12 155)",
                fontSize: "0.95rem",
                border: "2px solid oklch(0.92 0.1 155 / 0.5)",
              }}
            >
              🌱 Pune's Most Joyful Preschool
            </div>

            <h1
              className="font-display font-extrabold leading-tight mb-4"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              <span style={{ color: "oklch(0.82 0.1 220)" }}>Oxford</span>{" "}
              <span style={{ color: "oklch(0.78 0.18 50)" }}>World</span>
              <br />
              <span style={{ color: "oklch(0.22 0.05 260)" }}>Preschool</span>
            </h1>

            <p
              className="mb-8 font-body"
              style={{
                fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                color: "oklch(0.4 0.04 260)",
                lineHeight: 1.7,
              }}
            >
              Where Learning Begins with Joy in Pune ✨
              <br />
              <span
                style={{ fontSize: "0.95em", color: "oklch(0.5 0.03 260)" }}
              >
                Nurturing bright minds since 2010 — two branches across the
                city.
              </span>
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#admissions"
                className="btn-sun"
                style={{ fontSize: "1.05rem", padding: "0.85rem 2.2rem" }}
                data-ocid="hero.book_button"
              >
                📅 Book a Visit
              </a>
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ fontSize: "1.05rem", padding: "0.85rem 2.2rem" }}
                data-ocid="hero.whatsapp_button"
              >
                💬 WhatsApp Us
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
              {[
                { icon: "🏫", label: "2 Branches" },
                { icon: "👶", label: "Ages 1.5–5" },
                { icon: "🎓", label: "Expert Teachers" },
                { icon: "❤️", label: "Safe & Caring" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1.5px solid oklch(var(--border))",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "oklch(var(--navy))",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="relative flex justify-center items-center">
            {/* Hero illustration */}
            <div
              className="animate-float relative z-10"
              style={{ animationDuration: "5s" }}
            >
              <img
                src="/frontend/src/public/assets/generated/hero-kids.dim_800x600.png"
                alt="Happy children learning and playing at Oxford World Preschool"
                className="rounded-3xl shadow-kid-lg"
                style={{
                  width: "100%",
                  maxWidth: "520px",
                  objectFit: "cover",
                  border: "4px solid white",
                }}
              />
            </div>

            {/* Mascot */}
            <img
              src="/frontend/src/public/assets/generated/kid-mascot-transparent.dim_400x500.png"
              alt="Friendly school mascot"
              className="animate-sway"
              style={{
                position: "absolute",
                bottom: "-2rem",
                right: "-1.5rem",
                width: "clamp(100px, 18vw, 180px)",
                zIndex: 20,
                filter: "drop-shadow(0 10px 20px rgba(44,62,80,0.15))",
                animationDelay: "0.5s",
              }}
            />

            {/* Floating emoji decorations */}
            <div
              className="animate-bounce-gentle"
              style={{
                position: "absolute",
                top: "-1rem",
                left: "-1rem",
                fontSize: "2.5rem",
                zIndex: 20,
                animationDelay: "0.2s",
              }}
            >
              🎨
            </div>
            <div
              className="animate-float"
              style={{
                position: "absolute",
                top: "10%",
                right: "-2rem",
                fontSize: "2rem",
                zIndex: 20,
                animationDelay: "1s",
              }}
            >
              📚
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <WaveDivider fillColor="white" flip={true} />
    </section>
  );
};

// ─── About ────────────────────────────────────────────────────────────────────

const AboutSection = () => {
  const ref1 = useReveal();
  const ref2 = useReveal();
  const ref3 = useReveal();

  const features = [
    {
      emoji: "💛",
      title: "Safe & Nurturing",
      description:
        "A secure, caring environment where every child feels loved, valued, and free to explore at their own pace.",
      bg: "oklch(0.97 0.07 92)",
      border: "oklch(0.88 0.18 92 / 0.4)",
    },
    {
      emoji: "🎨",
      title: "Creative Learning",
      description:
        "Art, music, storytelling, and imaginative play weave through every lesson — because creativity powers learning.",
      bg: "oklch(0.95 0.06 220)",
      border: "oklch(0.82 0.1 220 / 0.4)",
    },
    {
      emoji: "📚",
      title: "Expert Teachers",
      description:
        "Our certified early childhood educators bring warmth, patience, and a genuine love for little learners.",
      bg: "oklch(0.96 0.05 155)",
      border: "oklch(0.78 0.15 155 / 0.4)",
    },
  ];

  const refs = [ref1, ref2, ref3];

  return (
    <section
      id="about"
      className="relative"
      style={{
        padding: "6rem 5%",
        background: "oklch(0.97 0.02 155)",
        overflow: "hidden",
      }}
    >
      <WaveDivider fillColor="oklch(0.97 0.02 155)" />

      <ConfettiDots />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <h2
            className="font-display font-extrabold text-navy-brand"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Why Choose Oxford World? 🌟
          </h2>
          <p
            className="mt-3 font-body"
            style={{ color: "oklch(0.45 0.04 260)", fontSize: "1.15rem" }}
          >
            We believe every child deserves the best possible start in life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              ref={refs[i]}
              className={`reveal reveal-delay-${i + 1} kid-card p-8 text-center`}
              style={{
                background: f.bg,
                borderColor: f.border,
                borderWidth: 2,
                borderStyle: "solid",
              }}
            >
              <div
                className="animate-bounce-gentle inline-block mb-4"
                style={{ fontSize: "3.5rem", animationDelay: `${i * 0.3}s` }}
              >
                {f.emoji}
              </div>
              <h3
                className="font-display font-extrabold text-navy-brand mb-3"
                style={{ fontSize: "1.4rem" }}
              >
                {f.title}
              </h3>
              <p
                className="font-body"
                style={{ color: "oklch(0.4 0.04 260)", lineHeight: 1.7 }}
              >
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "15+", label: "Years of Joy", emoji: "🎉" },
            { value: "500+", label: "Happy Graduates", emoji: "🎓" },
            { value: "2", label: "Pune Branches", emoji: "📍" },
            { value: "98%", label: "Parent Satisfaction", emoji: "💖" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="kid-card p-5 text-center"
              style={{ background: "white" }}
            >
              <div style={{ fontSize: "2rem" }}>{stat.emoji}</div>
              <div
                className="font-display font-extrabold text-navy-brand mt-1"
                style={{ fontSize: "2rem" }}
              >
                {stat.value}
              </div>
              <div
                className="font-body text-sm"
                style={{ color: "oklch(0.5 0.03 260)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <WaveDivider fillColor="white" flip={true} />
    </section>
  );
};

// ─── Programs ─────────────────────────────────────────────────────────────────

const ProgramsSection = () => {
  const titleRef = useReveal();
  const imgRef = useReveal();

  const programs = [
    {
      emoji: "🧸",
      title: "Playgroup",
      age: "1.5 – 2.5 Years",
      description:
        "Social play and sensory discovery form the cornerstone of early development. Little ones explore, touch, and engage with their world.",
      color: "oklch(0.88 0.1 10)",
      bg: "oklch(0.97 0.04 10)",
      ocid: "programs.playgroup_card",
    },
    {
      emoji: "🎨",
      title: "Nursery",
      age: "2.5 – 3.5 Years",
      description:
        "Creative arts and early language skills blossom as children paint, sing, listen to stories, and make their first friends.",
      color: "oklch(0.82 0.1 220)",
      bg: "oklch(0.95 0.05 220)",
      ocid: "programs.nursery_card",
    },
    {
      emoji: "📚",
      title: "Junior KG",
      age: "3.5 – 4.5 Years",
      description:
        "Foundations of logic, math, and structured learning prepare children for primary school with curiosity and confidence.",
      color: "oklch(0.78 0.15 155)",
      bg: "oklch(0.96 0.05 155)",
      ocid: "programs.juniorkg_card",
    },
  ];

  return (
    <section
      id="programs"
      className="relative"
      style={{
        padding: "6rem 5%",
        background: "white",
        overflow: "hidden",
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="reveal text-center mb-14">
          <h2
            className="font-display font-extrabold text-navy-brand"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Our Programs 🎒
          </h2>
          <p
            className="mt-3 font-body"
            style={{ color: "oklch(0.45 0.04 260)", fontSize: "1.15rem" }}
          >
            Age-appropriate learning journeys designed to spark curiosity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Program cards */}
          <div className="flex flex-col gap-6">
            {programs.map((prog, i) => (
              <div
                key={prog.title}
                className="kid-card flex gap-5 items-start p-7"
                style={{
                  background: prog.bg,
                  borderLeft: `5px solid ${prog.color}`,
                  borderRadius: "1.5rem",
                  cursor: "default",
                }}
                data-ocid={prog.ocid}
              >
                <div
                  className="animate-bounce-gentle flex-shrink-0"
                  style={{
                    fontSize: "3rem",
                    animationDelay: `${i * 0.4}s`,
                    lineHeight: 1,
                  }}
                >
                  {prog.emoji}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3
                      className="font-display font-extrabold text-navy-brand"
                      style={{ fontSize: "1.3rem" }}
                    >
                      {prog.title}
                    </h3>
                    <span
                      className="rounded-full px-3 py-0.5 text-xs font-bold"
                      style={{
                        background: prog.color,
                        color: "white",
                        opacity: 0.9,
                      }}
                    >
                      {prog.age}
                    </span>
                  </div>
                  <p
                    className="font-body"
                    style={{ color: "oklch(0.4 0.04 260)", lineHeight: 1.65 }}
                  >
                    {prog.description}
                  </p>
                </div>
              </div>
            ))}

            <a
              href="#admissions"
              className="btn-sun self-start mt-2"
              style={{ fontSize: "1rem" }}
            >
              Enroll Today 🌟
            </a>
          </div>

          {/* Image */}
          <div ref={imgRef} className="reveal reveal-delay-2 relative">
            <div
              className="animate-float"
              style={{ animationDuration: "6s", animationDelay: "0.3s" }}
            >
              <img
                src="/frontend/src/public/assets/generated/kids-learning.dim_700x450.png"
                alt="Children learning together in a creative classroom"
                className="rounded-3xl shadow-kid-lg w-full"
                style={{
                  objectFit: "cover",
                  border: "4px solid white",
                  maxHeight: "450px",
                }}
              />
            </div>
            {/* Decorative sticker */}
            <div
              className="kid-card p-4 text-center animate-sway"
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                left: "-1.5rem",
                background: "oklch(0.88 0.18 92)",
                borderRadius: "1.5rem",
                boxShadow: "0 8px 24px rgba(255,215,0,0.4)",
                animationDuration: "4s",
                zIndex: 10,
                minWidth: "120px",
              }}
            >
              <div style={{ fontSize: "1.8rem" }}>🎉</div>
              <div
                className="font-display font-extrabold text-navy-brand"
                style={{ fontSize: "0.85rem" }}
              >
                Admissions
                <br />
                Open!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Locations ────────────────────────────────────────────────────────────────

const LocationsSection = () => {
  const ref = useReveal();

  const branches = [
    {
      name: "Wadgaon Sheri",
      address: "Anand Park, Wadgaon Sheri, Pune",
      emoji: "📍",
      color: "oklch(0.88 0.1 10)",
      bg: "oklch(0.97 0.03 10)",
      mapUrl:
        "https://www.google.com/maps/search/Oxford+World+Preschool+Wadgaon+Sheri+Pune",
    },
    {
      name: "Lohegaon",
      address: "Main Road, Lohegaon, Pune",
      emoji: "📍",
      color: "oklch(0.78 0.18 50)",
      bg: "oklch(0.97 0.04 50)",
      mapUrl:
        "https://www.google.com/maps/search/Oxford+World+Preschool+Lohegaon+Pune",
    },
  ];

  return (
    <section
      id="locations"
      className="relative"
      style={{
        padding: "6rem 5%",
        background: "oklch(0.96 0.03 92)",
        overflow: "hidden",
      }}
    >
      <WaveDivider fillColor="oklch(0.96 0.03 92)" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div ref={ref} className="reveal text-center mb-12">
          <h2
            className="font-display font-extrabold text-navy-brand"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Our Pune Branches 📍
          </h2>
          <p
            className="mt-3 font-body"
            style={{ color: "oklch(0.45 0.04 260)", fontSize: "1.15rem" }}
          >
            Conveniently located near you across Pune.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {branches.map((branch) => (
            <div
              key={branch.name}
              className="kid-card p-8"
              style={{
                background: branch.bg,
                borderLeft: `5px solid ${branch.color}`,
                borderRadius: "2rem",
              }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>
                {branch.emoji}
              </div>
              <h3
                className="font-display font-extrabold text-navy-brand mb-2"
                style={{ fontSize: "1.5rem" }}
              >
                {branch.name}
              </h3>
              <p
                className="font-body mb-5"
                style={{ color: "oklch(0.4 0.04 260)", fontSize: "1rem" }}
              >
                {branch.address}
              </p>

              <div className="flex gap-3 flex-wrap">
                <a
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-sun"
                  style={{
                    fontSize: "0.9rem",
                    padding: "0.6rem 1.4rem",
                    background: branch.color,
                    color: "white",
                  }}
                  data-ocid="nav.link"
                >
                  🗺️ View Map
                </a>
                <a
                  href="#admissions"
                  className="btn-sun"
                  style={{
                    fontSize: "0.9rem",
                    padding: "0.6rem 1.4rem",
                    background: "white",
                    border: `2px solid ${branch.color}`,
                    color: "oklch(var(--navy))",
                  }}
                >
                  Apply Here
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative banner */}
        <div
          className="mt-12 kid-card p-6 text-center"
          style={{
            background: "oklch(0.22 0.05 260)",
            color: "white",
            borderRadius: "2rem",
          }}
        >
          <p className="font-display font-bold" style={{ fontSize: "1.2rem" }}>
            🚌 Door-to-door transport available &bull; 🌞 Morning & afternoon
            batches &bull; 🍱 Nutritious snacks provided
          </p>
        </div>
      </div>

      <WaveDivider fillColor="white" flip={true} />
    </section>
  );
};

// ─── Admissions form ──────────────────────────────────────────────────────────

interface FormState {
  parentName: string;
  childName: string;
  childAge: string;
  phone: string;
  email: string;
  program: string;
  branch: string;
  message: string;
}

const AdmissionsSection = () => {
  const { actor } = useActor();
  const ref = useReveal();

  const [form, setForm] = useState<FormState>({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    program: "",
    branch: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: FormState) => {
      if (!actor) throw new Error("Not connected");
      await actor.submitInquiry(
        data.parentName,
        data.childName,
        BigInt(data.childAge || "0"),
        data.phone,
        data.email,
        data.program as Program,
        data.branch as Branch,
        data.message,
      );
    },
    onSuccess: () => {
      setSubmitted(true);
      toast.success("🎉 Inquiry submitted! We'll be in touch soon.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      mutation.mutate(form);
    },
    [form, mutation],
  );

  return (
    <section
      id="admissions"
      className="relative"
      style={{
        padding: "6rem 5%",
        background: "white",
        overflow: "hidden",
      }}
    >
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Banner header */}
        <div
          ref={ref}
          className="reveal kid-card text-center p-8 mb-10"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.88 0.18 92), oklch(0.78 0.18 50))",
            borderRadius: "2rem",
          }}
        >
          <div
            className="animate-bounce-gentle inline-block mb-3"
            style={{ fontSize: "3rem" }}
          >
            🎉
          </div>
          <h2
            className="font-display font-extrabold text-navy-brand"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}
          >
            Admissions Open for 2026–2027!
          </h2>
          <p
            className="mt-2 font-body text-navy-brand"
            style={{ opacity: 0.8, fontSize: "1.05rem" }}
          >
            Fill out the form below and we'll contact you within 24 hours.
          </p>
        </div>

        {/* Success state */}
        {submitted ? (
          <div
            className="kid-card text-center p-12"
            style={{
              background: "oklch(0.95 0.08 155)",
              border: "3px solid oklch(0.78 0.15 155)",
              borderRadius: "2rem",
            }}
            data-ocid="admissions.success_state"
          >
            <div
              className="animate-bounce-gentle inline-block mb-4"
              style={{ fontSize: "4rem" }}
            >
              🎊
            </div>
            <h3
              className="font-display font-extrabold text-navy-brand mb-3"
              style={{ fontSize: "1.8rem" }}
            >
              Yay! We received your inquiry!
            </h3>
            <p
              className="font-body mb-6"
              style={{ color: "oklch(0.4 0.04 260)", fontSize: "1.05rem" }}
            >
              Our admissions team will reach out to you within 24 hours.
              <br />
              We can't wait to meet your little one! 🌟
            </p>
            <button
              type="button"
              className="btn-sun"
              onClick={() => {
                setSubmitted(false);
                setForm({
                  parentName: "",
                  childName: "",
                  childAge: "",
                  phone: "",
                  email: "",
                  program: "",
                  branch: "",
                  message: "",
                });
              }}
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="kid-card p-8 md:p-10"
            style={{
              background: "oklch(0.99 0.01 90)",
              borderRadius: "2rem",
              border: "2px solid oklch(var(--border))",
            }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              {/* Parent Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="parentName"
                  className="font-body font-semibold text-navy-brand text-sm"
                >
                  Parent Name *
                </label>
                <input
                  id="parentName"
                  name="parentName"
                  type="text"
                  className="kid-input"
                  placeholder="Your full name"
                  value={form.parentName}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  data-ocid="admissions.parentname_input"
                />
              </div>

              {/* Child Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="childName"
                  className="font-body font-semibold text-navy-brand text-sm"
                >
                  Child's Name *
                </label>
                <input
                  id="childName"
                  name="childName"
                  type="text"
                  className="kid-input"
                  placeholder="Child's full name"
                  value={form.childName}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  data-ocid="admissions.childname_input"
                />
              </div>

              {/* Child Age */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="childAge"
                  className="font-body font-semibold text-navy-brand text-sm"
                >
                  Child's Age (in years) *
                </label>
                <input
                  id="childAge"
                  name="childAge"
                  type="number"
                  className="kid-input"
                  placeholder="e.g. 3"
                  min="1"
                  max="6"
                  value={form.childAge}
                  onChange={handleChange}
                  required
                  data-ocid="admissions.childage_input"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="phone"
                  className="font-body font-semibold text-navy-brand text-sm"
                >
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="kid-input"
                  placeholder="Your mobile number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  data-ocid="admissions.phone_input"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label
                  htmlFor="email"
                  className="font-body font-semibold text-navy-brand text-sm"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="kid-input"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  data-ocid="admissions.email_input"
                />
              </div>

              {/* Program */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="program"
                  className="font-body font-semibold text-navy-brand text-sm"
                >
                  Preferred Program *
                </label>
                <select
                  id="program"
                  name="program"
                  className="kid-input"
                  value={form.program}
                  onChange={handleChange}
                  required
                  data-ocid="admissions.program_select"
                >
                  <option value="">Select a program…</option>
                  <option value={Program.playgroup}>
                    🧸 Playgroup (1.5–2.5 years)
                  </option>
                  <option value={Program.nursery}>
                    🎨 Nursery (2.5–3.5 years)
                  </option>
                  <option value={Program.juniorKg}>
                    📚 Junior KG (3.5–4.5 years)
                  </option>
                </select>
              </div>

              {/* Branch */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="branch"
                  className="font-body font-semibold text-navy-brand text-sm"
                >
                  Preferred Branch *
                </label>
                <select
                  id="branch"
                  name="branch"
                  className="kid-input"
                  value={form.branch}
                  onChange={handleChange}
                  required
                  data-ocid="admissions.branch_select"
                >
                  <option value="">Select a branch…</option>
                  <option value={Branch.wadgaonSheri}>📍 Wadgaon Sheri</option>
                  <option value={Branch.lohegaon}>📍 Lohegaon</option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label
                  htmlFor="message"
                  className="font-body font-semibold text-navy-brand text-sm"
                >
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="kid-input"
                  placeholder="Any questions or special requirements…"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  style={{ resize: "vertical" }}
                  data-ocid="admissions.message_textarea"
                />
              </div>
            </div>

            <div className="mt-7 text-center">
              <button
                type="submit"
                className="btn-sun"
                disabled={mutation.isPending}
                style={{
                  fontSize: "1.1rem",
                  padding: "0.9rem 3rem",
                  opacity: mutation.isPending ? 0.75 : 1,
                }}
                data-ocid="admissions.submit_button"
              >
                {mutation.isPending ? (
                  <>⏳ Submitting…</>
                ) : (
                  <>🚀 Submit Inquiry</>
                )}
              </button>
              <p
                className="mt-3 font-body"
                style={{ color: "oklch(0.55 0.03 260)", fontSize: "0.85rem" }}
              >
                We typically respond within 24 hours 💛
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      className="relative"
      style={{
        background: "oklch(0.22 0.05 260)",
        color: "white",
        padding: "4rem 5% 2rem",
        overflow: "hidden",
      }}
    >
      <WaveDivider fillColor="oklch(0.22 0.05 260)" />

      {/* Decorative confetti */}
      <div className="confetti-bg" aria-hidden="true">
        {[
          {
            left: "10%",
            color: "oklch(0.88 0.18 92)",
            top: "20%",
            delay: "0s",
          },
          {
            left: "30%",
            color: "oklch(0.82 0.1 220)",
            top: "30%",
            delay: "0.4s",
          },
          {
            left: "50%",
            color: "oklch(0.92 0.1 155)",
            top: "40%",
            delay: "0.8s",
          },
          {
            left: "70%",
            color: "oklch(0.88 0.1 10)",
            top: "50%",
            delay: "1.2s",
          },
          {
            left: "90%",
            color: "oklch(0.78 0.18 50)",
            top: "60%",
            delay: "1.6s",
          },
        ].map((dot) => (
          <div
            key={`footer-dot-${dot.left}`}
            className="confetti-dot animate-float"
            style={{
              width: 10,
              height: 10,
              backgroundColor: dot.color,
              top: dot.top,
              left: dot.left,
              opacity: 0.2,
              animationDelay: dot.delay,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontSize: "1.8rem" }}>🌟</span>
              <span
                className="font-display font-extrabold"
                style={{ fontSize: "1.4rem" }}
              >
                <span style={{ color: "oklch(0.88 0.18 92)" }}>Oxford</span>{" "}
                <span style={{ color: "oklch(0.82 0.1 220)" }}>World</span>
              </span>
            </div>
            <p
              className="font-body"
              style={{ color: "oklch(0.75 0.02 260)", lineHeight: 1.7 }}
            >
              Where learning begins with joy. Nurturing curious minds in Pune
              since 2010.
            </p>
            <p
              className="mt-3 font-semibold"
              style={{ color: "oklch(0.88 0.18 92)", fontSize: "0.95rem" }}
            >
              🎉 Admissions open for 2026–2027!
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="font-display font-bold mb-4"
              style={{
                color: "oklch(0.88 0.18 92)",
                fontSize: "1rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: "#about", label: "About Us" },
                { href: "#programs", label: "Programs" },
                { href: "#locations", label: "Branches" },
                { href: "#admissions", label: "Admissions" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body transition-colors"
                    style={{
                      color: "oklch(0.75 0.02 260)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLAnchorElement).style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLAnchorElement).style.color =
                        "oklch(0.75 0.02 260)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="font-display font-bold mb-4"
              style={{
                color: "oklch(0.88 0.18 92)",
                fontSize: "1rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Get in Touch
            </h4>
            <div
              className="flex flex-col gap-3 font-body"
              style={{ color: "oklch(0.75 0.02 260)" }}
            >
              <div>📍 Wadgaon Sheri — Anand Park, Pune</div>
              <div>📍 Lohegaon — Main Road, Pune</div>
              <div>📞 Call / WhatsApp for details</div>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full transition-transform hover:scale-110"
                style={{
                  width: 40,
                  height: 40,
                  background: "oklch(0.35 0.05 260)",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                }}
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full transition-transform hover:scale-110"
                style={{
                  width: 40,
                  height: 40,
                  background:
                    "linear-gradient(135deg, oklch(0.7 0.2 30), oklch(0.6 0.2 320))",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "1.1rem",
                }}
                aria-label="Instagram"
              >
                IG
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 text-center font-body"
          style={{
            borderTop: "1px solid oklch(0.35 0.04 260)",
            color: "oklch(0.6 0.02 260)",
            fontSize: "0.875rem",
          }}
        >
          <p>© {year} Oxford World Preschool, Pune. All rights reserved.</p>
          <p className="mt-1">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(0.88 0.18 92)", textDecoration: "none" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <LocationsSection />
        <AdmissionsSection />
      </main>
      <Footer />
    </>
  );
}
