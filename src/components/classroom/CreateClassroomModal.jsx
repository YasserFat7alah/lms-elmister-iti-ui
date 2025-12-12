'use client';

import { useState } from 'react';

export default function CreateClassroomModal({ onClose, onSubmit }) {
    const [formData, setFormData] = useState({
        title: '',
        subject: '',
        description: '',
        isPrivate: false,
        password: '',
        maxStudents: 50,
        scheduleType: 'now', // 'now', 'schedule'
        scheduleDate: new Date().toISOString().split('T')[0],
        scheduleTime: '10:00',
        duration: 90, // دقائق
        enableRecording: true,
        enableChat: true,
        enableWhiteboard: true
    });

    const [step, setStep] = useState(1); // 1: الأساسيات، 2: الإعدادات، 3: المراجعة
    const [isSubmitting, setIsSubmitting] = useState(false);

    const subjects = [
        'رياضيات', 'علوم', 'لغة عربية', 'لغة إنجليزية',
        'فيزياء', 'كيمياء', 'أحياء', 'تاريخ',
        'جغرافيا', 'دين', 'حاسب آلي', 'فنون'
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // توليد رمز وصول تلقائي
            const accessCode = generateAccessCode();
            const classroomData = {
                ...formData,
                accessCode,
                status: formData.scheduleType === 'now' ? 'active' : 'scheduled'
            };

            await onSubmit(classroomData);
            onClose();
        } catch (error) {
            console.error('Error creating classroom:', error);
            alert('حدث خطأ أثناء إنشاء الفصل');
        } finally {
            setIsSubmitting(false);
        }
    };

    const generateAccessCode = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">معلومات الفصل الأساسية</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                عنوان الفصل *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="مثال: رياضيات الصف العاشر - الجبر"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                المادة *
                            </label>
                            <select
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            >
                                <option value="">اختر المادة</option>
                                {subjects.map(subject => (
                                    <option key={subject} value={subject}>{subject}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                الوصف
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="وصف مختصر عن محتوى الفصل..."
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isPrivate"
                                name="isPrivate"
                                checked={formData.isPrivate}
                                onChange={handleChange}
                                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <label htmlFor="isPrivate" className="mr-2 text-sm text-gray-700">
                                فصل خاص (يتطلب رمز دخول)
                            </label>
                        </div>

                        {formData.isPrivate && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    كلمة المرور (اختياري)
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="أدخل كلمة مرور اختيارية"
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                الحد الأقصى للطلاب
                            </label>
                            <div className="flex items-center">
                                <input
                                    type="range"
                                    name="maxStudents"
                                    min="1"
                                    max="100"
                                    value={formData.maxStudents}
                                    onChange={handleChange}
                                    className="flex-1"
                                />
                                <span className="mr-4 text-lg font-semibold">{formData.maxStudents}</span>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">إعدادات الفصل</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                توقيت الفصل
                            </label>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="scheduleNow"
                                        name="scheduleType"
                                        value="now"
                                        checked={formData.scheduleType === 'now'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-primary border-gray-300"
                                    />
                                    <label htmlFor="scheduleNow" className="mr-2 text-sm text-gray-700">
                                        بدء فوري
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="scheduleLater"
                                        name="scheduleType"
                                        value="schedule"
                                        checked={formData.scheduleType === 'schedule'}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-primary border-gray-300"
                                    />
                                    <label htmlFor="scheduleLater" className="mr-2 text-sm text-gray-700">
                                        جدولة لوقت لاحق
                                    </label>
                                </div>
                            </div>
                        </div>

                        {formData.scheduleType === 'schedule' && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        التاريخ
                                    </label>
                                    <input
                                        type="date"
                                        name="scheduleDate"
                                        value={formData.scheduleDate}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        الوقت
                                    </label>
                                    <input
                                        type="time"
                                        name="scheduleTime"
                                        value={formData.scheduleTime}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                مدة الفصل (دقيقة)
                            </label>
                            <select
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="30">30 دقيقة</option>
                                <option value="45">45 دقيقة</option>
                                <option value="60">60 دقيقة</option>
                                <option value="90">90 دقيقة</option>
                                <option value="120">120 دقيقة</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">المميزات المتاحة</h4>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="enableRecording"
                                    name="enableRecording"
                                    checked={formData.enableRecording}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <label htmlFor="enableRecording" className="mr-2 text-sm text-gray-700">
                                    تسجيل الفصل
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="enableChat"
                                    name="enableChat"
                                    checked={formData.enableChat}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <label htmlFor="enableChat" className="mr-2 text-sm text-gray-700">
                                    تفعيل الدردشة
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="enableWhiteboard"
                                    name="enableWhiteboard"
                                    checked={formData.enableWhiteboard}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <label htmlFor="enableWhiteboard" className="mr-2 text-sm text-gray-700">
                                    تفعيل السبورة التفاعلية
                                </label>
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">مراجعة المعلومات</h3>

                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">العنوان:</span>
                                <span className="font-semibold">{formData.title}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">المادة:</span>
                                <span className="font-semibold">{formData.subject}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">النوع:</span>
                                <span className="font-semibold">{formData.isPrivate ? 'خاص' : 'عام'}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">الحد الأقصى:</span>
                                <span className="font-semibold">{formData.maxStudents} طالب</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">التوقيت:</span>
                                <span className="font-semibold">
                                    {formData.scheduleType === 'now' ? 'بدء فوري' :
                                        `${formData.scheduleDate} الساعة ${formData.scheduleTime}`}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">المدة:</span>
                                <span className="font-semibold">{formData.duration} دقيقة</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">المميزات:</span>
                                <span className="font-semibold">
                                    {[
                                        formData.enableRecording && 'التسجيل',
                                        formData.enableChat && 'الدردشة',
                                        formData.enableWhiteboard && 'السبورة'
                                    ].filter(Boolean).join(', ')}
                                </span>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <h4 className="text-sm font-semibold text-yellow-800 mb-1">ملاحظة مهمة:</h4>
                            <p className="text-sm text-yellow-700">
                                سيتم إنشاء رمز وصول تلقائي للفصل. تأكد من حفظ الرمز ومشاركته مع الطلاب.
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                {/* الهيدر */}
                <div className="border-b px-6 py-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800">إنشاء فصل جديد</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            ✕
                        </button>
                    </div>

                    {/* خطوات التقدم */}
                    <div className="mt-4">
                        <div className="flex justify-between">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="flex flex-col items-center">
                                    <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    ${step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}
                    ${step === s ? 'ring-2 ring-primary ring-offset-2' : ''}
                  `}>
                                        {s}
                                    </div>
                                    <span className="text-xs mt-1 text-gray-600">
                                        {s === 1 ? 'الأساسيات' : s === 2 ? 'الإعدادات' : 'المراجعة'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* المحتوى */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                        {renderStep()}
                    </div>

                    {/* الأزرار */}
                    <div className="border-t px-6 py-4">
                        <div className="flex justify-between">
                            <div>
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                    >
                                        السابق
                                    </button>
                                )}
                            </div>

                            <div className="flex space-x-3 space-x-reverse">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    إلغاء
                                </button>

                                {step < 3 ? (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step + 1)}
                                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                                    >
                                        التالي
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50"
                                    >
                                        {isSubmitting ? 'جاري الإنشاء...' : 'إنشاء الفصل'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}