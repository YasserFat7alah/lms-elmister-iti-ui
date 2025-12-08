import React from 'react'
import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin'
import SubscriptionsTable from './../../../../components/dashboardComponents/admin/subscriptionComponents/SubscriptionsTable';

const page = () => {
  return (
    <div>
      {/* Header */}
      <HeaderAdmin title="Subscriptions Management" description="Manage, track, and oversee all user subscriptions efficiently in one place."/>

      {/* Main Content */}
      <div className="mt-6">
        <SubscriptionsTable />
      </div>
    </div>
  )
}

export default page
