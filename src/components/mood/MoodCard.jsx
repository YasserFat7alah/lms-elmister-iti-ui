// 'use client'

// import { useState } from 'react'
// import {
//     Heart,
//     Zap,
//     TrendingUp,
//     TrendingDown,
//     Minus,
//     Clock,
//     Calendar,
//     Edit,
//     Trash2,
//     ExternalLink,
//     BarChart3,
//     Sparkles,
//     Target,
//     Brain,
//     Activity,
//     Sun,
//     Cloud,
//     CloudRain,
//     CloudSnow,
//     CloudLightning
// } from 'lucide-react'

// export function MoodCard({
//     mood = 3,
//     energy = 50,
//     timestamp = new Date().toISOString(),
//     type = 'general',
//     title = '',
//     description = '',
//     showActions = true,
//     onEdit,
//     onDelete,
//     onClick,
//     compact = false,
//     showTrend = true,
//     showDetails = true,
//     showTime = true,
//     className = ''
// }) {
//     const [isHovered, setIsHovered] = useState(false)
//     const [isExpanded, setIsExpanded] = useState(false)

//     // حساب الاتجاه مقارنة بالمتوسط
//     const moodTrend = mood >= 4 ? 'up' : mood <= 2 ? 'down' : 'neutral'
//     const energyTrend = energy >= 70 ? 'up' : energy <= 30 ? 'down' : 'neutral'

//     // الحصول على أيقونة المزاج
//     const getMoodIcon = () => {
//         if (mood >= 4.5) return <Sparkles className="w-5 h-5 text-yellow-500" />
//         if (mood >= 4) return <Sun className="w-5 h-5 text-amber-500" />
//         if (mood >= 3) return <Cloud className="w-5 h-5 text-blue-400" />
//         if (mood >= 2) return <CloudRain className="w-5 h-5 text-gray-400" />
//         return <CloudSnow className="w-5 h-5 text-gray-300" />
//     }

//     // الحصول على أيقونة الطاقة
//     const getEnergyIcon = () => {
//         if (energy >= 80) return <Zap className="w-5 h-5 text-green-500 animate-pulse" />
//         if (energy >= 60) return <Activity className="w-5 h-5 text-green-400" />
//         if (energy >= 40) return <Target className="w-5 h-5 text-blue-400" />
//         if (energy >= 20) return <Brain className="w-5 h-5 text-amber-400" />
//         return <Heart className="w-5 h-5 text-red-300" />
//     }

//     // الحصول على لون الخلفية حسب النوع
//     const getTypeColor = () => {
//         switch (type) {
//             case 'before':
//                 return 'from-blue-50 to-blue-100 border-blue-200'
//             case 'after':
//                 return 'from-green-50 to-green-100 border-green-200'
//             case 'morning':
//                 return 'from-amber-50 to-amber-100 border-amber-200'
//             case 'evening':
//                 return 'from-purple-50 to-purple-100 border-purple-200'
//             case 'break':
//                 return 'from-cyan-50 to-cyan-100 border-cyan-200'
//             default:
//                 return 'from-gray-50 to-gray-100 border-gray-200'
//         }
//     }

//     // الحصول على تسمية النوع
//     const getTypeLabel = () => {
//         switch (type) {
//             case 'before': return 'قبل الدرس'
//             case 'after': return 'بعد الدرس'
//             case 'morning': return 'الصباح'
//             case 'evening': return 'المساء'
//             case 'break': return 'فترة الراحة'
//             case 'study': return 'جلسة دراسة'
//             case 'exam': return 'قبل الامتحان'
//             case 'post-exam': return 'بعد الامتحان'
//             default: return 'تقييم عام'
//         }
//     }

//     // الحصول على نص الوصف التلقائي
//     const getAutoDescription = () => {
//         if (description) return description

//         if (mood >= 4.5 && energy >= 80)
//             return 'مزاج رائع وطاقة عالية! يوم مثالي للإنتاجية'
//         if (mood >= 4 && energy >= 70)
//             return 'تشعر بالرضا والطاقة، استمر في التركيز'
//         if (mood >= 3 && energy >= 50)
//             return 'مستوى جيد، حاول الحفاظ على هذا التوازن'
//         if (mood >= 2.5 && energy >= 30)
//             return 'قد تحتاج إلى قسط من الراحة'
//         return 'حاول أخذ استراحة أو تغيير النشاط'
//     }

//     // تنسيق الوقت
//     const formatTime = (dateString) => {
//         const date = new Date(dateString)
//         return {
//             time: date.toLocaleTimeString('ar-SA', {
//                 hour: '2-digit',
//                 minute: '2-digit'
//             }),
//             date: date.toLocaleDateString('ar-SA', {
//                 weekday: 'short',
//                 month: 'short',
//                 day: 'numeric'
//             }),
//             relative: getRelativeTime(date)
//         }
//     }

//     // الوقت النسبي
//     const getRelativeTime = (date) => {
//         const now = new Date()
//         const diffMs = now - date
//         const diffMins = Math.floor(diffMs / 60000)
//         const diffHours = Math.floor(diffMins / 60)
//         const diffDays = Math.floor(diffHours / 24)

//         if (diffMins < 1) return 'الآن'
//         if (diffMins < 60) return `قبل ${diffMins} دقيقة`
//         if (diffHours < 24) return `قبل ${diffHours} ساعة`
//         if (diffDays === 1) return 'أمس'
//         if (diffDays < 7) return `قبل ${diffDays} أيام`
//         return `قبل ${Math.floor(diffDays / 7)} أسابيع`
//     }

//     const timeInfo = formatTime(timestamp)
//     const autoDescription = getAutoDescription()

//     // النسخة المدمجة
//     if (compact) {
//         return (
//             <div
//                 className={`relative bg-gradient-to-br ${getTypeColor()} rounded-xl p-4 border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${className}`}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 onClick={onClick}
//             >
//                 <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <div className={`p-2 rounded-lg ${mood >= 4 ? 'bg-green-100' : mood >= 3 ? 'bg-blue-100' : 'bg-amber-100'}`}>
//                             {getMoodIcon()}
//                         </div>
//                         <div>
//                             <div className="font-bold text-xl">
//                                 {mood.toFixed(1)}
//                                 <span className="text-sm text-gray-500">/5</span>
//                             </div>
//                             <div className="text-xs text-gray-500">{getTypeLabel()}</div>
//                         </div>
//                     </div>

//                     <div className="text-right">
//                         <div className="text-lg font-bold">{energy}%</div>
//                         <div className="text-xs text-gray-500">طاقة</div>
//                     </div>
//                 </div>

//                 {/* مؤشر الاتجاه */}
//                 {showTrend && (
//                     <div className="absolute top-3 right-3">
//                         {moodTrend === 'up' ? (
//                             <TrendingUp className="w-4 h-4 text-green-500" />
//                         ) : moodTrend === 'down' ? (
//                             <TrendingDown className="w-4 h-4 text-red-500" />
//                         ) : (
//                             <Minus className="w-4 h-4 text-gray-400" />
//                         )}
//                     </div>
//                 )}

//                 {/* وقت النشر */}
//                 {showTime && (
//                     <div className="mt-3 pt-3 border-t border-gray-200/50 flex items-center justify-between">
//                         <div className="flex items-center gap-1 text-xs text-gray-500">
//                             <Clock className="w-3 h-3" />
//                             {timeInfo.time}
//                         </div>
//                         <div className="text-xs text-gray-400">
//                             {timeInfo.relative}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         )
//     }

//     // النسخة الكاملة
//     return (
//         <div
//             className={`relative bg-gradient-to-br ${getTypeColor()} rounded-2xl border transition-all duration-500 hover:shadow-xl ${isHovered ? 'shadow-lg' : ''} ${className}`}
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//         >
//             {/* شارة النوع */}
//             <div className="absolute -top-2 -right-2">
//                 <div className={`px-3 py-1 rounded-full text-xs font-medium ${type === 'before' ? 'bg-blue-600 text-white' :
//                     type === 'after' ? 'bg-green-600 text-white' :
//                         'bg-gray-600 text-white'
//                     }`}>
//                     {getTypeLabel()}
//                 </div>
//             </div>

//             {/* رأس البطاقة */}
//             <div className="p-5">
//                 <div className="flex items-start justify-between mb-4">
//                     <div>
//                         {title && (
//                             <h4 className="font-bold text-lg text-gray-800 mb-1">{title}</h4>
//                         )}
//                         <p className="text-sm text-gray-600">{autoDescription}</p>
//                     </div>

//                     {showActions && (
//                         <div className={`flex gap-1 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
//                             {onEdit && (
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation()
//                                         onEdit()
//                                     }}
//                                     className="p-2 hover:bg-white/50 rounded-lg transition-colors"
//                                     title="تعديل"
//                                 >
//                                     <Edit className="w-4 h-4 text-gray-600" />
//                                 </button>
//                             )}
//                             {onDelete && (
//                                 <button
//                                     onClick={(e) => {
//                                         e.stopPropagation()
//                                         if (confirm('هل تريد حذف هذا التقييم؟')) {
//                                             onDelete()
//                                         }
//                                     }}
//                                     className="p-2 hover:bg-red-50 rounded-lg transition-colors"
//                                     title="حذف"
//                                 >
//                                     <Trash2 className="w-4 h-4 text-red-500" />
//                                 </button>
//                             )}
//                         </div>
//                     )}
//                 </div>

//                 {/* المؤشرات الرئيسية */}
//                 <div className="grid grid-cols-2 gap-6 mb-6">
//                     {/* مؤشر المزاج */}
//                     <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
//                         <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center gap-2">
//                                 {getMoodIcon()}
//                                 <span className="font-medium text-gray-700">المزاج</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                                 {moodTrend === 'up' ? (
//                                     <TrendingUp className="w-4 h-4 text-green-500" />
//                                 ) : moodTrend === 'down' ? (
//                                     <TrendingDown className="w-4 h-4 text-red-500" />
//                                 ) : (
//                                     <Minus className="w-4 h-4 text-gray-400" />
//                                 )}
//                                 <span className={`text-sm font-medium ${moodTrend === 'up' ? 'text-green-600' :
//                                     moodTrend === 'down' ? 'text-red-600' : 'text-gray-600'
//                                     }`}>
//                                     {mood >= 4 ? 'ممتاز' : mood >= 3 ? 'جيد' : 'يحتاج تحسين'}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="flex items-end justify-between">
//                             <div className="text-3xl font-bold text-gray-800">
//                                 {mood.toFixed(1)}
//                                 <span className="text-lg text-gray-500">/5</span>
//                             </div>
//                             <div className="relative w-20 h-20">
//                                 <svg className="w-full h-full" viewBox="0 0 100 100">
//                                     <circle
//                                         cx="50"
//                                         cy="50"
//                                         r="40"
//                                         fill="none"
//                                         stroke="#e5e7eb"
//                                         strokeWidth="8"
//                                     />
//                                     <circle
//                                         cx="50"
//                                         cy="50"
//                                         r="40"
//                                         fill="none"
//                                         stroke={mood >= 4 ? '#10b981' : mood >= 3 ? '#3b82f6' : '#f59e0b'}
//                                         strokeWidth="8"
//                                         strokeLinecap="round"
//                                         strokeDasharray={`${(mood / 5) * 251} 251`}
//                                         transform="rotate(-90 50 50)"
//                                     />
//                                 </svg>
//                                 <div className="absolute inset-0 flex items-center justify-center">
//                                     <div className="text-center">
//                                         <div className="text-lg font-bold">
//                                             {Math.round((mood / 5) * 100)}%
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* شريط التقدم */}
//                         <div className="mt-4">
//                             <div className="flex justify-between text-xs text-gray-500 mb-1">
//                                 <span>منخفض</span>
//                                 <span>مرتفع</span>
//                             </div>
//                             <div className="w-full h-2 bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 rounded-full overflow-hidden">
//                                 <div
//                                     className="h-full bg-gray-800/30 rounded-full"
//                                     style={{ width: `${100 - (mood / 5) * 100}%` }}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     {/* مؤشر الطاقة */}
//                     <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
//                         <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center gap-2">
//                                 {getEnergyIcon()}
//                                 <span className="font-medium text-gray-700">الطاقة</span>
//                             </div>
//                             <div className="flex items-center gap-1">
//                                 {energyTrend === 'up' ? (
//                                     <TrendingUp className="w-4 h-4 text-green-500" />
//                                 ) : energyTrend === 'down' ? (
//                                     <TrendingDown className="w-4 h-4 text-red-500" />
//                                 ) : (
//                                     <Minus className="w-4 h-4 text-gray-400" />
//                                 )}
//                                 <span className={`text-sm font-medium ${energyTrend === 'up' ? 'text-green-600' :
//                                     energyTrend === 'down' ? 'text-red-600' : 'text-gray-600'
//                                     }`}>
//                                     {energy >= 70 ? 'عالي' : energy >= 40 ? 'متوسط' : 'منخفض'}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="flex items-end justify-between">
//                             <div className="text-3xl font-bold text-gray-800">
//                                 {energy}
//                                 <span className="text-lg text-gray-500">%</span>
//                             </div>
//                             <div className="relative w-20 h-20">
//                                 <svg className="w-full h-full" viewBox="0 0 100 100">
//                                     <circle
//                                         cx="50"
//                                         cy="50"
//                                         r="40"
//                                         fill="none"
//                                         stroke="#e5e7eb"
//                                         strokeWidth="8"
//                                     />
//                                     <circle
//                                         cx="50"
//                                         cy="50"
//                                         r="40"
//                                         fill="none"
//                                         stroke={energy >= 70 ? '#10b981' : energy >= 40 ? '#3b82f6' : '#f59e0b'}
//                                         strokeWidth="8"
//                                         strokeLinecap="round"
//                                         strokeDasharray={`${energy * 2.51} 251`}
//                                         transform="rotate(-90 50 50)"
//                                     />
//                                 </svg>
//                                 <div className="absolute inset-0 flex items-center justify-center">
//                                     <div className="text-center">
//                                         <div className="text-lg font-bold">{energy}%</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* مؤشر البطارية */}
//                         <div className="mt-4">
//                             <div className="flex justify-between text-xs text-gray-500 mb-1">
//                                 <span>0%</span>
//                                 <span>100%</span>
//                             </div>
//                             <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
//                                 <div
//                                     className="absolute inset-y-0 right-0 h-full bg-gradient-to-l from-green-500 via-amber-500 to-red-500 transition-all duration-1000"
//                                     style={{ width: `${energy}%` }}
//                                 />
//                                 <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
//                                     {energy}%
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* معلومات الوقت */}
//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                     <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-1">
//                             <Clock className="w-4 h-4" />
//                             <span>{timeInfo.time}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                             <Calendar className="w-4 h-4" />
//                             <span>{timeInfo.date}</span>
//                         </div>
//                     </div>
//                     <div className="text-gray-500">
//                         {timeInfo.relative}
//                     </div>
//                 </div>

//                 {/* تفاصيل إضافية */}
//                 {showDetails && isExpanded && (
//                     <div className="mt-6 pt-6 border-t border-gray-200/50 animate-fadeIn">
//                         <h5 className="font-medium mb-3 flex items-center gap-2">
//                             <BarChart3 className="w-4 h-4" />
//                             تحليل مفصل
//                         </h5>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div className="bg-white/50 rounded-lg p-3">
//                                 <div className="text-xs text-gray-500 mb-1">مستوى التركيز</div>
//                                 <div className="text-lg font-bold">
//                                     {Math.round((mood * energy) / 5)}%
//                                 </div>
//                             </div>
//                             <div className="bg-white/50 rounded-lg p-3">
//                                 <div className="text-xs text-gray-500 mb-1">التوازن</div>
//                                 <div className="text-lg font-bold">
//                                     {Math.abs(mood * 20 - energy).toFixed(0)}%
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* زر التوسيع */}
//                 <button
//                     onClick={() => setIsExpanded(!isExpanded)}
//                     className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white border rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all"
//                 >
//                     <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
//                         <ExternalLink className="w-4 h-4 text-gray-600" />
//                     </div>
//                 </button>
//             </div>
//         </div>
//     )
// }

// // مجموعة بطاقات المزاج
// export function MoodCardsGrid({ cards = [], columns = 3 }) {
//     const gridCols = {
//         1: 'grid-cols-1',
//         2: 'grid-cols-1 md:grid-cols-2',
//         3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
//         4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
//     }

//     return (
//         <div className={`grid ${gridCols[columns] || gridCols[3]} gap-6`}>
//             {cards.map((card, index) => (
//                 <MoodCard
//                     key={index}
//                     mood={card.mood}
//                     energy={card.energy}
//                     timestamp={card.timestamp}
//                     type={card.type}
//                     title={card.title}
//                     description={card.description}
//                     onEdit={card.onEdit}
//                     onDelete={card.onDelete}
//                     onClick={card.onClick}
//                 />
//             ))}
//         </div>
//     )
// }

// // بطاقة موجزة للموجات
// export function MoodWaveCard({ mood, energy, timestamp, onClick }) {
//     const time = new Date(timestamp).toLocaleTimeString('ar-SA', {
//         hour: '2-digit',
//         minute: '2-digit'
//     })

//     return (
//         <div
//             className="relative group cursor-pointer"
//             onClick={onClick}
//         >
//             {/* موجة الطاقة */}
//             <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
//                 <div className="w-full h-full">
//                     <svg viewBox="0 0 100 40" className="w-full h-full">
//                         <path
//                             d={`M0,20 Q25,${20 - energy / 5} 50,20 T100,20`}
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             className="text-blue-500"
//                         />
//                         <path
//                             d={`M0,25 Q25,${25 - mood * 4} 50,25 T100,25`}
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="2"
//                             className="text-green-500"
//                         />
//                     </svg>
//                 </div>
//             </div>

//             {/* البطاقة */}
//             <div className="relative bg-white/90 backdrop-blur-sm border rounded-xl p-4 group-hover:shadow-lg transition-all">
//                 <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-2">
//                         <div className={`w-3 h-3 rounded-full ${mood >= 4 ? 'bg-green-500' :
//                             mood >= 3 ? 'bg-blue-500' :
//                                 'bg-amber-500'
//                             }`} />
//                         <span className="text-sm font-medium">{mood.toFixed(1)}</span>
//                     </div>
//                     <span className="text-xs text-gray-500">{time}</span>
//                 </div>

//                 <div className="flex items-center gap-4">
//                     <div className="flex-1">
//                         <div className="text-xs text-gray-500 mb-1">الطاقة</div>
//                         <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                             <div
//                                 className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-1000"
//                                 style={{ width: `${energy}%` }}
//                             />
//                         </div>
//                     </div>
//                     <div className="text-lg font-bold">
//                         {energy}%
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }