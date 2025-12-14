import React from 'react';

const MessageBubble = ({ message, isOwn }) => {
    const time = new Date(message.createdAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`flex gap-2 max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                {!isOwn && (
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {message.sender?.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                )}

                <div>
                    {!isOwn && (
                        <p className="text-xs text-gray-500 mb-1 px-1">{message.sender?.name}</p>
                    )}
                    <div
                        className={`rounded-2xl px-4 py-2 ${isOwn
                                ? 'bg-blue-600 text-white rounded-br-sm'
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