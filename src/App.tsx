import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Hero } from "./components/landing/Hero";
import { About } from "./components/landing/About";
import { Initiatives } from "./components/landing/Initiatives";
import { Leaderboard } from "./components/landing/Leaderboard";
import { Membership } from "./components/landing/Membership";
import { FOUNDATION } from "./config";
import logo from "./ksf_logoo.png";

const NAV_LINKS = [
  { href: "#about", label: "Our Story" },
  { href: "#initiatives", label: "Initiatives" },
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

          <nav className="hidden lg:flex gap-8 text-[12px] uppercase tracking-widest font-semibold text-foreground/80">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex text-[11px] font-mono uppercase font-semibold text-muted-foreground tracking-widest text-right shrink-0">
            <span>{FOUNDATION.address}</span>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md border border-border text-foreground hover:bg-muted transition-colors"
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
            <span className="px-6 py-3 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              {FOUNDATION.address}
            </span>
          </nav>
        )}

        <main id="top" className="flex-1 flex flex-col">
          <Hero />
          <About />
          <Initiatives />
          <Leaderboard />
          <Membership />
        </main>

        <footer className="bg-secondary py-12 px-6 md:px-12 flex flex-col items-center justify-center gap-6">
          <img src={logo} alt={FOUNDATION.name} className="w-20 h-auto opacity-70 grayscale" />
          <div className="font-serif italic text-xl sm:text-2xl text-secondary-foreground text-center">
            Serving the community, unconditionally.
          </div>
          <div className="text-xs uppercase tracking-widest font-semibold opacity-70 text-secondary-foreground text-center">
            © {new Date().getFullYear()} {FOUNDATION.name}. {FOUNDATION.tagline}
          </div>
        </footer>
      </div>
    </div>
  );
}
