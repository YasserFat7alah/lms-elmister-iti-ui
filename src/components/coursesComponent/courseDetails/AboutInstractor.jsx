import { FaGooglePlay } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import Image from 'next/image'
import React from 'react'

// صورة افتراضية (Placeholder) عشان لو المدرس ملوش صورة
const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const AboutInstractor = ({ course, teacher }) => {

    // تأمين: لو بيانات المدرس مش موجودة خالص
    if (!teacher) return null;

    // ملاحظة: بما إننا معندناش كل الكورسات في الفرونت، مش هنقدر نحسب العدد بدقة
    // المفروض الباك إند يبعت (coursesCount) جوه بيانات المدرس
    // حالياً هنعرض 1 كقيمة افتراضية (الكورس الحالي) أو نخفيها
    const coursesCount = teacher.coursesCount || 1; 
    const totalLessons = teacher.totalLessons || "N/A"; 

    return (
        <div className='p-4 border rounded-md my-5 mx-4 bg-white shadow-sm'>
            <h3 className='font-bold text-gray-900 mb-4'>About the teacher</h3>
            
            {/* MAIN INFO */}
            <div>
                <div className='flex gap-3 items-center'>
                    {/* الصورة مع Fallback */}
                    <div className="relative w-20 h-20 rounded-full overflow-hidden border border-gray-200">
                        <img 
                        
                            src={teacher.avatar || DEFAULT_AVATAR} 
                            alt={teacher.name || "Teacher"}
                            className='object-cover'
                        />
                    </div>
                    
                    <div>
                        <p className='text-gray-800 font-bold text-lg'>{teacher.name}</p>
                        <p className='text-gray-500 text-sm'>
                            {teacher.specialization || "teacher"}
                        </p>
                    </div>
                </div>
            </div>

            {/* EXPERIENCES */}
            <div className='mt-4'>
                <div className='flex gap-6 items-center border-t border-b py-4 px-2'>
                    <div className='flex items-center gap-2 font-semibold'>
                        <p className='text-pink-500'> <FaGooglePlay/> </p>
                        <p className='text-gray-800 text-sm'>
                            {coursesCount} {coursesCount > 1 ? "Courses" : "Course"}
                        </p>
                    </div>

                    <div className='flex items-center gap-2 font-semibold'>
                        <p className='text-yellow-400'><FaBookOpen /></p>
                        <p className='text-gray-800 text-sm'>
                             {totalLessons} Lessons
                        </p>
                    </div>
                </div>

                {/* التفاصيل الإضافية: نتأكد إنها موجودة قبل العرض */}
                <div className="mt-4 space-y-2">
                    {teacher.degree && (
                         <p className='text-gray-600 text-sm'>
                            <span className="font-bold">Degree:</span> {teacher.degree}
                         </p>
                    )}

                    {/* استخدام Optional Chaining ?. عشان لو subjects مش موجودة */}
                    {teacher.subjects && teacher.subjects.length > 0 && (
                        <p className='text-gray-600 text-sm'>
                            <span className="font-bold">Subjects:</span> {teacher.subjects.join(", ")}
                        </p>
                    )}

                    {teacher.availability && teacher.availability.length > 0 && (
                        <div className="mt-3">
                            <h3 className='font-semibold text-gray-900 text-sm'>Available for:</h3>
                            <p className='text-gray-500 text-sm'>{teacher.availability.join(" / ")}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AboutInstractor