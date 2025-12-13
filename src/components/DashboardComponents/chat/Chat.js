"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState, useEffect, useRef } from "react";

const Chat = ({ selectedTeacher, teachers, setSelectedTeacher }) => {
    const [messages, setMessages] = useState(selectedTeacher?.messages || []);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const bottomRef = useRef(null);

    // Filter teachers by name
    const filteredTeachers = teachers.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    // Update messages when selectedTeacher changes
    useEffect(() => {
        setMessages(selectedTeacher?.messages || []);
    }, [selectedTeacher]);

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Select teacher from sidebar
    const handleSelectTeacher = (teacher) => {
        setSelectedTeacher(teacher);
        setMessages(teacher.messages || []);
        setSidebarOpen(false);
    };

    // Send message
    const sendMessage = () => {
        if (!input.trim()) return;

        const newMessage = {
            id: Date.now(),
            sender: "parent",
            text: input,
            time: "Just now",
        };

        const updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        const updatedTeacher = { ...selectedTeacher, messages: updatedMessages };
        setSelectedTeacher(updatedTeacher);

        setInput("");
    };

    return (
        <div className="flex h-[570px] bg-white rounded-lg shadow-md relative">

            {/* LEFT TEACHER LIST / SIDEBAR */}
            <div
                className={`fixed top-0 left-0 h-full w-72 bg-white border-r p-4 flex flex-col z-50
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:relative md:w-1/3 md:flex`}
            >
                <h4 className="font-semibold text-lg text-[#392b80] py-4">Messages</h4>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search teachers..."
                    className="w-full p-2 border rounded-lg mb-4"
                />

                <div className="space-y-3 flex-1 overflow-y-auto">
                    {filteredTeachers.map((t) => (
                        <div
                            key={t.id}
                            onClick={() => handleSelectTeacher(t)}
                            className={`flex items-center p-3 rounded-lg cursor-pointer 
                ${selectedTeacher.id === t.id ? "bg-purple-100" : "hover:bg-gray-100"}`}
                        >
                            <Avatar className="w-10 h-10">
                                <AvatarImage src={t.avatar} />
                                <AvatarFallback className="text-md font-bold bg-[#FF0055] text-white">
                                    {t.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                                <p className="font-semibold">
                                    {t.name} - <span className="text-xs text-gray-500">{t.specialization}</span>
                                </p>
                                <p>
                                    {t.messages?.length
                                        ? t.messages[t.messages.length - 1].text
                                        : "No messages yet"}
                                </p>
                            </div>
                        </div>
                    ))}

                    {filteredTeachers.length === 0 && (
                        <p className="text-gray-500 text-sm text-center mt-10">No teachers found</p>
                    )}
                </div>
            </div>

            {/* RIGHT CHAT AREA */}
            <div className="flex-1 flex flex-col md:ml-0 ml-0">

                {/* MOBILE HEADER */}
                <div className="flex items-center justify-between border-b p-4 bg-white md:hidden">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="px-3 py-2 bg-[#392b80] text-white rounded-lg"
                    >
                        {sidebarOpen ? "Close" : "Teachers"}
                    </button>
                    <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                            <AvatarImage src={selectedTeacher.avatar} />
                            <AvatarFallback className="text-md font-bold bg-[#FF0055] text-white">
                                {selectedTeacher.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="ml-3">
                            <p className="font-semibold">{selectedTeacher.name}</p>
                            <p className="text-sm text-gray-500">{selectedTeacher.specialization}</p>
                        </div>
                    </div>
                </div>

                {/* DESKTOP HEADER */}
                <div className="hidden md:flex border-b p-4 items-center bg-white">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedTeacher.avatar} />
                        <AvatarFallback className="text-md font-bold bg-[#FF0055] text-white">
                            {selectedTeacher.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                        <p className="font-semibold">{selectedTeacher.name}</p>
                        <p className="text-sm text-gray-500">{selectedTeacher.specialization}</p>
                    </div>
                </div>

                {/* MESSAGES */}
                <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-md p-3 rounded-xl shadow-sm ${msg.sender === "teacher"
                                ? "bg-white border self-start"
                                : "bg-[#392b80] text-white self-end ml-auto"
                                }`}
                        >
                            <p>{msg.text}</p>
                            <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                        </div>
                    ))}
                    <div ref={bottomRef}></div>
                </div>

                {/* INPUT */}
                <div className="p-4 border-t flex items-center gap-3">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                        onClick={sendMessage}
                        className="px-4 py-2 bg-[#392b80] text-white rounded-lg hover:bg-[#392b80]/90"
                    >
                        Send
                    </button>
                </div>
            </div>

            {/*  Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default Chat;
