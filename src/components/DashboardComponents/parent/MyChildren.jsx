import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import ChildBanner from "./mychildComponent/ChildBanner"
import EnrollCourses from "./mychildComponent/EnrollCourses"
import { children } from "@/data/parentData"
import { IoBookOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
 import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MyChildren = () => {

  if (!children || children.length === 0) {
    return <p>No children yet.</p>
  }

  if (children.length === 1) {
    const child = children[0]

    return (
      <div>
        <ChildBanner child={child} />
        <EnrollCourses child={child} />
      </div>
    )
  }

  return (

    <div>
        <h4 className='font-semibold text-lg text-[#392b80]'>Your Children</h4>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
            {children.map(child=>(
                <div key={child?.id} className="border border-gray-200 rounded-lg p-4 bg-white ">
                    <div className="flex items-center gap-2 mb-3">
                      {/* _______________AVATAR________________ */}
                      <Avatar className="w-16 h-16 ">
                        <AvatarImage src={child?.avatar} />
                        <AvatarFallback className="text-2xl font-bold bg-[#FF0055] text-white">
                          {child?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {/* _______________NAME AND GRADE________________ */}
                      <p className="text-lg  flex flex-col">
                        <span>{child?.name}</span>
                        <span className="text-sm text-gray-500">{child?.grade}</span>    
                      </p>
                    </div>
                    {/* _______________ACTIVE COURSES AND TODAY'S CLASS________________ */}
                    <div className="mx-3">
                        <p className="flex items-center gap-2">
                            <span className="text-blue-500"> <IoBookOutline/> </span>
                            <span className="text-gray-600 text-sm ">{child.activeCourses} Active Subscriptions</span>
                        </p>

                        <p className="flex items-center gap-2 mt-2">
                            <span className="text-purple-500"> <FaRegCalendarAlt/> </span>
                            <span className="text-gray-600 text-sm">Math - Today at 3.000 PM</span>
                        </p>

                        <Link href={`/dashboard/parent/children/${child.id}`} >
                          <Button variant='outline' className='w-full cursor-pointer hover:text-white rounded-lg text-[#392b80] border-[#392b80] my-3 hover:bg-[#392b80]'>View Details</Button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    </div>
   
  )
}

export default MyChildren
