import { motion } from "motion/react";
import { FOUNDATION, FOUNDER, ABOUT_IMAGE } from "@/src/config";

export function About() {
  return (
    <section id="about" className="bg-background py-16 sm:py-20 px-5 sm:px-8 md:px-12 border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-16 items-start max-w-7xl mx-auto">
        <div className="md:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[3/4] overflow-hidden relative rounded-lg shadow-md bg-card"
          >
            <img
              src={ABOUT_IMAGE}
              alt="Community aid by the Kuber Seth Foundation"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute -bottom-6 -right-2 sm:-right-6 w-28 sm:w-40 md:w-48 aspect-square bg-secondary text-secondary-foreground flex flex-col items-center justify-center p-6 text-center shadow-lg z-10 rounded-full">
            <span className="font-serif text-4xl md:text-5xl font-bold italic text-primary">{FOUNDATION.yearsActive}</span>
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest font-bold mt-1 text-primary">Years</span>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-between h-full pt-6 md:pt-4 md:pl-12">
          <div>
            <h2
              className="font-serif font-bold tracking-tight text-foreground leading-[1.1]"
              style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)" }}
            >
              Dedicated to <br />
              <span className="italic text-primary">uplifting</span>
              <br /> the vulnerable.
            </h2>
            <div className="font-sans text-base md:text-lg text-foreground/80 leading-relaxed flex flex-col gap-6 mt-10">
              <p>
                The {FOUNDATION.name} aims to become a lifeline for families in need. {FOUNDATION.tagline}
              </p>
              <p>
                We believe in sustainable impact. Instead of momentary relief, we focus on rebuilding lives
                through education support, emergency health aid, and ensuring basic food security.
              </p>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-6 sm:p-8 mt-12 border border-primary/20">
            <h3 className="text-xs uppercase tracking-widest mb-4 opacity-70 font-semibold text-primary">Founder's Message</h3>
            <p className="text-lg sm:text-xl font-serif italic mb-6 leading-tight text-foreground/90">
              &ldquo;{FOUNDER.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <img
                src={FOUNDER.portrait}
                alt={FOUNDER.name}
                loading="lazy"
                className="w-10 h-10 rounded-full object-cover border border-primary/30"
              />
              <span className="text-xs uppercase font-bold tracking-tighter text-foreground/80">
                {FOUNDER.name}, {FOUNDER.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
