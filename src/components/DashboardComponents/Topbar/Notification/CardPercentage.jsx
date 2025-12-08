import React from 'react'

const CardPercentage = ({icon:Icon , title , total , iconClassName , iconSize}) => {
  return (
    <div className='w-72 md:w-80 rounded-md px-5 py-6 flex items-center gap-3 border border-gray-200'>
        {/* CARD ICON */}
        <div className={`bg-gray-300 w-12 h-12 rounded-md flex items-center justify-center  ${iconClassName}`}>
            {Icon && <Icon size={iconSize} />}
        </div>

        {/*  TEXT SECTION */}
        <div className='flex flex-col items-start'>
            <p className='text-gray-500'>{title}</p>
            <p className='text-gray-900'>{total}</p>
        </div>
    </div>
  )
}

export default CardPercentage;