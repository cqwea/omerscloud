import { site } from "@/config/site";

export function About() {
  return (
    <section id="about" className="border-b border-line py-20 md:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 className="h2">About</h2>
          <div className="mt-6 max-w-[34rem] space-y-4 text-lg leading-relaxed text-mute">
            {site.about.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
        <div className="grid-bg border border-line bg-panel/60 p-6 md:p-8">
          <p className="mb-6 font-mono text-xs text-mute">Things I work with</p>
          <dl className="space-y-7">
            {site.interests.map((g) => (
              <div key={g.group} className="grid gap-2 sm:grid-cols-[7rem_1fr]">
                <dt className="text-sm text-accent">{g.group}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {g.items.map((i) => <li key={i}>{i}</li>)}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
