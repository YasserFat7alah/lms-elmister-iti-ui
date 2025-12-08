import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin'
import PayoutsTable from '@/components/dashboardComponents/admin/payouts/PayoutsTable'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeaderAdmin title="Payouts Management" description="Central hub for monitoring payouts and financial actions related to teachers"/>
      {/* Main Content */}
      <div className="mt-6">
        <PayoutsTable/>
      </div>
    </div>
  )
}

export default page
