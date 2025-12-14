'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/shared/Loader';
import { useCheckOnboardingStatusQuery } from '@/redux/api/endPoints/payoutsApiSlice';
import { toast } from 'react-hot-toast';

const OnboardingSuccess = () => {
    const router = useRouter();
    const { data, isLoading, error } = useCheckOnboardingStatusQuery();

    useEffect(() => {
        if (!isLoading) {
            if (data?.success || data?.status) { // Adjust based on actual API response structure
                toast.success("Stripe account connected successfully!");
                // invalidatesTags in mutation would be better, but we can rely on refetch on mount in Payouts page
                router.push('/dashboard/teacher/payouts');
            } else if (error) {
                toast.error("Failed to verify onboarding status.");
                router.push('/dashboard/teacher/payouts');
            }
        }
    }, [data, isLoading, error, router]);

    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4 bg-gray-50">
            <Spinner />
            <h2 className="text-xl font-semibold text-gray-700">Verifying your account...</h2>
            <p className="text-gray-500">Please wait while we confirm your details with Stripe.</p>
        </div>
    );
};

export default OnboardingSuccess;
