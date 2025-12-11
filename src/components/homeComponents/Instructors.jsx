"use client";

import CustomizeCard from "../shared/CustomizeCard";
import Rating from "../shared/Rating";

import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const instructorsData = [
  {
    image: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623475/Instructor7_wrevdm.png",
    title: "Joyce Pence",
    subTitle: "Lead Designer",
    rating: 5.0,
    reviews: 210,
    trending: false,
  },
  {
    image: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623475/Instructor2_ifmpmu.png",
    title: "Edith Dorsey",
    subTitle: "Accountant",
    rating: 4.9,
    reviews: 220,
    trending: true,
  },
  {
    image: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623475/Instructor4_jjhiuf.png",
    title: "Ruben Holmes",
    subTitle: "Architect",
    rating: 4.8,
    reviews: 157,
    trending: false,
  },
  {
    image: "https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623476/Instructor10_xfchpd.png",
    title: "Carol Magner",
    subTitle: "Lead Designer",
    rating: 5.0,
    reviews: 218,
    trending: false,
  },
];

export default function Instructors() {
  return (
    <section className="py-10 bg-linear-to-br from-purple-50 via-white to-pink-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Trending Badge */}
        <span className="inline-block bg-linear-to-r from-pink-400 to-rose-400 text-white text-xs font-bold px-5 py-2 rounded-full mb-4">
          Trending Teachers
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
          Top Class & Professional Teachers
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
          Empowering Change: Stories from Those Who Took the Leap
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructorsData.map((instructor, index) => (
            <div key={index} className="relative group">
              {/* Trending Badge للكارت الفردي */}
              {instructor.trending && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-linear-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    Trending
                  </span>
                </div>
              )}

              {/*  heart */}
              <button className="absolute top-4 left-4 z-20  transition-all duration-300 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-xl">
                <FaHeart className="w-5 h-5 text-red-500 hover:fill-red-500 transition-all" />
              </button>

              {/* CustomizeCard */}
              <CustomizeCard
                image={instructor.image}
                title={instructor.title}
                subTitle={instructor.subTitle}
              />

              {/*Rating + Reviews + Social   */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Rating defaultRating={instructor.rating} readOnly size="md" />
                  <span className="text-sm font-bold text-gray-700">{instructor.rating}</span>
                  <span className="text-xs text-gray-500">({instructor.reviews} Reviews)</span>
                </div>

                <div className="flex justify-center gap-3 mt-5">
                  <button className="w-10 h-10 rounded-full border border-gray-300 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center">
                    <FaFacebookF className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-300 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-500 transition-all flex items-center justify-center">
                    <FaTwitter className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-300 hover:border-pink-500 hover:bg-pink-50 hover:text-pink-500 transition-all flex items-center justify-center">
                    <FaInstagram className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-300 hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700 transition-all flex items-center justify-center">
                    <FaLinkedinIn className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}