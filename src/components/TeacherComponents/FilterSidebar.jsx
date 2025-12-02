"use client"

import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import { Card } from "@/components/ui/card"

export function FilterSidebar({ selectedCategory, onCategoryChange }) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    rating: false,
    price: false,
    language: false,
    level: false,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const categories = ["Web Design", "Development", "UI/UX", "Data Science", "Marketing"]
  const ratings = ["4.5+", "4.0+", "3.5+", "3.0+"]
  const priceRanges = ["Free", "$0 - $50", "$50 - $100", "$100+"]
  const languages = ["English", "Spanish", "French", "German", "Chinese"]
  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"]

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

  return (
    <div className="w-64 flex-shrink-0">
      <Card className="p-6 sticky top-20">
        <h2 className="text-lg font-bold text-foreground mb-6">Filters</h2>

        <FilterSection title="Categories" sectionKey="category">
          <div className="space-y-3">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() => onCategoryChange(cat)}
                  className="w-4 h-4 rounded border-border"
                />
                <span className="ml-3 text-sm text-foreground">{cat}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Rating" sectionKey="rating">
          <div className="space-y-3">
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input type="radio" name="rating" className="w-4 h-4" />
                <span className="ml-3 text-sm text-foreground">{rating}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Price" sectionKey="price">
          <div className="space-y-3">
            {priceRanges.map((range) => (
              <label key={range} className="flex items-center cursor-pointer">
                <input type="radio" name="price" className="w-4 h-4" />
                <span className="ml-3 text-sm text-foreground">{range}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Language" sectionKey="language">
          <div className="space-y-3">
            {languages.map((lang) => (
              <label key={lang} className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4" />
                <span className="ml-3 text-sm text-foreground">{lang}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Level" sectionKey="level">
          <div className="space-y-3">
            {levels.map((level) => (
              <label key={level} className="flex items-center cursor-pointer">
                <input type="radio" name="level" className="w-4 h-4" />
                <span className="ml-3 text-sm text-foreground">{level}</span>
              </label>
            ))}
          </div>
        </FilterSection>
      </Card>
    </div>
  )
}