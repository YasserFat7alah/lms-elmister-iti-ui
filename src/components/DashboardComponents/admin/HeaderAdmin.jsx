import { children } from '@/data/parentData'
import React from 'react'

const HeaderAdmin = ( {title , description }) => {
  return (
    <div className="rounded-2xl p-5 bg-white border ">
        <div>
              <h1 className="text-2xl font-bold text-[#FF0055]">
                {title}
              </h1>
              <p className="text-[#392b80] text-sm mt-1">
                {description}
              </p>
        </div>
    </div>
  )
}

export default HeaderAdmin
// Manage, track, and oversee all user subscriptions efficiently in one place.