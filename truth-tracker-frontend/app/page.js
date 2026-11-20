"use client";
import ClaimInput from "@/components/ClaimInput";
import ResultPanel from "@/components/ResultPanel";
import { useFactCheck } from "@/hooks/useFactCheck";

const icon = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

const steps = [
  {
    title: "Search news",
    text: "Your claim is searched across real-time news sources to find relevant articles.",
    svg: <svg {...icon}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>,
  },
  {
    title: "Retrieve evidence",
    text: "Relevant articles are collected and divided into smaller text sections for analysis.",
    svg: <svg {...icon}><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h7M9 17h7" /></svg>,
  },
  {
    title: "Compare meaning",
    text: "AI converts the claim and evidence into numerical representations and compares their meaning.",
    svg: <svg {...icon}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>,
  },
  {
    title: "Verify claim",
    text: "The evidence is analyzed to generate a credibility score, verdict, and explanation.",
    svg: <svg {...icon}><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" /><path d="m9 12 2 2 4-4" /></svg>,
  },
];

export default function Home() {
  const check = useFactCheck();

  return (
    <>
      {/* ---------- HOME ---------- */}
      <section id="home" className="mx-auto max-w-6xl scroll-mt-[70px] px-6 pb-6">
        <div className="pt-5 pb-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-paper-chip px-3 py-1 text-[11px] font-semibold tracking-wider text-navy">
            <span className="h-1.5 w-1.5 rounded-full bg-navy" />
            MULTILINGUAL EVIDENCE INTELLIGENCE
          </span>
          <h1 className="mt-3 font-serif text-3xl font-bold leading-tight sm:text-4xl">Verify before you believe</h1>
          <p className="mx-auto mt-2 max-w-xl text-base leading-snug text-navy-soft">
            Check claims using real-time news, semantic search, and AI-powered evidence analysis.
          </p>
        </div>

       {/* Claim box: centered in the window */}
       <div className="mx-auto w-full max-w-2xl">
          <ClaimInput onVerify={check.run} disabled={check.status === "loading"} />
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section id="how-it-works" className="scroll-mt-[70px] border-t border-edge bg-paper-card py-8">
        <div className="mx-auto max-w-6xl px-6">
          <header className="text-center">
            <h2 className="font-serif text-2xl font-bold leading-tight">How Truth Tracker works</h2>
            <p className="mx-auto mt-1.5 max-w-xl text-sm leading-snug text-navy-soft">
              Our AI-powered system analyzes your claim against recent news and evidence to provide a credibility assessment.
            </p>
          </header>

          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="rounded-2xl border border-edge bg-paper-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(15,33,69,0.25)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white">{s.svg}</span>
                  <span className="font-serif text-sm font-semibold text-navy-soft">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-3 font-serif text-base font-semibold leading-snug">{s.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- ABOUT ---------- */}
      <section id="about" className="scroll-mt-[70px] border-t border-edge py-10">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-serif text-2xl font-bold leading-tight">About</h2>
          <p className="mt-2 text-sm leading-relaxed text-navy-soft">
            Truth Tracker is a final year project of the Department of Software Engineering, University of Gujrat,
            supervised by Dr. Mirza Ahsan Ullah.
          </p>
        </div>
      </section>

      {/* Output panel: opens on the right half of the window */}
      <ResultPanel
        status={check.status} claim={check.claim} result={check.result} error={check.error} stage={check.stage}
        onClose={check.reset} onRetry={() => check.run({ claim: check.claim, days: check.days })}
      />
    </>
  );
}
