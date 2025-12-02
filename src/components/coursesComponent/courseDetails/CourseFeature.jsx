import React from 'react'

const CourseFeature = ({course}) => {
  return (
        <div className="p-4 border rounded-md my-5 mx-4">
            <h3 className="font-bold text-xl text-gray-900">Features</h3>
            <ul className="list-disc mt-3 px-5 space-y-2 text-gray-700">
              {course.features.map((feature, i) => (
                <li key={i}> {feature} </li>
              ))}
            </ul>
        </div>
  )
}

export default CourseFeature