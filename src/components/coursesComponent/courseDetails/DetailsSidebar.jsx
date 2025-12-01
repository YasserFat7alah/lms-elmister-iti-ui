"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import CommentsList from "./CommentsList";

const DetailsSidebar = ({ course }) => {

  const [open, setOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(true);
  const sidebarRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer') || document.querySelector('[data-footer]');
      
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

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="">
      {/* DESKTOP SIDEBAR (LEFT COLUMN) */}
      <div className="hidden md:block w-full  mx-4 text-white  text-lg font-semibold">
        <div className="p-4 border font-bold text-2xl rounded-md my-5 mx-4">
                {course.pricing.isPaid ? (
                    <p className="text-yellow-500">${course.pricing.price}</p>
                    ) : (
                    <p className="text-green-600">Free</p>
                )}
                <div className="flex items-center justify-between mt-4">
                    <Button variant="outline" className="w-fit text-pink-600">
                        <span>
                        <CiHeart />
                        </span>
                        <span>Add To Wishlist</span>
                    </Button>
                    <Button variant="outline" className="text-gray-800 w-fit px-6">
                        <span>
                        <IoMdShare />
                        </span>
                        <span>Share</span>
                    </Button>
                </div>
                <button className="bg-blue-800 text-white w-full my-4 py-3 rounded-3xl font-light text-base hover:bg-pink-600">
                    Enroll Now
                </button>
            </div>

            <div className="p-4 border rounded-md my-5 mx-4">
                <h3 className="font-bold text-xl text-gray-900">Features</h3>
                <ul className="list-disc mt-3 px-5 space-y-2 text-gray-700">
                {course.features.map((feature, i) => (
                    <li key={i}> {feature} </li>
                ))}
                </ul>
            </div>

            <div className="hidden md:block">
                <CommentsList/>
            </div>
      </div>

      {/* _____________________MOBILE BUTTON _____________________________ */}
      <div
        ref={sidebarRef}
        className={`
          ${isSticky ? 'fixed bottom-0' : 'relative'} 
          left-0 text-center w-full bg-white border-t shadow-lg p-4 z-50 md:hidden
        `}
      >
        <button
          onClick={() => setOpen(true)}
          className="w-[80%] py-3 bg-blue-800 text-white rounded-xl text-lg font-semibold"
        >
          Show Course Details For Subscribe
        </button>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 md:hidden transition-opacity duration-300
                ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
        onClick={() => setOpen(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute bottom-0 left-0 w-full bg-white p-6 rounded-t-2xl 
                transform transition-transform duration-300 ease-in-out
                ${open ? "translate-y-0" : "translate-y-full"}
                `}
        >
          {/* Drawer Content */}
            <div className="p-4 border font-bold text-2xl rounded-md my-5 mx-4">
                {course.pricing.isPaid ? (
                <p className="text-yellow-500">${course.pricing.price}</p>
                ) : (
                <p className="text-green-600">Free</p>
                )}
                <div className="flex items-center justify-between mt-4">
                <Button variant="outline" className="w-[40%] text-pink-600">
                    <span>
                    <CiHeart />
                    </span>
                    <span>Add To Wishlist</span>
                </Button>
                <Button variant="outline" className="text-gray-800 w-[40%]">
                    <span>
                    <IoMdShare />
                    </span>
                    <span>Share</span>
                </Button>
                </div>
                <button className="bg-blue-800 text-white w-full my-4 py-3 rounded-3xl font-light text-base hover:bg-pink-600">
                Enroll Now
                </button>
            </div>

            <div className="p-4 border rounded-md my-5 mx-4">
                <h3 className="font-bold text-xl text-gray-900">Features</h3>
                <ul className="list-disc mt-3 px-5 space-y-2 text-gray-700">
                {course.features.map((feature, i) => (
                    <li key={i}> {feature} </li>
                ))}
                </ul>
            </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setOpen(false)}
            className="mt-4 w-full py-2 bg-gray-200 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsSidebar;