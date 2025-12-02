"use client";

import Image from "next/image";
import Images from "@/assets/images/Images.png";

export default function InstructorsSuccess({
  title = "20K+ Instructor created their success story with eduguard",
  description = "Nunc euismod sapien non felis eleifend porttitor. Maecenas dictum eros justo, id commodo ante laoreet nec. Phasellus aliquet, orci id pellentesque mollis.",
  quote = "Nulla sed malesuada augue. Morbi interdum vulputate imperdiet. Pellentesque ullamcorper euismod ante, eget interdum quam facilisis commodo. Phasellus efficitur quis nisi a consectetur. Mauris at nisi suscipit metus, a molestie dui dapibus vel.",
}) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 xl:gap-28 items-center">

          <div className="order-2 lg:order-1 space-y-6 lg:space-y-8 text-center lg:text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {title}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-[#FF4667] mb-2 lg:mb-4 leading-none">“</div>
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed italic">
                {quote}
              </p>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative w-full h-64 sm:h-80 md:h-96 lg:h-[550px] xl:h-[650px]">
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