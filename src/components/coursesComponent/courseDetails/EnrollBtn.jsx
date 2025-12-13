"use client";
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation'; // Correct hook for App Router
import EnrollmentModal from './EnrollmentModal';

const EnrollBtn = ({ selectedGroup, course }) => { // Accept course prop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useSelector(state => state.auth);
  const user = userInfo; // Alias for compatibility with existing code
  const router = useRouter();
  const pathname = usePathname();

  const handleEnrollClick = () => {
    if (!user) {
      // Redirect to login with return url
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/login?redirect=${returnUrl}`);
      return;
    }

    // Open modal to select child
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleEnrollClick}
        disabled={!selectedGroup}
        className={`w-[90%] flex items-center justify-center font-semibold mx-auto my-4 py-5 rounded-3xl text-base transition-colors
            ${!selectedGroup
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300 shadow-none'
            : 'bg-blue-800 text-white hover:bg-pink-600 shadow-md cursor-pointer'
          }
        `}
      >
        {selectedGroup ? 'Enroll Now' : 'Select a Group'}
      </Button>

      {user && (
        <EnrollmentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          course={course}
          selectedGroup={selectedGroup}
        />
      )}
    </>
  )
}

export default EnrollBtn