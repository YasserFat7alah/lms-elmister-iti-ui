import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatChatDate, formatTime } from '@/utils/dateFormatters';

const ConversationItem = ({ conversation, isActive, onClick }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const currentUserId = userInfo?.user?.user || userInfo?.user?._id;

    const otherParticipant = conversation.participants?.find(
        p => (p._id || p.id) !== currentUserId
    );

    // Format last message with "You:" if sent by current user
    const lastMessage = conversation.lastMessage?.text
        ? (conversation.lastMessage?.sender?._id === currentUserId || conversation.lastMessage?.sender === currentUserId)
            ? `You: ${conversation.lastMessage.text} `
            : conversation.lastMessage.text
        : 'No messages yet';

    // Smart date formatting
    const dateLabel = conversation.updatedAt ? formatChatDate(conversation.updatedAt) : '';
    const timeLabel = conversation.updatedAt ? formatTime(conversation.updatedAt) : '';
    const displayTime = dateLabel === 'Today' ? timeLabel : dateLabel;

    // Get avatar URL from participant
    const avatarUrl = otherParticipant?.avatar?.url || otherParticipant?.avatar;

    // Role badge colors matching platform theme
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
            default:
                return 'bg-gray-100 text-gray-700 border border-gray-200';
        }
    };

    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 transition-all duration-200 ${isActive
                    ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-l-[#FF0055]'
                    : 'hover:bg-gray-50 border-l-4 border-l-transparent hover:border-l-purple-200'
                }`}
        >
            {/* Avatar with Image Support */}
            <div className="relative shrink-0">
                <Avatar className="w-14 h-14 ring-2 ring-offset-2 ring-purple-200">
                    {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt={otherParticipant?.name} />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-[#392b80] to-[#FF0055] text-white font-bold text-lg">
                        {otherParticipant?.name?.charAt(0).toUpperCase() || '?'}
                    </AvatarFallback>
                </Avatar>
                {/* Online status indicator */}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white shadow-sm" />
            </div>

            {/* Conversation Details */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <div className="flex flex-col min-w-0">
                        <h4 className="font-semibold text-gray-900 truncate text-base">
                            {otherParticipant?.name || 'Unknown User'}
                        </h4>
                        {otherParticipant?.username && (
                            <span className="text-xs text-gray-500">@{otherParticipant.username}</span>
                        )}
                    </div>
                    {displayTime && (
                        <span className="text-xs text-gray-500 shrink-0 ml-2 font-medium">{displayTime}</span>
                    )}
                </div>

                <p className="text-sm text-gray-600 truncate mb-2 leading-relaxed">
                    {lastMessage}
                </p>

                {/* Role Badge */}
                <span className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${getRoleBadge(otherParticipant?.role)}`}>
                    {otherParticipant?.role || 'user'}
                </span>
            </div>
        </div>
    );
};

export default ConversationItem;