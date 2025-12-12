'use client';

import { useState } from 'react';

export default function ParticipantsPanel({ isOpen, onToggle, participants, isTeacher }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [mutedParticipants, setMutedParticipants] = useState([]);

    const filteredParticipants = participants.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleMute = (participantId) => {
        if (mutedParticipants.includes(participantId)) {
            setMutedParticipants(mutedParticipants.filter(id => id !== participantId));
        } else {
            setMutedParticipants([...mutedParticipants, participantId]);
        }
    };

    const toggleRaiseHand = (participantId) => {
        // محاكاة رفع اليد
        console.log('Toggle raise hand:', participantId);
    };

    const removeParticipant = (participantId) => {
        if (confirm('هل تريد إزالة هذا المشارك من الفصل؟')) {
            console.log('Remove participant:', participantId);
        }
    };

    const makeModerator = (participantId) => {
        console.log('Make moderator:', participantId);
    };

    return (
        <div className={`border-b border-gray-700 ${!isOpen ? 'h-auto' : ''}`}>
            {/* الهيدر */}
            <div
                className="flex justify-between items-center p-4 bg-gray-800 cursor-pointer hover:bg-gray-750"
                onClick={onToggle}
            >
                <div className="flex items-center">
                    <span className="ml-2">👥</span>
                    <span className="font-semibold">المشاركون ({participants.length})</span>
                </div>
                <span>{isOpen ? '▲' : '▼'}</span>
            </div>

            {/* المحتوى */}
            {isOpen && (
                <div className="bg-gray-800">
                    {/* البحث */}
                    <div className="p-3 border-b border-gray-700">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="ابحث عن مشارك..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-900 text-white px-4 py-2 pr-10 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                            />
                            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                        </div>
                    </div>

                    {/* قائمة المشاركين */}
                    <div className="overflow-y-auto max-h-96">
                        {filteredParticipants.length === 0 ? (
                            <div className="p-4 text-center text-gray-400">
                                لا يوجد مشاركين
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-700">
                                {filteredParticipants.map(participant => (
                                    <div
                                        key={participant.id}
                                        className="p-3 hover:bg-gray-750 transition"
                                    >
                                        <div className="flex items-center justify-between">
                                            {/* معلومات المشارك */}
                                            <div className="flex items-center flex-1">
                                                <div className="relative">
                                                    <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                                                        {participant.role === 'teacher' ? '👨‍🏫' : '👤'}
                                                    </div>
                                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${participant.isOnline ? 'bg-green-500' : 'bg-gray-500'
                                                        }`}></div>
                                                </div>

                                                <div className="mr-3 flex-1">
                                                    <div className="flex items-center">
                                                        <span className="font-medium">{participant.name}</span>
                                                        {participant.role === 'teacher' && (
                                                            <span className="mr-2 px-2 py-0.5 bg-blue-900 text-blue-300 text-xs rounded">
                                                                معلم
                                                            </span>
                                                        )}
                                                        {participant.role === 'moderator' && (
                                                            <span className="mr-2 px-2 py-0.5 bg-green-900 text-green-300 text-xs rounded">
                                                                مشرف
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
                                                        {participant.isOnline ? 'متصل' : 'غير متصل'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* الإجراءات */}
                                            <div className="flex items-center space-x-2 space-x-reverse">
                                                {participant.role !== 'teacher' && isTeacher && (
                                                    <>
                                                        <button
                                                            onClick={() => toggleMute(participant.id)}
                                                            className={`p-2 rounded ${mutedParticipants.includes(participant.id)
                                                                ? 'bg-red-900 text-red-300'
                                                                : 'bg-gray-700 hover:bg-gray-600'
                                                                }`}
                                                            title={mutedParticipants.includes(participant.id) ? 'فك الكتم' : 'كتم'}
                                                        >
                                                            🔇
                                                        </button>

                                                        <button
                                                            onClick={() => toggleRaiseHand(participant.id)}
                                                            className="p-2 rounded bg-gray-700 hover:bg-gray-600"
                                                            title="رفع اليد"
                                                        >
                                                            ✋
                                                        </button>

                                                        <div className="relative group">
                                                            <button className="p-2 rounded bg-gray-700 hover:bg-gray-600">
                                                                ⋮
                                                            </button>
                                                            <div className="absolute left-0 mt-2 bg-gray-900 rounded-lg shadow-lg py-2 w-48 hidden group-hover:block z-10">
                                                                <button
                                                                    onClick={() => makeModerator(participant.id)}
                                                                    className="block w-full px-4 py-2 text-right hover:bg-gray-800"
                                                                >
                                                                    تعيين كمشرف
                                                                </button>
                                                                <button
                                                                    onClick={() => removeParticipant(participant.id)}
                                                                    className="block w-full px-4 py-2 text-right hover:bg-gray-800 text-red-400"
                                                                >
                                                                    إزالة من الفصل
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* معلومات إضافية */}
                                        {participant.audioLevel && (
                                            <div className="mt-2">
                                                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-green-500 transition-all duration-300"
                                                        style={{ width: `${Math.min(participant.audioLevel * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* الإجراءات السريعة */}
                    {isTeacher && (
                        <div className="p-3 border-t border-gray-700">
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => {
                                        // كتم الجميع
                                        setMutedParticipants(participants.filter(p => p.role !== 'teacher').map(p => p.id));
                                    }}
                                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                                >
                                    🔇 كتم الجميع
                                </button>
                                <button
                                    onClick={() => {
                                        // فك كتم الجميع
                                        setMutedParticipants([]);
                                    }}
                                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                                >
                                    🔊 فك الكتم
                                </button>
                            </div>
                        </div>
                    )}

                    {/* إحصائيات */}
                    <div className="p-3 border-t border-gray-700 bg-gray-900">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-center">
                                <div className="text-gray-400">متصلين</div>
                                <div className="font-bold text-green-400">
                                    {participants.filter(p => p.isOnline).length}
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-400">مكتومين</div>
                                <div className="font-bold text-red-400">
                                    {mutedParticipants.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}