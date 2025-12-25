"use client";

import Image from "next/image";
import Link from "next/link";
import Rating from "../shared/Rating";
import { FaHeart, FaArrowRight, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    text: "The structured curriculum and supportive environment have allowed me to truly connect with my students and see them flourish academically.",
    author: "Sarah Jenkins",
    role: "Senior Mathematics Instructor",
    image: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623476/Instructor10_xfchpd.png",
    rating: 5,
  },
  {
    text: "Teaching here has been a highlight of my career. The focus on personalized learning ensures every student reaches their full potential.",
    author: "Michael Ross",
    role: "Physics Department Head",
    image: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623475/Instructor7_wrevdm.png",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-orange-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold tracking-wide uppercase mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            What People Say About Us <FaHeart className="inline-block ml-2 text-pink-500 animate-pulse" />
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Read what our satisfied clients have to say about their transformative experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">

          {/* Testimonial Cards Column */}
          <div className="flex flex-col gap-8">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 md:p-10 border border-gray-50 relative hover:-translate-y-1 transition-transform duration-300"
              >
                <FaQuoteLeft className="text-4xl text-purple-100 absolute top-8 right-8" />

                <Rating defaultRating={t.rating} readOnly size="md" className="mb-6" />

                <p className="text-gray-700 text-xl leading-relaxed mb-8 font-medium relative z-10">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-5 border-t border-gray-100 pt-8">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-purple-50">
                    <img
                      src={t.image}
                      alt={t.author}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{t.author}</h4>
                    <span className="text-sm text-purple-600 font-medium">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Image Column */}
          <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-linear-to-tr from-purple-600/20 to-orange-500/20 rounded-3xl transform rotate-3 scale-105 blur-lg -z-10"></div>
            <div className="rounded-3xl overflow-hidden shadow-2xl h-[600px] relative">
              <Image
                src="/image.png"
                alt="Happy students collaborating"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent flex items-end p-10">
                <div className="text-white">
                  <p className="font-bold text-2xl mb-2">Join Our Community</p>
                  <p className="text-white/80">Be part of a growing network of learners.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Teacher CTA */}
          <div className="group relative overflow-hidden bg-white rounded-3xl p-10 shadow-xl shadow-orange-100/50 border border-orange-50 hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase mb-4">
                For Instructors
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Become A Teacher</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Share your knowledge and inspire millions of students. Join our world-class faculty today.
              </p>

              <Link href="/becomeAnInstrcutor">
                <button className="bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-base flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20 cursor-pointer">
                  Apply Now <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>

          {/* Parents CTA */}
          <div className="group relative overflow-hidden bg-white rounded-3xl p-10 shadow-xl shadow-purple-100/50 border border-purple-50 hover:shadow-2xl transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>

            <div className="relative z-10">
              <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-600 text-xs font-bold uppercase mb-4">
                For Parents
              </span>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Support Your Child</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Monitor progress, manage payments, and ensure your child excels. Be involved in their success.
              </p>

              <Link href="/signup">
                <button className="bg-purple-600 text-white px-8 py-3.5 rounded-full font-bold text-base flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20 cursor-pointer">
                  Get Started <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}