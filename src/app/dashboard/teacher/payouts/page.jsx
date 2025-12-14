'use client';
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'react-hot-toast';
import { Banknote, Wallet, Clock, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';
import {
    useGetTeacherPayoutsQuery,
    useOnboardTeacherMutation,
    useRequestPayoutMutation,
    useCheckOnboardingStatusQuery
} from '@/redux/api/endPoints/payoutsApiSlice';
import { useGetTeacherDashboardQuery } from '@/redux/api/endPoints/teachersApiSlice';
import { Spinner } from '@/components/shared/Loader';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

import StatsCard from '@/components/DashboardComponents/teacher/payouts/StatsCard';
import PayoutHistoryTable from '@/components/DashboardComponents/teacher/payouts/PayoutHistoryTable';
import PayoutRequestModal from '@/components/DashboardComponents/teacher/payouts/PayoutRequestModal';

const Page = () => {
    // 1. Get User Info for Connect Status (Stripe ID doesn't change often)
    const { userInfo } = useSelector((state) => state.auth);

    // 2. Fetch Fresh Stats from Dashboard API (Balance, Earnings)
    const { data: dashboardData, isLoading: isLoadingStats } = useGetTeacherDashboardQuery({});
    const stats = dashboardData?.data?.stats || {};

    const balance = stats.balance || 0;
    const totalEarnings = stats.totalEarnings || 0;
    const pendingRequests = stats.pendingPayoutsCount || 0; // Use count from dashboard stats

    // 2. Fetch Payouts History
    const { data: payoutsData, isLoading: isLoadingPayouts } = useGetTeacherPayoutsQuery();
    const payouts = payoutsData?.data?.payouts || [];

    // 3. Connect Status
    // We fetch live status to handle post-onboarding redirect immediately
    // We fetch live status to handle post-onboarding redirect immediately
    const { data: onboardingData, isLoading: isCheckingOnboarding } = useCheckOnboardingStatusQuery(undefined, {
        skip: !userInfo?.accessToken
    });

    // Check if Stripe Account ID exists in userInfo OR if live status returns true
    const hasStripeAccount = !!(userInfo?.payoutAccount?.stripeAccountId) || !!(onboardingData?.status);
    const [onboardTeacher, { isLoading: isOnboardingLoading }] = useOnboardTeacherMutation();
    const [requestPayout, { isLoading: isRequestLoading }] = useRequestPayoutMutation();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConnectStripe = async () => {
        try {
            const res = await onboardTeacher().unwrap();
            if (res.url) {
                window.location.href = res.url; // Redirect to Stripe
            }
        } catch (err) {
            toast.error(err?.data?.message || "Failed to start onboarding");
        }
    };

    const handleRequestPayout = async (data) => {
        try {
            await requestPayout(data).unwrap();
            toast.success("Payout requested successfully!");
            setIsModalOpen(false);
        } catch (err) {
            toast.error(err?.data?.message || "Failed to request payout");
        }
    };

    if (isLoadingPayouts) return <div className="h-[calc(100vh-100px)] flex items-center justify-center"><Spinner /></div>;

    return (
        <div className="p-6 bg-gray-50/50 min-h-screen space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Breadcrumbs
                    items={[
                        { label: 'Dashboard', href: '/dashboard/teacher' },
                        { label: 'Payouts' },
                    ]}
                />

                {/* Onboarding / Request Button */}
                <div className="flex items-center gap-3">
                    {!hasStripeAccount ? (
                        <Button
                            onClick={handleConnectStripe}
                            disabled={isOnboardingLoading}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200"
                        >
                            {isOnboardingLoading ? <Spinner size="sm" className="mr-2" /> : <Wallet className="w-4 h-4 mr-2" />}
                            Connect Stripe Account
                        </Button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 px-3 py-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                Stripe Connected
                            </Badge>
                            <Button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-[#392b80] hover:bg-[#392b80]/90 text-white shadow-lg shadow-indigo-200"
                            >
                                Request Payout <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Available Balance"
                    value={`$${balance.toFixed(2)}`}
                    icon={Wallet}
                    color="bg-green-500"
                />
                <StatsCard
                    title="Total Earnings"
                    value={`$${totalEarnings.toFixed(2)}`}
                    icon={Banknote}
                    color="bg-blue-500"
                />
                <StatsCard
                    title="Pending Requests"
                    value={pendingRequests}
                    icon={Clock}
                    color="bg-amber-500"
                />
            </div>

            {/* Onboarding Banner (if needed) -> handled by header button, but maybe a banner if balance > 0 but no account? */}
            {balance > 0 && !hasStripeAccount && (
                <Card className="bg-indigo-50 border-indigo-100">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <h3 className="text-lg font-semibold text-indigo-900">Start getting paid!</h3>
                            <p className="text-indigo-700">You have earnings available. Connect your Stripe account to withdraw funds directly to your bank.</p>
                        </div>
                        <Button onClick={handleConnectStripe} disabled={isOnboardingLoading} variant="secondary" className="bg-white text-indigo-600 hover:bg-white/90">
                            Connect Now
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Payout History */}
            <PayoutHistoryTable payouts={payouts} />

            {/* Request Modal */}
            <PayoutRequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleRequestPayout}
                maxAmount={balance}
                isLoading={isRequestLoading}
            />
        </div>
    );
};

export default Page;
