import { Upload, Award, ClipboardList, Mail, HeartHandshake } from "lucide-react";
import { VOLUNTEER_FORM_URL, isVolunteerFormConfigured, FOUNDATION, VOLUNTEERS_IMAGE } from "@/src/config";

const STEPS = [
  { icon: ClipboardList, label: "Fill the volunteer application", active: true },
  { icon: Upload, label: "Log your activity & upload proofs", active: true },
  { icon: Award, label: "Earn badges & climb the leaderboard", active: false },
];

export function Membership() {
  const configured = isVolunteerFormConfigured();

  return (
    <section id="membership" className="bg-primary text-primary-foreground">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="relative lg:col-span-5 flex flex-col justify-between gap-12 px-5 py-12 sm:px-8 md:p-16 overflow-hidden border-b lg:border-b-0 lg:border-r border-primary-foreground/20">
          <div className="absolute inset-0 z-0">
            <img src={VOLUNTEERS_IMAGE} alt="Volunteers of the Kuber Seth Foundation" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/80" />
          </div>

          <div className="relative z-10">
            <h2
              className="font-serif font-bold tracking-tight leading-[1.1] mb-8"
              style={{ fontSize: "clamp(2.5rem, 7vw, 3.75rem)" }}
            >
              Join the <br /> <span className="italic text-accent">Movement.</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-primary-foreground/90 font-medium max-w-sm leading-relaxed mb-12">
              Become an official volunteer for the {FOUNDATION.name}. Your work is recorded in our central
              system for transparent, points-based recognition.
            </p>

            <div className="flex flex-col gap-6">
              {STEPS.map((step) => (
                <div key={step.label} className={`flex items-start gap-4 ${step.active ? "" : "opacity-70"}`}>
                  <div className="w-9 h-9 rounded-full border border-primary-foreground/50 bg-primary/40 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <step.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-sans text-xs tracking-widest font-bold uppercase py-2">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-[11px] text-primary-foreground/70 leading-relaxed max-w-sm border-t border-primary-foreground/20 pt-6">
            Note: uploading proof photos requires signing in with a Google account — this keeps submissions
            authentic and spam-free.
          </p>
        </div>

        <div className="lg:col-span-7 bg-background p-4 sm:p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-2xl h-[640px] sm:h-[700px] bg-card border border-border shadow-md rounded-lg flex flex-col overflow-hidden">
            <div className="h-12 border-b border-border bg-muted flex items-center px-4 justify-between shrink-0">
              <span className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
                Volunteer Registration
              </span>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-muted-foreground/30 rounded-full"></div>
                <div className="w-3 h-3 bg-muted-foreground/30 rounded-full"></div>
                <div className="w-3 h-3 bg-muted-foreground/30 rounded-full"></div>
              </div>
            </div>

            <div className="flex-1 relative bg-background">
              {configured ? (
                <iframe
                  src={VOLUNTEER_FORM_URL}
                  title="Volunteer registration form"
                  className="w-full h-full border-0"
                  loading="lazy"
                >
                  Loading…
                </iframe>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                    <HeartHandshake className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl italic text-foreground mb-2">Registrations open soon</h3>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
                    We're onboarding our next batch of volunteers. Reach out and we'll add you to the very
                    first list.
                  </p>
                  <a
                    href={`mailto:${FOUNDATION.email}?subject=I want to volunteer`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Email us to join
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
