import React from 'react'

const OverView = ({course}) => {
  return (
    <div className='p-4 border rounded-md my-5 mx-4'>
        <h3 className='font-bold text-gray-900'>Overview</h3>
        <div>
            <div className='mt-4'>
                <h4 className='font-semibold text-gray-800'>Course Description</h4>
                <p className='text-gray-600 text-sm '>{course.detailedDescription}</p>
            </div>

            <div className='mt-4'>
                <h4 className='font-semibold text-gray-800'>What you'll learn</h4>
                <ul className='list-disc pl-6'>
                    {course.whatYouWillLearn.map((txt, index) => (
                        <li key={index} className='text-gray-600'>{txt}</li>
                    ))}
                </ul>
            </div>

        </div>
    </div>
  )
}

export default OverView