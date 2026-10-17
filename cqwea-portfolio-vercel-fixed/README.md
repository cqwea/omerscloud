# CQWEA Engineering — personal site

Next.js (App Router) + TypeScript (strict) + Tailwind CSS 4. No database, no CMS, no required secrets.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck && npm run lint && npm run build
```
Requires Node 20.11+.

## Customize
| I want to… | Edit |
|---|---|
| Change name, intro, headline, email, socials, about text, interests, footer note | `src/config/site.ts` |
| Change GitHub username, repo count, forks/archived filtering | `src/config/site.ts` → `github` |
| Add or remove featured projects | `src/config/projects.ts` (section stays hidden while the list is empty) |
| Add project screenshots | Put files in `public/projects/`, reference as `/projects/name.jpg` with `alt` text |
| Change the accent color | `--color-accent` in `app/globals.css` |
| Add a section | Create a component in `src/components/`, add it to `app/page.tsx` and the `links` array |

Set `email` in `site.ts` to show an email button; it is hidden while empty.

## GitHub integration
`src/lib/github.ts` calls the public REST API (`/users/{username}/repos`) on the server, filters forks and archived repos, sorts by `pushed_at`, and returns the top N. Repository data and the page are cached for five minutes (`revalidate: 300`). After that interval, the first request may serve the previous page while Next.js refreshes it in the background; a subsequent request gets the refreshed data. Rate limits, 404s, network errors and empty results produce a friendly fallback linking to your GitHub profile; the rest of the page always renders.

No token is needed. Optionally set `GITHUB_TOKEN` (no scopes required) to raise the rate limit from 60 to 5,000 requests/hour.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. In Vercel, set **Root Directory** to the repository root (the directory containing `package.json` and `app/`). Keep the Framework Preset set to **Next.js**. `vercel.json` selects the `vercel-build` script, which runs `next build`.
3. Deploy. Optional environment variables:
   - `NEXT_PUBLIC_SITE_URL` — your canonical domain (recommended for metadata and the sitemap). Vercel's production domain is used if unset; local builds omit canonical URLs until configured.
   - `GITHUB_TOKEN` — optional, see above.
