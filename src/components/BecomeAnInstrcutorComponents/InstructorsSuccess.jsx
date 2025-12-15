"use client";

import Image from "next/image";
import Images from "@/assets/images/Images.png";

export default function InstructorsSuccess({
  title = "Join 20K+ Instructors Building Their Success Stories",
  description = "See how our platform has helped thousands of educators transform their passion into a thriving teaching career. Your success story starts here.",
  quote = "Teaching on this platform has completely changed my life. I can reach students globally, set my own schedule, and do what I love every day. The support team is incredible, and the tools make course creation so easy.",
}) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-pink-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 xl:gap-28 items-center">

          <div className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="inline-block px-4 py-2 bg-mainBlue/10 rounded-full border border-mainBlue/20 mb-4">
              <span className="text-sm font-semibold text-mainBlue">Success Stories</span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {title}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-mainPink/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-20 h-20 bg-mainPink/10 rounded-full -translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-mainBlue/10 rounded-full translate-x-16 translate-y-16"></div>
              <div className="relative">
                <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-mainPink mb-2 lg:mb-4 leading-none opacity-30">"</div>
                <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed italic relative z-10">
                  {quote}
                </p>
                <p className="text-sm text-gray-500 mt-4 font-semibold">— Sarah Johnson, Math Instructor</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative w-full h-64 sm:h-80 md:h-96 lg:h-[550px] xl:h-[650px]">
            <div className="absolute -inset-4 bg-gradient-to-br from-mainPink/20 to-mainBlue/20 rounded-3xl blur-2xl -z-10"></div>
            <Image
              src={Images}
              alt="Instructors Success"
              fill
              className="object-contain object-center drop-shadow-2xl"
              priority
              unoptimized
            />
          </div>

        </div>
      </div>
    </section>
  );
}