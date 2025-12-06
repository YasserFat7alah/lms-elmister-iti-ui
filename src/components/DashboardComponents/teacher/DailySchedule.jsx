// components/schedule/DailySchedule.jsx
"use client";

import { useState, useEffect } from 'react';
import { 
  Clock, Users, MapPin, BookOpen, AlertCircle, CheckCircle, 
  Video, FileText, MessageSquare, Download, Calendar, 
  ChevronRight, MoreVertical, ExternalLink
} from 'lucide-react';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function DailySchedule({ selectedDate, role, userId }) {
  const [dailyEvents, setDailyEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    liveClasses: 0,
    pendingAssignments: 0,
    completed: 0
  });

  // محاكاة جلب البيانات من API
  useEffect(() => {
    const fetchDailySchedule = async () => {
      setLoading(true);
      try {
        // محاكاة API call
        const response = await fetch(`/api/schedule/daily?date=${selectedDate.toISOString()}&userId=${userId}&role=${role}`);
        // const data = await response.json();
        
        // بيانات افتراضية للعرض
        const mockData = getMockDailyEvents(selectedDate, role);
        setDailyEvents(mockData.events);
        setStats(mockData.stats);
      } catch (error) {
        console.error('Error fetching daily schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailySchedule();
  }, [selectedDate, role, userId]);

  const getMockDailyEvents = (date, userRole) => {
    const isDateToday = isToday(date);
    const isDateTomorrow = isTomorrow(date);
    
    const baseEvents = [
      {
        id: 'event_1',
        type: 'course',
        title: 'الرياضيات المتقدمة - المحاضرة الثالثة',
        time: '10:00 - 12:00',
        description: 'مراجعة الفصل الثالث - التفاضل والتكامل المتقدم',
        instructor: 'د. أحمد علي',
        location: 'Virtual - رابط Zoom',
        zoomLink: 'https://zoom.us/j/123456789',
        students: 24,
        status: isDateToday ? 'live_now' : 'upcoming',
        resources: 3,
        attachments: ['ملخص_المحاضرة.pdf', 'تمارين_إضافية.docx'],
        courseId: 'course_001',
        color: 'blue'
      },
      {
        id: 'event_2',
        type: 'assignment',
        title: 'تسليم مشروع التخرج النهائي',
        time: '23:59',
        description: 'آخر موعد لتسليم المشروع النهائي مع التوثيق الكامل',
        course: 'مشروع التخرج',
        status: isDateToday ? 'due_today' : 'upcoming',
        submitted: userRole === 'student' ? false : undefined,
        submissionCount: userRole === 'teacher' ? 15 : undefined,
        totalStudents: userRole === 'teacher' ? 24 : undefined,
        attachments: ['متطلبات_المشروع.pdf'],
        assignmentId: 'assignment_001',
        color: 'orange'
      },
      {
        id: 'event_3',
        type: 'meeting',
        title: 'اجتماع فريق المعلمين الشهري',
        time: '14:00 - 15:30',
        description: 'مناقشة خطط الفصل الدراسي الجديد وتقييم الأداء',
        location: 'قاعة الاجتماعات الرئيسية - الطابق الثالث',
        participants: 8,
        agenda: 'خطة الفصل الدراسي، تقييم الأداء، تطوير المناهج',
        meetingNotes: 'يرجى إحضار التقارير الشهرية',
        color: 'purple'
      },
      {
        id: 'event_4',
        type: 'office_hours',
        title: 'ساعات مكتبية - استشارات فردية',
        time: '16:00 - 18:00',
        description: 'استفسارات ومراجعات فردية للطلاب',
        instructor: 'د. سارة محمد',
        location: 'مكتب 205 - مبنى العلوم',
        appointments: userRole === 'teacher' ? [
          { student: 'أحمد محمد', time: '16:00 - 16:30' },
          { student: 'سارة أحمد', time: '16:30 - 17:00' }
        ] : undefined,
        availableSlots: 3,
        color: 'indigo'
      },
      {
        id: 'event_5',
        type: 'workshop',
        title: 'ورشة برمجة Python المتقدمة',
        time: '19:00 - 21:00',
        description: 'ورشة عملية عن البرمجة الكائنية في Python',
        instructor: 'م. خالد حسن',
        location: 'المعمل الرقمي - مبنى الحاسوب',
        capacity: 30,
        registered: 28,
        materials: ['دليل_الورشة.pdf', 'كود_المثال.zip'],
        color: 'pink'
      }
    ];

    // إضافة أحداث خاصة بالمعلم
    if (userRole === 'teacher') {
      baseEvents.push({
        id: 'event_6',
        type: 'grading',
        title: 'تصحيح اختبار منتصف الفصل',
        time: '20:00 - 22:00',
        description: 'تصحيح أوراق اختبار مادة الفيزياء',
        course: 'الفيزياء العامة',
        totalPapers: 45,
        graded: 20,
        priority: 'high',
        color: 'red'
      });
    }

    // إضافة أحداث خاصة بالطالب
    if (userRole === 'student') {
      baseEvents.push({
        id: 'event_7',
        type: 'study_group',
        title: 'مجموعة دراسة الرياضيات',
        time: '18:00 - 19:30',
        description: 'مراجعة جماعية لفصل التفاضل',
        location: 'مكتبة الجامعة - الطابق الثاني',
        members: 5,
        topic: 'التفاضل المتقدم',
        color: 'green'
      });
    }

    // حساب الإحصائيات
    const stats = {
      totalEvents: baseEvents.length,
      liveClasses: baseEvents.filter(e => e.status === 'live_now').length,
      pendingAssignments: baseEvents.filter(e => e.type === 'assignment' && e.status === 'due_today').length,
      completed: baseEvents.filter(e => e.status === 'completed').length
    };

    return { events: baseEvents, stats };
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'live_now': return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'due_today': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventIcon = (type) => {
    const icons = {
      course: <Video size={18} className="text-blue-600" />,
      assignment: <FileText size={18} className="text-orange-600" />,
      meeting: <Users size={18} className="text-purple-600" />,
      office_hours: <MessageSquare size={18} className="text-indigo-600" />,
      workshop: <BookOpen size={18} className="text-pink-600" />,
      grading: <CheckCircle size={18} className="text-red-600" />,
      study_group: <Users size={18} className="text-green-600" />
    };
    return icons[type] || <Calendar size={18} className="text-gray-600" />;
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'live_now': return '🔴 مباشر الآن';
      case 'upcoming': return '⏳ قادم';
      case 'due_today': return '📝 مستحق اليوم';
      case 'completed': return '✅ مكتمل';
      case 'in_progress': return '⚡ قيد التنفيذ';
      default: return '📅 مجدول';
    }
  };

  const handleJoinEvent = (event) => {
    if (event.type === 'course' && event.zoomLink) {
      window.open(event.zoomLink, '_blank');
    } else if (event.type === 'assignment') {
      // الانتقال إلى صفحة تسليم الواجب
      window.location.href = `/assignments/${event.assignmentId}/submit`;
    } else if (event.type === 'meeting') {
      // فتح تفاصيل الاجتماع
      setExpandedEvent(expandedEvent === event.id ? null : event.id);
    }
  };

  const handleDownloadAttachment = (filename) => {
    // محاكاة تحميل الملف
    alert(`جارٍ تحميل ${filename}`);
  };

  const formatDateArabic = (date) => {
    return format(date, 'EEEE، d MMMM yyyy', { locale: ar });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* شريط التاريخ والإحصائيات */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {formatDateArabic(selectedDate)}
            </h3>
            <p className="text-sm text-gray-600">
              {isToday(selectedDate) ? 'اليوم' : isTomorrow(selectedDate) ? 'غداً' : 'مجدول'}
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalEvents}</div>
              <div className="text-xs text-gray-600">إجمالي الفعاليات</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.liveClasses}</div>
              <div className="text-xs text-gray-600">حصص مباشرة</div>
            </div>
            {role === 'student' && (
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.pendingAssignments}</div>
                <div className="text-xs text-gray-600">واجبات مستحقة</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* قائمة الفعاليات */}
      <div className="space-y-4">
        {dailyEvents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <Calendar size={64} className="mx-auto mb-4 text-gray-300" />
            <h4 className="text-lg font-medium text-gray-800 mb-2">لا توجد فعاليات مخططة</h4>
            <p className="text-gray-600">لا توجد فعاليات مخططة لهذا اليوم.</p>
          </div>
        ) : (
          dailyEvents.map((event) => (
            <div 
              key={event.id}
              className={`border rounded-xl p-4 transition-all duration-200 ${
                expandedEvent === event.id 
                  ? 'border-blue-300 shadow-lg' 
                  : 'border-gray-200 hover:shadow-md'
              } bg-white`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* الجانب الأيسر */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-lg ${getStatusColor(event.status)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    
                    <div className="flex-1">
                      {/* العنوان والحالة */}
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                          {getStatusText(event.status)}
                        </span>
                        <span className="font-bold text-gray-800 flex items-center gap-1">
                          <Clock size={14} />
                          {event.time}
                        </span>
                        {event.type === 'course' && event.students && (
                          <span className="text-sm text-gray-600 flex items-center gap-1">
                            <Users size={14} />
                            {event.students} طالب
                          </span>
                        )}
                      </div>
                      
                      {/* العنوان الرئيسي */}
                      <h4 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h4>
                      
                      {/* الوصف */}
                      <p className="text-gray-600 mb-3">{event.description}</p>
                      
                      {/* المعلومات الإضافية */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        {event.instructor && (
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span className="font-medium">المعلم:</span>
                            <span>{event.instructor}</span>
                          </div>
                        )}
                        
                        {event.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{event.location}</span>
                          </div>
                        )}
                        
                        {event.course && (
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>{event.course}</span>
                          </div>
                        )}
                        
                        {event.resources && (
                          <div className="flex items-center gap-1">
                            <FileText size={14} />
                            <span>{event.resources} مرفق</span>
                          </div>
                        )}
                      </div>
                      
                      {/* المرفقات */}
                      {event.attachments && event.attachments.length > 0 && (
                        <div className="mb-3">
                          <div className="text-sm font-medium text-gray-700 mb-1">المرفقات:</div>
                          <div className="flex flex-wrap gap-2">
                            {event.attachments.map((attachment, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleDownloadAttachment(attachment)}
                                className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm transition-colors"
                              >
                                <Download size={12} />
                                {attachment}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* معلومات إضافية عند التوسيع */}
                      {expandedEvent === event.id && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* معلومات خاصة بكل نوع */}
                            {event.type === 'course' && event.zoomLink && (
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">رابط الحصة:</h5>
                                <a 
                                  href={event.zoomLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                  {event.zoomLink}
                                  <ExternalLink size={14} />
                                </a>
                              </div>
                            )}
                            
                            {event.type === 'assignment' && role === 'teacher' && (
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">حالة التسليم:</h5>
                                <div className="flex items-center gap-2">
                                  <div className="text-sm">
                                    <span className="font-medium">{event.submissionCount}</span> من <span className="font-medium">{event.totalStudents}</span>
                                  </div>
                                  <div className="w-32 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-600 h-2 rounded-full"
                                      style={{ width: `${(event.submissionCount / event.totalStudents) * 100}%` }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {event.type === 'office_hours' && event.appointments && (
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">المواعيد المحجوزة:</h5>
                                <div className="space-y-2">
                                  {event.appointments.map((appointment, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                      <span>{appointment.student}</span>
                                      <span className="text-gray-600">{appointment.time}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {event.agenda && (
                              <div>
                                <h5 className="font-medium text-gray-800 mb-2">جدول الأعمال:</h5>
                                <p className="text-sm text-gray-600">{event.agenda}</p>
                              </div>
                            )}
                          </div>
                          
                          {/* ملاحظات إضافية */}
                          {event.meetingNotes && (
                            <div className="mt-4 pt-4 border-t border-gray-300">
                              <h5 className="font-medium text-gray-800 mb-2">ملاحظات:</h5>
                              <p className="text-sm text-gray-600">{event.meetingNotes}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* الجانب الأيمن - الأزرار */}
                <div className="flex flex-col gap-2 min-w-[120px]">
                  {/* زر التوسيع */}
                  <button
                    onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      expandedEvent === event.id
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    {expandedEvent === event.id ? 'إخفاء التفاصيل' : 'عرض التفاصيل'}
                    <ChevronRight size={14} className={`inline mr-1 transition-transform ${
                      expandedEvent === event.id ? 'rotate-90' : ''
                    }`} />
                  </button>
                  
                  {/* زر الفعل الرئيسي */}
                  {event.status === 'live_now' && (
                    <button
                      onClick={() => handleJoinEvent(event)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Video size={16} />
                      انضم الآن
                    </button>
                  )}
                  
                  {event.status === 'due_today' && role === 'student' && !event.submitted && (
                    <button
                      onClick={() => handleJoinEvent(event)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      تسليم الواجب
                    </button>
                  )}
                  
                  {event.type === 'grading' && (
                    <button
                      onClick={() => window.location.href = `/grading/${event.course}`}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                    >
                      بدء التصحيح
                    </button>
                  )}
                  
                  {/* زر إضافي */}
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center justify-center gap-1">
                    <MoreVertical size={16} />
                    المزيد
                  </button>
                </div>
              </div>
              
              {/* شريط التقدم للواجبات */}
              {event.type === 'assignment' && role === 'teacher' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">معدل التسليم</span>
                    <span className="text-sm text-gray-600">
                      {((event.submissionCount / event.totalStudents) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(event.submissionCount / event.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* ملخص اليوم */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle className="text-blue-600" size={20} />
          ملخص اليوم
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">{dailyEvents.filter(e => e.type === 'course').length}</div>
            <div className="text-sm text-gray-600">حصص دراسية</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-orange-600">
              {dailyEvents.filter(e => e.type === 'assignment' && e.status === 'due_today').length}
            </div>
            <div className="text-sm text-gray-600">واجبات مستحقة</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-purple-600">
              {dailyEvents.filter(e => e.type === 'meeting').length}
            </div>
            <div className="text-sm text-gray-600">اجتماعات</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">
              {dailyEvents.filter(e => e.status === 'completed').length}
            </div>
            <div className="text-sm text-gray-600">مكتملة</div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-blue-200">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-medium">نصيحة اليوم:</span> 
            {role === 'teacher' 
              ? ' حاول إنهاء تصحيح الواجبات قبل نهاية اليوم لضمان تقديم التغذية الراجعة في الوقت المناسب.'
              : ' راجع مواد الحصة القادمة قبل موعدها لتحقيق أقصى استفادة.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}