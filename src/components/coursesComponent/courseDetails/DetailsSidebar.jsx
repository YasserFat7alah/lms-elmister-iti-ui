"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import CommentsList from "./CommentsList";
import CourseFeature from "./CourseFeature";
import PriceAndBtnsCourse from "./PriceAndBtnsCourse";
import EnrollBtn from "./EnrollBtn";

const DetailsSidebar = ({ course }) => {
  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const sidebarRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer =
        document.querySelector("footer") ||
        document.querySelector("[data-footer]");

      if (!footer || window.innerWidth >= 768) {
        setIsSticky(true);
        return;
      }

      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (footerTop <= windowHeight) {
        setIsSticky(false);
      } else {
        setIsSticky(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="">
      {/* DESKTOP SIDEBAR (LEFT COLUMN) */}
      <div className="hidden md:block w-full mx-4 text-white text-lg font-semibold">
          
          <EnrollBtn/>
          <PriceAndBtnsCourse course={course}/>

        <CourseFeature course={course}/>

        <div className="hidden md:block">
          <CommentsList />
        </div>
      </div>

      {/* _____________________MOBILE BUTTON _____________________________ */}
      <div
        ref={sidebarRef}
        className={`
          ${isSticky ? "fixed bottom-0" : "relative"} 
          left-0 text-center w-full bg-white border-t shadow-lg px-4 py-5 z-50 md:hidden
        `}
      >
        <EnrollBtn/>
      </div>

    
    </div>
  );
};

export default DetailsSidebar;
