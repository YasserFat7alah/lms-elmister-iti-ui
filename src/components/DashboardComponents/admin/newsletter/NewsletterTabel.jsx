import React from 'react'
import { Trash2, Pencil } from "lucide-react";


const NewsletterTabel = ({ data = [], handleDelete, handleEdit  , onOpenPopup }) => {

    return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">

      {/* ---- Header + Send BTN ---- */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">News letters </h2>
        
        {/* <button
          onClick={onOpenPopup}
          className="bg-[#FF0055] text-white px-4 py-2 rounded-lg hover:bg-[#d9044c] transition"
        >
          Send Newsletter
        </button> */}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700">
              <th className="p-3 border-b">Title</th>
              <th className="p-3 border-b">Subject</th>
              <th className="p-3 border-b text-center">Update</th>
              <th className="p-3 border-b text-center">Delete</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="p-3 border-b font-medium text-gray-900">
                    {item.title}
                  </td>

                  <td className="p-3 border-b text-gray-700">
                    {item.subject}
                  </td>

                  <td className="p-3 border-b text-center">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                  </td>

                  <td className="p-3 border-b text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500"
                >
                  No newsletters found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );

}

export default NewsletterTabel
