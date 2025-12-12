'use client';

import { useState, useEffect, useRef } from 'react';
// import { useSession } from 'next-auth/react';

export default function ChatPanel({ isOpen, onToggle, classroomId }) {
    const { data: session } = "esam"//useSession();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [reactions, setReactions] = useState({});
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // محاكاة الرسائل الأولية
    useEffect(() => {
        const initialMessages = [
            { id: 1, sender: 'System', content: 'مرحباً بكم في الفصل', timestamp: new Date(Date.now() - 600000), type: 'system' },
            { id: 2, sender: 'أحمد محمد', content: 'أهلاً بالجميع', timestamp: new Date(Date.now() - 300000), type: 'message', senderRole: 'teacher' },
            { id: 3, sender: 'سارة علي', content: 'شكراً للمعلم', timestamp: new Date(Date.now() - 200000), type: 'message' },
            { id: 4, sender: 'محمد خالد', content: 'هل يمكن شرح النقطة الأخيرة؟', timestamp: new Date(Date.now() - 100000), type: 'message' },
        ];
        setMessages(initialMessages);
    }, []);

    // التمرير للأسفل عند إضافة رسائل جديدة
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);

        try {
            const message = {
                id: Date.now(),
                sender: session?.user?.name || 'مستخدم',
                content: newMessage,
                timestamp: new Date(),
                type: 'message',
                senderRole: 'user'
            };

            setMessages([...messages, message]);
            setNewMessage('');

            // محاكاة رد المعلم
            setTimeout(() => {
                const autoReply = {
                    id: Date.now() + 1,
                    sender: 'System Bot',
                    content: 'تم استلام رسالتك، المعلم سيرد قريباً',
                    timestamp: new Date(),
                    type: 'system'
                };
                setMessages(prev => [...prev, autoReply]);
            }, 1000);

        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsSending(false);
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // محاكاة تحميل الملف
        const message = {
            id: Date.now(),
            sender: session?.user?.name || 'مستخدم',
            content: `📎 ${file.name}`,
            timestamp: new Date(),
            type: 'file',
            file: {
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(file)
            },
            senderRole: 'user'
        };

        setMessages([...messages, message]);
    };

    const addReaction = (messageId, emoji) => {
        setReactions(prev => {
            const messageReactions = prev[messageId] || [];
            const newReactions = messageReactions.includes(emoji)
                ? messageReactions.filter(e => e !== emoji)
                : [...messageReactions, emoji];

            return { ...prev, [messageId]: newReactions };
        });
    };

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const emojis = ['👍', '👏', '❤️', '😂', '😮', '🎉', '🤔', '❓'];

    return (
        <div className={`flex-1 flex flex-col border-t border-gray-700 ${!isOpen ? 'h-auto' : ''}`}>
            {/* الهيدر */}
            <div
                className="flex justify-between items-center p-4 bg-gray-800 cursor-pointer hover:bg-gray-750"
                onClick={onToggle}
            >
                <div className="flex items-center">
                    <span className="ml-2">💬</span>
                    <span className="font-semibold">الدردشة</span>
                </div>
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>

            {/* المحتوى */}
            {isOpen && (
                <>
                    {/* الرسائل */}
                    <div className="flex-1 overflow-y-auto bg-gray-900 p-3">
                        {messages.length === 0 ? (
                            <div className="h-full flex items-center justify-center text-gray-400">
                                لا توجد رسائل بعد
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {messages.map(message => (
                                    <div key={message.id} className={`p-3 rounded-lg ${message.type === 'system'
                                        ? 'bg-blue-900/30 border border-blue-800/30'
                                        : message.senderRole === 'teacher'
                                            ? 'bg-gray-800 border-r-4 border-blue-500'
                                            : 'bg-gray-800'
                                        }`}>
                                        {/* رأس الرسالة */}
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center">
                                                <span className="font-semibold text-sm">
                                                    {message.sender}
                                                    {message.senderRole === 'teacher' && (
                                                        <span className="mr-2 text-blue-400"> 👨‍🏫</span>
                                                    )}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-400">
                                                {formatTime(message.timestamp)}
                                            </span>
                                        </div>

                                        {/* محتوى الرسالة */}
                                        <div className="mb-2">
                                            {message.type === 'file' ? (
                                                <div className="flex items-center p-2 bg-gray-700 rounded">
                                                    <span className="text-2xl ml-2">📎</span>
                                                    <div>
                                                        <div className="font-medium">{message.file.name}</div>
                                                        <div className="text-xs text-gray-400">
                                                            {(message.file.size / 1024).toFixed(1)} كيلوبايت
                                                        </div>
                                                    </div>
                                                    <a
                                                        href={message.file.url}
                                                        download
                                                        className="mr-auto text-blue-400 hover:text-blue-300 text-sm"
                                                    >
                                                        تحميل
                                                    </a>
                                                </div>
                                            ) : (
                                                <p className="text-gray-200">{message.content}</p>
                                            )}
                                        </div>

                                        {/* التفاعلات */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex space-x-1 space-x-reverse">
                                                {reactions[message.id]?.map((emoji, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => addReaction(message.id, emoji)}
                                                        className="text-xs bg-gray-700 px-2 py-1 rounded hover:bg-gray-600"
                                                    >
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="flex space-x-1 space-x-reverse">
                                                <button
                                                    onClick={() => setSelectedEmoji(message.id)}
                                                    className="text-gray-400 hover:text-gray-300 text-sm"
                                                >
                                                    😊
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(message.content);
                                                        alert('تم نسخ الرسالة');
                                                    }}
                                                    className="text-gray-400 hover:text-gray-300 text-sm"
                                                >
                                                    📋
                                                </button>
                                            </div>
                                        </div>

                                        {/* منتقي الإيموجيات */}
                                        {selectedEmoji === message.id && (
                                            <div className="mt-2 p-2 bg-gray-700 rounded">
                                                <div className="flex flex-wrap gap-1">
                                                    {emojis.map(emoji => (
                                                        <button
                                                            key={emoji}
                                                            onClick={() => {
                                                                addReaction(message.id, emoji);
                                                                setSelectedEmoji(null);
                                                            }}
                                                            className="text-lg hover:bg-gray-600 p-1 rounded"
                                                        >
                                                            {emoji}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* إدخال الرسالة */}
                    <div className="border-t border-gray-700 p-3 bg-gray-800">
                        <form onSubmit={handleSendMessage} className="space-y-2">
                            {/* أدوات سريعة */}
                            <div className="flex space-x-2 space-x-reverse">
                                <button
                                    type="button"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="p-2 hover:bg-gray-700 rounded"
                                >
                                    😊
                                </button>

                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="p-2 hover:bg-gray-700 rounded"
                                >
                                    📎
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                />

                                <div className="flex-1"></div>

                                <button
                                    type="button"
                                    className="p-2 hover:bg-gray-700 rounded text-xs"
                                >
                                    خاصة
                                </button>
                            </div>

                            {/* منتقي الإيموجيات */}
                            {showEmojiPicker && (
                                <div className="bg-gray-900 p-3 rounded-lg">
                                    <div className="flex flex-wrap gap-2">
                                        {emojis.map(emoji => (
                                            <button
                                                key={emoji}
                                                type="button"
                                                onClick={() => {
                                                    setNewMessage(prev => prev + emoji);
                                                    setShowEmojiPicker(false);
                                                }}
                                                className="text-lg hover:bg-gray-800 p-1 rounded"
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* حقل الإدخال */}
                            <div className="flex space-x-2 space-x-reverse">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="اكتب رسالتك هنا..."
                                    className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                                    disabled={isSending}
                                />

                                <button
                                    type="submit"
                                    disabled={isSending || !newMessage.trim()}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSending ? '...' : 'إرسال'}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}