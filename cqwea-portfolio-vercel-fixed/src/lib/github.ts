import { site } from "@/config/site";

export type Repo = {
  id: number;
  name: string;
  url: string;
  description: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
  topics: string[];
};

export type RepoResult =
  | { status: "ok"; repos: Repo[] }
  | { status: "empty" }
  | { status: "error"; reason: string };

type ApiRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  topics?: string[];
  fork: boolean;
  archived: boolean;
};

function isApiRepo(value: unknown): value is ApiRepo {
  if (typeof value !== "object" || value === null) return false;
  const repo = value as Record<string, unknown>;
  return (
    typeof repo.id === "number" &&
    typeof repo.name === "string" &&
    typeof repo.html_url === "string" &&
    (typeof repo.description === "string" || repo.description === null) &&
    (typeof repo.language === "string" || repo.language === null) &&
    typeof repo.stargazers_count === "number" &&
    typeof repo.pushed_at === "string" &&
    Number.isFinite(Date.parse(repo.pushed_at)) &&
    (repo.topics === undefined || (Array.isArray(repo.topics) && repo.topics.every((topic) => typeof topic === "string"))) &&
    typeof repo.fork === "boolean" &&
    typeof repo.archived === "boolean"
  );
}

/** Public repos for the configured user, most recently pushed first. Cached for five minutes. */
export async function getRecentRepos(): Promise<RepoResult> {
  const { username, count, includeForks, includeArchived } = site.github;
  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner&sort=pushed`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(8000),
      },
    );
    if (res.status === 404) return { status: "error", reason: `No GitHub user named "${username}".` };
    if (res.status === 403 || res.status === 429) return { status: "error", reason: "GitHub's rate limit was reached." };
    if (!res.ok) return { status: "error", reason: `GitHub responded with status ${res.status}.` };

    const data: unknown = await res.json();
    if (!Array.isArray(data)) return { status: "error", reason: "GitHub returned an unexpected response." };

    const repos = data
      .filter(isApiRepo)
      .filter((repo) => (includeForks || !repo.fork) && (includeArchived || !repo.archived))
      .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
      .slice(0, count)
      .map((repo): Repo => ({
        id: repo.id,
        name: repo.name,
        url: repo.html_url,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at,
        topics: repo.topics ?? [],
      }));

    return repos.length ? { status: "ok", repos } : { status: "empty" };
  } catch {
    return { status: "error", reason: "GitHub could not be reached." };
  }
}
