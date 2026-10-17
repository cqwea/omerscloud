/** Personal details live here so the rest of the site can stay reusable. */
const githubUsername = "Cqwea";
const githubProfile = `https://github.com/${githubUsername}`;
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? (
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined
);

export const site = {
  name: "Cqwea",
  brand: "CQWEA Engineering",
  tagline: "I build things at the intersection of software, electronics, and engineering.",
  eyebrow: "INDEPENDENT BUILDER / SOFTWARE + HARDWARE",
  headline: "Learning by building things until they work.",
  /** Set a public address to enable canonical URLs and sitemap output. */
  url: configuredSiteUrl?.replace(/\/+$/, ""),
  /** Leave empty to hide the email link. */
  email: "",
  github: {
    username: githubUsername,
    profile: githubProfile,
    count: 6,
    includeForks: false,
    includeArchived: false,
  },
  socials: [
    { label: "GitHub", href: githubProfile },
    { label: "Instagram", href: "https://instagram.com/omerscloud" },
  ],
  about: [
    "I like knowing how things work, so I tend to build them from the ground up: a web app one week, a circuit board or a firmware experiment the next.",
    "Most of what I know came from trying something, watching it fail, and working out why. This site is where the results end up.",
  ],
  interests: [
    { group: "Software", items: ["C++", "Python", "JavaScript", "TypeScript", "React", "Next.js", "Swift", "SwiftUI"] },
    { group: "Hardware", items: ["ESP32", "RP2040", "KiCad", "PCB design", "Mechanical keyboards", "Macropads"] },
    { group: "Systems", items: ["Raspberry Pi", "Linux", "Self-hosted services"] },
  ],
  footerNote: "Made with a ton of tinkering and Sonnet 5.5",
};
export type Site = typeof site;
