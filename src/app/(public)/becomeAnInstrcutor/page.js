import { StatsSection } from "@/components/aboutComponents/StatsSection";
import { HowToStart } from "@/components/BecomeAnInstrcutorComponents/HowToStart";
import { InstructorHero } from "@/components/BecomeAnInstrcutorComponents/InstructorHero";
import InstructorRules from "@/components/BecomeAnInstrcutorComponents/InstructorRules";
import InstructorsSuccess from "@/components/BecomeAnInstrcutorComponents/InstructorsSuccess";
import JoinAsInstructor from "@/components/BecomeAnInstrcutorComponents/JoinAsInstructor";
import SupportSection from "@/components/BecomeAnInstrcutorComponents/SupportSection";
import  WhyTeachCards from "@/components/BecomeAnInstrcutorComponents/WhyTeachCards";


export default function BecomeAnInstrcutor() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <InstructorHero/>
                <StatsSection/>
                        <WhyTeachCards/>
        <HowToStart/>
        <InstructorRules/>
                <SupportSection/>
                <InstructorsSuccess/>
                <JoinAsInstructor/>
      </main>
    </div>
  )
}
