"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import instructor  from "@/assets/images/instructor.jpg";

export default function JoinAsInstructor({
  title = "Start teaching with us and inspire others",
  subtitle = "Become an instructor & start teaching with 28k certified instructors. Create a success story with 571k Students — Grow yourself with ProGrade.",
  buttonText = "Register Now",
  imageSrc = instructor,
  imageAlt = "Happy female instructor",
}) {
  return (
    <section className="bg-[#0F172A] py-12 md:py-14 lg:py-16">  
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div className="text-center lg:text-left space-y-5 lg:space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-white leading-snug">
              {title}
            </h2>

            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
              {subtitle}
            </p>

            <Button
              size="lg"
              className="bg-[#FF4667] hover:bg-[#FF2855] text-white font-semibold px-8 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {buttonText}
              <FaArrowRight  className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-12 w-56 h-72 lg:w-72 lg:h-80 bg-yellow-400 rounded-3xl -z-10"></div>
            
            <div className="absolute top-6 left-6 lg:top-10 lg:left-12 w-28 h-36 lg:w-36 lg:h-44 bg-yellow-400 rounded-3xl -z-10"></div>

            <div className="relative w-90 h-80 lg:w-150 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border-8 border-[#0F172A]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}