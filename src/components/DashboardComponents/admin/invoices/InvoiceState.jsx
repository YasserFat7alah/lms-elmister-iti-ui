import React from 'react'
import StatsCard from '../payouts/StatsCard'
import { CheckCircle, Clock, DollarSign, FileText } from 'lucide-react'

const InvoiceState = ({stats}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
    <StatsCard
      icon={FileText}
      title="Total Invoices"
      value={stats.total}
      color="bg-gray-600"
    />
    <StatsCard
      icon={CheckCircle}
      title="Paid"
      value={stats.paid}
      color="bg-green-500"
    />
    <StatsCard
      icon={Clock}
      title="Pending"
      value={stats.pending}
      color="bg-amber-500"
    />
    <StatsCard
      icon={DollarSign}
      title="Total Paid"
      value={`$${stats.totalAmountPaid.toLocaleString()}`}
      color="bg-emerald-600"
    />
    <StatsCard
      icon={DollarSign}
      title="Total Due"
      value={`$${stats.totalAmountDue.toLocaleString()}`}
      color="bg-blue-500"
    />
    <StatsCard
      icon={DollarSign}
      title="Platform Fees"
      value={`$${stats.totalPlatformFee.toLocaleString()}`}
      color="bg-purple-500"
    />
  </div>
  )
}

export default InvoiceState