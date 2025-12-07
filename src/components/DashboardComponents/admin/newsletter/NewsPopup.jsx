import React from 'react'

const NewsPopup = ({emailContent , setEmailContent , setIsPopupOpen , handleSend}) => {
  return (
    <div className="fixed inset-0 bg-black/40  flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg">

          <h2 className="text-xl font-bold mb-4 text-[#392b80]">Send Newsletter</h2>

          <input
            type="text"
            placeholder="Title"
            value={emailContent.subject}
            onChange={(e) => setEmailContent({...emailContent, subject: e.target.value})}
            className="border w-full p-2 rounded mb-3"
          />

          <textarea
            placeholder="Message"
            value={emailContent.message}
            onChange={(e) => setEmailContent({...emailContent, message: e.target.value})}
            className="border w-full p-2 rounded mb-4 h-32"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="px-4 py-2 rounded bg-gray-200"
            >
              Cancel
            </button>

            <button onClick={handleSend} className="px-4 py-2 rounded bg-[#FF0055] text-white">
              Send
            </button>
          </div>

        </div>
      </div>
  )
}

export default NewsPopup
