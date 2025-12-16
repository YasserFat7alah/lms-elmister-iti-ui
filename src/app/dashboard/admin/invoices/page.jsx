import HeaderAdmin from '@/components/DashboardComponents/admin/HeaderAdmin';
import InvoiceTable from '@/components/DashboardComponents/admin/invoices/InvoiceTable'
import React from 'react'

const Page = () => {
  return (
    <div>
      <HeaderAdmin title="Invoices Management" description="View and manage all subscription invoices, check payment status, and download receipts." />
      {/* Main Content */}
      <div className="mt-6">
        <InvoiceTable />
      </div>
    </div>
  )
}

export default Page;
