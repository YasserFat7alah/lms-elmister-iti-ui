"use client";

import CustomizeCard from "../shared/CustomizeCard";
import Rating from "../shared/Rating";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useGetPublicTeachersQuery } from "@/redux/api/endPoints/publicApiSlice";
import { Spinner } from "@/components/shared/Loader";

export default function Instructors() {
  const { data: teachersData, isLoading, isError } = useGetPublicTeachersQuery({
    limit: 4,
    sort: 'top_rated'
  });

  const instructors = teachersData?.data?.users || [];

  if (isLoading) return <div className="py-20 flex justify-center"><Spinner size={40} /></div>;
  if (isError) return null; // Or handle error gracefully

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {instructors.map((instructor) => (
            <div key={instructor._id} className="relative group">
              {/*  heart */}
              <button className="absolute top-4 left-4 z-20  transition-all duration-300 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-xl">
                <FaHeart className="w-5 h-5 text-red-500 hover:fill-red-500 transition-all" />
              </button>

              {/* CustomizeCard */}
              <Link href={`/users/${instructor.username}`} className="block">
                <CustomizeCard
                  image={instructor.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructor.name)}&background=random`}
                  title={instructor.name}
                  subTitle={instructor.subjects ? instructor.subjects[0] : "Instructor"} // Show first subject as subtitle
                />
              </Link>

              {/*Rating + Reviews + Social   */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Rating defaultRating={instructor.averageRating || 0} readOnly size="md" />
                  <span className="text-sm font-bold text-gray-700">{instructor.averageRating || 0}</span>
                  <span className="text-xs text-gray-500">({instructor.totalRatings || 0} Reviews)</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Browse All Button */}
        <Link href="/teachers">
          <Button
            size="lg"
            className="group bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Browse All Teachers
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}