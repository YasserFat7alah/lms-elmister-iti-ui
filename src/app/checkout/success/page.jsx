"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { useSelector } from "react-redux";

export default function SuccessPage() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(5);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        const redirectTimer = setTimeout(() => {
            handleRedirect();
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [userInfo]);

    const handleRedirect = () => {
        // Determine redirect path based on role
        const role = userInfo?.user?.role;
        if (role === 'parent') {
            router.push("/dashboard/parent/children"); // OR /dashboard/parent/notifications or subscriptions logic
        } else if (role === 'student') {
            router.push("/dashboard/student/groups");
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden text-center p-8 md:p-12"
            >
                <div className="flex justify-center mb-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center relative"
                    >
                        <motion.div
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <div className="bg-green-500 rounded-full p-4 shadow-lg shadow-green-500/30">
                                <Check size={40} className="text-white stroke-[3px]" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                    <p className="text-gray-500 mb-8">
                        Thank you for your purchase. Your subscription is now active.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-4 mb-8">
                        <p className="text-sm text-gray-400 mb-1">Redirecting in</p>
                        <p className="text-2xl font-bold text-[#FF0055]">{countdown}</p>
                        <p className="text-xs text-gray-400">seconds...</p>
                    </div>

                    <button
                        onClick={handleRedirect}
                        className="w-full bg-[#FF0055] hover:bg-pink-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 group"
                    >
                        Go to Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
}
