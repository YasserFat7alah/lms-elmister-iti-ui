"use client";

import Image from "next/image";
import { FiMail } from "react-icons/fi";

export default function NewsletterSection() {
  return (
    <section className="relative bg-gray-950 text-white overflow-hidden">
      {/* Wave  */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L120 40C240 20 480 0 720 0C960 0 1200 20 1320 40L1440 60V0H0Z" fill="#0f172a" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">

          <div className="space-y-6 text-center lg:text-left">

            {/* Lightning Icon */}
            <div className="mb-6 self-start">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-purple-500">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor" />
              </svg>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Transform Access To Education
            </h2>

            <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto lg:mx-0">
              Create account to receive our Newsletter, Course Recommend & Promotions.
            </p>

            <div className="flex flex-row gap-3 max-w-lg mx-auto lg:mx-0">
              <div className="relative flex-1">
                <FiMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full pl-14 pr-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full font-bold text-sm whitespace-nowrap hover:scale-105 transition shadow-lg"
              >
                Subscribe
              </button>
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <Image
              src="/happy-young-man .png"
              alt="Happy instructor"
              width={400}
              height={500}
              className="drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}