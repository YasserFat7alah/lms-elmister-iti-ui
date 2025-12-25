"use client"

import Image from "next/image"
import Link from "next/link"
import { HiClock, HiCalendar, HiTrendingUp } from "react-icons/hi"
import HistorySection1 from "@/assets/images/HistorySection1.png";
import HistorySection2 from "@/assets/images/HistorySection2.png";
import HistorySection3 from "@/assets/images/HistorySection3.png";
import HistorySection4 from "@/assets/images/HistorySection4.png";
import HistorySection5 from "@/assets/images/HistorySection5.png";
import HistorySection6 from "@/assets/images/HistorySection6.png";

export function HistorySection() {
  const images = [
    { src: HistorySection1, alt: "Students in classroom" },
    { src: HistorySection2, alt: "Teacher with students" },
    { src: HistorySection3, alt: "Online learning session" },
    { src: HistorySection4, alt: "Study group" },
    { src: HistorySection5, alt: "Achievement celebration" },
    { src: HistorySection6, alt: "Parent-teacher meeting" },
  ]

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full">
              <HiClock className="text-blue-600 text-xl" />
              <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">Our Journey</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Building Excellence in
              <span className="block text-blue-600 mt-2">Education Since 2020</span>
            </h2>

            <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
              <p>
                What started as a vision to revolutionize private education has grown into a thriving community of passionate educators and dedicated students. Since our founding, we've helped thousands of families find the perfect educational match.
              </p>
              <p>
                Our journey has been marked by continuous innovation, a commitment to quality, and an unwavering focus on student success. Every milestone we've reached reinforces our belief that personalized education changes lives.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <HiCalendar className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2020</p>
                  <p className="text-sm text-gray-600">Founded</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <HiTrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">50+</p>
                  <p className="text-sm text-gray-600">Awards</p>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
            >
              Join Our Community
            </Link>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}