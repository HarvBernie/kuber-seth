import { motion } from "motion/react";
import { IMPACT_HIGHLIGHTS, FOUNDATION } from "@/src/config";

const MARQUEE = Array.from({ length: 6 }).map(() => FOUNDATION.tagline);

export function Stats() {
  return (
    <section className="bg-primary">
      <div className="overflow-hidden bg-accent text-accent-foreground py-3 border-y border-accent-foreground/10">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((group) => (
            <div key={group} className="flex items-center">
              {MARQUEE.map((phrase, i) => (
                <span key={`${group}-${i}`} className="flex items-center text-sm font-extrabold uppercase tracking-[0.25em]">
                  {phrase} <span className="mx-5 text-lg leading-none">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="noise relative max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 px-5 sm:px-8 md:px-12 py-16 sm:py-20">
        {IMPACT_HIGHLIGHTS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative z-10 flex flex-col items-center text-center lg:border-r last:border-r-0 border-primary-foreground/15"
          >
            <span className="display font-extrabold text-primary-foreground leading-none" style={{ fontSize: "clamp(2.75rem, 7vw, 4.5rem)" }}>
              {stat.value}
            </span>
            <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
