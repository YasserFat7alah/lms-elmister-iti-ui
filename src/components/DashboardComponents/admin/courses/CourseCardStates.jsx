import React from "react";
import { CheckCircle, Archive, BookOpen } from "lucide-react";
import StateCard from "@/components/ui/stateCard";
import {MdReviews } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";



const CourseCardStates = ({ courses , publishedCourses , draftCourses ,archivedCourses , inReviewCourses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
      <StateCard
        title="Courses"
        Icon={BookOpen}
        count={courses.length}
        color="red"
      />

      <StateCard
        title="Published"
        Icon={CheckCircle}
        count={publishedCourses.length}
        color="green"
      />

      <StateCard 
        title="Draft"
        Icon={RiDraftFill}
        count={draftCourses.length}
        color="yellow"
      />

      <StateCard 
        title="Archived"
        Icon={Archive}
        count={archivedCourses.length}
        color="gray"
      />

      <StateCard 
        title="In Review"
        Icon={MdReviews}
        count={inReviewCourses.length}
        color="blue"
      />
    </div>
  );
};

export default CourseCardStates;