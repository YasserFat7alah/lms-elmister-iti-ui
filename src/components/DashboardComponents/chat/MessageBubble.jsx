import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MessageBubble = ({ message, isOwn }) => {
    const time = new Date(message.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Get avatar URL from sender - check both possible structures
    const avatarUrl = message.sender?.avatar?.url || message.sender?.avatar;

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`flex gap-2 max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                {!isOwn && (
                    <Avatar className="w-8 h-8 shrink-0">
                        {avatarUrl && (
                            <AvatarImage
                                src={avatarUrl}
                                alt={message.sender?.name || 'User'}
                                className="object-cover"
                            />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-[#392b80] to-[#FF0055] text-white font-bold text-sm">
                            {message.sender?.name?.charAt(0).toUpperCase() || '?'}
                        </AvatarFallback>
                    </Avatar>
                )}

                <div>
                    {!isOwn && (
                        <p className="text-xs text-gray-500 mb-1 px-1">{message.sender?.name}</p>
                    )}
                    <div
                        className={`rounded-2xl px-4 py-2 ${isOwn
                            ? 'bg-[#392b80] text-white rounded-br-sm'
                            : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                            }`}
                    >
                        <p className="text-sm wrap-break-word">{message.text}</p>
                    </div>
                    <p className={`text-xs text-gray-400 mt-1 px-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                        {time}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;