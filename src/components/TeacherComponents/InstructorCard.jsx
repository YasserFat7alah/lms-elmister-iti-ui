"use client"

import Image from "next/image"
import { FaStar, FaUsers, FaBookmark } from "react-icons/fa"
import { Card } from "@/components/ui/card"

export function InstructorCard({ instructor }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image Container */}
      <div className={`${instructor.bgColor} relative h-48 flex items-center justify-center overflow-hidden`}>
        <Image
          src={instructor.image || "/placeholder.svg"}
          alt={instructor.name}
          width={280}
          height={280}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform"
        />
        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-primary hover:text-white transition-all">
          <FaBookmark size={16} />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground text-lg mb-1">{instructor.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{instructor.title}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} className={i < Math.floor(instructor.rating) ? "text-primary" : "text-muted"} />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground ml-2">{instructor.rating}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-3">
          <div className="flex items-center gap-1">
            <FaUsers size={14} />
            <span>{instructor.students}k Students</span>
          </div>
          <span>{instructor.courses} Courses</span>
        </div>
      </div>
    </Card>
  )
}