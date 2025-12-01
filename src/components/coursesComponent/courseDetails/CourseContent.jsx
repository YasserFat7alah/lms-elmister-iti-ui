"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FaGooglePlay } from "react-icons/fa";
import Link from "next/link";

export default function CourseContent({ sections }) {

    const totalLessons = sections.reduce((sum, section) => sum + section.lessons.length, 0);

  return (
    <div className=" bg-white  p-4 border rounded-md my-5 mx-4">
        <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Course Content</h2>
            <p className="font-semibold text-gray-500">{totalLessons} Lessons</p>
        </div>

      <Accordion type="multiple" className="w-full space-y-2">
        {sections.map((section, index) => {

          return (
            <AccordionItem
              key={index}
              value={`section-${index}`}
              className=" border-0 "
            >
              <AccordionTrigger className="text-left text-gray-800 px-4 py-2 bg-gray-100  flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-medium text-lg">{section.title}</span>
                  <span className="text-sm text-gray-500">
                    {section.lessons.length} lessons 
                  </span>
                </div>
              </AccordionTrigger>

              <AccordionContent >
                <div className="flex flex-col px-3 py-3 gap-3">
                  {section.lessons.map((lesson, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center px-3 py-2 bg-white border-b last:border-b-0  border-b-gray-100  hover:bg-gray-100 transition"
                    >
                      {/* LEFT SIDE */}
                      <div className="flex items-center gap-3">
                        <FaGooglePlay className="w-4 h-4 text-pink-500" />
                        <Link
                          href={lesson.url}
                          className="text-sm font-medium text-gray-700 hover:underline"
                        >
                          {lesson.title}
                        </Link>
                      </div>

                      {/* RIGHT SIDE */}
                      <div className="flex items-center gap-4">
                        <Link href={lesson.url} className="text-blue-600 text-sm">
                          Preview
                        </Link>
                        <span className="text-gray-500 text-sm">{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
