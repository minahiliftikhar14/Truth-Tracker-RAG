import { PIPELINE_STAGES } from "@/lib/constants";

export default function PipelineLoader({ stage }) {
  return (
    <div role="status" aria-live="polite" className="py-6">
      <h3 className="font-serif text-xl font-semibold">Checking your claim...</h3>
      <p className="mt-1 text-sm text-navy-soft">This usually takes a few seconds.</p>
      <ol className="mt-5 space-y-3">
        {PIPELINE_STAGES.map((label, i) => {
          const done = i < stage;
          const current = i === stage;
          return (
            <li key={label} className={`flex items-center gap-3 text-sm ${done || current ? "text-navy" : "text-navy-soft/60"}`}>
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${done ? "bg-teal text-white" : current ? "border-2 border-teal" : "border border-edge"}`}>
                {done ? "✓" : current ? <span className="h-2 w-2 animate-pulse rounded-full bg-teal" /> : i + 1}
              </span>
              <span className={current ? "font-semibold" : ""}>{label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
