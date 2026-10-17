import { ArrowUpRight, Star } from "lucide-react";
import { site } from "@/config/site";
import type { RepoResult } from "@/lib/github";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function Repos({ result }: { result: RepoResult }) {
  const { profile, username } = site.github;
  return (
    <section id="building" className="border-b border-line py-20 md:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="h2">Recently building</h2>
            <p className="mt-3 max-w-xl text-mute">
              Public repositories on GitHub, ordered by latest push. These are the ones I touched most recently, not necessarily the newest.
            </p>
          </div>
          <a href={`${profile}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:text-paper">
            All repositories <ArrowUpRight size={16} aria-hidden />
          </a>
        </div>

        {result.status === "ok" ? (
          <ul className="mt-12 border-t border-line">
            {result.repos.map((r) => (
              <li key={r.id} className="border-b border-line">
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="repo-row grid gap-3 px-1 py-6 md:grid-cols-[1.4fr_1fr] md:gap-10 md:px-4">
                  <div>
                    <h3 className="repo-name inline-flex items-center gap-2 text-xl font-medium tracking-tight transition-colors">
                      {r.name} <ArrowUpRight size={16} aria-hidden className="text-mute" />
                    </h3>
                    <p className="mt-2 max-w-xl text-mute">{r.description ?? "No description yet."}</p>
                    {r.topics.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Topics">
                        {r.topics.slice(0, 5).map((t) => (
                          <li key={t} className="border border-line px-2 py-0.5 font-mono text-xs text-mute">{t}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <dl className="flex flex-wrap items-start gap-x-6 gap-y-2 font-mono text-sm text-mute md:justify-end">
                    {r.language && (
                      <div className="flex items-center gap-2">
                        <dt className="sr-only">Language</dt>
                        <dd className="flex items-center gap-2"><span aria-hidden className="size-2 rounded-full bg-accent" />{r.language}</dd>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <dt className="sr-only">Stars</dt>
                      <dd className="flex items-center gap-1"><Star size={13} aria-hidden />{r.stars}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Last pushed</dt>
                      <dd>Pushed {fmt(r.pushedAt)}</dd>
                    </div>
                  </dl>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-12 border border-dashed border-line p-8" role={result.status === "error" ? "status" : undefined}>
            <p className="text-lg">
              {result.status === "error" ? "Repositories can't be loaded right now." : "No public repositories to show yet."}
            </p>
            <p className="mt-2 text-mute">
              {result.status === "error" ? `${result.reason} ` : ""}
              Browse public repositories on{" "}
              <a href={profile} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">github.com/{username}</a>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
