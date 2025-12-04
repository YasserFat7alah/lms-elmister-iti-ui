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
    <section className="py-5 bg-gray-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#392C7D]">Subjects</h2>
        <p className="text-gray-600 max-w-md mx-auto mt-2">
          The right course, guided by an expert mentor, can provide invaluable insights, practical skills
        </p>
      </div>

     
<div
  className="grid grid-cols-2 gap-4 items-stretch sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
>
          {subjects.map((sub) => (
        <div key={sub.title} className="snap-start min-w-0">
              <CustomizeCard
                icon={sub.icon}
                title={sub.title}
                subTitle={sub.subTitle}
              />
            </div>
          ))}
        </div>
    </section>
  );
}