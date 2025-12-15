"use client"
import Link from "next/link"
import Image from "next/image"
import { FaSearch, FaArrowRight } from "react-icons/fa";
import Rating from "../shared/Rating";
import Container from '../../../public/Container.png';


export function Hero() {
  return (
    <section className="relative h-auto md:h-[calc(100vh-64px)] w-full overflow-hidden bg-linear-to-br from-purple-50 via-pink-50 to-white">
      <div className="h-full container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
        {/* LEFT SECTION */}
        {/* LEFT SECTION */}
        <div className="space-y-6 md:space-y-8 pt-10 pb-0 md:py-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100/50 border border-pink-100">
            <span className="w-2 h-2 rounded-full bg-[#FF0055] animate-pulse"></span>
            <span className="text-xs font-semibold text-[#FF0055] uppercase tracking-wide">The Leader in Private Education</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Elevate Your <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0055] to-[#FF4667]">
              School Grades
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            Premium ongoing <span className="font-bold text-gray-900">online</span> and <span className="font-bold text-gray-900">offline</span> school courses tailored to ensure your academic success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link href="/courses" className="contents">
              <button className="px-8 py-4 bg-[#FF0055] hover:bg-[#D90045] text-white rounded-full font-bold shadow-lg shadow-pink-200 transition-all hover:scale-105 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group">
                Browse Courses
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/teachers" className="contents">
              <button className="px-8 py-4 bg-white border-2 border-gray-100 hover:border-[#FF0055] text-gray-700 hover:text-[#FF0055] rounded-full font-bold shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                Find a Teacher
              </button>
            </Link>
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

          {/* Mobile Only Image Container - Bottom Aligned */}
          <div className="relative md:hidden h-[450px] w-full mt-10">
            {/* Background Elements */}
            <img
              src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623477/yellow-1_jvovzi.png"
              alt=""
              className="absolute bottom-0 right-30 w-48 opacity-75 z-0 pointer-events-none"
            />

            {/* Main Image */}
            <img
              src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623475/girlForHomePage_lhl1ge.png"
              alt="Hero Student"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 h-[92%] w-auto object-contain drop-shadow-2xl"
            />

            {/* Floating Elements (Mobile Optimized) */}
            <div className="absolute bottom-16 left-4 z-20">
              <Image src={Container} alt="students" width={160} height={50} className="drop-shadow-lg" />
            </div>

            <div className="absolute bottom-32 right-4 z-20">
              <div className="bg-white/90 backdrop-blur-sm border border-pink-100 px-3 py-2 rounded-xl shadow-lg flex items-center gap-2">
                <div className="bg-[#FF0055] text-white p-1.5 rounded-md">
                  <span className="text-sm">🎓</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">50+</p>
                  <p className="text-[10px] text-gray-500 font-medium leading-none">Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative hidden md:block h-full w-full">
          {/* Background Elements - Bottom Aligned */}
          <img
            src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623477/yellow-1_jvovzi.png"
            alt=""
            className="absolute bottom-0 -right-20 lg:-right-32 z-0 h-[95%] w-auto object-contain pointer-events-none opacity-90"
          />
          <img
            src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623478/yellow-2_odtows.png"
            alt=""
            className="absolute bottom-0 -right-10 lg:-right-16 z-0 h-[90%] w-auto object-contain pointer-events-none opacity-80"
          />
          <img
            src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764632411/purple_sbdqrp.png"
            alt=""
            className="absolute bottom-20 right-20 z-0 w-24 opacity-60 pointer-events-none animate-pulse"
          />

          {/* Main Hero Image - Bottom Aligned & Clean Cut */}
          <img
            src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623475/girlForHomePage_lhl1ge.png"
            alt="Hero Student"
            className="absolute bottom-0 right-4 lg:right-12 z-10 h-[92%] w-auto object-contain drop-shadow-2xl"
          />

          {/* Floating Stats/Badges */}
          <div className="absolute bottom-24 left-10 lg:left-20 z-20 animate-fade-in-up">
            <Image src={Container} alt="students" width={220} height={70} className="drop-shadow-xl hover:scale-105 transition-transform" />
          </div>

          <div className="absolute bottom-40 -right-4 lg:-right-8 z-20">
            <div className="bg-white/90 backdrop-blur-sm border border-pink-100 p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-fade-in-left">
              <div className="bg-[#FF0055] text-white p-2 rounded-lg">
                <span className="text-xl">🎓</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">50+</p>
                <p className="text-xs text-gray-500 font-medium">Active Courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}