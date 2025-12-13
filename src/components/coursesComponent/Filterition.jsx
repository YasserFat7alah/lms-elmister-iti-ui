import React, { useState } from 'react'
import FilterCategory from './filters/FilterCategory'
import FilterPrice from './filters/FilterPrice'
import FilterLevel from './filters/FilterLevel'
import FilterLanguage from './filters/FilterLanguage'
import FilterContainer from '@/components/shared/filtration/FilterContainer'

const Filterition = ({
  onFilter, selectedSubjects,
  priceFilter, onPriceChange,
  gradeFilter, onGradeChange,
  languageFilter, onLanguageChange,
  availableSubjects = [], availableGradeLevels = [], availableLanguages = [],
  onReset
}) => {

  return (
    <FilterContainer onClear={onReset}>

      <FilterCategory
        onFilter={onFilter}
        selectedSubjects={selectedSubjects}
        availableSubjects={availableSubjects}
      />

      <FilterLevel
        gradeFilter={gradeFilter}
        onGradeChange={onGradeChange}
        availableGradeLevels={availableGradeLevels}
      />

      <FilterLanguage
        languageFilter={languageFilter}
        onLanguageChange={onLanguageChange}
        availableLanguages={availableLanguages}
      />

      <FilterPrice
        priceFilter={priceFilter}
        onPriceChange={onPriceChange}
      />

    </FilterContainer>
  )
}

export default Filterition