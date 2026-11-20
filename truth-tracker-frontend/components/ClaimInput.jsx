"use client";
import { useState } from "react";

const MAX = 1500;
const TIMEFRAMES = [
  { value: 1, label: "Past 24 hours" },
  { value: 7, label: "Past 7 days" },
  { value: 30, label: "Past 30 days" },
  { value: 365, label: "Past year" },
];
const SAMPLES = [
  { label: "SBP policy rate cut...", text: "The State Bank of Pakistan has cut the policy rate this month." },
  { label: "Roman Urdu school closure...", text: "Kal se Punjab ke tamam schools band hain." },
];

// Detect Urdu script so the textarea flips to right-to-left automatically
const isUrdu = (t) => /[\u0600-\u06FF]/.test(t);

export default function ClaimInput({ onVerify, disabled = false }) {
  const [claim, setClaim] = useState("");
  const [days, setDays] = useState(7);
  const trimmed = claim.trim();

  function handleSubmit(e) {
    e.preventDefault();
    if (!trimmed || disabled) return;
    onVerify({ claim: trimmed, days });
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-edge bg-paper-card p-4 shadow-[0_6px_24px_-12px_rgba(15,33,69,0.18)]">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor="claim" className="text-[15px] font-semibold">Enter your claim</label>
        <span className="rounded-md border border-edge bg-paper-chip px-2 py-0.5 text-[10px] font-medium text-navy-soft">
          English • اردو • Roman Urdu
        </span>
      </div>

      <textarea
        id="claim"
        value={claim}
        onChange={(e) => setClaim(e.target.value.slice(0, MAX))}
        dir={isUrdu(claim) ? "rtl" : "ltr"}
        rows={3}
        placeholder="Type or paste a claim in English, Urdu, or Roman Urdu"
        className="mt-2.5 w-full resize-none rounded-xl border border-edge bg-paper-field p-3 text-sm placeholder:text-navy-soft/60 focus:border-navy focus:outline-none"
      />

      {/* One row: timeframe, counter, verify button */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-edge pt-3 text-xs">
        <div className="flex items-center gap-2">
          <label htmlFor="timeframe" className="font-semibold">News timeframe</label>
          <select
            id="timeframe"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="rounded-lg border border-edge bg-paper-field px-2 py-1.5"
          >
            {TIMEFRAMES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className={claim.length >= MAX ? "font-medium text-red-700" : "text-navy-soft"} aria-live="polite">
            {claim.length} / {MAX} characters
          </span>
          <button
            type="submit"
            disabled={!trimmed || disabled}
            className="inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1B3266] disabled:cursor-not-allowed disabled:bg-paper-chip disabled:text-navy-soft"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
            </svg>
            Verify claim
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
        <span className="font-semibold">Sample queries:</span>
        {SAMPLES.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setClaim(s.text)}
            className="rounded-md border border-edge bg-paper-chip px-2 py-1 text-navy-soft hover:border-navy hover:text-navy"
          >
            "{s.label}"
          </button>
        ))}
      </div>
    </form>
  );
}
