import ChildFeatures from '@/components/dashboardComponents/parent/mychildComponent/ChildFeatures'
import RecentNotification from '@/components/dashboardComponents/parent/mychildComponent/RecentNotification'
import MyChildren from '@/components/dashboardComponents/parent/MyChildren'
import React from 'react'

const page = () => {
  return (
    <div>
        <ChildFeatures/>
        <MyChildren/>
        <RecentNotification/>
    </div>
  )
}

export default page