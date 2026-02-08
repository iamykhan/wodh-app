/**
 * Home Page - Landing Page
 * Fully refactored to use clean section components
 * All sections now follow consistent architecture
 */

// Refactored sections using clean component architecture
import { Hero } from "@/components/sections/Hero";
import { Expertise } from "@/components/sections/Expertise";
import { KeyStats } from "@/components/sections/KeyStats";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Technologies } from "@/components/sections/Technologies";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Team } from "@/components/sections/Team";
import { Testimonials } from "@/components/sections/Testimonials";
import { BlogInsights } from "@/components/sections/BlogInsights";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Expertise />
      <KeyStats />
      <FeaturedProjects />
      <Technologies />
      <About />
      <Process />
      <Team />
      <Testimonials />
      <BlogInsights />
      <FAQ />
      <CTA />
      <Contact />
    </main>
  );
}
