"use client"

import Image from "next/image"
import { HiAcademicCap, HiBookOpen, HiLightningBolt } from "react-icons/hi"
import heroabout1 from "@/assets/images/heroabout1.png";
import heroabout2 from "@/assets/images/heroabout2.png";


export function AboutHero() {
  return (
    <section className="py-20 md:py-28 bg-linear-to-br from-purple-50 via-blue-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20 -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
              <HiAcademicCap className="text-purple-600 text-xl" />
              <span className="text-sm font-semibold text-purple-600 tracking-wide uppercase">About El-Mister</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Empowering Students
              <span className="block text-purple-600 mt-2">Through Education</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              El-Mister is dedicated to revolutionizing private education by connecting passionate educators with eager students. We believe every child deserves personalized attention and quality instruction that inspires lifelong learning.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <HiBookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Expert Teachers</p>
                  <p className="text-sm text-gray-600">Vetted professionals</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <HiLightningBolt className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Personalized Learning</p>
                  <p className="text-sm text-gray-600">Tailored to each student</p>
                </div>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl aspect-square flex items-center justify-center overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
                <Image
                  src={heroabout1}
                  alt="Students learning together"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 pt-12">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl aspect-square flex items-center justify-center overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300">
                <Image
                  src={heroabout2}
                  alt="Teacher and students"
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
