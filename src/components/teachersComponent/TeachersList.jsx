"use client";
import React from 'react';
import TeacherCard from './TeacherCard';
import Pagination from '../shared/Pagination';

const TeachersList = ({ teachers, currentPage, totalPages, onPageChange }) => {
    return (
        <div className="flex flex-col gap-8 pb-10">
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-in fade-in duration-700"
            >
                {teachers.map((teacher) => (
                    <div key={teacher._id} className="h-full">
                        <TeacherCard teacher={teacher} />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    )
}

export default TeachersList;
