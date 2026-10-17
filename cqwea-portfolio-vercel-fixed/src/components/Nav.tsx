"use client";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/config/site";

type NavLink = { href: string; label: string };

export function Nav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const targets = links.map((l) => document.querySelector(l.href)).filter((el): el is Element => !!el);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [links]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (href: string) =>
    `transition-colors hover:text-paper ${active === href ? "text-accent" : "text-mute"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <nav aria-label="Primary" className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="font-semibold tracking-tight">{site.brand}</a>
        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={linkClass(l.href)} aria-current={active === l.href ? "location" : undefined}>{l.label}</a>
            </li>
          ))}
          <li>
            <a href={site.github.profile} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-paper hover:text-accent">
              GitHub <ArrowUpRight size={14} aria-hidden />
            </a>
          </li>
        </ul>
        <button type="button" className="p-2 md:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      {open && (
        <ul id="mobile-menu" className="wrap flex flex-col border-t border-line pb-4 md:hidden">
          {[...links, { href: site.github.profile, label: "GitHub" }].map((l) => {
            const external = l.href.startsWith("http");
            return (
              <li key={l.href} className="border-b border-line/60 last:border-0">
                <a href={l.href} onClick={() => setOpen(false)} className="block py-4 text-lg" {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{l.label}</a>
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
}
