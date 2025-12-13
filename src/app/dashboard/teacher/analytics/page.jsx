'use client';
import { FullPageLoader as Loader } from '@/components/shared/Loader';
import TeacherAnalytics from '@/components/DashboardComponents/teacher/analytics/TeacherAnalytics';
import { useGetTeacherDashboardQuery } from '@/redux/api/endPoints/teachersApiSlice';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

const Page = () => {
  // Initial load without params gets global/default stats
  const { data: dashboardData, isLoading, error } = useGetTeacherDashboardQuery({});

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-10">Failed to load analytics</div>;

  return (
    <div className="p-6 bg-gray-50/50 min-h-screen">
      <div className="mb-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard/teacher' },
            { label: 'Analytics' }
          ]}
        />
      </div>
      <TeacherAnalytics data={dashboardData?.data} />
    </div>
  );
};

export default Page;