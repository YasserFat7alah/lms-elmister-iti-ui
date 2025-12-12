'use client';

import { useState, useEffect } from 'react';
import ClassroomCard from '@/components/classroom/ClassroomCard';
import CreateClassroomModal from '@/components/classroom/CreateClassroomModal';
import JoinClassroomModal from '@/components/classroom/JoinClassroomModal';
import { useClassrooms } from '@/hooks/useClassrooms';

export default function ClassroomPage() {
    const { classrooms, isLoading, refetch } = useClassrooms();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [filter, setFilter] = useState('all'); // 'all', 'active', 'upcoming', 'ended'
    const [searchTerm, setSearchTerm] = useState('');

    const filteredClassrooms = classrooms.filter(classroom => {
        // التصفية حسب النوع
        if (filter !== 'all') {
            if (filter === 'active' && classroom.status !== 'active') return false;
            if (filter === 'upcoming' && classroom.status !== 'scheduled') return false;
            if (filter === 'ended' && classroom.status !== 'ended') return false;
        }

        // البحث
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return (
                classroom.title.toLowerCase().includes(term) ||
                classroom.subject.toLowerCase().includes(term) ||
                classroom.teacher.toLowerCase().includes(term)
            );
        }

        return true;
    });

    const handleCreateClassroom = async (classroomData) => {
        try {
            // هنا مكالمة API لإنشاء فصل
            await fetch('/api/classroom/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(classroomData)
            });

            setShowCreateModal(false);
            refetch();
            alert('تم إنشاء الفصل بنجاح!');
        } catch (error) {
            alert('حدث خطأ: ' + error.message);
        }
    };

    const handleJoinClassroom = async (classCode) => {
        try {
            // مكالمة API للانضمام لفصل
            await fetch('/api/classroom/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ classCode })
            });

            setShowJoinModal(false);
            alert('تم الانضمام للفصل بنجاح!');
        } catch (error) {
            alert('فشل الانضمام: ' + error.message);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {/* الهيدر */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-primary mb-2">الفصول الافتراضية</h1>
                <p className="text-gray-600">
                    انضم للفصول النشطة أو أنشئ فصلاً جديداً للبدء في التعليم التفاعلي
                </p>
            </div>

            {/* شريط التحكم */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* البحث */}
                    <div className="relative flex-1 max-w-md">
                        <input
                            type="text"
                            placeholder="ابحث عن فصل..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                    </div>

                    {/* الفلاتر */}
                    <div className="flex flex-wrap gap-2">
                        {[
                            { id: 'all', label: 'الكل', icon: '📋' },
                            { id: 'active', label: 'نشطة', icon: '🟢' },
                            { id: 'upcoming', label: 'قادمة', icon: '⏰' },
                            { id: 'ended', label: 'منتهية', icon: '🔴' }
                        ].map(filterItem => (
                            <button
                                key={filterItem.id}
                                onClick={() => setFilter(filterItem.id)}
                                className={`flex items-center px-4 py-2 rounded-lg ${filter === filterItem.id
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="ml-2">{filterItem.icon}</span>
                                <span>{filterItem.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* الأزرار */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowJoinModal(true)}
                            className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
                        >
                            انضم برمز
                        </button>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition flex items-center"
                        >
                            <span className="ml-2">+</span>
                            <span>إنشاء فصل</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                        <div className="bg-blue-100 p-3 rounded-full ml-3">
                            <span className="text-blue-600 text-xl">🏫</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">إجمالي الفصول</p>
                            <p className="text-2xl font-bold text-gray-800">{classrooms.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-full ml-3">
                            <span className="text-green-600 text-xl">🟢</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">فصول نشطة</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {classrooms.filter(c => c.status === 'active').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center">
                        <div className="bg-yellow-100 p-3 rounded-full ml-3">
                            <span className="text-yellow-600 text-xl">👥</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">طلاب متصلون</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {classrooms.reduce((sum, c) => sum + c.activeStudents, 0)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center">
                        <div className="bg-purple-100 p-3 rounded-full ml-3">
                            <span className="text-purple-600 text-xl">⏰</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">فصول قادمة</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {classrooms.filter(c => c.status === 'scheduled').length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* قائمة الفصول */}
            <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                    الفصول {filter !== 'all' ? `(${filteredClassrooms.length})` : ''}
                </h2>

                {filteredClassrooms.length === 0 ? (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <div className="text-5xl mb-4">🏫</div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">
                            لا توجد فصول {filter !== 'all' ? `بالحالة "${filter}"` : ''}
                        </h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm ? 'جرب بحثاً مختلفاً' : 'أنشئ فصلاً جديداً للبدء'}
                        </p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                        >
                            إنشاء أول فصل
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClassrooms.map(classroom => (
                            <ClassroomCard
                                key={classroom.id}
                                classroom={classroom}
                                onJoin={() => {
                                    // الانتقال للفصل
                                    window.location.href = `/classroom/${classroom.id}`;
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* الفصول الموصى بها */}
            {classrooms.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">فصول قد تهمك</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {classrooms
                            .filter(c => c.status === 'active')
                            .slice(0, 3)
                            .map(classroom => (
                                <div key={classroom.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold text-lg">{classroom.title}</h3>
                                            <p className="text-gray-600">{classroom.subject}</p>
                                        </div>
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                            {classroom.activeStudents} متصل
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-4">{classroom.description}</p>
                                    <button
                                        onClick={() => window.location.href = `/classroom/${classroom.id}`}
                                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        انضم الآن
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* المودالات */}
            {showCreateModal && (
                <CreateClassroomModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateClassroom}
                />
            )}

            {showJoinModal && (
                <JoinClassroomModal
                    onClose={() => setShowJoinModal(false)}
                    onSubmit={handleJoinClassroom}
                />
            )}
        </div>
    );
}