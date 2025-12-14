'use client';
import React, { useState } from 'react';
import HeaderAdmin from '@/components/DashboardComponents/admin/HeaderAdmin';
import AdminPayoutsTable from '@/components/DashboardComponents/admin/payouts/AdminPayoutsTable';
import { useGetAdminPayoutsQuery, useUpdatePayoutStatusMutation } from '@/redux/api/endPoints/payoutsApiSlice';
import { Spinner } from '@/components/shared/Loader';
import { toast } from 'react-hot-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminPayoutsPage = () => {
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'approved', 'paid', 'rejected'

  // Fetch payouts with filter
  const { data: payoutsData, isLoading } = useGetAdminPayoutsQuery(
    statusFilter === 'all' ? {} : { status: statusFilter }
  );
  const payouts = payoutsData?.payouts || [];

  const [updatePayoutStatus, { isLoading: isUpdating }] = useUpdatePayoutStatusMutation();

  const handleUpdateStatus = async ({ payoutId, status, note }) => {
    try {
      await updatePayoutStatus({ payoutId, status, note }).unwrap();
      toast.success(`Payout request ${status} successfully`);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update payout status");
    }
  };

  return (
    <div className="px-6 space-y-6">
      <HeaderAdmin
        title="Payout Requests"
        description="Manage teacher withdrawal requests and process payments."
      />

      {/* Filter */}
      <div className="flex justify-end">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <AdminPayoutsTable
          payouts={payouts}
          onUpdateStatus={handleUpdateStatus}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
};

export default AdminPayoutsPage;
