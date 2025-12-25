"use client"

import Image from "next/image"
import { HiUsers } from "react-icons/hi"
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { HiMail } from "react-icons/hi"

export function TeamSection() {
    const team = [
        {
            name: "Yasser Fathallah",
            role: "Team Lead & Full Stack Developer",
            image: "https://res.cloudinary.com/djwxpq1t8/image/upload/v1766667126/x9bmsx_evg0of.jpg",
            linkedin: "https://www.linkedin.com/in/yasserfat7alah/",
            github: "https://github.com/yasserfat7alah",
            email: "yasserfat7alah@gmail.com"
        },
        {
            name: "Omar Selema",
            role: "Full Stack Developer",
            image: "https://res.cloudinary.com/djwxpq1t8/image/upload/v1766667266/WhatsApp_Image_2025-12-25_at_2.53.21_PM_wws0a0.jpg",
            linkedin: "https://www.linkedin.com/in/omar-selema/",
            email: "omarselma@gmail.com"
        },
        {
            name: "Azza Sallam",
            role: "Full Stack Developer",
            image: "https://res.cloudinary.com/djwxpq1t8/image/upload/v1765909017/courses/thumbnails/frgn4pbbhi3abbtfuczx.jpg",
            linkedin: "https://www.linkedin.com/in/azza-sallam/",
            github: "https://github.com/AzzaSallam",
            email: "azzasallam369@gmail.com"
        },
    ]

    return (
        <section className="py-20 md:py-28 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
                        <HiUsers className="text-purple-600 text-xl" />
                        <span className="text-sm font-semibold text-purple-600 tracking-wide uppercase">Our Team</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                        Meet the People
                        <span className="block text-purple-600">Behind El-Mister</span>
                    </h2>

                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Our dedicated team brings together expertise in education, technology, and student success to create the best learning platform.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image with Overlay */}
                            <div className="relative h-96 bg-linear-to-br from-purple-100 to-blue-100 overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />

                                {/* Social Links Overlay - appears on hover */}
                                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                                        >
                                            <FaLinkedin className="w-7 h-7" />
                                        </a>
                                    )}
                                    {member.github && (
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all transform hover:scale-110"
                                        >
                                            <FaGithub className="w-7 h-7" />
                                        </a>
                                    )}
                                    {member.email && (
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110"
                                        >
                                            <HiMail className="w-7 h-7" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Name and Role */}
                            <div className="p-6 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-purple-600 font-semibold">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
