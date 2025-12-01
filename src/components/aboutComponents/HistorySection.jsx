"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import HistorySection1 from "@/assets/images/HistorySection1.png";
import HistorySection2 from "@/assets/images/HistorySection2.png";
import HistorySection3 from "@/assets/images/HistorySection3.png";
import HistorySection4 from "@/assets/images/HistorySection4.png";
import HistorySection5 from "@/assets/images/HistorySection5.png";
import HistorySection6 from "@/assets/images/HistorySection6.png";

export function HistorySection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-foreground">We've been here almost 17 years</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Since our founding in 2007, we've evolved from a small startup to a global leader in workforce solutions.
              Our journey has been marked by innovation, resilience, and an unwavering commitment to our clients.
            </p>
            <Button className="bg-[#FF4667] hover:bg-[#e93d5b] text-white">Read Our Story</Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
           
                <Image
                  src={HistorySection1}
                  alt="HistorySection1"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />

                 <Image
                  src={HistorySection2}
                  alt="HistorySection1"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />

                 <Image
                  src={HistorySection3}
                  alt="HistorySection1"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />

                 <Image
                  src={HistorySection4}
                  alt="HistorySection1"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />

                 <Image
                  src={HistorySection5}
                  alt="HistorySection1"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />

                 <Image
                  src={HistorySection6}
                  alt="HistorySection1"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
            
          </div>
        </div>
      </div>
    </section>
  )
}