'use client';

import { useState } from 'react';

export default function JoinClassroomModal({ onClose, onSubmit }) {
    const [joinMethod, setJoinMethod] = useState('code'); // 'code', 'link', 'invite'
    const [formData, setFormData] = useState({
        code: '',
        link: '',
        email: '',
        name: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recentCodes, setRecentCodes] = useState([
        { code: 'MATH101', title: 'رياضيات الصف العاشر', teacher: 'أحمد محمد' },
        { code: 'SCI202', title: 'علوم الصف التاسع', teacher: 'سارة علي' },
        { code: 'ENG303', title: 'لغة إنجليزية', teacher: 'محمد خالد' }
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let joinData;

            switch (joinMethod) {
                case 'code':
                    joinData = { code: formData.code.toUpperCase(), password: formData.password };
                    break;
                case 'link':
                    // استخراج الكود من الرابط
                    const codeFromLink = extractCodeFromLink(formData.link);
                    joinData = { code: codeFromLink };
                    break;
                case 'invite':
                    joinData = { email: formData.email, name: formData.name };
                    break;
            }

            await onSubmit(joinData);
            onClose();
        } catch (error) {
            alert('حدث خطأ أثناء الانضمام: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const extractCodeFromLink = (link) => {
        // محاكاة استخراج الكود من رابط
        const match = link.match(/class\/([A-Z0-9]{6})/);
        return match ? match[1] : '';
    };

    const handleQuickJoin = (code) => {
        setFormData(prev => ({ ...prev, code }));
        setJoinMethod('code');
    };

    const renderMethodContent = () => {
        switch (joinMethod) {
            case 'code':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                رمز الفصل *
                            </label>
                            <input
                                type="text"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-center text-lg tracking-widest"
                                placeholder="مثال: MATH101"
                                required
                                dir="ltr"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                كلمة المرور (إن وجدت)
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="أدخل كلمة مرور الفصل"
                            />
                        </div>

                        {/* الرموز الأخيرة */}
                        {recentCodes.length > 0 && (
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2">الرموز الأخيرة</h4>
                                <div className="space-y-2">
                                    {recentCodes.map(recent => (
                                        <button
                                            key={recent.code}
                                            type="button"
                                            onClick={() => handleQuickJoin(recent.code)}
                                            className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-right"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-semibold text-gray-800">{recent.title}</div>
                                                    <div className="text-sm text-gray-600">{recent.teacher}</div>
                                                </div>
                                                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-mono">
                                                    {recent.code}
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 'link':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                رابط الفصل *
                            </label>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="https://example.com/class/MATH101"
                                required
                            />
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <h4 className="text-sm font-semibold text-blue-800 mb-1">كيف تحصل على الرابط؟</h4>
                            <p className="text-sm text-blue-700">
                                يمكنك الحصول على رابط الفصل من المعلم أو عبر دعوة البريد الإلكتروني
                            </p>
                        </div>
                    </div>
                );

            case 'invite':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                بريد المعلم *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="teacher@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                رسالة طلب الانضمام
                            </label>
                            <textarea
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="أنا [اسمك] وأود الانضمام لفصلك..."
                            />
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <h4 className="text-sm font-semibold text-yellow-800 mb-1">ملاحظة:</h4>
                            <p className="text-sm text-yellow-700">
                                سيتم إرسال طلب انضمام للمعلم. يمكنك الانضمام بعد موافقته.
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                {/* الهيدر */}
                <div className="border-b px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">الانضمام لفصل</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* طرق الانضمام */}
                <div className="border-b px-6 py-4">
                    <div className="flex space-x-4 space-x-reverse">
                        {[
                            { id: 'code', label: 'برمز', icon: '🔢' },
                            { id: 'link', label: 'برابط', icon: '🔗' },
                            { id: 'invite', label: 'بدعوة', icon: '📧' }
                        ].map(method => (
                            <button
                                key={method.id}
                                onClick={() => setJoinMethod(method.id)}
                                className={`flex-1 flex flex-col items-center p-3 rounded-lg border transition ${joinMethod === method.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="text-2xl mb-2">{method.icon}</span>
                                <span className="text-sm font-medium">{method.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* المحتوى */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        {renderMethodContent()}
                    </div>

                    {/* الأزرار */}
                    <div className="border-t px-6 py-4">
                        <div className="flex justify-end space-x-3 space-x-reverse">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                إلغاء
                            </button>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                            >
                                {isSubmitting ? 'جاري الانضمام...' : 'انضم للفصل'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* تعليمات المساعدة */}
                <div className="border-t px-6 py-4 bg-gray-50">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">تعليمات المساعدة:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• تأكد من كتابة الرمز بحروف كبيرة (MATH101)</li>
                        <li>• بالنسبة للفصول الخاصة، قد تحتاج كلمة مرور</li>
                        <li>• تأكد من اتصالك بالإنترنت</li>
                        <li>• يجب أن يكون الفصل نشطاً للانضمام</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}