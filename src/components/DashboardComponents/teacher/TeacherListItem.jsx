"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Eye,
  MessageSquare,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Star,
  Clock,
  UserCheck,
  UserX,
  Award,
  TrendingUp,
  Send,
  Download,
  Shield,
  Bell,
  CreditCard,
  FileText,
  Video,
  CheckCircle,
  XCircle,
  ExternalLink
} from "lucide-react";

export default function TeacherListItem({
  student,
  showDetails = false,
  onEdit,
  onDelete,
  onMessage,
  onViewProfile,
  showActions = true,
  compact = false,
  isSelected = false,
  onSelect,
  showSelection = false
}) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  // بيانات إضافية يمكن جلبها من API
  const studentDetails = {
    id: student.id,
    name: student.name,
    email: student.email || `${student.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    phone: student.phone || "+201234567890",
    image: student.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.name}`,
    location: student.location || "غير محدد",
    joinDate: student.joinDate || "يناير 2024",
    coursesEnrolled: student.coursesEnrolled || 0,
    status: student.status || "active",
    level: student.level || "مبتدئ",
    attendanceRate: student.attendanceRate || 85,
    assignmentsCompleted: student.assignmentsCompleted || 12,
    lastActive: student.lastActive || "قبل ساعتين",
    progress: student.progress || 65,
    notes: student.notes || "طالب مجتهد ونشط",
    tags: student.tags || ["متفوق", "نشط"],
    balance: student.balance || 0,
    nextPayment: student.nextPayment || "2024-02-01"
  };

  // ألوان الحالة
  const getStatusColor = (status) => {
    const colors = {
      active: { bg: "bg-green-100", text: "text-green-800", border: "border-green-200" },
      inactive: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-200" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-200" },
      suspended: { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" },
      completed: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-200" }
    };
    return colors[status] || colors.inactive;
  };

  // ألوان المستوى
  const getLevelColor = (level) => {
    const colors = {
      مبتدئ: "bg-blue-100 text-blue-800",
      متوسط: "bg-green-100 text-green-800",
      متقدم: "bg-purple-100 text-purple-800",
      خبير: "bg-yellow-100 text-yellow-800"
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  // تنسيق التاريخ
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // معالجة الإجراءات
  const handleEdit = async () => {
    if (onEdit) {
      setLoading(true);
      await onEdit(studentDetails);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (confirm(`هل أنت متأكد من حذف الطالب ${studentDetails.name}؟`)) {
      setLoading(true);
      if (onDelete) {
        await onDelete(studentDetails.id);
      }
      setLoading(false);
    }
  };

  const handleMessage = async () => {
    setLoading(true);
    if (onMessage) {
      await onMessage(studentDetails);
    }
    setLoading(false);
  };

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(studentDetails);
    } else {
      window.location.href = `/students/${studentDetails.id}`;
    }
  };

  // النسخة المدمجة
  if (compact) {
    return (
      <div className={`relative bg-white border rounded-lg p-3 hover:shadow-md transition-all duration-200 ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
        <div className="flex items-center justify-between">
          {showSelection && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect && onSelect(studentDetails.id)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300"
            />
          )}
          
          <div className="flex items-center gap-3 flex-1">
            <img
              src={studentDetails.image}
              alt={studentDetails.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            
            <div className="flex-1 text-right">
              <div className="font-medium text-gray-800">{studentDetails.name}</div>
              <div className="text-xs text-gray-500">@{studentDetails.location}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(studentDetails.status).text} ${getStatusColor(studentDetails.status).bg}`}>
              {studentDetails.status === "active" ? "نشط" : 
               studentDetails.status === "inactive" ? "غير نشط" :
               studentDetails.status === "pending" ? "قيد الانتظار" :
               studentDetails.status === "suspended" ? "موقوف" : "مكتمل"}
            </span>
            
            {showActions && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <MoreVertical size={16} className="text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // النسخة الكاملة
  return (
    <div className={`relative bg-white border rounded-xl overflow-hidden transition-all duration-300 ${expanded ? "shadow-lg" : "shadow-sm"} ${isSelected ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200"}`}>
      {/* Main Row */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          {/* Left Section - Student Info */}
          <div className="flex items-start gap-4 flex-1">
            {showSelection && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect && onSelect(studentDetails.id)}
                className="mt-4 w-4 h-4 text-blue-600 rounded border-gray-300"
              />
            )}
            
            {/* Avatar */}
            <div className="relative">
              <img
                src={studentDetails.image}
                alt={studentDetails.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm"
              />
              {studentDetails.status === "active" && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>

            {/* Student Details */}
            <div className="flex-1 text-right">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(studentDetails.level)}`}>
                    {studentDetails.level}
                  </span>
                  {studentDetails.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-lg font-bold text-gray-800">{studentDetails.name}</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} />
                  <span>{studentDetails.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} />
                  <span>{studentDetails.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} />
                  <span>{studentDetails.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} />
                  <span>انضم {studentDetails.joinDate}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">التقدم</span>
                  <span className="font-medium">{studentDetails.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${studentDetails.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Stats & Actions */}
          <div className="text-left ml-4">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-blue-700">{studentDetails.coursesEnrolled}</div>
                <div className="text-xs text-blue-600">دورات</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-green-700">{studentDetails.attendanceRate}%</div>
                <div className="text-xs text-green-600">حضور</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-purple-700">{studentDetails.assignmentsCompleted}</div>
                <div className="text-xs text-purple-600">واجبات</div>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-3 text-center">
                <div className="text-xl font-bold text-amber-700">
                  {studentDetails.balance > 0 ? `${studentDetails.balance} EGP` : "مسدد"}
                </div>
                <div className="text-xs text-amber-600">رصيد</div>
              </div>
            </div>

            {/* Actions */}
            {showActions && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleViewProfile}
                  className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Eye size={14} />
                  <span>عرض</span>
                </button>
                
                <button
                  onClick={handleMessage}
                  disabled={loading}
                  className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <Send size={14} />
                  <span>رسالة</span>
                </button>
                
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  <span>المزيد</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Student Notes */}
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <FileText size={16} />
                ملاحظات
              </h4>
              <p className="text-gray-600 text-sm">{studentDetails.notes}</p>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <Clock size={16} />
                النشاط الأخير
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">آخر دخول</span>
                  <span className="font-medium">{studentDetails.lastActive}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">حالة الحساب</span>
                  <span className={`font-medium ${studentDetails.status === "active" ? "text-green-600" : "text-red-600"}`}>
                    {studentDetails.status === "active" ? "نشط" : "غير نشط"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الدفعة القادمة</span>
                  <span className="font-medium">{formatDate(studentDetails.nextPayment)}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg p-4 border">
              <h4 className="font-medium text-gray-700 mb-3">إجراءات سريعة</h4>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleEdit}
                  disabled={loading}
                  className="flex items-center justify-center gap-1 px-2 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors text-sm"
                >
                  <Edit size={14} />
                  <span>تعديل</span>
                </button>
                
                <button
                  onClick={() => window.location.href = `/students/${studentDetails.id}/assignments`}
                  className="flex items-center justify-center gap-1 px-2 py-2 bg-green-50 text-green-700 rounded hover:bg-green-100 transition-colors text-sm"
                >
                  <FileText size={14} />
                  <span>الواجبات</span>
                </button>
                
                <button
                  onClick={() => window.location.href = `/students/${studentDetails.id}/attendance`}
                  className="flex items-center justify-center gap-1 px-2 py-2 bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors text-sm"
                >
                  <UserCheck size={14} />
                  <span>الحضور</span>
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex items-center justify-center gap-1 px-2 py-2 bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors text-sm"
                >
                  <Trash2 size={14} />
                  <span>حذف</span>
                </button>
              </div>
            </div>
          </div>

          {/* Performance Indicators */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-blue-600">معدل الدرجات</div>
                  <div className="text-lg font-bold text-gray-800">85%</div>
                </div>
                <TrendingUp className="text-blue-600" size={20} />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-green-600">مشاركة</div>
                  <div className="text-lg font-bold text-gray-800">92%</div>
                </div>
                <MessageSquare className="text-green-600" size={20} />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-purple-600">انضباط</div>
                  <div className="text-lg font-bold text-gray-800">96%</div>
                </div>
                <Shield className="text-purple-600" size={20} />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-600">الإنجازات</div>
                  <div className="text-lg font-bold text-gray-800">8</div>
                </div>
                <Award className="text-amber-600" size={20} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Badge */}
      <div className={`absolute top-0 left-0 px-3 py-1 rounded-br-lg text-xs font-medium ${getStatusColor(studentDetails.status).text} ${getStatusColor(studentDetails.status).bg} border ${getStatusColor(studentDetails.status).border}`}>
        {studentDetails.status === "active" ? "نشط" : 
         studentDetails.status === "inactive" ? "غير نشط" :
         studentDetails.status === "pending" ? "قيد الانتظار" :
         studentDetails.status === "suspended" ? "موقوف" : "مكتمل"}
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-xl">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

// مكون مجموعة للقوائم
export function TeacherList({ 
  students = [], 
  onSelectStudent,
  selectedIds = [],
  loading = false,
  emptyMessage = "لا توجد طلاب لعرضهم",
  showBulkActions = true
}) {
  const [allSelected, setAllSelected] = useState(false);

  const handleSelectAll = () => {
    const newAllSelected = !allSelected;
    setAllSelected(newAllSelected);
    if (onSelectStudent) {
      students.forEach(student => {
        onSelectStudent(student.id, newAllSelected);
      });
    }
  };

  const handleBulkAction = (action) => {
    const selectedStudents = students.filter(s => selectedIds.includes(s.id));
    switch(action) {
      case 'message':
        alert(`سيتم إرسال رسالة إلى ${selectedStudents.length} طلاب`);
        break;
      case 'export':
        alert(`سيتم تصدير بيانات ${selectedStudents.length} طلاب`);
        break;
      case 'delete':
        if (confirm(`هل تريد حذف ${selectedStudents.length} طلاب؟`)) {
          alert(`سيتم حذف ${selectedStudents.length} طلاب`);
        }
        break;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-xl p-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-300 rounded-xl"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <UserX className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">{emptyMessage}</h3>
        <p className="text-gray-500 mb-4">ابدأ بإضافة طلاب جدد إلى منصتك التعليمية</p>
        <button
          onClick={() => window.location.href = '/students/add'}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          إضافة طالب جديد
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {showBulkActions && selectedIds.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-blue-700 font-medium">
                {selectedIds.length} طلاب محددين
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction('message')}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  إرسال رسالة جماعية
                </button>
                <button
                  onClick={() => handleBulkAction('export')}
                  className="px-3 py-1.5 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50 text-sm"
                >
                  تصدير البيانات
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1.5 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 text-sm"
                >
                  حذف المحددين
                </button>
              </div>
            </div>
            <button
              onClick={() => selectedIds.forEach(id => onSelectStudent && onSelectStudent(id, false))}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              إلغاء التحديد
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          {showBulkActions && (
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 text-blue-600 rounded border-gray-300"
              />
              <span className="mr-2 text-sm text-gray-700">تحديد الكل</span>
            </label>
          )}
          <span className="text-sm text-gray-600">{students.length} طلاب</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-200 rounded-lg">
            <Download size={16} />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Students List */}
      <div className="space-y-4">
        {students.map((student) => (
          <TeacherListItem
            key={student.id}
            student={student}
            isSelected={selectedIds.includes(student.id)}
            onSelect={onSelectStudent}
            showSelection={showBulkActions}
            onViewProfile={() => console.log('View profile:', student.id)}
            onEdit={() => console.log('Edit:', student.id)}
            onDelete={() => console.log('Delete:', student.id)}
            onMessage={() => console.log('Message:', student.id)}
          />
        ))}
      </div>
    </div>
  );
}