"use client";

import Image from "next/image";
import Rating from "../shared/Rating";
import { FaHeart, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    text: "We swiftly found top-tier talent for our company.",
    author: "Brenda Slaton",
    role: "Designer",
    image: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623476/Instructor10_xfchpd.png",
    rating: 5,
  },
  {
    text: "The LMS made managing my coursework simple and engaging, with everything I need easily accessible and organized.",
    author: "Adrian Dennis",
    role: "Designer",
    image: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623475/Instructor7_wrevdm.png",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-10 bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            What People Say About Us <FaHeart className="inline-block ml-4 text-red-500" />
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read what our satisfied clients have to say about their experiences with our platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-xl p-8 flex flex-col justify-between border border-gray-100 hover:shadow-2xl transition-shadow"
              >
                <div>
                  <Rating defaultRating={t.rating} readOnly size="lg" className="mb-6" />
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">{t.text}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-purple-100 shadow-lg">
                    <img
                      src={t.image}
                      alt={t.author}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{t.author}</p>
                    <p className="text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[480px]"> {/* ارتفاع ثابت ومناسب */}
              <Image
                src="/image.png"
                alt="Happy team"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/*  Become A Teacher + Become A Student */}
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 mt-5 lg:mt-5 max-w-6xl mx-auto">
          <div className="flex-1 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl p-8 lg:p-10 text-white shadow-2xl flex flex-col justify-between min-h-[280px] lg:min-h-[320px]">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Become A Teacher</h3>
              <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                Top instructors from around the world teach millions of students on Mentoring.
              </p>
            </div>

            <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-bold text-sm lg:text-base flex items-center gap-2 w-fit mx-auto md:mx-0 hover:scale-105 transition-all duration-300 shadow-lg">
              Apply Now <FaArrowRight className="text-orange-600" />
            </button>
          </div>

          <div className="flex-1 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 lg:p-10 text-white shadow-2xl flex flex-col justify-between min-h-[280px] lg:min-h-[320px]">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Become A Student</h3>
              <p className="text-white/90 text-sm lg:text-base leading-relaxed">
                Start your educational journey with us and access a wealth of resources
              </p>
            </div>

            <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold text-sm lg:text-base flex items-center gap-2 w-fit mx-auto md:mx-0 hover:scale-105 transition-all duration-300 shadow-lg">
              Enroll Now <FaArrowRight className="text-purple-600" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}