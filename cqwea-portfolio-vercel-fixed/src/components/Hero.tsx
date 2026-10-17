import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";

const traces = [
  "M60 120 H170 L210 160 H300",
  "M60 200 H140 L180 240 H300",
  "M60 280 H200 L240 320 H420",
  "M300 140 H370 L400 110 H440",
  "M300 260 H360 L390 230 H440",
];

function Board() {
  return (
    <svg viewBox="0 0 500 400" role="img" aria-label="Illustration of a circuit board with signals travelling along copper traces" className="w-full">
      <rect x="20" y="20" width="460" height="360" rx="10" fill="none" className="trace" strokeWidth="1.5" />
      {traces.map((d, i) => (
        <g key={d} fill="none" strokeWidth="2" strokeLinecap="square">
          <path d={d} className="trace" />
          <path d={d} pathLength={100} className="pulse" style={{ animationDelay: `${i * 0.9}s` }} />
          <circle cx={d.split(" ")[0]?.slice(1)} cy={d.split(" ")[1]} r="5" fill="var(--color-ink)" stroke="var(--color-mute)" />
        </g>
      ))}
      <rect x="300" y="110" width="110" height="180" rx="4" fill="var(--color-panel)" stroke="var(--color-mute)" strokeWidth="1.5" />
      <circle cx="318" cy="128" r="4" fill="var(--color-accent)" />
      <text x="355" y="208" textAnchor="middle" fontSize="15" fontFamily="var(--font-mono)" fill="var(--color-paper)">U1</text>
      {[0, 1, 2, 3, 4].map((n) => (
        <g key={n} stroke="var(--color-mute)" strokeWidth="2">
          <path d={`M300 ${140 + n * 30} h-8`} />
          <path d={`M410 ${140 + n * 30} h8`} />
        </g>
      ))}
      <text x="40" y="360" fontSize="12" fontFamily="var(--font-mono)" fill="var(--color-mute)">REV A · {site.brand}</text>
    </svg>
  );
}

export function Hero({ hasProjects }: { hasProjects: boolean }) {
  return (
    <section id="top" className="grid-bg border-b border-line">
      <div className="wrap grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rise">
          <p className="font-mono text-xs tracking-widest text-accent">{site.eyebrow}</p>
          <h1 className="display mt-6">{site.headline}</h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-mute">{site.tagline}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href={hasProjects ? "#projects" : "#building"} className="btn btn-primary">
              See what I&apos;m building <ArrowDown size={16} aria-hidden />
            </a>
            <a href={site.github.profile} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              GitHub <ArrowUpRight size={16} aria-hidden />
            </a>
          </div>
        </div>
        <div className="rise mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: ".15s" }}>
          <Board />
        </div>
      </div>
    </section>
  );
}
