// "use client";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import React, { useState, useEffect, useRef } from "react";
// import { FaRegComment } from "react-icons/fa";
// import { NewContact } from "./NewContact";
// import { useSelector, useDispatch } from "react-redux"; // For token and user info
// import Cookies from "js-cookie";
// import { BASE_URL } from "@/constants";
// import { connectSocket } from "@/lib/socket";
// import { addMessage, setMessages, setActiveConversation } from "@/redux/slices/chatSlice";

// const EMPTY_MESSAGES = Object.freeze([]);
// const Chat = ({ selectedTeacher, teachers = [], setSelectedTeacher, socket: propSocket, otherUserId }) => {
//   const bottomRef = useRef(null);
//   const activeConversationId = useSelector((state) => state.chat?.activeConversationId);
//   const messages = useSelector((state) => state.chat?.messages?.[activeConversationId] ?? EMPTY_MESSAGES);
//   const messagesRef = React.useRef(messages);
//   useEffect(() => { messagesRef.current = messages; }, [messages]);
//   const [input, setInput] = useState("");
//   const [search, setSearch] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [showNewContact, setShowNewContact] = useState(false);

//   const cookieToken = Cookies.get("accessToken") || Cookies.get("token");
//   const authUserInfo = useSelector(state => state.auth.userInfo);
//   const token = authUserInfo?.accessToken || cookieToken;
//   const user = authUserInfo?.user;
//   const userId = user?._id;
//   const role = user?.role;
//   const userName = user?.name;

//   // Socket instance
//   const [localSocket, setLocalSocket] = useState(null);
//   const [selectedTeacherLocal, setSelectedTeacherLocal] = useState(selectedTeacher || null);
//   const activeSelectedTeacher = selectedTeacher || selectedTeacherLocal;
//   const dispatch = useDispatch();

//   // Debug log current active state to help diagnose why conversation id / selected teacher are null
//   useEffect(() => {
//     console.debug("Chat state: ", { otherUserId, activeSelectedTeacher, activeConversationId, token, socket: !!localSocket });
//   }, [otherUserId, activeSelectedTeacher, activeConversationId, token, localSocket]);

//   // Use provided socket (from parent) when available, otherwise fallback
//   useEffect(() => {
//     // Use provided socket or create a shared one
//     const s = propSocket || (token ? connectSocket(token) : null);
//     if (!s) {
//       setLocalSocket(null);
//       return;
//     }
//     setLocalSocket(s);

//     const handleConnect = () => {
//       console.debug("Chat component connected - emitting joinRoom", { userId, role });
//       s.emit("joinRoom", { userId, role });
//       if (otherUserId) {
//         s.emit("startConversation", { receiverId: otherUserId }, (res) => {
//           console.debug("startConversation ack (Chat)", res);
//           const cid = res?.conversationId || res?.conversation?._id || res?.id || res?.data?.conversationId || null;
//           if (cid) dispatch(setActiveConversation(cid));
//         });
//       }
//     };

//     const handleNewMsg = (msg) => {
//       console.debug("Chat component received newMessage", msg);
//       // Dedupe: ignore message if already in the list
//       const current = messagesRef.current || [];
//       if (msg?._id && current.some((m) => m._id === msg._id)) {
//         console.debug("Ignoring duplicate message by id", msg._id);
//         return;
//       }
//       if (msg?.text && msg?.sender?._id) {
//         const existing = current.some((m) => {
//           const isSameSender = m.sender?._id === msg.sender?._id;
//           const isSameText = m.text === msg.text;
//           const isCloseTimestamp = Math.abs(new Date(m.createdAt) - new Date(msg.createdAt)) < 2000;
//           return isSameSender && isSameText && isCloseTimestamp;
//         });
//         if (existing) {
//           console.debug("Ignoring duplicate message by heuristic", msg);
//           return;
//         }
//       }
//       dispatch(addMessage(msg));
//     };

//     s.on("connect", handleConnect);
//     s.on("newMessage", handleNewMsg);

//     return () => {
//       s.off("connect", handleConnect);
//       s.off("newMessage", handleNewMsg);
//     };
//   }, [propSocket, token, userId, role, otherUserId, dispatch]);

//   // If parent doesn't pass selectedTeacher, fetch it using otherUserId
//   useEffect(() => {
//     // The backend doesn't expose GET /users/:id on /api/v1; try to fetch if available.
//     if (selectedTeacher || !otherUserId || !token) return;
//     const fetchTeacher = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/users/${otherUserId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) {
//           const txt = await res.text();
//           console.error("fetchTeacher error: non-JSON response", res.status, txt.substring(0, 200));
//           return;
//         }
//         const data = await res.json();
//         console.debug("Fetched teacher data for otherUserId", otherUserId, data);
//         // If backend doesn't have a GET /users/:id endpoint, this will 404.
//         // Gracefully skip if that happens.
//         setSelectedTeacherLocal(data.user || null);
//       } catch (err) {
//         console.error("Failed to fetch teacher info", err);
//       }
//     };
//     fetchTeacher();
//   }, [otherUserId, token, selectedTeacher]);

//   // If we still don't have teacher, set a fallback object with an ID so the UI can render
//   useEffect(() => {
//     if (!selectedTeacherLocal && otherUserId) {
//       setSelectedTeacherLocal({ id: otherUserId, name: "Unknown", avatar: undefined, specialization: undefined });
//     }
//   }, [selectedTeacherLocal, otherUserId]);

//   const conversationId = activeSelectedTeacher?.conversationId || activeConversationId;

//   // Load or refresh messages when active conversation changes
//   useEffect(() => {
//     if (!conversationId || !token) {
//       return;
//     }

//     const fetchMessages = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/chat/${conversationId}/messages`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) {
//           const txt = await res.text();
//           console.error("fetchMessages error: non-JSON response", res.status, txt.substring(0, 200));
//           // If user is not part of this conversation (403), try to startConversation
//           if (res.status === 403 && localSocket) {
//             console.debug("Not part of conversation — attempting to startConversation and retry");
//             localSocket.emit("startConversation", { receiverId: otherUserId }, (ack) => {
//               console.debug("startConversation ack (fetch retry)", ack);
//               const newCid = ack?.conversationId || ack?.conversation?._id || ack?.id || ack?.data?.conversationId || null;
//               if (newCid) {
//                 dispatch(setActiveConversation(newCid));
//                 // retry fetch with the new conversation id
//                 fetch(`${BASE_URL}/chat/${newCid}/messages`, {
//                   headers: { Authorization: `Bearer ${token}` },
//                 })
//                   .then((r) => r.json())
//                   .then((data) => dispatch(setMessages({ conversationId: newCid, messages: data.messages || [] })))
//                   .catch((e) => console.error("Retry fetchMessages failed", e));
//               }
//             });
//           }
//           return;
//         }
//         const data = await res.json();
//         dispatch(setMessages({ conversationId, messages: data.messages || [] }));
//       } catch (err) {
//         console.error("Failed to fetch messages", err);
//       }
//     };

//     fetchMessages();
//   }, [conversationId, token, dispatch]);

//   // Auto-scroll
//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Join conversation room when conversationId changes
//   useEffect(() => {
//     if (!conversationId || !localSocket) return;
//     try {
//       localSocket.emit("joinRoom", { conversationId, userId, role });
//       console.debug("Joined conversation room", { conversationId });
//     } catch (err) {
//       console.error("Error emitting joinRoom for conversation", err);
//     }
//   }, [conversationId, localSocket, userId, role]);

//   // Select teacher from sidebar
//   const handleSelectTeacher = (teacher) => {
//     if (setSelectedTeacher) setSelectedTeacher(teacher);
//     else setSelectedTeacherLocal(teacher);
//     setSidebarOpen(false);
//   };

//   // Send message
//   const sendMessage = () => {
//     const cid = conversationId;
//     const rid = activeSelectedTeacher?.id || otherUserId;
//     if (!input.trim()) {
//       console.debug("sendMessage blocked: empty input");
//       return;
//     }
//     if (!cid) {
//       console.debug("sendMessage blocked: no conversationId available", { activeSelectedTeacher, activeConversationId });
//       return;
//     }
//     if (!localSocket) {
//       console.debug("sendMessage blocked: socket not connected");
//       return;
//     }

//     const msgPayload = {
//       conversationId: cid,
//       receiverId: rid,
//       text: input,
//     };

//     const s = localSocket;
//     if (!s) return;
//     // If we don't have a conversation ID, create a conversation first and then send
//     const doSend = (payload) => {
//       console.debug("Emitting sendMessage", payload);
//       s.emit("sendMessage", payload, (ack) => {
//         console.debug("sendMessage ack", ack);
//       });
//     };

//     if (!cid) {
//       console.debug("No conversationId, attempting to startConversation first", { rid });
//       s.emit("startConversation", { receiverId: rid }, (res) => {
//         console.debug("startConversation ack (sendMessage path)", res);
//         const newCid = res?.conversationId || res?.conversation?._id || res?.id || res?.data?.conversationId || null;
//         if (newCid) {
//           dispatch(setActiveConversation(newCid));
//           const payloadWithCid = { ...msgPayload, conversationId: newCid };
//           doSend(payloadWithCid);
//           // Optimistic UI update
//           dispatch(addMessage({
//             ...payloadWithCid,
//             sender: { _id: userId, name: userName },
//             createdAt: new Date().toISOString(),
//             conversation: newCid,
//           }));
//           setInput("");
//         } else {
//           console.error("startConversation ack returned no conversationId", res);
//         }
//       });
//       return;
//     }
//     doSend(msgPayload);

//     // Optimistic UI update via Redux
//     dispatch(addMessage({
//       ...msgPayload,
//       sender: { _id: userId, name: userName },
//       createdAt: new Date().toISOString(),
//       conversation: cid,
//     }));

//     setInput("");
//   };

//   const filteredTeachers = teachers.filter((t) =>
//     t.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex h-[570px] bg-white rounded-lg shadow-md relative">
//       {/* LEFT TEACHER LIST / SIDEBAR */}
//       <div
//         className={`fixed top-0 left-0 h-full w-72 bg-white border-r p-4 flex flex-col z-50
//           transform transition-transform duration-300
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
//           md:translate-x-0 md:relative md:w-1/3 md:flex`}
//       >
//         <div className="flex items-center justify-between py-4">
//           <h4 className="font-semibold text-lg text-[#392b80] flex items-center gap-2">
//             Messages
//             <FaRegComment
//               className="w-5 h-5 cursor-pointer hover:text-[#FF0055] transition"
//               onClick={() => {
//                 setShowNewContact(true);
//                 setSidebarOpen(false);
//               }}
//             />
//           </h4>
//         </div>

//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search teachers..."
//           className="w-full p-2 border rounded-lg mb-4"
//         />

//         <div className="space-y-3 flex-1 overflow-y-auto">
//           {filteredTeachers.map((t) => (
//             <div
//               key={t.id}
//               onClick={() => handleSelectTeacher(t)}
//               className={`flex items-center p-3 rounded-lg cursor-pointer 
//                 ${activeSelectedTeacher?.id === t.id ? "bg-purple-100" : "hover:bg-gray-100"}`}
//             >
//               <Avatar className="w-10 h-10">
//                 <AvatarImage src={t.avatar} />
//                 <AvatarFallback className="text-md font-bold bg-[#FF0055] text-white">
//                   {t.name.charAt(0)}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="ml-3">
//                 <p className="font-semibold">
//                   {t.name} - <span className="text-xs text-gray-500">{t.specialization}</span>
//                 </p>
//                 <p>{messages.length ? messages[messages.length - 1].text : "No messages yet"}</p>
//               </div>
//             </div>
//           ))}

//           {filteredTeachers.length === 0 && (
//             <p className="text-gray-500 text-sm text-center mt-10">No teachers found</p>
//           )}
//         </div>
//       </div>

//       {/* RIGHT CHAT AREA */}
//       <div className="flex-1 flex flex-col md:ml-0 ml-0">

//         {/* HEADER */}
//         <div className="flex border-b p-4 items-center bg-white">
//           {activeSelectedTeacher && (
//             <>
//               <Avatar className="w-12 h-12">
//                 <AvatarImage src={activeSelectedTeacher.avatar} />
//                 <AvatarFallback className="text-md font-bold bg-[#FF0055] text-white">
//                   {activeSelectedTeacher.name?.charAt(0) || "?"}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="ml-3">
//                 <p className="font-semibold">{activeSelectedTeacher.name || "Unknown"}</p>
//                 <p className="text-sm text-gray-500">{activeSelectedTeacher.specialization}</p>
//               </div>
//             </>
//           )}
//         </div>

//         {/* MESSAGES */}
//         <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`max-w-md p-3 rounded-xl shadow-sm ${msg.sender._id === userId
//                   ? "bg-[#392b80] text-white self-end ml-auto"
//                   : "bg-white border self-start"
//                 }`}
//             >
//               <p>{msg.text}</p>
//               <p className="text-xs opacity-70 mt-1 text-right">
//                 {new Date(msg.createdAt).toLocaleTimeString()}
//               </p>
//             </div>
//           ))}
//           <div ref={bottomRef}></div>
//         </div>

//         {/* INPUT */}
//         <div className="p-4 border-t flex items-center gap-3">
//           <input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Type your message..."
//             className="flex-1 p-2 border rounded-lg"
//           />
//           <button
//             onClick={sendMessage}
//             className="px-4 py-2 bg-[#392b80] text-white rounded-lg hover:bg-[#392b80]/90"
//           >
//             Send
//           </button>
//         </div>
//       </div>

//       {/* Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-40 md:hidden"
//           onClick={() => setSidebarOpen(false)}
//         ></div>
//       )}

//       {/* NewContact Modal */}
//       {showNewContact && (
//         <NewContact
//           allContacts={teachers} 
//           isOpen={showNewContact}
//           onClose={() => setShowNewContact(false)}
//           onSelectContact={(contact) => {
//             setSelectedTeacher(contact);
//             setShowNewContact(false);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Chat;
