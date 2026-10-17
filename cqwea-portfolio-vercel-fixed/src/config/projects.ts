/**
 * Featured projects. The section stays hidden until you add one.
 * Images go in /public/projects and are referenced as "/projects/file.jpg".
 *
 * Example:
 * {
 *   name: "Project name",
 *   description: "What it is and what state it is in.",
 *   category: "Hardware",
 *   status: "Prototype",
 *   tech: ["RP2040", "KiCad"],
 *   repo: "https://github.com/Cqwea/repo",
 *   image: { src: "/projects/board.jpg", alt: "Top view of the assembled board" },
 * }
 */
export type Project = {
  name: string;
  description: string;
  category: "Software" | "Electronics" | "Embedded Systems" | "Hardware";
  status: "Building" | "Prototype" | "Completed";
  tech: string[];
  repo?: string;
  demo?: string;
  image?: { src: string; alt: string };
};

export const projects: Project[] = [];
