import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { ClipboardList, HeartHandshake, Award, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EMAILJS, isEmailConfigured, FOUNDATION, VOLUNTEERS_IMAGE } from "@/src/config";

const STEPS = [
  { icon: ClipboardList, label: "Register as a volunteer" },
  { icon: HeartHandshake, label: "Join our initiatives on the ground" },
  { icon: Award, label: "Share your work & get recognised" },
];

const INTERESTS = [
  "On-ground volunteering",
  "Teaching / Taleem",
  "Logistics & distribution",
  "Fundraising",
  "Social media & content",
  "Other",
];

type SubmitStatus = "idle" | "sending" | "success" | "error";

export function Membership() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: INTERESTS[0], message: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const params = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      interest: form.interest,
      message: form.message || "—",
      date: new Date().toLocaleString("en-IN"),
    };

    if (!isEmailConfigured()) {
      setTimeout(() => {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", interest: INTERESTS[0], message: "" });
      }, 900);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.volunteerNotifyTemplateId,
        { ...params, to_email: FOUNDATION.email },
        EMAILJS.publicKey,
      );
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.volunteerConfirmTemplateId,
        { ...params, to_email: form.email },
        EMAILJS.publicKey,
      );
      setStatus("success");
      setForm({ name: "", email: "", phone: "", interest: INTERESTS[0], message: "" });
    } catch (err) {
      console.error("[EmailJS] send failed:", err);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full text-sm p-3 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50";

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
              className="display font-bold uppercase leading-[0.9] mb-8"
              style={{ fontSize: "clamp(2.75rem, 7vw, 5rem)" }}
            >
              Join the <br /> <span className="serif-italic lowercase font-normal text-accent">Movement.</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-primary-foreground/90 font-medium max-w-sm leading-relaxed mb-12">
              Become an official volunteer for the {FOUNDATION.name}. Sign up in seconds — our team will reach
              out with the next steps.
            </p>

            <div className="flex flex-col gap-6">
              {STEPS.map((step) => (
                <div key={step.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full border border-primary-foreground/50 bg-primary/40 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <step.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-sans text-xs tracking-widest font-bold uppercase py-2">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-background p-5 sm:p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-xl bg-card text-foreground border border-border shadow-md rounded-lg p-6 sm:p-8">
            <h3 className="display text-2xl sm:text-3xl font-bold uppercase text-foreground mb-1">Volunteer registration</h3>
            <p className="text-sm text-muted-foreground mb-6">
              We'll send your details to our team and a confirmation to your inbox.
            </p>

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <CheckCircle2 className="w-14 h-14 text-primary mb-3" />
                <p className="text-lg font-semibold text-foreground">You're on the list!</p>
                <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                  Thank you for stepping up. Check your email for a confirmation — we'll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full name" className={inputClass} value={form.name} onChange={update("name")} />
                  <input required type="tel" placeholder="Phone number" className={inputClass} value={form.phone} onChange={update("phone")} />
                </div>
                <input required type="email" placeholder="Email address" className={inputClass} value={form.email} onChange={update("email")} />
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-1.5 block">
                    How would you like to help?
                  </label>
                  <select className={inputClass} value={form.interest} onChange={update("interest")}>
                    {INTERESTS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  placeholder="Anything you'd like us to know? (optional)"
                  rows={3}
                  className={`${inputClass} resize-none`}
                  value={form.message}
                  onChange={update("message")}
                />
                {status === "error" && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Couldn't submit — please try again or email {FOUNDATION.email}.
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-primary text-primary-foreground font-bold h-11 hover:bg-primary/90"
                >
                  {status === "sending" ? "Submitting..." : "Become a volunteer"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
