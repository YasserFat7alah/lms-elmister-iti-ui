import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const AddNewsLetterBtn = ({onOpenPopup}) => {
  return (
    <Button
          onClick={onOpenPopup}
          className="bg-[#392b80] text-white px-10 py-2 mt-2 rounded-lg cursor-pointer hover:bg-[#392b80c9] transition"
        >
          <span><Plus/></span>
          Add Newsletter
    </Button>
  )
}

export default AddNewsLetterBtn
