import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QRCodeSVG } from "qrcode.react";
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Mail,
} from "lucide-react";
import logo from "../../ksf_logoo.png";
import {
  INITIATIVES,
  type Initiative,
  buildUpiString,
  UPI,
  SUGGESTED_AMOUNTS,
  EMAILJS,
  isEmailConfigured,
  FOUNDATION,
} from "@/src/config";

const pageUrl = typeof window !== "undefined" ? window.location.href : FOUNDATION.socials.instagram;

type SubmitStatus = "idle" | "sending" | "success" | "error";

function InitiativeCard({ item, index }: { item: Initiative; index: number }) {
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [scanned, setScanned] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", txnId: "" });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const shareUrl = `${pageUrl.split("?")[0]}?donate=${item.id}`;
  const upiString = buildUpiString(item.id, item.title, amount);

  const handleReceiptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const params = {
      name: form.name,
      email: form.email,
      txn_id: form.txnId,
      amount: amount ? `₹${amount}` : "As paid",
      initiative: item.title,
      date: new Date().toLocaleString("en-IN"),
    };

    if (!isEmailConfigured()) {
      console.warn("[EmailJS] Not configured — see EMAILJS in src/config.ts. Simulating receipt.");
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

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleQRTap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setScanned(true);
    setTimeout(() => setScanned(false), 1600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Dialog onOpenChange={(open) => !open && setStatus("idle")}>
        <DialogTrigger
          render={
            <div className="group relative flex items-center justify-between gap-4 rounded-lg border border-border bg-card p-5 sm:p-6 cursor-pointer shadow-sm hover:shadow-md transition-all hover:-translate-y-1 text-left w-full" />
          }
        >
          <div className="flex-1">
            <h4 className="font-serif text-2xl sm:text-3xl italic mb-2 text-foreground font-semibold group-hover:text-primary transition-colors">
              {item.title}
            </h4>
            <p className="text-xs uppercase tracking-widest text-foreground/70 font-semibold leading-relaxed">
              {item.description}
            </p>
          </div>

          <div
            onClick={handleQRTap}
            className="w-16 h-16 md:w-20 md:h-20 shrink-0 border border-border bg-white rounded-md flex flex-col items-center justify-center p-2 relative overflow-hidden hover:border-primary group-hover:bg-primary/5 transition-colors"
            aria-label={`Show donation QR for ${item.title}`}
          >
            {scanned ? (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="w-6 h-6 text-primary md:mb-1" />
                <span className="text-[8px] font-bold uppercase tracking-tighter text-primary">Open full QR</span>
              </motion.div>
            ) : (
              <QRCodeSVG
                value={upiString}
                size={120}
                level="M"
                imageSettings={{ src: logo, height: 22, width: 22, excavate: true }}
                className="w-full h-full"
              />
            )}
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[900px] p-0 border border-border rounded-lg shadow-xl bg-background overflow-y-auto max-h-[90vh]">
          <div className="grid md:grid-cols-5">
            <div className="md:col-span-2 relative h-48 md:h-full min-h-[200px] border-b md:border-b-0 md:border-r border-border overflow-hidden bg-muted">
              <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
            </div>

            <div className="md:col-span-3 p-6 sm:p-8 md:p-10 flex flex-col">
              <DialogHeader className="mb-4 text-left">
                <DialogTitle className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-primary italic">
                  {item.title}
                </DialogTitle>
                <DialogDescription className="font-sans text-foreground/80 mt-3 leading-relaxed text-sm sm:text-base font-medium">
                  {item.longDescription}
                </DialogDescription>
              </DialogHeader>

              {SUGGESTED_AMOUNTS.length > 0 && (
                <div className="mt-2 mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Choose an amount (optional)
                  </p>
                  <div className="flex flex-wrap gap-2">
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
                    <span className="px-3 py-1.5 text-xs font-medium text-muted-foreground self-center">
                      or enter any amount in your UPI app
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-start p-6 bg-muted/30 rounded-xl border border-border">
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
                      className="w-[130px] h-[130px] md:w-[150px] md:h-[150px]"
                    />
                  </a>
                  <p className="text-[10px] md:text-xs text-muted-foreground mt-4 text-center font-medium max-w-[220px] leading-relaxed">
                    Open any UPI app and scan, or tap the code on your phone. Paying securely to{" "}
                    <span className="font-semibold text-foreground">{UPI.vpa}</span>.
                  </p>
                </div>

                <div className="bg-card rounded-xl p-6 border border-border shadow-sm flex flex-col relative overflow-hidden">
                  <h5 className="text-xs uppercase tracking-widest font-bold mb-1 flex items-center text-foreground">
                    <Mail className="w-4 h-4 mr-2 text-primary" /> Claim Receipt
                  </h5>
                  <p className="text-[10px] text-muted-foreground mb-4 leading-relaxed">
                    After paying, enter your details and UPI transaction ID (UTR) to get an emailed receipt.
                  </p>

                  {status === "success" ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 py-6">
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

              <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Share2 className="w-3 h-3" /> Spread the word
                </span>
                <div className="flex items-center gap-2">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground/70 hover:text-foreground">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Support: ${item.title}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground/70 hover:text-foreground">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground/70 hover:text-foreground">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={FOUNDATION.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground/70 hover:text-foreground">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <button onClick={handleCopyLink} aria-label="Copy link" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors text-foreground/70 hover:text-foreground ml-auto bg-card">
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export function Initiatives() {
  return (
    <section id="initiatives" className="bg-background border-b border-border">
      <div className="max-w-4xl mx-auto flex flex-col px-5 py-16 sm:px-8 sm:py-20 md:px-12">
        <div className="flex flex-wrap justify-between items-end gap-2 border-b border-border pb-4 mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl uppercase font-bold tracking-widest text-primary">
            Active Initiatives
          </h2>
          <span className="text-xs font-mono font-semibold uppercase text-muted-foreground tracking-widest">
            Every drop counts
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {INITIATIVES.map((item, i) => (
            <InitiativeCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
