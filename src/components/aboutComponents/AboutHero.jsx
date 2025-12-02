"use client"

import Image from "next/image"
import heroabout1 from "@/assets/images/heroabout1.png";
import heroabout2 from "@/assets/images/heroabout2.png";


export function AboutHero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">We share knowledge with the world</h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our mission is to empower organizations and individuals through innovative solutions, cutting-edge
              technology, and a commitment to excellence. We believe that knowledge shared is knowledge multiplied.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-300 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
              <Image
                src={heroabout1}
                alt="Team meeting"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="bg-gray-300 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
                <Image
                  src={heroabout2}
                  alt="Business professionals"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
