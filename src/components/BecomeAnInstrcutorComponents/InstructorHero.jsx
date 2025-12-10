"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import becomeAnInstrcutor from "@/assets/images/becomeAnInstrcutor.jpg";
import Link from "next/link";

export function InstructorHero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Become a Teacher</h1>
            <p className="text-lg text-muted-foreground">
              Share your knowledge with millions of learners around the world. Start teaching today and inspire the next
              generation of professionals.
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#FF4667] hover:bg-[#e93d5b]">
                <Link href='/teacher-signup' className="bg-[#FF4667] hover:bg-[#e93d5b]">Get Started</Link>
              </Button>
            </div>
          </div>
          <Image
            src={becomeAnInstrcutor}
            alt="Instructor"
            width={600}
            height={600}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}