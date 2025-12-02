"use client";

import { FaCalculator, FaFlask, FaBook, FaPalette, FaMusic, FaLaptopCode, FaBasketballBall, FaGlobe } from "react-icons/fa";
import CustomizeCard from "../shared/CustomizeCard";    

const subjects = [
  { icon: FaCalculator, title: "Math", subTitle: "Algebra & Geometry" },
  { icon: FaFlask, title: "Science", subTitle: "Physics & Chemistry" },
  { icon: FaBook, title: "Language", subTitle: "Grammar & Writing" },
  { icon: FaPalette, title: "Art", subTitle: "Painting & Drawing" },
  { icon: FaMusic, title: "Music", subTitle: "Singing & Instruments" },
  { icon: FaLaptopCode, title: "Computer", subTitle: "Coding & IT Skills" },
];

export default function Subjects() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#392C7D]">Subjects</h2>
        <p className="text-gray-600 max-w-md mx-auto mt-2">
          The right course, guided by an expert mentor, can provide invaluable insights, practical skills
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div
        className="px-4"
        role="list"
        aria-label="Subjects list"
      >
        <div className="flex gap-4 items-stretch snap-x snap-mandatory">
          {subjects.map((sub) => (
            <div key={sub.title} className="snap-start flex-shrink-0">
              <CustomizeCard
                icon={sub.icon}
                title={sub.title}
                subTitle={sub.subTitle}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}