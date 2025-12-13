"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import Rating from "../shared/Rating"
import { Button } from '../ui/button';
import Link from "next/link";

export function TeacherCard({ teacher }) {
  const data = teacher.teacherData
  const degree = data.qualifications?.[0]?.degree || "N/A"
  const university = data.qualifications?.[0]?.university || "N/A"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">

      {/* Image Container */}
      <div className="bg-gray-200 relative h-48 flex items-center justify-center overflow-hidden">
        <Image
          src={teacher.thumbnail?.url || "/placeholder.svg"}
          alt={teacher.name}
          width={280}
          height={280}
          className="object-cover h-full w-full group-hover:scale-105 transition-transform"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
          <Link href={`/teachers/${teacher._id}`}>
            <Button>View Profile</Button>
          </Link>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground text-lg mb-1">{teacher.name}</h3>

        {/* Bio */}
        <p className="text-sm text-muted-foreground mb-4">
          {data.bio}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <Rating
            defaultRating={data.averageRating}
            readOnly={true}
            size="md"
          />
          <span className="text-sm font-semibold text-foreground">
            {data.averageRating} ({data.totalRatings} People Rated)
          </span>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-1 text-sm text-muted-foreground border-t border-border pt-3">

          {/* Subjects Names */}
          <div>
            <span className="font-semibold">Subjects: </span>
            {data.subjects.join(", ")}
          </div>

          {/* Degree */}
          <div>
            <span className="font-semibold">Degree: </span>
            {degree}
          </div>

          {/* University */}
          <div>
            <span className="font-semibold">University: </span>
            {university}
          </div>

          {/* Years of Experience */}
          <div>
            <span className="font-semibold">Experience: </span>
            {data.yearsOfExperience} yrs
          </div>

        </div>
      </div>
    </Card>
  )
}