"use client";
import { useEffect, useRef } from "react";
import { VERDICTS } from "@/lib/constants";
import { isUrdu } from "@/lib/utils";
import TruthMeter from "@/components/TruthMeter";
import VerdictBadge from "@/components/VerdictBadge";
import SourceCard from "@/components/SourceCard";
import PipelineLoader from "@/components/PipelineLoader";

export default function ResultPanel({ status, claim, result, error, stage, onClose, onRetry }) {
  const open = status !== "idle";
  const closeRef = useRef(null);

  // Esc closes, page behind does not scroll, focus returns to the claim box afterwards
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-30 flex items-start justify-center overflow-y-auto px-3 pt-12 pb-5 sm:px-6"
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 animate-fade bg-navy/40 backdrop-blur-[1px] motion-reduce:animate-none"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Wide & tall bubble pop-up card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-title"
        className="relative z-40 flex max-h-[90vh] w-full max-w-6xl animate-popDown flex-col overflow-hidden rounded-3xl border border-edge bg-paper-card shadow-[0_26px_65px_-15px_rgba(14,46,29,0.5)] motion-reduce:animate-none"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-forest-dark bg-forest px-5 py-3 text-sand sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-sand-warm" />
            <h2 id="result-title" className="font-serif text-lg font-bold text-white">
              Verification result
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close result"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sand/85 transition-colors hover:bg-forest-soft hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
          {status === "loading" && (
            <div className="mx-auto max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-soft">Your claim</p>
              <p
                dir={isUrdu(claim) ? "rtl" : "ltr"}
                className="mt-1.5 rounded-xl border border-edge bg-paper-field p-3 text-sm leading-relaxed text-navy"
              >
                {claim}
              </p>
              <PipelineLoader stage={stage} />
            </div>
          )}

          {status === "error" && (
            <div className="mx-auto max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-soft">Your claim</p>
              <p
                dir={isUrdu(claim) ? "rtl" : "ltr"}
                className="mt-1.5 rounded-xl border border-edge bg-paper-field p-3 text-sm leading-relaxed text-navy"
              >
                {claim}
              </p>
              <div role="alert" className="mt-4 rounded-xl border border-[#B3261E]/35 bg-[#FBE7E5] p-4">
                <h3 className="font-semibold text-[#B3261E]">We couldn&apos;t check this claim</h3>
                <p className="mt-1 text-sm text-navy">{error}</p>
                <button
                  onClick={onRetry}
                  className="mt-3 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-soft"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {status === "success" && (
            <>
              {result.mock && (
                <p className="mb-4 rounded-lg border border-edge bg-paper-chip px-3 py-1.5 text-xs text-navy-soft">
                  Demo data: the backend is not connected yet, so this result is a sample.
                </p>
              )}

              {/* Two-column editorial layout so Verdict, Reasoning & Sources appear together */}
              <div className="grid gap-5 lg:grid-cols-12 lg:items-start">
                {/* Left Column: Claim + Verdict + Truth Meter */}
                <div className="space-y-4 lg:col-span-5">
                  <section>
                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy-soft">Your claim</p>
                    <p
                      dir={isUrdu(claim) ? "rtl" : "ltr"}
                      className="mt-1 rounded-xl border border-edge bg-paper-field p-3 text-sm leading-relaxed text-navy"
                    >
                      {claim}
                    </p>
                    {result.language && (
                      <p className="mt-1.5 text-xs text-navy-soft">
                        Detected language: <strong className="text-navy">{result.language}</strong>
                        {result.translatedClaim && <> · {result.translatedClaim}</>}
                      </p>
                    )}
                  </section>

                  <section className="rounded-2xl border border-edge bg-paper p-4 text-center">
                    <VerdictBadge verdict={result.verdict} />
                    <p className="mt-1 text-xs text-navy-soft">{VERDICTS[result.verdict].note}</p>
                    <div className="mt-2">
                      <TruthMeter score={result.score} verdict={result.verdict} />
                    </div>
                  </section>
                </div>

                {/* Right Column: Why this verdict + Sources checked */}
                <div className="space-y-4 lg:col-span-7">
                  <section className="rounded-2xl border border-edge bg-paper p-4">
                    <h3 className="font-serif text-base font-bold text-navy">Why this verdict</h3>
                    <p
                      dir={isUrdu(result.explanation) ? "rtl" : "ltr"}
                      className="mt-1.5 text-sm leading-relaxed text-navy-soft"
                    >
                      {result.explanation}
                    </p>
                  </section>

                  <section>
                    <h3 className="font-serif text-base font-bold text-navy">
                      Sources checked ({result.sources.length})
                    </h3>
                    {result.sources.length ? (
                      <ul className="mt-2 space-y-2.5">
                        {result.sources.map((s) => (
                          <SourceCard key={s.url + s.title} source={s} />
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-1.5 text-sm text-navy-soft">No source links were returned for this claim.</p>
                    )}
                  </section>
                </div>
              </div>

              <p className="mt-4 border-t border-edge pt-3 text-xs leading-relaxed text-navy-soft">
                This is an AI-based estimate to help you check a claim. It is not legal proof or an official fact-check ruling.
              </p>
            </>
          )}
        </div>

        {/* Footer action */}
        {status !== "loading" && (
          <div className="border-t border-edge bg-paper px-5 py-2.5 sm:px-6">
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-forest py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-soft"
            >
              {status === "success" ? "Verify another claim" : "Close"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}