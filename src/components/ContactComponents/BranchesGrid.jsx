"use client"

import Image from "next/image"
import cairo from "@/assets/images/cairo.jpg";
import casablanca from "@/assets/images/casablanca.jpg";
import dubai from "@/assets/images/dubai.jpg";
import riyadh from "@/assets/images/riyadh.jpg";

export default function BranchesGrid() {
  const branches = [
    {
      id: 1,
      title: "Cairo",
      description: "Head office located in the heart of the Egyptian capital",
      image: cairo,
    },
    {
      id: 2,
      title: "Riyadh",
      description: "Gulf region hub supporting our operations across the Middle East",
      image: riyadh,
    },
    {
      id: 3,
      title: "Dubai",
      description: "Regional office serving the Middle East and North Africa",
      image: dubai,
    },
    {
      id: 4,
      title: "Casablanca",
      description: "North Africa center for customer and partner services",
      image: casablanca,
    },
  ];

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our branches all over the world</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            With offices in major cities across the globe, we're ready to serve you wherever you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <div className="relative h-48">
                <Image
                  src={branch.image}
                  alt={branch.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{branch.title}</h3>
                <p className="text-gray-600 text-sm">{branch.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
