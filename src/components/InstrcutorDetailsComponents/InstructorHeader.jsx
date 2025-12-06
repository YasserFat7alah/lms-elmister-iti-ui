"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { FaStar, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"

export function InstructorHeader({ instructor }) {
  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <Image
            src={instructor.image || "/placeholder.svg"}
            alt={instructor.name}
            width={150}
            height={150}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{instructor.name}</h2>
          <p className="text-muted-foreground mb-3">{instructor.specialty}</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-400" />
              <span className="font-bold">{instructor.rating}</span>
              <span className="text-muted-foreground">({instructor.reviews} Reviews)</span>
            </div>
          </div>
          <p className="text-foreground mb-4">{instructor.bio}</p>
          <div className="flex gap-3">
            <a href="#" className="text-primary hover:text-primary/80">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-primary hover:text-primary/80">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-primary hover:text-primary/80">
              <FaLinkedin size={20} />
            </a>
            <a href="#" className="text-primary hover:text-primary/80">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}