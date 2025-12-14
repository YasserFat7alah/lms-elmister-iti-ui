import React from 'react'
import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin'
import SubscriptionsTabs from '@/components/DashboardComponents/admin/subscriptionComponents/SubscriptionsTabs';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const page = () => {
  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard/admin' },
            { label: 'Subscriptions' }
          ]}
        />
      </div>

      {/* Main Content */}
      <div className="mt-6">
        <SubscriptionsTabs />
      </div>
    </div>
  )
}

export default page
