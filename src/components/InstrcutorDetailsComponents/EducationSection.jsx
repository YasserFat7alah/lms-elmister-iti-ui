"use client"

import { FaCheckCircle } from "react-icons/fa"

export function EducationSection({ education }) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl text-[#FF4667] font-bold mb-4">Education</h3>
      <div className="space-y-4">
        {education.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <FaCheckCircle className="text-[#03C95A] mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-foreground">{item.degree}</h4>
              <p className="text-muted-foreground">{item.school}</p>
              <p className="text-sm text-muted-foreground">{item.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}