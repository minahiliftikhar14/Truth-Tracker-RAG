export default function SourceCard({ source }) {
  const pct = Math.round(source.similarity * 100);
  return (
    <li className="rounded-xl border border-edge bg-paper p-3.5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy text-xs font-bold text-white" aria-hidden="true">
          {source.publisher.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-teal">{source.publisher}</p>
          <a
            href={source.url} target="_blank" rel="noopener noreferrer"
            className="block truncate text-sm font-semibold text-navy hover:underline"
          >
            {source.title}
          </a>
        </div>
      </div>
      {source.snippet && <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-navy-soft">{source.snippet}</p>}
      <div className="mt-2.5 flex items-center gap-3">
        <div className="flex flex-1 items-center gap-2 text-[11px] text-navy-soft">
          <span>Relevance</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-edge" role="img" aria-label={`Relevance ${pct} percent`}>
            <div className="h-full rounded-full bg-teal" style={{ width: `${pct}%` }} />
          </div>
          <span className="font-semibold text-navy">{pct}%</span>
        </div>
        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-teal hover:underline">
          Open article ↗
        </a>
      </div>
    </li>
  );
}
