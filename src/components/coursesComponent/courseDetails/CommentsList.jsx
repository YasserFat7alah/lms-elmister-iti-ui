import React from 'react';
import { FaRegCommentDots } from "react-icons/fa6";

const CommentsList = () => {

    let dummyComments = [
        {
          id: 1,
          courseId: 101,
          name: "Alice Johnson",
          email: "alice@example.com",
          subject: "Loved the course!",
          comments: "This course helped me understand React really well."
        },
        {
          id: 2,
          courseId: 101,
          name: "Mohamed Salah",
          email: "mohamed@example.com",
          subject: "Great content",
          comments: "The explanations are very clear and easy to follow."
        },
        {
          id: 3,
          courseId: 102,
          name: "Sara Ahmed",
          email: "sara@example.com",
          subject: "Helpful course",
          comments: "I really liked the sections on hooks and state management."
        },
        {
          id: 4,
          courseId: 101,
          name: "John Doe",
          email: "john@example.com",
          subject: "Very informative",
          comments: "The examples were practical and easy to understand."
        }
    ];
      
    
  if (!dummyComments.length) {
    return (
      <div className='p-4 border text-black rounded-md my-5 mx-4'>
        <h3 className='font-bold text-gray-900'>Comments</h3>
        <p className='text-gray-600'>No comments yet.</p>
      </div>
    )
  }

  return (
    <div className='p-4 border text-black rounded-md my-5 mx-4 h-[500px] overflow-y-scroll'>
      <h3 className='font-bold text-gray-900 mb-3'>Comments</h3>
      <ul className='space-y-3'>
        {dummyComments.map(comment => (
          <li key={comment.id} className='border-b last:border-b-0 p-3 '>
            <p className='font-semibold flex flex-col '>
                <span className='text-blue-700'>{comment.name}</span> 
                <span className='text-gray-500 text-sm'>{comment.email}</span>
            </p>
            <p className='text-gray-600 flex items-start gap-1 mt-2'>
                <span className='text-pink-600 mt-1'> <FaRegCommentDots /> </span>
                <span className='text-base'>{comment.comments}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentsList;
