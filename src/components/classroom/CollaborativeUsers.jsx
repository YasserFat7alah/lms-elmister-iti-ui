'use client';

import { useState } from 'react';

export default function CollaborativeUsers({ users, currentUser, onRemoveUser }) {
    const [showUserInfo, setShowUserInfo] = useState(null);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');

    const handleInvite = async () => {
        if (!inviteEmail.trim()) return;

        try {
            // محاكاة إرسال دعوة
            console.log('Sending invite to:', inviteEmail);
            setInviteEmail('');
            setShowInviteModal(false);
            alert('تم إرسال الدعوة بنجاح');
        } catch (error) {
            alert('حدث خطأ أثناء إرسال الدعوة');
        }
    };

    const handleCopyInviteLink = () => {
        const inviteLink = `${window.location.origin}/whiteboard/invite`;
        navigator.clipboard.writeText(inviteLink);
        alert('تم نسخ رابط الدعوة!');
    };

    const getPermissionBadge = (user) => {
        if (user.id === currentUser.id) {
            return <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">أنت</span>;
        }

        if (user.permission === 'edit') {
            return <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">تحرير</span>;
        }

        return <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">مشاهدة</span>;
    };

    return (
        <div className="h-full flex flex-col">
            {/* الهيدر */}
            <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold text-gray-800">المستخدمون المتعاونون</h3>
                    <span className="text-sm text-gray-600">{users.length + 1} مستخدم</span>
                </div>

                <div className="flex space-x-2 space-x-reverse">
                    <button
                        onClick={() => setShowInviteModal(true)}
                        className="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm"
                    >
                        + دعوة
                    </button>
                    <button
                        onClick={handleCopyInviteLink}
                        className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
                    >
                        🔗 رابط
                    </button>
                </div>
            </div>

            {/* قائمة المستخدمين */}
            <div className="flex-1 overflow-y-auto p-3">
                {/* المستخدم الحالي */}
                <div
                    className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-3"
                    onMouseEnter={() => setShowUserInfo('current')}
                    onMouseLeave={() => setShowUserInfo(null)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                style={{ backgroundColor: currentUser.color }}
                            >
                                أنا
                            </div>
                            <div className="mr-3">
                                <div className="font-semibold">{currentUser.name}</div>
                                <div className="text-xs text-gray-600">مالك السبورة</div>
                            </div>
                        </div>
                        {getPermissionBadge(currentUser)}
                    </div>

                    {showUserInfo === 'current' && (
                        <div className="mt-2 pt-2 border-t border-blue-200">
                            <div className="text-xs text-gray-600">
                                <div>• لديك صلاحية التحرير الكاملة</div>
                                <div>• يمكنك إدارة المستخدمين الآخرين</div>
                                <div>• يمكنك حفظ وتصدير السبورة</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* المستخدمون الآخرون */}
                <div className="space-y-2">
                    {users.map(user => (
                        <div
                            key={user.id}
                            className="p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                            onMouseEnter={() => setShowUserInfo(user.id)}
                            onMouseLeave={() => setShowUserInfo(null)}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                                        style={{ backgroundColor: user.color }}
                                    >
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="mr-3">
                                        <div className="font-semibold">{user.name}</div>
                                        <div className="text-xs text-gray-600">
                                            {user.isOnline ? 'متصل الآن' : 'آخر ظهور منذ 5 دقائق'}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 space-x-reverse">
                                    {getPermissionBadge(user)}

                                    {user.permission === 'edit' && (
                                        <button
                                            onClick={() => {
                                                // تغيير الصلاحية
                                                console.log('Change permission for:', user.id);
                                            }}
                                            className="text-xs text-blue-600 hover:text-blue-800"
                                        >
                                            تعديل
                                        </button>
                                    )}

                                    <button
                                        onClick={() => onRemoveUser(user.id)}
                                        className="text-xs text-red-600 hover:text-red-800"
                                    >
                                        إزالة
                                    </button>
                                </div>
                            </div>

                            {showUserInfo === user.id && (
                                <div className="mt-2 pt-2 border-t border-gray-200">
                                    <div className="text-xs text-gray-600 space-y-1">
                                        <div>• الانضمام: {new Date(user.joinedAt).toLocaleDateString('ar-EG')}</div>
                                        <div>• آخر نشاط: {new Date(user.lastActivity).toLocaleTimeString('ar-EG')}</div>
                                        <div>• الإجراءات: {user.actionsCount || 0}</div>
                                    </div>

                                    {user.permission === 'edit' && (
                                        <div className="mt-2 flex space-x-2 space-x-reverse">
                                            <button className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">
                                                تقييد
                                            </button>
                                            <button className="text-xs px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded">
                                                طرد
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {users.length === 0 && (
                    <div className="text-center py-8">
                        <div className="text-4xl mb-3">👥</div>
                        <p className="text-gray-600">لا يوجد مستخدمين متعاونين</p>
                        <p className="text-sm text-gray-500 mt-1">ادعُ مستخدمين للتعاون</p>
                    </div>
                )}
            </div>

            {/* إحصائيات */}
            <div className="p-3 border-t bg-gray-50">
                <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                        <div className="text-lg font-bold text-blue-600">{users.filter(u => u.permission === 'edit').length}</div>
                        <div className="text-xs text-gray-600">محررين</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-green-600">{users.filter(u => u.isOnline).length}</div>
                        <div className="text-xs text-gray-600">متصلين</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-purple-600">
                            {users.reduce((sum, u) => sum + (u.actionsCount || 0), 0)}
                        </div>
                        <div className="text-xs text-gray-600">إجراءات</div>
                    </div>
                </div>
            </div>

            {/* مودال الدعوة */}
            {showInviteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">دعوة مستخدمين</h3>
                                <button
                                    onClick={() => setShowInviteModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        البريد الإلكتروني
                                    </label>
                                    <input
                                        type="email"
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        placeholder="user@example.com"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        الصلاحية
                                    </label>
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                        <option value="edit">تحرير</option>
                                        <option value="view">مشاهدة فقط</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        الرسالة (اختياري)
                                    </label>
                                    <textarea
                                        rows="2"
                                        placeholder="مرحباً، أدعوك للتعاون في السبورة..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end space-x-3 space-x-reverse">
                                <button
                                    onClick={() => setShowInviteModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg"
                                >
                                    إلغاء
                                </button>
                                <button
                                    onClick={handleInvite}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                                >
                                    إرسال الدعوة
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}