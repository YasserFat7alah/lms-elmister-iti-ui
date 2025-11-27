"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { FaSearch } from "react-icons/fa";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/Homapagebackground.jpg"
          alt="Professional woman studying online with warm lighting"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-md flex gap-2 bg-white/95 rounded-lg p-3 shadow-lg">
              <input
                type="text"
                placeholder="Search Course"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-foreground placeholder:text-muted-foreground bg-transparent"
              />
              <button className="px-4 py-2 bg-secondary rounded-lg text-white hover:bg-secondary/90 transition-colors flex items-center gap-2">
                <FaSearch className="text-black text-2xl" />

              </button>
            </div>
          </div>

          <p className="text-xl text-white font-semibold italic mb-12">We have the largest collection of courses</p>

          <Link
            href="/courses"
            className="bg-white text-foreground font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-white/90 transition-colors inline-block"
          >
            View All Courses
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">332</div>
            <div className="text-lg text-white/80 font-medium">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">1403</div>
            <div className="text-lg text-white/80 font-medium">Members</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">60</div>
            <div className="text-lg text-white/80 font-medium">Authors</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-2">20</div>
            <div className="text-lg text-white/80 font-medium">Subjects</div>
          </div>
        </div>
      </div>
    </section>
  )
}
