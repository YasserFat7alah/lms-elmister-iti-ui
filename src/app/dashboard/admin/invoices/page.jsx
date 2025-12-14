import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin'
import InvoiceTable from '@/components/DashboardComponents/admin/invoices/InvoiceTable'
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import React from 'react'

const page = () => {
  return (
    <div>
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard/admin' },
            { label: 'Invoices' }
          ]}
        />
      </div>
      {/* Main Content */}
      <div className="mt-6">
        <InvoiceTable />
      </div>
    </div>
  )
}

export default page
