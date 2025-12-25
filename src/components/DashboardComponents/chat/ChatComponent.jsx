'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '@/lib/socket/socketContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ConversationItem from './ConversationItem';
import MessageBubble from './MessageBubble';
import { Send, AlertCircle, ArrowLeft } from 'lucide-react';
import { Spinner } from '@/components/shared/Loader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getDaySeparatorLabel, isDifferentDay } from '@/utils/dateFormatters';

const ChatComponent = () => {
    const { socket, connected } = useSocket();
    const { userInfo } = useSelector((state) => state.auth);
    const searchParams = useSearchParams();

    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [aiMessages, setAiMessages] = useState([
        {
            _id: 'ai-greeting',
            sender: { _id: 'ai-support', name: 'El Mister AI' },
            text: "Hello! I'm El Mister AI. How can I help you today?",
            createdAt: new Date().toISOString(),
        }
    ]); // Separate state for AI Support messages
    const [messageText, setMessageText] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);
    const [conversationStarted, setConversationStarted] = useState(false);
    const [showChatOnMobile, setShowChatOnMobile] = useState(false); // Mobile view state

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
        // Validate that user is part of this conversation (unless it's AI Support)
        if (conv._id !== 'ai-support' && !conv.isAI) {
            const isParticipant = conv.participants?.some(p => {
                const participantId = p._id || p.id || p;
                return String(participantId) === String(currentUserId);
            });
            if (!isParticipant) {
                setError('Cannot open conversation you are not part of');
                return;
            }
        }

        addDebug('Selecting conversation', conv._id);

        // Only reset messages when switching to a DIFFERENT conversation
        const isDifferentConversation = selectedConversation?._id !== conv._id;
        if (isDifferentConversation && conv._id !== 'ai-support' && !conv.isAI) {
            setMessages([]); // Will be loaded by fetch effect for the new conversation
        }

        setSelectedConversation(conv);
        setShowChatOnMobile(true); // Always show chat view on mobile
    }, [currentUserId, selectedConversation]);

    // Back button handler for mobile
    const handleBackToConversations = () => {
        setShowChatOnMobile(false);
        // Note: We keep selectedConversation so clicking it again will work
    };

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

    // Auto-select AI Support as default conversation on page load
    useEffect(() => {
        if (!selectedConversation && !receiverId) {
            // Auto-select AI Support when page loads
            selectConversation({
                _id: 'ai-support',
                participants: [
                    currentUserId,
                    { _id: 'ai-support', name: 'El Mister AI Support', role: 'ai' }
                ],
                isAI: true
            });
        }
    }, [selectedConversation, receiverId, currentUserId, selectConversation]);

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

    // Refresh conversation if participant data is incomplete (when coming from query params)
    useEffect(() => {
        if (!selectedConversation || !userInfo?.accessToken) return;
        if (selectedConversation.isAI) return; // Skip for AI Support

        // Check if participant data is fully populated
        const otherParticipant = selectedConversation.participants?.find(
            p => (p._id || p.id || p) !== currentUserId
        );

        // If participant exists but lacks username/avatar, refresh the conversation
        if (otherParticipant && typeof otherParticipant === 'object' && !otherParticipant.username) {
            const refreshConversation = async () => {
                try {
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
                        const refreshedConv = (data.data || []).find(c => c._id === selectedConversation._id);
                        if (refreshedConv) {
                            setSelectedConversation(refreshedConv);
                            // Also update in conversations list
                            setConversations(prev => prev.map(c =>
                                c._id === refreshedConv._id ? refreshedConv : c
                            ));
                        }
                    }
                } catch (error) {
                    console.error('Failed to refresh conversation:', error);
                }
            };

            refreshConversation();
        }
    }, [selectedConversation, currentUserId, userInfo?.accessToken]);

    // Fetch messages when conversation selected
    useEffect(() => {
        if (!selectedConversation?._id || !userInfo?.accessToken) return;
        if (selectedConversation.isAI) return; // AI messages are handled separately

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
    }, [messages, aiMessages]);



    // Send message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!messageText.trim() || !selectedConversation || sending) {
            addDebug('❌ Cannot send: empty message or no conversation');
            return;
        }

        // ============ AI SUPPORT CHATBOT (Same logic as ChatWidget) ============
        if (selectedConversation?.isAI || selectedConversation?._id === 'ai-support') {
            if (sending) return;

            const userMsg = messageText.trim();
            setMessageText('');

            // Add user message to history
            const userMessage = {
                _id: `msg-${Date.now()}`,
                sender: { _id: currentUserId, name: userInfo?.user?.name || 'You' },
                text: userMsg,
                createdAt: new Date().toISOString(),
            };
            setAiMessages(prev => [...prev, userMessage]);

            // Add "Thinking..." indicator
            const thinkingMessage = {
                _id: 'thinking-indicator',
                sender: { _id: 'ai-support', name: 'El Mister AI' },
                text: 'Thinking...',
                createdAt: new Date().toISOString(),
                isThinking: true,
            };
            setAiMessages(prev => [...prev, thinkingMessage]);
            setSending(true);

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4040/api/v1'}/ai/chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                        message: userMsg,
                        context: "support"
                    })
                });

                const data = await res.json();

                // Remove thinking indicator from AI messages
                setAiMessages(prev => prev.filter(m => m._id !== 'thinking-indicator'));

                if (data.success && data.data) {
                    const { text, action } = data.data;
                    const aiMessage = {
                        _id: `msg-${Date.now()}-ai`,
                        sender: { _id: 'ai-support', name: 'El Mister AI' },
                        text: text || data.data,
                        createdAt: new Date().toISOString(),
                    };
                    setAiMessages(prev => [...prev, aiMessage]);

                    // Handle any actions from AI (like redirects)
                    if (action && action.type === "redirect") {
                        addDebug('AI suggested redirect:', action.url);
                    }
                } else {
                    const errorMessage = {
                        _id: `msg-${Date.now()}-error`,
                        sender: { _id: 'ai-support', name: 'El Mister AI' },
                        text: "Sorry, I encountered an error.",
                        createdAt: new Date().toISOString(),
                    };
                    setAiMessages(prev => [...prev, errorMessage]);
                }
            } catch (error) {
                addDebug('AI chat error:', error);
                // Remove thinking indicator on error from AI messages
                setAiMessages(prev => prev.filter(m => m._id !== 'thinking-indicator'));
                const errorMessage = {
                    _id: `msg-${Date.now()}-error`,
                    sender: { _id: 'ai-support', name: 'El Mister AI' },
                    text: "Network error. Please try again.",
                    createdAt: new Date().toISOString(),
                };
                setAiMessages(prev => [...prev, errorMessage]);
            } finally {
                setSending(false);
            }
            return;
        }

        // ============ REGULAR USER CHAT ============

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
                        }).catch(() => { });
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
                } catch (err) {

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
                    <Spinner />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg overflow-hidden flex flex-col">
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
                <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${showChatOnMobile ? 'hidden md:flex' : 'flex'
                    }`}>
                    {/* Conversations Header */}
                    <div className="p-4 border-b-2 border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                        <h2 className="text-xl font-bold text-gray-900">Messages</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            {connected ? (
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    Connected
                                </span>
                            ) : (
                                <span className="flex items-center gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    Connecting...
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {/* AI Support - Always First */}
                        <div
                            onClick={() => {
                                addDebug('💬 Selected AI Support');
                                selectConversation({
                                    _id: 'ai-support',
                                    participants: [
                                        currentUserId,
                                        { _id: 'ai-support', name: 'El Mister AI Support', role: 'ai' }
                                    ],
                                    isAI: true
                                });
                            }}
                            className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 transition-all duration-200 ${selectedConversation?._id === 'ai-support'
                                ? 'bg-linear-to-r from-purple-50 to-pink-50 border-l-4 border-l-[#FF0055]'
                                : 'hover:bg-gray-50 border-l-4 border-l-transparent hover:border-l-purple-200'
                                }`}
                        >
                            {/* AI Avatar */}
                            <div className="relative shrink-0">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#392b80] to-[#FF0055] ring-2 ring-offset-2 ring-purple-200 flex items-center justify-center text-2xl">
                                    🤖
                                </div>
                                {/* Always online indicator */}
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                            </div>

                            {/* AI Details */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex flex-col min-w-0">
                                        <h4 className="font-semibold text-gray-900 truncate text-base">
                                            El Mister AI Support
                                        </h4>
                                        <span className="text-xs text-gray-500">@ai-assistant</span>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-600 truncate mb-2 leading-relaxed">
                                    Get instant help from our AI assistant
                                </p>

                                {/* AI Badge */}
                                <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0">
                                    AI
                                </span>
                            </div>
                        </div>

                        {/* Regular Conversations */}
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
                <div className={`flex-1 flex flex-col ${showChatOnMobile ? 'flex' : 'hidden md:flex'
                    }`}>
                    {selectedConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className="p-4 border-b-2 border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                                <div className="flex items-center gap-3">
                                    {/* Back button for mobile */}
                                    <button
                                        onClick={handleBackToConversations}
                                        className="md:hidden p-2 hover:bg-white/50 rounded-full transition-colors"
                                        aria-label="Back to conversations"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                                    </button>

                                    {/* User Info Container */}
                                    <div className="flex-1">
                                        {(() => {
                                            const otherParticipant = selectedConversation.participants?.find(
                                                p => {
                                                    const participantId = p._id || p.id || p;
                                                    return participantId !== currentUserId;
                                                }
                                            );

                                            const avatarUrl = otherParticipant?.avatar?.url || otherParticipant?.avatar;
                                            const username = otherParticipant?.username;
                                            const isAI = otherParticipant?.role === 'ai' || selectedConversation?.isAI;

                                            const getRoleBadge = (role) => {
                                                switch (role) {
                                                    case 'teacher':
                                                        return 'bg-purple-100 text-[#392b80] border border-purple-200';
                                                    case 'parent':
                                                        return 'bg-amber-100 text-amber-700 border border-amber-200';
                                                    case 'student':
                                                        return 'bg-blue-100 text-blue-700 border border-blue-200';
                                                    case 'admin':
                                                        return 'bg-pink-100 text-[#FF0055] border border-pink-200';
                                                    case 'ai':
                                                        return 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0';
                                                    default:
                                                        return 'bg-gray-100 text-gray-700 border border-gray-200';
                                                }
                                            };

                                            const UserInfo = () => (
                                                <>
                                                    <Avatar className="w-12 h-12 ring-2 ring-offset-2 ring-purple-200">
                                                        {avatarUrl ? (
                                                            <AvatarImage src={avatarUrl} alt={otherParticipant?.name} />
                                                        ) : null}
                                                        <AvatarFallback className="bg-gradient-to-br from-[#392b80] to-[#FF0055] text-white font-bold text-lg">
                                                            {otherParticipant?.name?.charAt(0).toUpperCase() || '?'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-bold text-gray-900 text-lg">
                                                                {otherParticipant?.name || 'Unknown User'}
                                                            </h3>
                                                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getRoleBadge(otherParticipant?.role)}`}>
                                                                {otherParticipant?.role || 'user'}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-600 mt-0.5">
                                                            {isAI ? 'Always here to help' : 'Active now'}
                                                        </p>
                                                    </div>
                                                </>
                                            );

                                            return (
                                                <div className="flex items-center gap-3">
                                                    {!isAI && username ? (
                                                        <Link href={`/users/${username}`} className="flex items-center gap-3 flex-1 hover:opacity-80 transition-opacity">
                                                            <UserInfo />
                                                        </Link>
                                                    ) : (
                                                        <UserInfo />
                                                    )}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                                {(() => {
                                    // Use AI messages for AI Support, regular messages for others
                                    const displayMessages = (selectedConversation?.isAI || selectedConversation?._id === 'ai-support')
                                        ? aiMessages
                                        : messages;

                                    if (displayMessages.length === 0) {
                                        return (
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-gray-400">No messages yet. Start the conversation!</p>
                                            </div>
                                        );
                                    }

                                    return (
                                        <>
                                            {displayMessages.map((msg, idx) => {
                                                const senderId = msg.sender?._id || msg.sender?.id || msg.sender;
                                                const previousMsg = idx > 0 ? displayMessages[idx - 1] : null;
                                                const showDaySeparator = !previousMsg || isDifferentDay(previousMsg.createdAt, msg.createdAt);

                                                return (
                                                    <React.Fragment key={msg._id || idx}>
                                                        {showDaySeparator && (
                                                            <div className="flex items-center gap-3 my-6">
                                                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300" />
                                                                <span className="text-xs font-medium text-gray-500 px-2">
                                                                    {getDaySeparatorLabel(msg.createdAt)}
                                                                </span>
                                                                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 via-gray-300 to-transparent" />
                                                            </div>
                                                        )}
                                                        <MessageBubble
                                                            message={msg}
                                                            isOwn={senderId === currentUserId}
                                                        />
                                                    </React.Fragment>
                                                );
                                            })}
                                            <div ref={messagesEndRef} />
                                        </>
                                    );
                                })()}
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
                                        className="px-6 py-2 bg-gradient-to-r from-[#392b80] to-[#FF0055] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
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
            </div >
        </div >
    );
};

export default ChatComponent;