"use client"
import { useState } from "react"
import Image from "next/image"
import { FaSearch } from "react-icons/fa";
import Rating from "../shared/Rating";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
<section className="relative h-auto md:h-[calc(100vh-64px)] w-full overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="h-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center px-6 lg:px-8">
        {/* LEFT SECTION */}
        <div className="space-y-4 md:space-y-5 py-5 md:py-0">
          <p className="text-sm text-gray-600">The Leader in Online Learning</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Engaging & Accessible
            <span className="inline-block mx-2 md:mx-3 px-4 py-1 md:px-5 md:py-2 bg-pink-200 text-pink-600 rounded-full font-bold text-2xl md:text-3xl lg:text-4xl">
              Online
            </span>
            Courses For All
          </h1>
          <div className="w-full bg-white shadow-lg rounded-full flex items-center border">
            <div className="pl-4 md:pl-5 text-gray-400"><FaSearch size={20} /></div>
            <input
              type="text"
              placeholder="Search Courses, Instructors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 md:py-4 outline-none"
            />
            <button className="px-8 md:px-10 py-3 md:py-4 bg-purple-600 text-white rounded-full font-medium">Search</button>
          </div>
          <div className="pt-2">
            <p className="text-gray-600 text-sm">
              Trusted by over <span className="font-bold text-gray-800">15K Users</span> worldwide since 2024
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Rating defaultRating={5} readOnly />
              <span className="text-sm text-gray-700">4.9 / 200 Review</span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative hidden md:block">
          <Image src="/yellow-1.png" width={400} height={800} alt="" className="absolute -top-[230px] -right-20 md:-right-28 z-10 pointer-events-none"/>
          <Image src="/yellow-2.png" width={450} height={800} alt="" className="absolute -top-[150px] -right-20 z-9 pointer-events-none"/>
          <Image src="/purple.png" width={400} height={400} alt="" className="absolute top-12 right-6 z-1 pointer-events-none"/>
          <Image src="/girlForHomePage.png" width={400} height={800} alt="hero student"  className="absolute -top-[300px] -right-14 z-10 drop-shadow-2xl" />

          <div className="absolute bottom-2 right-75 z-20">
            <Image src="/Container.png" alt="students" width={240} height={80} className="drop-shadow-lg"/>
          </div>

          <div className="absolute bottom-4 -right-32 z-20">
            <div className="bg-purple-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-[30px] rounded-bl-none shadow-xl flex items-center gap-2 md:gap-3">
              <span className="text-xl md:text-3xl">→</span>
              <div className="text-right">
                <p className="font-bold text-lg md:text-xl">50+</p>
                <p className="text-xs md:text-sm">Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}