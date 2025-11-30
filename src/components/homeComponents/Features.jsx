"use client";

import { FaChalkboardTeacher, FaCertificate, FaTools } from "react-icons/fa";

const features = [
  { icon: FaChalkboardTeacher, title: "Stay motivated with instructors", subTitle: "Stay motivated with engaging instructors on our platform, guiding you through every course." },
  { icon: FaCertificate, title: "Get certified on courses", subTitle: "Get certified, master modern tech skills, and level up your career whether you’re starting." },
  { icon: FaTools, title: "Build skills on your way", subTitle: "Build skills your way with hands-on labs and immersive courses, tailored to fit." },
];

export default function Features() {
  return (
    <section className="mt-5 py-16 px-4 sm:px-6 lg:px-8 bg-[#08131E] text-white">

      <div className="text-center mb-12">
        <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-xs mb-4 transition">
          Our Benefits
        </button>
        <h2 className="text-3xl font-bold">
          Master the skills to drive your career
        </h2>
        <p className="text-white/60 max-w-xl mx-auto mt-2 text-sm">
          The right course, guided by an expert mentor, can provide invaluable insights & practical skills.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="text-center flex flex-col items-center gap-3 px-3">

              {/* Circle + Icon */}
              <div
                className={`rounded-full p-5 text-4xl transition-transform hover:scale-110 text-white ${
                  feature.icon === FaCertificate ? "bg-[#FF5974]" : "bg-white/10"
                }`}
              >
                <feature.icon />
              </div>

              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feature.subTitle}</p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}