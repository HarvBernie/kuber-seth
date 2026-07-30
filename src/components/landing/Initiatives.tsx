import { ArrowUpRight } from "lucide-react";
import { INITIATIVES, FOUNDATION } from "@/src/config";
import { SectionLabel } from "./SectionLabel";

export function Initiatives() {
  return (
    <section id="initiatives" className="bg-background border-t border-border">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 py-20 sm:py-28">
        <SectionLabel index="02" title="Our Work" meta="Completed · view on Instagram" />

        <div className="mt-6 sm:mt-10">
          {INITIATIVES.map((item, i) => (
            <a
              key={item.id}
              href={FOUNDATION.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between gap-4 sm:gap-6 border-b border-border first:border-t py-5 sm:py-7"
            >
              <div className="flex items-baseline gap-4 sm:gap-8 min-w-0">
                <span className="font-mono text-xs text-foreground/40 shrink-0">0{i + 1}</span>
                <h3
                  className="display font-bold uppercase leading-[0.95] text-foreground transition-colors duration-300 group-hover:text-accent truncate"
                  style={{ fontSize: "clamp(1.5rem, 5vw, 3.75rem)" }}
                >
                  {item.title}
                </h3>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                <div className="w-20 h-14 sm:w-28 sm:h-20 overflow-hidden rounded-sm bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <ArrowUpRight className="w-5 h-5 text-foreground/40 transition-all duration-300 group-hover:text-accent group-hover:rotate-45" />
              </div>
            </a>
          ))}
        </div>

        <a
          href={FOUNDATION.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/60 hover:text-accent transition-colors"
        >
          See more on Instagram <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
