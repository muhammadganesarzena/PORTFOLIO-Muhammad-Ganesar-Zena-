import { useState } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SoundProvider } from "@/context/sound-context";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import { Navbar } from "@/components/layout/navbar";
import { SectionCursor } from "@/components/ui/SectionCursor";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { HeroAbout } from "@/components/sections/hero-about";
import { Skills } from "@/components/sections/skills";
import { ProjectExperience } from "@/components/sections/project-experience";
import { Education } from "@/components/sections/education";
import { Organizations } from "@/components/sections/organizations";
import { Contact } from "@/components/sections/contact";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground selection:bg-primary/30">
      <SectionCursor />
      <CustomScrollbar />
      <Navbar />
      <main>
        <HeroAbout />
        <Skills />
        <ProjectExperience />
        <Education />
        <Organizations />
        <Contact />
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border mt-10">
        <p>© {new Date().getFullYear()} Muhammad Ganesar Zena. All rights reserved.</p>
        <p className="mt-1">Informatics Student & Full Stack Developer.</p>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <SoundProvider>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <TooltipProvider>
          <LoadingScreen onComplete={() => setLoaded(true)} />
          {loaded && (
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
          )}
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
      </SoundProvider>
    </QueryClientProvider>
  );
}

export default App;
