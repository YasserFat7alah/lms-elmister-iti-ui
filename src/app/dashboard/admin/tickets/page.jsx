import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin'
import TicketsTable from '@/components/dashboardComponents/admin/ticketsComponent/TicketsTable'
import React from 'react'

const page = () => {
  return (
    <div>
      {/* Header */}
      <HeaderAdmin>
            <div>
              <h1 className="text-2xl font-bold text-[#FF0055]">
                Support Tickets
              </h1>
              <p className="text-[#392b80] text-sm mt-1">
                Manage, track, and respond to all user inquiries efficiently in one place.
              </p>
            </div>
      </HeaderAdmin>

      {/* Main Content */}
      <div className="mt-6">
        {/* Tickets Table Component */}
        <TicketsTable />
      </div>
    </div>
  )
}

export default page
