import { VERDICTS } from "@/lib/constants";

const paths = {
  Truth: "m5 12 5 5 9-10",
  Fake: "M6 6l12 12M18 6 6 18",
  Misleading: "M12 7v6M12 17h.01",
};

export default function VerdictBadge({ verdict }) {
  const v = VERDICTS[verdict];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-bold"
      style={{ color: v.color, backgroundColor: v.tint, border: `1px solid ${v.color}33` }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={paths[verdict]} />
      </svg>
      {verdict}
    </span>
  );
}
