import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/config/site";

export function Contact() {
  return (
    <section id="contact" className="grid-bg py-24 md:py-32">
      <div className="wrap">
        <h2 className="display max-w-3xl">Have a project in mind, or just want to talk shop?</h2>
        <p className="mt-6 max-w-xl text-lg text-mute">Look through what I&apos;ve built, or get in touch.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          {site.email && (
            <a href={`mailto:${site.email}`} className="btn btn-primary"><Mail size={16} aria-hidden /> {site.email}</a>
          )}
          {site.socials.map((s, i) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.label} (opens in a new tab)`}
              className={`btn ${!site.email && i === 0 ? "btn-primary" : "btn-ghost"}`}>
              {s.label} <ArrowUpRight size={16} aria-hidden />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-sm text-mute">
      <div className="wrap flex flex-wrap items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} {site.brand}</p>
        <ul className="flex gap-5">
          {site.socials.map((s) => (
            <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{s.label}</a></li>
          ))}
        </ul>
        <p className="w-full text-center sm:order-last">{site.footerNote}</p>
      </div>
    </footer>
  );
}
