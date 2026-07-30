import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { Hero } from "./components/landing/Hero";
import { Stats } from "./components/landing/Stats";
import { About } from "./components/landing/About";
import { Initiatives } from "./components/landing/Initiatives";
import { Support } from "./components/landing/Support";
import { Leaderboard } from "./components/landing/Leaderboard";
import { Membership } from "./components/landing/Membership";
import { FOUNDATION } from "./config";
import logo from "./ksf_logoo.png";

const NAV_LINKS = [
  { href: "#about", label: "Our Story" },
  { href: "#initiatives", label: "Our Work" },
  { href: "#donate", label: "Support" },
  { href: "#membership", label: "Volunteer" },
  { href: "#leaderboard", label: "Recognition" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary flex flex-col items-center">
      <div className="w-full max-w-[1440px] flex-1 flex flex-col relative bg-background overflow-x-hidden">
        <header className="sticky top-0 z-50 flex items-center justify-between gap-4 border-b border-border bg-background/90 backdrop-blur-sm px-5 py-3 sm:px-8 md:px-12 md:py-4">
          <a href="#top" className="flex shrink-0 items-center" aria-label={`${FOUNDATION.name} home`}>
            <img src={logo} alt={`${FOUNDATION.name} logo`} className="h-11 w-auto object-contain md:h-14" />
          </a>

          <nav className="hidden lg:flex gap-7 font-mono text-[11px] uppercase tracking-[0.15em] text-foreground/70">
            {NAV_LINKS.map((link, i) => (
              <a key={link.href} href={link.href} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <span className="text-accent/70">0{i + 1}</span>
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#donate"
            className="hidden lg:inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-colors shrink-0 shadow-sm shadow-accent/20"
          >
            <Heart className="w-3.5 h-3.5 fill-current" /> Donate
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground hover:bg-muted transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {menuOpen && (
          <nav className="lg:hidden sticky top-[65px] z-40 flex flex-col border-b border-border bg-background/95 backdrop-blur-sm">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-4 text-sm uppercase tracking-widest font-semibold text-foreground/80 border-b border-border/60 last:border-b-0 hover:bg-muted hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#donate"
              onClick={() => setMenuOpen(false)}
              className="m-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-3 text-xs font-bold uppercase tracking-widest"
            >
              <Heart className="w-4 h-4 fill-current" /> Donate now
            </a>
          </nav>
        )}

        <main id="top" className="flex-1 flex flex-col">
          <Hero />
          <Stats />
          <About />
          <Initiatives />
          <Support />
          <Leaderboard />
          <Membership />
        </main>

        <footer className="bg-secondary text-secondary-foreground px-6 md:px-12 pt-16 pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-secondary-foreground/15 pb-12">
              <h2 className="display font-bold uppercase leading-[0.9] text-balance" style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}>
                Serving the community,<br /> <span className="serif-italic lowercase font-normal text-accent">unconditionally.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a href="#donate" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-accent/90 transition-colors">
                  <Heart className="w-4 h-4 fill-current" /> Donate
                </a>
                <a href="#membership" className="inline-flex items-center justify-center rounded-full border border-secondary-foreground/30 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-secondary-foreground/5 transition-colors">
                  Volunteer
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8">
              <div className="flex items-center gap-4">
                <img src={logo} alt={FOUNDATION.name} className="w-12 h-auto" />
                <div>
                  <p className="font-bold text-sm">{FOUNDATION.name}</p>
                  <p className="text-xs opacity-70">{FOUNDATION.address}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-widest">
                <a href="#about" className="opacity-70 hover:opacity-100 transition-opacity">Our Story</a>
                <a href="#initiatives" className="opacity-70 hover:opacity-100 transition-opacity">Our Work</a>
                <a href="#leaderboard" className="opacity-70 hover:opacity-100 transition-opacity">Recognition</a>
                <a href={FOUNDATION.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-primary hover:opacity-100 transition-opacity">Instagram</a>
              </div>
            </div>

            <p className="text-[11px] uppercase tracking-widest font-semibold opacity-60 mt-8">
              © {new Date().getFullYear()} {FOUNDATION.name}. {FOUNDATION.tagline}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
