"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import CourseCard from "../coursesComponent/CourseCard";
import { useGetPublicCoursesQuery } from "@/redux/api/endPoints/publicApiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function FeaturedCourses() {
    const swiperRef = useRef(null);
    const { data: coursesData, isLoading, isError } = useGetPublicCoursesQuery({
        limit: 8,
        sort: "top_rated",
    });

    const courses = coursesData?.data || [];

    if (isLoading) return null; // Or skeleton
    if (isError) return null;
    if (courses.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="text-center md:text-left">
                        <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-3">
                            Top Rated
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Featured Courses
                        </h2>
                        <p className="text-gray-600 max-w-2xl text-lg">
                            Explore our highest-rated courses, loved by students and trusted by parents.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 justify-center md:justify-end">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="bg-white p-3 rounded-full shadow-md text-gray-600 hover:text-blue-600 hover:shadow-lg transition-all border border-gray-100"
                            aria-label="Previous slide"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="bg-white p-3 rounded-full shadow-md text-gray-600 hover:text-blue-600 hover:shadow-lg transition-all border border-gray-100"
                            aria-label="Next slide"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation={{
                        prevEl: null,
                        nextEl: null
                    }}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                    }}
                    className="pb-12!"
                >
                    {courses.map((course) => (
                        <SwiperSlide key={course._id} className="h-auto">
                            <div className="h-full py-2 px-1">
                                <CourseCard course={course} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Browse All Button */}
                <div className="text-center mt-8">
                    <Link href="/courses">
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Browse All Courses
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
