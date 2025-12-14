import TicketsTable from '@/components/DashboardComponents/admin/ticketsComponent/TicketsTable'
import React from 'react'
import Breadcrumbs from '@/components/shared/Breadcrumbs'

const page = () => {
  return (
    <div className="space-y-6 p-6 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard/admin' },
          { label: 'Support Tickets' }
        ]}
      />

      {/* Main Content */}
      <div className="mt-6">
        {/* Tickets Table Component */}
        <TicketsTable />
      </div>
    </div>
  )
}

export default page
