import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { FOUNDATION } from "@/src/config";
import kashmirWinter from "./kashmir-winter.jpg";

export function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] overflow-hidden flex flex-col justify-end bg-muted/30">
      <div className="absolute inset-0 z-0">
        <img
          src={kashmirWinter}
          alt="Community support in Srinagar"
          width={1920}
          height={1280}
          className="w-full h-full object-cover brightness-[0.7] contrast-[1.1]"
        />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-background via-background/90 to-transparent" />
      </div>

      <div className="relative z-10 w-full flex flex-col gap-6 md:gap-10 px-5 sm:px-8 md:px-12 pb-14 pt-28 sm:pt-32 mx-auto max-w-7xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-foreground font-serif leading-[0.95] tracking-tight max-w-4xl"
          style={{ fontSize: "clamp(2.75rem, 11vw, 6rem)" }}
        >
          Relief <br /> <span className="italic font-light text-primary">is our belief.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8"
        >
          <p className="text-foreground/90 font-sans text-base sm:text-lg md:text-xl max-w-md leading-relaxed">
            The {FOUNDATION.name} is a growing collective of citizen volunteers working to support our
            community unconditionally. {FOUNDATION.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide px-8 h-12 shadow-sm"
              render={<a href="#initiatives" />}
            >
              Donate Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 font-semibold tracking-wide px-8 h-12 bg-background/80 backdrop-blur-sm shadow-sm"
              render={<a href="#about" />}
            >
              Our Story
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
