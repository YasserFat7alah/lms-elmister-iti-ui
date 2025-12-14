import ChildFeatures from '@/components/DashboardComponents/parent/mychildComponent/ChildFeatures'
import RecentNotification from '@/components/DashboardComponents/parent/mychildComponent/RecentNotification'
import MyChildren from '@/components/DashboardComponents/parent/MyChildren'
import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

const page = () => {
  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard/parent' },
          { label: 'Your Children' }
        ]}
      />

      <div className='flex items-center justify-between'>
        <div className="flex items-center gap-4">
          <h4 className='font-extrabold text-2xl bg-gradient-to-r from-[#392b80] to-[#6a5acd] bg-clip-text text-transparent'>Your Children</h4>
        </div>
        <Link href='/dashboard/parent/children/add-child'>
          <Button className='bg-gradient-to-r from-[#FF0055] to-[#ff4d8a] hover:from-[#e0004d] hover:to-[#ff357a] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 rounded-full font-bold text-base flex items-center gap-2'>
            <PlusIcon className="w-5 h-5" />
            <span>Add Child</span>
          </Button>
        </Link>
      </div>

      <MyChildren />
      <RecentNotification />
    </div>
  )
}

export default page