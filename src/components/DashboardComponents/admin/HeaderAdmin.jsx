import { children } from '@/data/parentData'
import React from 'react'

const HeaderAdmin = ({ title, description, children }) => {
  return (
    <div className="rounded-2xl p-5 bg-white border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-[#FF0055]">
          {title}
        </h1>
        <p className="text-[#392b80] text-sm mt-1">
          {description}
        </p>
      </div>
      {children && (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}

export default HeaderAdmin
// Manage, track, and oversee all user subscriptions efficiently in one place.