import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Features } from "@/components/site/Features";
import { Projects } from "@/components/site/Projects";
import { Events } from "@/components/site/Events";
import { Resources } from "@/components/site/Resources";
import { Team } from "@/components/site/Team";
import { Community } from "@/components/site/Community";
import { Footer } from "@/components/site/Footer";
import { CursorGlow } from "@/components/site/CursorGlow";
import { ScrollProgress } from "@/components/site/ScrollProgress";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground noise">
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Projects />
        <Events />
        <Resources />
        <Team />
        <Community />
      </main>
      <Footer />
    </div>
  );
}
