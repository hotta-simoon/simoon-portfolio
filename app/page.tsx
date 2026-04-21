import fs from "fs";
import path from "path";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Career from "@/components/Career";
import Works from "@/components/Works";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import type { Work } from "@/types/work";

function getWorks(): Work[] {
  try {
    const file = path.join(process.cwd(), "data/works.json");
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

export default function Home() {
  const works = getWorks();

  return (
    <>
      <ScrollReveal />
      <Nav />
      <main>
        <Hero />
        <About />
        <Career />
        <Works initialWorks={works} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
