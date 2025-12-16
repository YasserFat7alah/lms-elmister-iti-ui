import HeaderAdmin from '@/components/DashboardComponents/admin/HeaderAdmin'
import TicketsTable from '@/components/DashboardComponents/admin/ticketsComponent/TicketsTable'
import React from 'react'

const Page = () => {
  return (
    <div className="space-y-6 p-6 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <HeaderAdmin title="Support Tickets" description="Manage, track, and respond to all user inquiries efficiently in one place." />

      {/* Main Content */}
      <div className="mt-6">
        {/* Tickets Table Component */}
        <TicketsTable />
      </div>
    </div>
  )
}

export default Page
