'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OnboardingFailed = () => {
    const router = useRouter();

    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50 p-4">
            <div className="text-red-500 bg-red-50 p-6 rounded-full">
                <XCircle size={64} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Connection Failed</h2>
            <p className="text-gray-600 text-center max-w-md">
                We couldn't connect your Stripe account. This might be because you cancelled the process or an error occurred.
            </p>
            <div className="flex gap-4">
                <Button
                    onClick={() => router.push('/dashboard/teacher/payouts')}
                    variant="outline"
                >
                    Return to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default OnboardingFailed;
