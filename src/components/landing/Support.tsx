import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { QRCodeSVG } from "qrcode.react";
import { Mail, CheckCircle2, AlertCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../../ksf_logoo.png";
import { SectionLabel } from "./SectionLabel";
import {
  buildUpiString,
  UPI,
  SUGGESTED_AMOUNTS,
  EMAILJS,
  isEmailConfigured,
  FOUNDATION,
} from "@/src/config";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export function Support() {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [form, setForm] = useState({ name: "", email: "", txnId: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const upiString = buildUpiString("support", "Support the Foundation", amount);

  const handleReceiptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const params = {
      name: form.name,
      email: form.email,
      txn_id: form.txnId,
      amount: amount ? `₹${amount}` : "As paid",
      initiative: "General Support",
      date: new Date().toLocaleString("en-IN"),
    };

    if (!isEmailConfigured()) {
      setTimeout(() => {
        setStatus("success");
        setForm({ name: "", email: "", txnId: "" });
      }, 900);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.donorReceiptTemplateId,
        { ...params, to_email: form.email },
        EMAILJS.publicKey,
      );
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.foundationNotifyTemplateId,
        { ...params, to_email: FOUNDATION.email },
        EMAILJS.publicKey,
      );
      setStatus("success");
      setForm({ name: "", email: "", txnId: "" });
    } catch (err) {
      console.error("[EmailJS] send failed:", err);
      setStatus("error");
    }
  };

  return (
    <section id="donate" className="bg-secondary border-t border-border">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 md:px-12 py-20 sm:py-28">
        <SectionLabel index="03" title="Support" meta="UPI · instant receipt" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10 md:mt-16 items-center">
        <div>
          <h2
            className="display font-bold uppercase leading-[0.9] text-secondary-foreground mb-6 text-balance"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
          >
            Support our <span className="serif-italic lowercase font-normal text-accent">work.</span>
          </h2>
          <p className="font-sans text-base md:text-lg text-secondary-foreground/80 leading-relaxed max-w-md mb-8">
            Every contribution fuels ration kits, health aid, and education on the ground in Srinagar. Give
            securely over UPI, and claim an instant emailed receipt.
          </p>
          <div className="flex items-center gap-3 text-secondary-foreground/70">
            <Heart className="w-5 h-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-widest">100% goes to the cause</span>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-md p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-start">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-4 text-center">
                Scan or Tap to Donate
              </p>
              <a
                href={upiString}
                className="block bg-white p-3 md:p-4 rounded-xl shadow-sm border border-border/50 hover:scale-105 active:scale-95 transition-transform"
              >
                <QRCodeSVG
                  value={upiString}
                  size={150}
                  level="M"
                  imageSettings={{ src: logo, height: 30, width: 30, excavate: true }}
                  className="w-[140px] h-[140px]"
                />
              </a>
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {SUGGESTED_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount((cur) => (cur === amt ? undefined : amt))}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                      amount === amt
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground/80 border-border hover:border-primary"
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-3 text-center leading-relaxed">
                Paying to <span className="font-semibold text-foreground">{UPI.vpa}</span>
              </p>
            </div>

            <div className="flex flex-col">
              <h5 className="text-xs uppercase tracking-widest font-bold mb-1 flex items-center text-foreground">
                <Mail className="w-4 h-4 mr-2 text-primary" /> Claim Receipt
              </h5>
              <p className="text-[10px] text-muted-foreground mb-4 leading-relaxed">
                After paying, enter your details and UPI transaction ID (UTR) to get an emailed receipt.
              </p>

              {status === "success" ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-primary mb-2" />
                  <p className="text-sm font-semibold text-foreground">Receipt requested!</p>
                  <p className="text-[10px] text-muted-foreground mt-1 max-w-[200px]">
                    A confirmation will reach your inbox shortly. Thank you for your kindness.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReceiptSubmit} className="flex flex-col gap-3 flex-1">
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    className="w-full text-xs p-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/50"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email address"
                    className="w-full text-xs p-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/50"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <input
                    required
                    type="text"
                    placeholder="Transaction ID (UTR)"
                    className="w-full text-xs p-2.5 rounded-md border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary/50"
                    value={form.txnId}
                    onChange={(e) => setForm({ ...form, txnId: e.target.value })}
                  />
                  {status === "error" && (
                    <p className="text-[10px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Couldn't send — please try again or email us.
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full mt-auto bg-primary text-primary-foreground font-bold text-xs h-10 hover:bg-primary/90"
                  >
                    {status === "sending" ? "Sending..." : "Email me a receipt"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
