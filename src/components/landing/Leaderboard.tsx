import { useEffect, useState } from "react";
import logo from "../../ksf_logoo.png";
import {
  LEADERBOARD_CSV_URL,
  LEADERBOARD_FALLBACK,
  LEADERBOARD_TOP_N,
  isLeaderboardConfigured,
  IMPACT_STATS,
  POINTS_GUIDE,
  type Volunteer,
} from "@/src/config";

function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let cur: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { cur.push(field); field = ""; }
    else if (c === "\n") { cur.push(field); rows.push(cur); cur = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field.length || cur.length) { cur.push(field); rows.push(cur); }

  const header = (rows.shift() ?? []).map((h) => h.trim().toLowerCase());
  return rows
    .filter((r) => r.some((v) => v.trim() !== ""))
    .map((r) => {
      const obj: Record<string, string> = {};
      header.forEach((h, i) => (obj[h] = (r[i] ?? "").trim()));
      return obj;
    });
}

function toVolunteers(rows: Record<string, string>[]): Volunteer[] {
  return rows
    .map((r) => ({
      name: r.name || "Volunteer",
      points: Number(r.points) || 0,
      badges: (r.badges || "").split(",").map((b) => b.trim()).filter(Boolean),
      proof: r.proof || undefined,
    }))
    .sort((a, b) => b.points - a.points);
}

export function Leaderboard() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>(LEADERBOARD_FALLBACK);

  useEffect(() => {
    if (!isLeaderboardConfigured()) return;
    let alive = true;
    fetch(LEADERBOARD_CSV_URL)
      .then((res) => res.text())
      .then((text) => {
        if (!alive) return;
        const parsed = toVolunteers(parseCSV(text));
        if (parsed.length) setVolunteers(parsed);
      })
      .catch((err) => console.error("[Leaderboard] CSV fetch failed:", err));
    return () => {
      alive = false;
    };
  }, []);

  const top = volunteers.slice(0, LEADERBOARD_TOP_N);

  return (
    <section id="leaderboard" className="bg-background border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-4 flex flex-col justify-between gap-10 border-b md:border-b-0 md:border-r border-border px-5 py-12 sm:px-8 md:p-12">
          <div>
            <div className="inline-block p-1 border border-primary/20 rounded-full mb-6">
              <div className="w-16 h-16 bg-white overflow-hidden rounded-full flex items-center justify-center">
                <img src={logo} alt="Logo" className="w-full h-full object-contain p-1" />
              </div>
            </div>
            <h2 className="display text-3xl md:text-5xl font-extrabold uppercase leading-[0.9] mb-4">Honor Roll</h2>
            <p className="font-sans text-sm text-foreground/80 font-medium max-w-sm leading-relaxed">
              Real change happens on the ground. Share proof of your work with our team by email, earn points,
              and climb the ranks. Every contribution is recognised.
            </p>

            <div className="mt-8 rounded-lg border border-border bg-muted/30 p-5">
              <h3 className="font-mono text-[10px] uppercase tracking-widest text-accent mb-3">How to earn points</h3>
              <ul className="flex flex-col gap-2">
                {POINTS_GUIDE.map((g) => (
                  <li key={g.action} className="flex items-center justify-between gap-3 text-xs">
                    <span className="text-foreground/80">{g.action}</span>
                    <span className="font-mono font-bold text-primary shrink-0">{g.points}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex border-t border-border pt-6">
            <div className="flex-1 pr-4 border-r border-border">
              <h4 className="display font-extrabold text-3xl text-foreground">{IMPACT_STATS.volunteers}</h4>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Volunteers</p>
            </div>
            <div className="flex-1 pl-4">
              <h4 className="display font-extrabold text-3xl text-primary">{IMPACT_STATS.points}</h4>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Points</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 flex flex-col px-5 py-12 sm:px-8 md:p-12 bg-muted/5">
          <div className="flex items-end justify-between border-b border-border pb-4 mb-6">
            <h3 className="font-mono uppercase tracking-[0.2em] text-sm text-foreground/80">Top Contributors</h3>
            <span className="text-[10px] font-mono font-bold uppercase text-muted-foreground">
              {isLeaderboardConfigured() ? "Live" : "Sample"}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {top.map((v, i) => {
              const medals = [
                "bg-amber-400 text-amber-950 border-amber-500",
                "bg-slate-200 text-slate-700 border-slate-300",
                "bg-orange-300 text-orange-950 border-orange-400",
              ];
              const isTop = i === 0;
              return (
                <div
                  key={`${v.name}-${i}`}
                  className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all group ${
                    isTop ? "bg-primary/5 ring-1 ring-primary/20 shadow-sm" : "hover:bg-muted/50"
                  }`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-sm font-bold shrink-0 border ${
                      medals[i] ?? "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {i + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-serif italic text-lg sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors truncate block">
                      {v.name}
                    </span>
                    {v.badges.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {v.badges.map((b, idx) => (
                          <span
                            key={b}
                            className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                              idx === 0 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="font-mono text-xs sm:text-sm font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary shrink-0">
                    {v.points.toLocaleString()} pts
                  </span>

                  <div className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 overflow-hidden rounded-lg ring-1 ring-border bg-primary/10 flex items-center justify-center">
                    {v.proof ? (
                      <img
                        src={v.proof}
                        alt={`Proof by ${v.name}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="font-serif italic text-lg text-primary/70">{v.name.charAt(0)}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
