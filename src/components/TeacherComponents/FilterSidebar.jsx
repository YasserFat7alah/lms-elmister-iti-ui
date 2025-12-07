"use client"

import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { Card } from "@/components/ui/card"

export function FilterSidebar({ teachers = [], filters = {}, onFilterChange }) {
  const [expandedSections, setExpandedSections] = useState({
    subjects: false,
    gender: false,
    totalRatings: false,
    degree: false,
    university: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // ===== Generate dynamic filter options =====
  const subjects = Array.from(new Set(teachers.flatMap(t => t.teacherData?.subjects || [])))
  const genders = Array.from(new Set(teachers.map(t => t.gender)))
  const totalRatingsOptions = Array.from(new Set(teachers.map(t => t.teacherData?.totalRatings))).sort((a,b)=>b-a)
  const degrees = Array.from(new Set(teachers.flatMap(t => t.teacherData?.qualifications?.map(q => q.degree) || [])))
  const universities = Array.from(new Set(teachers.flatMap(t => t.teacherData?.qualifications?.map(q => q.university) || [])))

  const FilterSection = ({ title, sectionKey, children }) => (
    <div className="mb-6 border-b border-border pb-6 last:border-b-0">
      <button
        onClick={() => toggleSection(sectionKey)}
        className="flex items-center justify-between w-full text-foreground font-semibold hover:text-primary transition-colors"
      >
        {title}
        <FaChevronDown
          size={12}
          className={`transition-transform ${expandedSections[sectionKey] ? "rotate-180" : ""}`}
        />
      </button>
      {expandedSections[sectionKey] && <div className="mt-4">{children}</div>}
    </div>
  )

  const handleChange = (section, value) => {
    if (section === "subjects" || section === "degree" || section === "university") {
      const current = filters[section] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      onFilterChange({ ...filters, [section]: updated });
    } else {
      onFilterChange({ ...filters, [section]: value });
    }
  }

  return (
    <div className="w-64 flex-shrink-0">
      <Card className="p-6 sticky top-20">

        {/* Header + Clear Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Filters</h2>

          <button
            onClick={() =>
              onFilterChange({
                subjects: [],
                gender: "",
                totalRatings: "",
                degree: [],
                university: []
              })
            }
              className="text-sm text-[#FF4667] underline hover:text-[#FF2855] transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Subjects */}
        <FilterSection title="Subjects" sectionKey="subjects">
          <div className="space-y-3">
            {subjects.map(sub => (
              <label key={sub} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.subjects?.includes(sub) || false}
                  onChange={() => handleChange('subjects', sub)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="ml-3 text-sm text-foreground">{sub}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Gender */}
        <FilterSection title="Gender" sectionKey="gender">
          <div className="space-y-3">
            {genders.map(g => (
              <label key={g} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={filters.gender === g}
                  onChange={() => handleChange('gender', g)}
                  className="w-4 h-4"
                />
                <span className="ml-3 text-sm text-foreground">{g}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Total Ratings */}
        <FilterSection title="Total Ratings" sectionKey="totalRatings">
          <div className="space-y-3">
            {totalRatingsOptions.map(r => (
              <label key={r} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="totalRatings"
                  checked={filters.totalRatings === r}
                  onChange={() => handleChange('totalRatings', r)}
                  className="w-4 h-4"
                />
                <span className="ml-3 text-sm text-foreground">
                  {r} People Rated
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Degree */}
        <FilterSection title="Degree" sectionKey="degree">
          <div className="space-y-3">
            {degrees.map(d => (
              <label key={d} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.degree?.includes(d) || false}
                  onChange={() => handleChange('degree', d)}
                  className="w-4 h-4"
                />
                <span className="ml-3 text-sm text-foreground">{d}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* University */}
        <FilterSection title="University" sectionKey="university">
          <div className="space-y-3">
            {universities.map(u => (
              <label key={u} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.university?.includes(u) || false}
                  onChange={() => handleChange('university', u)}
                  className="w-4 h-4"
                />
                <span className="ml-3 text-sm text-foreground">{u}</span>
              </label>
            ))}
          </div>
        </FilterSection>

      </Card>
    </div>
  )
}