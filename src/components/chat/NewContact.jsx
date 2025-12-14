// "use client"
// import { useState } from "react"
// import { FaUsers, FaTimes } from "react-icons/fa"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Input } from "@/components/ui/input"

// export function NewContact({ allContacts, onSelectContact, isOpen, onClose }) {
//   const [search, setSearch] = useState("")

//   const filteredContacts = allContacts.filter((c) =>
//     c.name.toLowerCase().includes(search.toLowerCase())
//   )

//   if (!isOpen) return null

//   return (
//     <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
//       <div className="bg-white w-full md:w-96 h-96 md:h-auto md:max-h-96 rounded-t-2xl md:rounded-lg shadow-lg flex flex-col">

//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <div className="flex items-center gap-2">
//             <FaUsers className="w-5 h-5 text-[#392b80]" />
//             <h2 className="text-lg font-semibold text-[#392b80]">Select Contact</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1 hover:bg-gray-100 rounded-lg transition"
//             aria-label="Close modal"
//           >
//             <FaTimes className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Search */}
//         <div className="p-4 border-b">
//           <Input
//             type="text"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search contacts..."
//             className="w-full"
//           />
//         </div>

//         {/* Contacts List */}
//         <div className="flex-1 overflow-y-auto">
//           {filteredContacts.length > 0 ? (
//             <div className="space-y-2 p-4">
//               {filteredContacts.map((contact) => (
//                 <button
//                   key={contact.id}
//                   onClick={() => {
//                     onSelectContact(contact)
//                     onClose()
//                     setSearch("")
//                   }}
//                   className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition"
//                 >
//                   <Avatar className="w-10 h-10">
//                     <AvatarImage src={contact.avatar || "/placeholder.svg"} />
//                     <AvatarFallback className="text-md font-bold bg-[#FF0055] text-white">
//                       {contact.name.charAt(0)}
//                     </AvatarFallback>
//                   </Avatar>

//                   <div className="text-left">
//                     <p className="font-medium">{contact.name}</p>
//                     <p className="text-xs text-gray-500">{contact.specialization}</p>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-32 text-gray-500">
//               No contacts found
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }