"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockTeachers } from "@/data/mockTeacher";
import Link from "next/link";
import React from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";



const TeachersPage = () => {
  return (
    <div className="p-6">
        <h4 className='font-semibold text-lg text-[#392b80] py-4'>Teacher </h4>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white shadow-md p-5 rounded-xl border hover:shadow-lg transition"
          >
            {/* Teacher Image */}
            <div className="flex justify-center">
                <Avatar className="w-10 h-10 ">
                    <AvatarImage src={teacher?.avatar} />
                    <AvatarFallback className="text-lg font-bold bg-[#FF0055] text-white">
                    {teacher?.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </div>

            {/* Info */}
            <div className="text-center mt-4">
              <h3 className="text-xl font-semibold">{teacher.name}</h3>
              <p className="text-blue-600 font-medium">{teacher.subject}</p>

              <p className="text-gray-600 text-sm mt-2">
                Teaching your children in:
              </p>

              <div className="mt-1 text-sm text-gray-800">
                {teacher.subjects.join(", ")}
              </div>

              <p className="text-gray-500 text-sm mt-2">
                Availability : {teacher.availability.join(" / ")}
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="flex justify-center gap-3 mt-4">
              <Link
                href={`/dashboard/parent/messages`}
                className="px-4 w-full py-2 bg-[#392b80] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#FF0055] transition"
              >
               Contact with
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersPage;
