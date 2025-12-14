"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';
import '@/components/shared/NotFound.css';

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="centered-404-container">
            <div className="error">
                <div className="number">4</div>

                <div className="illustration">
                    <div className="circle"></div>
                    <div className="clip">
                        <div className="paper">
                            <div className="face">
                                <div className="eyes">
                                    <div className="eye eye-left"></div>
                                    <div className="eye eye-right"></div>
                                </div>
                                <div className="rosyCheeks rosyCheeks-left"></div>
                                <div className="rosyCheeks rosyCheeks-right"></div>
                                <div className="mouth"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="number">4</div>
            </div>

            <div className="text mb-8">Oops. The page you're looking for doesn't exist.</div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-[#392b80] border-2 border-[#392b80] rounded-full font-bold hover:bg-[#392b80] hover:text-white transition-all duration-300 cursor-pointer"
                >
                    <ArrowLeft size={18} />
                    Go Back
                </button>

                <Link
                    href="/"
                    className="flex items-center gap-2 px-6 py-3 bg-[#FF0055] text-white border-2 border-[#FF0055] rounded-full font-bold hover:bg-[#e6004c] transition-colors"
                >
                    <Home size={18} />
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
