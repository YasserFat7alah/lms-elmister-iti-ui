"use client"

import { useState } from "react"

export function AboutSection({ about }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mb-8">
      <h3 className="text-2xl text-[#FF4667] font-bold mb-4">About Me</h3>
      <p className="text-foreground leading-relaxed mb-3">{isExpanded ? about.full : about.preview}</p>
      {!isExpanded && about.full !== about.preview && (
        <button onClick={() => setIsExpanded(true)} className="text-primary hover:text-primary/80 font-medium">
          Read more
        </button>
      )}
    </div>
  )
}