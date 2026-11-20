"use client";
import { useEffect, useState } from "react";
import { VERDICTS } from "@/lib/constants";

const ARC = "M 20 100 A 80 80 0 0 1 180 100";

export default function TruthMeter({ score, verdict }) {
  const [shown, setShown] = useState(0);
  const rounded = Math.round(score);

  // Start empty, then fill up so the gauge animates
  useEffect(() => {
    const t = setTimeout(() => setShown(score), 150);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 122" className="w-full max-w-[290px]" role="img" aria-label={`Truth meter: ${rounded} percent authentic`}>
        <path d={ARC} fill="none" stroke="#E6E2D8" strokeWidth="16" strokeLinecap="round" />
        <path
          d={ARC} fill="none" stroke={VERDICTS[verdict].color} strokeWidth="16" strokeLinecap="round"
          pathLength="100" strokeDasharray={`${shown} 100`}
          style={{ transition: "stroke-dasharray 1s ease-out" }}
        />
        <text x="100" y="86" textAnchor="middle" fontSize="38" fontWeight="700" fill="#0F2145" fontFamily="var(--font-serif), Georgia, serif">{rounded}%</text>
        <text x="100" y="104" textAnchor="middle" fontSize="9" fill="#4B5870">Authenticity score</text>
        <text x="20" y="119" textAnchor="middle" fontSize="9" fill="#4B5870">0%</text>
        <text x="180" y="119" textAnchor="middle" fontSize="9" fill="#4B5870">100%</text>
      </svg>
      <p className="mt-1 text-sm text-navy-soft">
        <strong className="text-navy">{rounded}% true</strong> · {100 - rounded}% false or misleading
      </p>
    </div>
  );
}
