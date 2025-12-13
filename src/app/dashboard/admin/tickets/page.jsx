import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin'
import TicketsTable from '@/components/DashboardComponents/admin/ticketsComponent/TicketsTable'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* Header */}
      <HeaderAdmin title="Support Tickets" description="Manage, track, and respond to all user inquiries efficiently in one place."/>

      {/* Main Content */}
      <div className="mt-6">
        {/* Tickets Table Component */}
        <TicketsTable />
      </div>
    </div>
  )
}

export default page
