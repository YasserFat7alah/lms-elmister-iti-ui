'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '@/lib/socket/socketContext';
import { useSearchParams } from 'next/navigation';
import ConversationItem from './ConversationItem';
import MessageBubble from './MessageBubble';
import { Send, AlertCircle } from 'lucide-react';

const ChatComponent = () => {
    const { socket, connected } = useSocket();
    const { userInfo } = useSelector((state) => state.auth);
    const searchParams = useSearchParams();

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);
    const [conversationStarted, setConversationStarted] = useState(false);

    const currentUserId = userInfo?.user?.user || userInfo?.user?._id;
    console.log('userInfo', userInfo);
    console.log('currentUserId', currentUserId);
    const messagesEndRef = useRef(null);
    const receiverId = searchParams.get('receiverId');

    //Reminder>>>>>>>>>>> Debug logger --> to be deleted in production from the whole file !!!!
    const addDebug = (message, data = null) => {
        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] ${message}`;
        console.log(logEntry, data || '');
    };

    const selectConversation = useCallback((conv) => {
        const participants = (conv?.participants || []).map(p => p._id || p.id || p);
        if (!participants.includes(currentUserId)) {
            addDebug('⚠️ Attempt to select a conversation that does not include current user, ignoring', { convId: conv?._id, currentUserId, participants });
            setError('Cannot open conversation you are not part of');
            return;
        }
        setSelectedConversation(conv);
    }, [currentUserId]);

    // Fetch conversations 
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                addDebug('Fetching conversations...');
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/chat/conversation`,
                    {
                        headers: {
                            'Authorization': `Bearer ${userInfo.accessToken}`
                        }
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    const unique = [];
                    (data.data || []).forEach(c => {
                        if (!unique.some(u => u._id === c._id)) unique.push(c);
                    });
                    setConversations(unique);
                } else {
                    const errorData = await response.json();
                    addDebug(' Failed to fetch conversations', errorData);
                    setError('Failed to load conversations');
                }
            } catch (error) {
                addDebug(' Error fetching conversations', error);
                console.error('Failed to fetch conversations:', error);
                setError('Network error loading conversations');
            } finally {
                setLoading(false);
            }
        };

        if (userInfo?.accessToken) {
            fetchConversations();
        }
    }, [userInfo?.accessToken]); 

    // Auto start conversation if receiverId provided 
    useEffect(() => {
        if (!receiverId || conversationStarted || !userInfo?.accessToken) {
            return;
        }

        const startConversation = async () => {
            // Check if conversation already exists
            const existingConv = conversations.find(conv =>
                conv.participants.some(p => {
                    const participantId = p._id || p.id || p;
                    return participantId === receiverId;
                })
            );

            if (existingConv) {
                addDebug('Found existing conversation', existingConv._id);
                selectConversation(existingConv);
                setConversationStarted(true);
                return;
            }

            // Start new conversation
            try {
                addDebug('Starting new conversation with', receiverId);
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/chat/conversation`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.accessToken}`
                        },
                        body: JSON.stringify({ receiverId })
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    addDebug(' New conversation created', data.data._id);
                    const newConv = data.data;
                    setConversations(prev => {
                        // Avoid duplicates by conversation id
                        if (prev.some(c => c._id === newConv._id)) return prev;
                        return [newConv, ...prev];
                    });
                    selectConversation(newConv);
                    setConversationStarted(true);
                } else {
                    const errorData = await response.json();
                    addDebug('Failed to start conversation', errorData);
                    setError('Failed to start conversation');
                }
            } catch (error) {
                addDebug('Error starting conversation', error);
                console.error('Failed to start conversation:', error);
                setError('Network error starting conversation');
            }
        };

        startConversation();
    }, [receiverId, conversations, conversationStarted, userInfo?.accessToken, selectConversation]);

    // Fetch messages when conversation selected
    useEffect(() => {
        if (!selectedConversation?._id || !userInfo?.accessToken) return;

        const fetchMessages = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedConversation._id}/messages`,
                    {
                        headers: {
                            'Authorization': `Bearer ${userInfo.accessToken}`
                        }
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    addDebug(` Loaded ${data.data?.length || 0} messages`);
                    setMessages(data.data || []);
                } else {
                    const errorData = await response.json();
                    addDebug(' Failed to fetch messages', errorData);
                }
            } catch (error) {
                addDebug('Error fetching messages', error);
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages();
    }, [selectedConversation?._id, userInfo?.accessToken]);

    // Listen for new messages
    useEffect(() => {
        if (!socket) {
            addDebug(' Socket not available');
            return;
        }

        const handleNewMessage = (message) => {
            addDebug('New message received', {
                id: message._id,
                from: message.sender?.name,
                conversation: message.conversation
            });

            // Add to messages if it's for the active conversation
            if (message.conversation === selectedConversation?._id) {
                setMessages(prev => {
                    // Check if message already exists
                    const exists = prev.some(m => m._id === message._id);
                    if (exists) {
                        addDebug('Duplicate message, skipping');
                        return prev;
                    }
                    addDebug('Adding message to conversation');
                    return [...prev, message];
                });
            }

            // Update conversations list
            setConversations(prev =>
                prev.map(conv => {
                    if (conv._id === message.conversation) {
                        return { ...conv, lastMessage: message, updatedAt: message.createdAt };
                    }
                    return conv;
                })
            );
        };

        const handleError = (error) => {
            addDebug(' Socket error', error);
            console.error('Socket error:', error);
            setError(error.message || 'Socket error occurred');
        };

        const handleConversationCreated = (conv) => {
            addDebug('Conversation created via socket', conv._id || conv);
            const participants = (conv.participants || []).map(p => p._id || p.id || p);
            addDebug(' Conversation participants', participants);
            // Only add conversations that include the current user (defensive)
            if (!participants.includes(currentUserId)) {
                addDebug(' Received conversation not for this user, ignoring', { currentUserId, participants });
                return;
            }
            setConversations(prev => {
                if (prev.some(c => c._id === (conv._id || conv))) return prev;
                return [conv, ...prev];
            });
        };

        socket.on('newMessage', handleNewMessage);
        socket.on('errorMessage', handleError);
        socket.on('conversationCreated', handleConversationCreated);

        return () => {
            socket.off('newMessage', handleNewMessage);
            socket.off('errorMessage', handleError);
            socket.off('conversationCreated', handleConversationCreated);
        };
    }, [socket, selectedConversation?._id, currentUserId]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    

    // Send message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!messageText.trim() || !selectedConversation || sending) {
            addDebug(' Cannot send: empty message or no conversation');
            return;
        }

        // Ensure selected conversation includes current user
        const selectedParticipants = (selectedConversation?.participants || []).map(p => p._id || p.id || p);
        if (!selectedParticipants.includes(currentUserId)) {
            addDebug(' Selected conversation does not include current user - attempting to create correct conversation', { selectedConversationId: selectedConversation?._id, selectedParticipants, currentUserId });
            // Try to start a conversation with the other participant to obtain a valid conversation
            const otherParticipant = selectedParticipants.find(p => p !== currentUserId) || null;
            const rid = otherParticipant || null;
            if (socket && connected && rid) {
                socket.emit('startConversation', { receiverId: rid }, (ack) => {
                    const newCid = ack?.conversationId || ack?.conversation?._id || null;
                    if (newCid) {
                        addDebug(' Received conversationId from socket startConversation', newCid);
                        // fetch messages and set as active
                        fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${newCid}/messages`, {
                            headers: { 'Authorization': `Bearer ${userInfo.accessToken}` }
                        }).then(r => r.json()).then(d => {
                            setMessages(d.data || []);
                        }).catch(() => {});
                    }
                });
            } else if (rid) {
                // fallback to HTTP
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/conversation`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userInfo.accessToken}` },
                        body: JSON.stringify({ receiverId: rid })
                    });
                    if (res.ok) {
                        const data = await res.json();
                        const newCid = data.data?._id;
                        if (newCid) {
                            addDebug(' Received conversationId from HTTP startConversation', newCid);
                            const msgs = await (await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${newCid}/messages`, { headers: { 'Authorization': `Bearer ${userInfo.accessToken}` } })).json();
                            setMessages(msgs.data || []);
                        }
                    }
                } catch(err) {
                
                }
            }
            setSending(false);
            return;
        }

        const otherParticipant = selectedConversation.participants.find(
            p => {
                const participantId = p._id || p.id || p;
                return participantId !== currentUserId;
            }
        );
        const receiverId = otherParticipant?._id || otherParticipant?.id || otherParticipant;

        addDebug('📤 Sending message', {
            conversationId: selectedConversation._id,
            receiverId,
            participants: selectedConversation.participants?.map(p => p._id || p.id || p) || [],
            textLength: messageText.length,
            method: connected ? 'WebSocket' : 'HTTP'
        });

        setSending(true);
        setError(null);

        try {
            if (socket && connected) {
                // Send via socket
                addDebug('🔌 Using WebSocket');
                socket.emit('sendMessage', {
                    conversationId: selectedConversation._id,
                    receiverId,
                    text: messageText.trim()
                });

                setMessageText('');
                addDebug('Message sent via socket');

            } else {
                // Fallback to HTTP
                addDebug('Using HTTP fallback');
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/chat/${selectedConversation._id}/message`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.accessToken}`
                        },
                        body: JSON.stringify({ text: messageText.trim(), receiverId })
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    addDebug('Message sent via HTTP');
                    setMessages(prev => [...prev, data.data]);
                    setMessageText('');
                } else {
                    const errorData = await response.json();
                    addDebug(' HTTP send failed', errorData);
                    setError(errorData.message || 'Failed to send message');
                }
            }
        } catch (error) {
            addDebug(' Error sending message', error);
            console.error('Failed to send message:', error);
            setError('Failed to send message. Please try again.');
        } finally {
            setSending(false);
        }
    };

    if (loading) {
        return (
            <div className="h-[calc(100vh-180px)] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                    <p className="text-gray-500">Loading conversations...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            {/* Error Banner */}
            {error && (
                <div className="bg-red-50 border-b border-red-200 p-3 flex items-center gap-2 text-red-700">
                    <AlertCircle size={18} />
                    <span className="text-sm font-medium">{error}</span>
                    <button
                        onClick={() => setError(null)}
                        className="ml-auto text-red-500 hover:text-red-700"
                    >
                        ×
                    </button>
                </div>
            )}

            <div className="flex h-[calc(100vh-180px)]">
                {/* Conversations List */}
                <div className="w-80 border-r border-gray-200 flex flex-col">
                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <h2 className="text-lg font-bold text-gray-900">Messages</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
                            <p className="text-xs text-gray-500">
                                {connected ? 'Connected' : 'Disconnected'}
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {conversations.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center p-6">
                                <div className="text-6xl mb-4">💬</div>
                                <h3 className="font-semibold text-gray-900 mb-2">No conversations yet</h3>
                                <p className="text-sm text-gray-500">
                                    Start messaging from a users profile
                                </p>
                            </div>
                        ) : (
                            conversations.map(conv => (
                                <ConversationItem
                                    key={conv._id}
                                    conversation={conv}
                                    isActive={selectedConversation?._id === conv._id}
                                    onClick={() => {
                                        addDebug('💬 Selected conversation', conv._id);
                                        selectConversation(conv);
                                    }}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 flex flex-col">
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b border-gray-200 bg-gray-50">
                                {(() => {
                                    const otherParticipant = selectedConversation.participants?.find(
                                        p => {
                                            const participantId = p._id || p.id || p;
                                            return participantId !== currentUserId;
                                        }
                                    );
                                    return (
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                                                {otherParticipant?.name?.charAt(0).toUpperCase() || '?'}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">
                                                    {otherParticipant?.name || 'Unknown User'}
                                                    
                                                </h3>
                                                <p className="text-xs text-gray-500 capitalize">
                                                    {otherParticipant?.role || 'user'}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })()}
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                                {messages.length === 0 ? (
                                    <div className="flex items-center justify-center h-full">
                                        <p className="text-gray-400">No messages yet. Start the conversation!</p>
                                    </div>
                                ) : (
                                    <>
                                        {messages.map((msg, idx) => {
                                            const senderId = msg.sender?._id || msg.sender?.id || msg.sender;
                                            return (
                                                <MessageBubble
                                                    key={msg._id || idx}
                                                    message={msg}
                                                    isOwn={senderId === currentUserId}
                                                />
                                            );
                                        })}
                                        <div ref={messagesEndRef} />
                                    </>
                                )}
                            </div>

                            {/* Message Input */}
                            <div className="p-4 border-t border-gray-200 bg-white">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                handleSendMessage(e);
                                            }
                                        }}
                                        placeholder="Type a message..."
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        disabled={sending}
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={!messageText.trim() || sending}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
                                    >
                                        <Send size={18} />
                                        {sending ? 'Sending...' : 'Send'}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center bg-gray-50">
                            <div className="text-center">
                                <div className="text-6xl mb-4">💬</div>
                                <h3 className="font-semibold text-gray-900 mb-2">Select a conversation</h3>
                                <p className="text-sm text-gray-500">
                                    Choose a conversation from the list to start messaging
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;