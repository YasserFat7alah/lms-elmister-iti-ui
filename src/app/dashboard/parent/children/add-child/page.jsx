import AddChildForm from '@/components/dashboardComponents/parent/mychildComponent/AddChildForm';
import Link from 'next/link';
import { IoReturnUpBack } from "react-icons/io5";
import React from 'react'
import BackBtn from '@/components/dashboardComponents/parent/mychildComponent/BackBtn';

const page = () => {


  return (
   <div>
    {/*   Back step btn */}
    <BackBtn/>
    <AddChildForm/>
   </div>
  );
};

export default page;
