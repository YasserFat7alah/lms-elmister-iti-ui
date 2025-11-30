"use client";

import Image from "next/image";
import Rating from "../shared/Rating";
import { FaHeart, FaArrowRight } from "react-icons/fa";

const testimonials = [
  {
    text: "We swiftly found top-tier talent for our company.",
    author: "Brenda Slaton",
    role: "Designer",
    image: "/Instructor 10.png",
    rating: 5,
  },
  {
    text: "The LMS made managing my coursework simple and engaging, with everything I need easily accessible and organized.",
    author: "Adrian Dennis",
    role: "Designer",
    image: "/Instructor 7.png",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
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
              <img
                src="/image.png"
                alt="Happy team"
                width={600}
                height={400}   
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/*  Become An Instructor + Become A Student */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-orange-400 to-yellow-500 rounded-3xl p-10 text-white shadow-2xl text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4">Become An Instructor</h3>
            <p className="text-white/90 mb-8">
              Top instructors from around the world teach millions of students on Mentoring.
            </p>
            <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 mx-auto md:mx-0 hover:scale-105 transition">
              Apply Now <FaArrowRight />
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-10 text-white shadow-2xl text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4">Become A Student</h3>
            <p className="text-white/90 mb-8">
              Start your educational journey with us and access a wealth of resources
            </p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 mx-auto md:mx-0 hover:scale-105 transition">
              Enroll Now <FaArrowRight />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}