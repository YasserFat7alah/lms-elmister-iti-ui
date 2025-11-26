'use client'
import React, { useState } from 'react'
import Sidebar from '../component/Dashboard/Sidebar'
import Topbar from '../component/Dashboard/Topbar'

const layout = ({children}) => {

  const [open , setOpen] = useState(false); //shared mobile sidebar state

  return (
    <div className='flex'>
        <Sidebar open={open} setOpen={setOpen}/>

        <div className='flex-1'>
            <Topbar setOpen={setOpen}/>
            <main>
                {children}
            </main>
        </div>

    </div>
  )
}

export default layout