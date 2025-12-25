import BranchesGrid from "@/components/ContactComponents/BranchesGrid";
import { ContactHero } from "@/components/ContactComponents/ContactHero";
import ContactSection from "@/components/ContactComponents/ContactSection";
import MapSection from "@/components/ContactComponents/MapSection";



export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <ContactHero />
        <BranchesGrid />
        <MapSection />
        <ContactSection />
      </main>
    </div>
  )
}
