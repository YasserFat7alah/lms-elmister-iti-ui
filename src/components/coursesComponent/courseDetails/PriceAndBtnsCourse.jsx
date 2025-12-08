import { Button } from '@/components/ui/button'
import React from 'react'
import { CiHeart } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";


const PriceAndBtnsCourse = ({course}) => {
  return (
    <div className="p-4 border font-bold text-2xl rounded-md my-5 mx-4">
            {course.pricing?.isPaid ? (
              <p className="text-yellow-500">{course.pricing?.price} EGP</p>
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
              <Button variant="outline" className="text-gray-800 w-fit px-8">
                <span>
                  <IoMdShare />
                </span>
                <span>Share</span>
              </Button>
            </div>
          </div>
  )
}

export default PriceAndBtnsCourse