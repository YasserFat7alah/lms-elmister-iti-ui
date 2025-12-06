// components/schedule/TeacherStats.jsx
"use client";

import { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Users, BookOpen, DollarSign, 
  Calendar, Clock, Award, BarChart3, Download, Filter,
  ChevronRight, Eye, RefreshCw
} from 'lucide-react';
import { format, subDays, subMonths } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function TeacherStats({ teacherId, timeRange = 'month' }) {
  const [stats, setStats] = useState({
    totalCourses: 0,
    activeStudents: 0,
    totalEnrollments: 0,
    revenue: { total: 0, thisMonth: 0, lastMonth: 0, change: 0 },
    occupancyRate: 0,
    averageRating: 0,
    upcomingClasses: 0,
    pendingTasks: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [timeRangeOption, setTimeRangeOption] = useState(timeRange);
  const [revenueData, setRevenueData] = useState([]);
  const [studentEngagement, setStudentEngagement] = useState([]);

  // محاكاة جلب البيانات من API
  useEffect(() => {
    const fetchTeacherStats = async () => {
      setLoading(true);
      try {
        // محاكاة API call
        // const response = await fetch(`/api/teacher/stats?teacherId=${teacherId}&timeRange=${timeRangeOption}`);
        // const data = await response.json();
        
        // بيانات افتراضية
        const mockStats = getMockTeacherStats(timeRangeOption);
        const mockRevenueData = getMockRevenueData(timeRangeOption);
        const mockEngagementData = getMockEngagementData();
        
        setStats(mockStats);
        setRevenueData(mockRevenueData);
        setStudentEngagement(mockEngagementData);
      } catch (error) {
        console.error('Error fetching teacher stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherStats();
  }, [teacherId, timeRangeOption]);

  const getMockTeacherStats = (range) => {
    const baseStats = {
      totalCourses: 8,
      activeStudents: 42,
      totalEnrollments: 56,
      revenue: { 
        total: 12500, 
        thisMonth: 3200, 
        lastMonth: 2800, 
        change: 14.3 
      },
      occupancyRate: 85,
      averageRating: 4.7,
      upcomingClasses: 12,
      pendingTasks: 7,
      completionRate: 78,
      studentSatisfaction: 92
    };

    // تعديل الإحصائيات بناءً على النطاق الزمني
    if (range === 'week') {
      return {
        ...baseStats,
        revenue: { 
          total: 2800, 
          thisMonth: 2800, 
          lastMonth: 2400, 
          change: 16.7 
        },
        upcomingClasses: 3
      };
    } else if (range === 'quarter') {
      return {
        ...baseStats,
        totalCourses: 12,
        activeStudents: 65,
        revenue: { 
          total: 18500, 
          thisMonth: 3200, 
          lastMonth: 2900, 
          change: 10.3 
        }
      };
    }

    return baseStats;
  };

  const getMockRevenueData = (range) => {
    const data = [];
    const now = new Date();
    
    if (range === 'week') {
      for (let i = 6; i >= 0; i--) {
        const date = subDays(now, i);
        data.push({
          date: format(date, 'EEE', { locale: ar }),
          revenue: Math.floor(Math.random() * 800) + 200,
          students: Math.floor(Math.random() * 10) + 3
        });
      }
    } else if (range === 'month') {
      for (let i = 29; i >= 0; i--) {
        const date = subDays(now, i);
        if (i % 5 === 0) { // عرض بيانات كل 5 أيام
          data.push({
            date: format(date, 'd MMM', { locale: ar }),
            revenue: Math.floor(Math.random() * 1200) + 400,
            students: Math.floor(Math.random() * 15) + 5
          });
        }
      }
    } else if (range === 'quarter') {
      for (let i = 2; i >= 0; i--) {
        const date = subMonths(now, i);
        data.push({
          date: format(date, 'MMM', { locale: ar }),
          revenue: Math.floor(Math.random() * 6000) + 3000,
          students: Math.floor(Math.random() * 25) + 10
        });
      }
    }
    
    return data;
  };

  const getMockEngagementData = () => {
    return [
      { course: 'الرياضيات المتقدمة', engagement: 92, completion: 85, students: 24 },
      { course: 'الفيزياء العملية', engagement: 88, completion: 78, students: 18 },
      { course: 'برمجة Python', engagement: 95, completion: 92, students: 30 },
      { course: 'قواعد البيانات', engagement: 85, completion: 80, students: 22 },
      { course: 'التفاضل والتكامل', engagement: 90, completion: 88, students: 26 }
    ];
  };

  const handleExportData = () => {
    // محاكاة تصدير البيانات
    const dataStr = JSON.stringify(stats, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `teacher_stats_${format(new Date(), 'yyyy-MM-dd')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* شريط التحكم */}
      <div className="bg-white rounded-xl shadow-md p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">إحصائيات الأداء</h2>
            <p className="text-gray-600">نظرة شاملة على أدائك وتقدمك</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* خيارات النطاق الزمني */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              {['week', 'month', 'quarter'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRangeOption(range)}
                  className={`px-4 py-2 text-sm font-medium ${
                    timeRangeOption === range
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {range === 'week' ? 'أسبوع' : 
                   range === 'month' ? 'شهر' : 'ربع سنة'}
                </button>
              ))}
            </div>
            
            {/* أزرار الإجراءات */}
            <button
              onClick={handleRefresh}
              className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              title="تحديث البيانات"
            >
              <RefreshCw size={18} />
            </button>
            
            <button
              onClick={handleExportData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
            >
              <Download size={16} />
              تصدير
            </button>
          </div>
        </div>
      </div>

      {/* البطاقات الإحصائية الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* إجمالي الإيرادات */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign size={24} className="opacity-80" />
            <span className="text-sm bg-white/20 px-2 py-1 rounded">
              {timeRangeOption === 'week' ? 'هذا الأسبوع' : 
               timeRangeOption === 'month' ? 'هذا الشهر' : 'هذا الربع'}
            </span>
          </div>
          <div className="text-3xl font-bold mb-2">{formatCurrency(stats.revenue.thisMonth)}</div>
          <div className="text-sm opacity-90">إجمالي الإيرادات</div>
          <div className="flex items-center gap-2 mt-4">
            {stats.revenue.change > 0 ? (
              <>
                <TrendingUp size={16} />
                <span className="text-sm">+{stats.revenue.change}% عن الفترة الماضية</span>
              </>
            ) : (
              <>
                <TrendingDown size={16} />
                <span className="text-sm">{stats.revenue.change}% عن الفترة الماضية</span>
              </>
            )}
          </div>
        </div>

        {/* الطلاب النشطين */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="text-green-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{stats.activeStudents}</div>
              <div className="text-sm text-gray-600">طالب نشط</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">من إجمالي {stats.totalEnrollments}</span>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={14} />
              <span className="text-xs">+12%</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${(stats.activeStudents / stats.totalEnrollments) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* معدل الإشغال */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BarChart3 className="text-purple-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{stats.occupancyRate}%</div>
              <div className="text-sm text-gray-600">معدل الإشغال</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">من إجمالي السعة</span>
            <div className={`flex items-center gap-1 ${stats.occupancyRate >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
              {stats.occupancyRate >= 80 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span className="text-xs">
                {stats.occupancyRate >= 80 ? 'ممتاز' : 'بحاجة تحسين'}
              </span>
            </div>
          </div>
        </div>

        {/* التقييم المتوسط */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Award className="text-yellow-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{stats.averageRating}/5</div>
              <div className="text-sm text-gray-600">التقييم المتوسط</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400">
                  {star <= Math.floor(stats.averageRating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-600">{stats.studentSatisfaction}% رضا</span>
          </div>
        </div>
      </div>

      {/* البطاقات الإضافية */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* الكورسات القادمة */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">الكورسات القادمة</h3>
            <Calendar className="text-blue-600" size={20} />
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-blue-600 mb-2">{stats.upcomingClasses}</div>
            <div className="text-gray-600">حصص خلال الأيام السبعة القادمة</div>
          </div>
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">غداً</span>
              <span className="font-medium">3 حصص</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">بعد غد</span>
              <span className="font-medium">2 حصص</span>
            </div>
          </div>
          <button className="w-full mt-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center justify-center gap-2">
            <Eye size={16} />
            عرض الجدول الكامل
          </button>
        </div>

        {/* المهام المعلقة */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">المهام المعلقة</h3>
            <Clock className="text-orange-600" size={20} />
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-orange-600 mb-2">{stats.pendingTasks}</div>
            <div className="text-gray-600">مهمة تتطلب انتباهك</div>
          </div>
          <div className="space-y-3 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">تصحيح واجبات</span>
              <span className="font-medium">4 مهام</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">تقييم مشاريع</span>
              <span className="font-medium">2 مهام</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">ردود على استفسارات</span>
              <span className="font-medium">1 مهمة</span>
            </div>
          </div>
          <button className="w-full mt-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center gap-2">
            <ChevronRight size={16} />
            الانتقال إلى المهام
          </button>
        </div>

        {/* مشاركة الطلاب */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">مشاركة الطلاب</h3>
            <BookOpen className="text-green-600" size={20} />
          </div>
          <div className="text-center py-4">
            <div className="text-4xl font-bold text-green-600 mb-2">{stats.completionRate}%</div>
            <div className="text-gray-600">معدل إكمال الدروس</div>
          </div>
          <div className="space-y-2 mt-4">
            {studentEngagement.slice(0, 3).map((course, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="truncate max-w-[120px]">{course.course}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{course.engagement}%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-green-500 h-1.5 rounded-full"
                      style={{ width: `${course.engagement}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            عرض تقرير تفصيلي
          </button>
        </div>
      </div>

      {/* بيانات الإيرادات */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">تتبع الإيرادات</h3>
            <p className="text-gray-600">آخر {timeRangeOption === 'week' ? '7 أيام' : 
                                        timeRangeOption === 'month' ? '30 يوم' : '3 أشهر'}</p>
          </div>
          <Filter className="text-gray-600" size={20} />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-right p-3 text-gray-600 font-medium">التاريخ</th>
                <th className="text-right p-3 text-gray-600 font-medium">الإيرادات</th>
                <th className="text-right p-3 text-gray-600 font-medium">الطلاب الجدد</th>
                <th className="text-right p-3 text-gray-600 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {revenueData.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-3 text-right">{item.date}</td>
                  <td className="p-3 text-right font-medium">{formatCurrency(item.revenue)}</td>
                  <td className="p-3 text-right">{item.students} طالب</td>
                  <td className="p-3 text-right">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.revenue > 1000 
                        ? 'bg-green-100 text-green-800' 
                        : item.revenue > 500
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.revenue > 1000 ? 'ممتاز' : item.revenue > 500 ? 'جيد' : 'منخفض'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">متوسط الإيرادات اليومية</div>
              <div className="text-xl font-bold text-gray-800">
                {formatCurrency(
                  revenueData.reduce((sum, item) => sum + item.revenue, 0) / Math.max(revenueData.length, 1)
                )}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600">إجمالي الطلاب الجدد</div>
              <div className="text-xl font-bold text-gray-800">
                {revenueData.reduce((sum, item) => sum + item.students, 0)} طالب
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ملاحظات وتحليل */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl shadow-md p-6 border border-indigo-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">تحليل الأداء</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">الإنجازات هذا الشهر:</h5>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>زيادة الإيرادات بنسبة {stats.revenue.change}%</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>إضافة {Math.floor(stats.activeStudents * 0.1)} طالب جديد</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>تحسين معدل الإشغال إلى {stats.occupancyRate}%</span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">نقاط للتحسين:</h5>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>خفض وقت الاستجابة للاستفسارات</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>زيادة معدل إكمال الدروس للطلاب</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>معالجة {stats.pendingTasks} مهمة معلقة</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-indigo-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">توصية:</span> 
            ركز على تحسين تجربة الطلاب من خلال تقديم تغذية راجعة أسرع وتطوير محتوى تفاعلي لزيادة معدل الإكمال.
          </p>
        </div>
      </div>
    </div>
  );
}