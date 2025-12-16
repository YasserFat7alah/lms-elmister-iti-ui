import React from 'react'
import SubscriptionsTabs from '@/components/DashboardComponents/admin/subscriptionComponents/SubscriptionsTabs';
import HeaderAdmin from '@/components/DashboardComponents/admin/HeaderAdmin';

const Page = () => {
  return (
    <div>
      {/* Header */}
      <HeaderAdmin title="Subscriptions Management" description="Manage, track, and oversee all user subscriptions efficiently in one place." />

      {/* Main Content */}
      <div className="mt-6">
        <SubscriptionsTabs />
      </div>
    </div>
  )
}

export default Page
