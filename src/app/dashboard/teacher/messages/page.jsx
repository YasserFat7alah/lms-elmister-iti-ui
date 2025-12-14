'use client';
import React, { Suspense } from 'react';
import ChatComponent from '@/components/DashboardComponents/chat/ChatComponent';
import { Spinner } from "@/components/shared/Loader";

const Page = () => {
    return (
        <Suspense fallback={<div className="h-full w-full flex items-center justify-center"><Spinner /></div>}>
            <div className="-m-4 md:-mx-6 md:-my-3">
                <ChatComponent />
            </div>
        </Suspense>
    );
};

export default Page;