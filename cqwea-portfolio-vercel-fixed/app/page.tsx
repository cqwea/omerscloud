import { About } from "@/components/About";
import { Contact, Footer } from "@/components/Contact";
import { Featured } from "@/components/Featured";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Repos } from "@/components/Repos";
import { projects } from "@/config/projects";
import { getRecentRepos } from "@/lib/github";

export const revalidate = 300;

export default async function Home() {
  const result = await getRecentRepos();
  const links = [
    ...(projects.length ? [{ href: "#projects", label: "Projects" }] : []),
    { href: "#building", label: "Recently building" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <>
      <Nav links={links} />
      <main id="main">
        <Hero hasProjects={projects.length > 0} />
        <Featured projects={projects} />
        <Repos result={result} />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
