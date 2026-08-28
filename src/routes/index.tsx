import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/site/Preloader";
import { CustomCursor } from "@/components/site/CustomCursor";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { MarqueeBand } from "@/components/site/Marquee";
import { Features } from "@/components/site/Features";
import { TerminalExplorer } from "@/components/site/TerminalExplorer";
import { Projects } from "@/components/site/Projects";
import { Events } from "@/components/site/Events";
import { Resources } from "@/components/site/Resources";
import { Team } from "@/components/site/Team";
import { Alumni } from "@/components/site/Alumni";
import { Community } from "@/components/site/Community";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SmoothScroll>
      <div className="noise relative min-h-screen bg-background text-foreground">
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <MarqueeBand />
          <Features />
          <TerminalExplorer />
          <Projects />
          <Events />
          <Resources />
          <Team />
          <Alumni />
          <Community />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
