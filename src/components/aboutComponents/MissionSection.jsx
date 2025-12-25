"use client"

import Image from "next/image"
import { HiLightBulb, HiLightningBolt, HiStar } from "react-icons/hi"
import twobusinesspartners from "@/assets/images/two-business-partners.png";

export function MissionSection() {
  return (
    <section className="py-20 md:py-28 bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/20 to-blue-600/20 z-10"></div>
              <Image
                src={twobusinesspartners}
                alt="Teachers collaborating"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <HiLightBulb className="text-yellow-400 text-xl" />
              <span className="text-sm font-semibold text-white tracking-wide uppercase">Our Mission</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Shaping Tomorrow's
              <span className="block bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Leaders Today
              </span>
            </h2>

            <div className="space-y-4 text-lg text-gray-300 leading-relaxed">
              <p>
                El-Mister is committed to revolutionizing private education by providing personalized, high-quality learning experiences. We connect passionate educators with students who deserve exceptional instruction.
              </p>
              <p>
                Our platform empowers parents to take an active role in their children's education while giving teachers the tools they need to inspire and engage. Together, we're building a community dedicated to academic excellence.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
                <HiLightningBolt className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="font-bold text-white">Personalized</p>
                  <p className="text-sm text-gray-300">One-on-one attention</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
                <HiStar className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="font-bold text-white">Excellence</p>
                  <p className="text-sm text-gray-300">Top-tier educators</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
