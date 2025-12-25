import { AboutHero } from "@/components/aboutComponents/AboutHero";
import { ClientLogo } from "@/components/aboutComponents/ClientLogo";
import { FeaturesGrid } from "@/components/aboutComponents/FeaturesGrid";
import { HistorySection } from "@/components/aboutComponents/HistorySection";
import { MissionSection } from "@/components/aboutComponents/MissionSection";
import { StatsSection } from "@/components/aboutComponents/StatsSection";
import { TeamSection } from "@/components/aboutComponents/TeamSection";


export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <AboutHero />
        <ClientLogo />
        <StatsSection />
        <MissionSection />
        <HistorySection />
        <TeamSection />
        <FeaturesGrid />
      </main>
    </div>
  )
}
