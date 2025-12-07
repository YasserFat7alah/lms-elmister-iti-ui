import { Button } from '@/components/ui/button'
import React from 'react'

const AddNewsLetterBtn = ({onOpenPopup}) => {
  return (
    <Button
          onClick={onOpenPopup}
          className="bg-[#FF0055] text-white px-4 py-2 mt-2 rounded-lg hover:bg-[#d9044c] transition"
        >
          Add Newsletter
    </Button>
  )
}

export default AddNewsLetterBtn
