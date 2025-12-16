"use client";

import { useEffect } from "react";
import { StatsSection } from "@/components/aboutComponents/StatsSection";
import { HowToStart } from "@/components/BecomeAnInstructorComponents/HowToStart";
import { InstructorHero } from "@/components/BecomeAnInstructorComponents/InstructorHero";
import InstructorRules from "@/components/BecomeAnInstructorComponents/InstructorRules";
import InstructorsSuccess from "@/components/BecomeAnInstructorComponents/InstructorsSuccess";
import JoinAsInstructor from "@/components/BecomeAnInstructorComponents/JoinAsInstructor";
import SupportSection from "@/components/BecomeAnInstructorComponents/SupportSection";
import WhyTeachCards from "@/components/BecomeAnInstructorComponents/WhyTeachCards";

export default function BecomeAnInstrcutor() {
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <InstructorHero />
        <StatsSection />
        <WhyTeachCards />
        <HowToStart />
        <InstructorRules />
        <SupportSection />
        <InstructorsSuccess />
        <JoinAsInstructor />
      </main>
    </div>
  )
}
