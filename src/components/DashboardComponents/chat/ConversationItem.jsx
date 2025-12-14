import React from 'react';
import { useSelector } from 'react-redux';

const ConversationItem = ({ conversation, isActive, onClick }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const currentUserId = userInfo?.user?.user || userInfo?.user?._id;

    const otherParticipant = conversation.participants?.find(
        p => (p._id || p.id) !== currentUserId
    );

    const lastMessage = conversation.lastMessage?.text || 'No messages yet';
    const time = conversation.updatedAt
        ? new Date(conversation.updatedAt).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
        : '';

    return (
        <div
            onClick={onClick}
            className={`flex items-start gap-3 p-4 cursor-pointer border-b transition-colors ${isActive
                    ? 'bg-blue-50 border-l-4 border-l-blue-600'
                    : 'hover:bg-gray-50 border-l-4 border-l-transparent'
                }`}
        >
            <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {otherParticipant?.name?.charAt(0).toUpperCase() || '?'}
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-gray-900 truncate">
                        {otherParticipant?.name || 'Unknown User'}
                    </h4>
                    <span className="text-xs text-gray-500 shrink-0 ml-2">{time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate mb-1">{lastMessage}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${otherParticipant?.role === 'teacher'
                        ? 'bg-purple-100 text-purple-700'
                        : otherParticipant?.role === 'parent'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-700'
                    }`}>
                    {otherParticipant?.role || 'user'}
                </span>
            </div>
        </div>
    );
};

export default ConversationItem;