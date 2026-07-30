import { motion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { FOUNDATION } from "@/src/config";
import kashmirWinter from "./kashmir-winter.jpg";

export function Hero() {
  return (
    <section className="min-h-screen w-full max-w-[1600px] mx-auto flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-24 sm:pt-28 pb-8">
      <div className="flex items-center justify-between border-b border-foreground/20 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
        <span>NGO — Srinagar, Kashmir</span>
        <span className="hidden sm:block">Relief is our belief</span>
        <span>Est. 2025</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end py-10">
        <div className="md:col-span-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="display font-extrabold uppercase leading-[0.82] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(3.5rem, 13vw, 12rem)" }}
          >
            Relief<br />
            is our{" "}
            <span className="serif-italic lowercase font-normal text-accent tracking-normal">belief.</span>
          </motion.h1>
        </div>

        <motion.figure
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block md:col-span-4"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <img src={kashmirWinter} alt="Winter relief in Srinagar" className="w-full h-full object-cover" />
          </div>
          <figcaption className="flex items-center justify-between mt-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
            <span>Fig. 01</span>
            <span>Winter relief · Srinagar</span>
          </figcaption>
        </motion.figure>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-foreground/20 pt-6"
      >
        <p className="md:col-span-6 text-base sm:text-lg text-foreground/80 leading-relaxed max-w-md">
          A collective of citizen volunteers in Kashmir, turning small acts into real warmth for the families
          who need it most.
        </p>

        <div className="md:col-span-6 flex flex-col sm:flex-row md:justify-end items-stretch sm:items-center gap-3">
          <a
            href="#donate"
            className="group inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-bold uppercase tracking-widest text-xs px-7 h-14 rounded-full hover:bg-foreground transition-colors"
          >
            Donate now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#initiatives"
            className="inline-flex items-center justify-center gap-2 border border-foreground/25 text-foreground font-bold uppercase tracking-widest text-xs px-7 h-14 rounded-full hover:bg-foreground hover:text-background transition-colors"
          >
            Our work
          </a>
        </div>
      </motion.div>

      <div className="flex items-center gap-2 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/40">
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" /> Scroll
      </div>
    </section>
  );
}
