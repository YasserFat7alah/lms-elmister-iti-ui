"use client"

import { useState } from "react"
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"

export default function Rating({
  defaultRating = 0,
  maxRating = 5,
  size = "md",
  onChange,
  className = "",
  readOnly = false,
}) {
  const [rating, setRating] = useState(defaultRating)
  const [hover, setHover] = useState(null)

  const sizeMap = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-7 h-7",
    xl: "w-9 h-9",
  }

  const current = readOnly ? rating : (hover ?? rating)

  const handleClick = (value) => {
    if (readOnly) return
    setRating(value)
    onChange?.(value)
  }

  return (
    <div
      className={`flex gap-1 ${readOnly ? "cursor-default" : "cursor-pointer"} ${className}`}
    >
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1
        const halfValue = starValue - 0.5

        let icon

        if (current >= starValue) {
          icon = <FaStar className="text-orange-400" />
        } else if (current >= halfValue) {
          icon = <FaStarHalfAlt className="text-orange-400" />
        } else {
          icon = <FaRegStar className="text-gray-300" />
        }

        return (
          <div
            key={i}
            className={`${sizeMap[size]}`}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(null)}
            onClick={() => handleClick(starValue)}
          >
            {icon}
          </div>
        )
      })}
    </div>
  )
}