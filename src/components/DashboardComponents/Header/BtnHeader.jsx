import React from 'react'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'


const BtnHeader = ({children , onClick , className}) => {
  return (
    <Button onClick={onClick} 
            className={cn("rounded-3xl transition-all duration-500 ease-in-out",className)}>
        {children}
    </Button>
  )
}

export default BtnHeader