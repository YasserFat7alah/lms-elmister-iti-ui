"use client"
import { useState } from "react"
import Image from "next/image"
import { FaSearch } from "react-icons/fa";
import Rating from "../shared/Rating";
import Yellow1 from '../../../public/yellow1.png';
import Yellow2 from '../../../public/yellow-2.png';
import purple from '../../../public/purple.png';
import girlForHome from '../../../public/girlForHomePage.png';
import Container from '../../../public/Container.png';


export function Hero() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <section className="relative h-auto md:h-[calc(100vh-64px)] w-full overflow-hidden bg-linear-to-br from-purple-50 via-pink-50 to-white">
      <div className="h-full container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
        {/* LEFT SECTION */}
        <div className="space-y-4 md:space-y-5 py-5 md:py-0">
          <p className="text-sm text-gray-600">The Leader in Online Learning</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mr-12 md:mr-0">
            Engaging & Accessible
            <span className="inline-block mx-2 md:mx-3 px-4 py-1 md:px-5 md:py-2 bg-pink-200 text-pink-600 rounded-full font-bold text-2xl md:text-3xl lg:text-4xl">
              Online
            </span>
            Courses For All
          </h1>

          <div className="w-full bg-white shadow-lg rounded-full flex items-center border relative z-30 mt-5">
            <div className="pl-4 md:pl-5 text-gray-400"><FaSearch size={20} /></div>
            <input
              type="text"
              placeholder="Search Courses, Teachers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-3 md:py-4 outline-none rounded-r-full md:rounded-r-none rounded-l-none"
            />
            <button className="px-8 md:px-10 py-3 md:py-4 bg-purple-600 text-white rounded-full font-medium hidden md:block">Search</button>
            <button className="p-3 bg-purple-600 text-white rounded-full font-medium md:hidden m-1"><FaSearch /></button>
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

          {/* Mobile Only Image Container */}
          <div className="relative md:hidden pt-4 mt-4 mb-0 flex justify-center">
            {/* Background Decorations */}
            <img src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623477/yellow-1_jvovzi.png" alt="" className="absolute top-80 right-30 w-32 opacity-75 z-0 rotate-12" />
            <img src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764632411/purple_sbdqrp.png" alt="" className="absolute top-20 left-4 w-24 opacity-60 z-0" />

            {/* Main Image */}
            <img src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623475/girlForHomePage_lhl1ge.png" alt="Hero Student" className="relative z-10 w-[85%] max-w-xs drop-shadow-2xl object-contain" />

            {/* Floating Elements (Scaled down for mobile) */}
            <div className="absolute bottom-90 left-0 z-20 transform scale-90 origin-bottom-left">
              <Image src={Container} alt="students" width={200} height={60} className="drop-shadow-lg" />
            </div>

            <div className="absolute bottom-75 right-15 z-20 transform scale-90 origin-bottom-right">
              <div className="bg-purple-700 text-white px-4 py-2 rounded-[30px] rounded-bl-none shadow-xl flex items-center gap-2">
                <span className="text-xl">→</span>
                <div className="text-right">
                  <p className="font-bold text-lg">50+</p>
                  <p className="text-xs">Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative hidden md:block">
          <img src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623477/yellow-1_jvovzi.png" width={400} height={800} alt="" className="absolute -top-[230px] -right-20 md:-right-28 z-10 pointer-events-none" />
          <img src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623478/yellow-2_odtows.png" width={450} height={800} alt="" className="absolute -top-[150px] -right-20 z-9 pointer-events-none" />
          <img src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764632411/purple_sbdqrp.png" width={400} height={400} alt="" className="absolute top-12 right-6 z-1 pointer-events-none" />
          <img src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623475/girlForHomePage_lhl1ge.png" width={400} height={800} alt="hero student" className="absolute -top-[300px] -right-14 z-10 drop-shadow-2xl" />

          <div className="absolute bottom-2 right-75 z-20">
            <Image src={Container} alt="students" width={240} height={80} className="drop-shadow-lg" />
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