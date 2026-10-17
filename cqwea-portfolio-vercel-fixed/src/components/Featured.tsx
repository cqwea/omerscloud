"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/config/projects";

export function Featured({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [category, setCategory] = useState("All");
  if (projects.length === 0) return null;
  const shown = projects.filter((p) => category === "All" || p.category === category);

  return (
    <section id="projects" className="border-b border-line py-20 md:py-28">
      <div className="wrap">
        <h2 className="h2">Projects</h2>
        <p className="mt-3 max-w-xl text-mute">Things I chose to put on display, with their honest status.</p>

        {categories.length > 2 && (
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
            {categories.map((c) => (
              <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={category === c}
                className={`border px-3 py-1.5 text-sm transition-colors ${category === c ? "border-accent bg-accent text-ink" : "border-line text-mute hover:border-mute hover:text-paper"}`}>
                {c}
              </button>
            ))}
          </div>
        )}

        <ul className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {shown.map((p) => (
            <li key={p.name}>
              <div className="grid-bg relative aspect-[4/3] overflow-hidden border border-line bg-panel">
                {p.image ? (
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
                ) : (
                  <div className="flex size-full items-end p-5 font-mono text-sm text-mute">{p.category}</div>
                )}
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-medium tracking-tight">{p.name}</h3>
                <span className="font-mono text-xs text-accent">{p.status}</span>
              </div>
              <p className="mt-2 max-w-prose text-mute">{p.description}</p>
              <p className="mt-3 font-mono text-xs text-mute">{p.category} — {p.tech.join(", ")}</p>
              <div className="mt-4 flex gap-5 text-sm">
                {p.repo && <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent">Repository <ArrowUpRight size={14} aria-hidden /></a>}
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-accent">Live demo <ArrowUpRight size={14} aria-hidden /></a>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
