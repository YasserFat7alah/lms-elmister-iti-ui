"use client"

import Image from "next/image"
import twobusinesspartners from "@/assets/images/two-business-partners.png";

export function MissionSection() {
  return (
    <section className="py-16 md:py-24 bg-[#08131E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-300 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
            <Image
              src={twobusinesspartners}
              alt="Team collaboration"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-4xl text-white mb-6 text-foreground font-bold">Our one billion mission sounds bold. We agree.</h2>
            <p className="text-white text-lg leading-relaxed mb-4">
              We're committed to creating a global impact by connecting organizations with the talent and resources they
              need to succeed. Our vision extends far beyond profit—we're building a sustainable future for work.
            </p>
            <p className="text-white text-lg leading-relaxed">
              Every decision we make, every product we build, and every partnership we form is guided by this mission.
              Together, we're reshaping the future of work.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
