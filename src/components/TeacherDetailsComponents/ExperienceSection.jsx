"use client"

import { FaBriefcase } from "react-icons/fa"

export function ExperienceSection({ teacher }) {
  if (!teacher || !teacher.teacherData) return null

  const { teacherData } = teacher
  const experience = [
    {
      position: `${teacherData.qualifications[0]?.degree || ""} in ${teacherData.subjects.join(", ")}`,
      duration: `${teacherData.yearsOfExperience} years`
    }
  ]

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-[#FF4667] mb-4">Experience</h3>
      <div className="space-y-4">
        {experience.map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <FaBriefcase className="text-primary mt-1 flex-shrink-0" size={20} />
            <div>
              <h4 className="font-bold text-foreground">{item.position}</h4>
              <p className="text-sm text-muted-foreground">{item.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}