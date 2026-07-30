import { motion } from "motion/react";
import { User } from "lucide-react";
import { FOUNDATION, FOUNDER, ABOUT_IMAGE } from "@/src/config";
import { SectionLabel } from "./SectionLabel";

export function About() {
  return (
    <section id="about" className="bg-background border-t border-border">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 py-20 sm:py-28">
        <SectionLabel index="01" title="Our Story" meta={`${FOUNDATION.yearsActive} Years active`} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mt-10 md:mt-16 items-start">
          <div className="md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="display font-bold uppercase leading-[0.9] text-foreground text-balance"
              style={{ fontSize: "clamp(2.4rem, 7vw, 6rem)" }}
            >
              Dedicated to <span className="serif-italic lowercase font-normal text-accent">uplifting</span> the vulnerable.
            </motion.h2>

            <div className="mt-10 grid sm:grid-cols-2 gap-8 max-w-2xl text-foreground/80 leading-relaxed">
              <p>The {FOUNDATION.name} is a lifeline for families in need. {FOUNDATION.tagline}</p>
              <p>
                We believe in sustainable impact — rebuilding lives through education support, emergency health
                aid, and basic food security, not momentary relief.
              </p>
            </div>
          </div>

          <figure className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <img src={ABOUT_IMAGE} alt="Community aid by the Kuber Seth Foundation" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <figcaption className="flex items-center justify-between mt-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50">
              <span>Fig. 02 — On the ground</span>
              <span>Srinagar</span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-16 md:mt-24 border-t border-border pt-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <span className="md:col-span-3 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/50">
            Founder's message
          </span>
          <blockquote className="md:col-span-9">
            <p className="serif-italic text-foreground leading-[1.15]" style={{ fontSize: "clamp(1.5rem, 3.6vw, 2.75rem)" }}>
              &ldquo;We don't just provide aid; we rebuild agency in the shadow of the mountains.&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-foreground/60">
              <span className="w-9 h-9 rounded-full border border-border bg-muted flex items-center justify-center">
                <User className="w-4 h-4 text-muted-foreground" />
              </span>
              {FOUNDER.name}, {FOUNDER.role}
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
