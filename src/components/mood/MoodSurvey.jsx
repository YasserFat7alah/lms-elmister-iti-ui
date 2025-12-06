// // components/feedback/MoodSurvey.jsx
// 'use client'

// import { useState, useEffect } from 'react'
// import { MoodSurvey as MoodSurveyComponent, MoodResults } from '@/components/mood/mood-survey'
// import { Brain, BarChart3, Download, RefreshCw } from 'lucide-react'

// export function LessonMoodTracker({ lessonId, lessonTitle }) {
//   const [showSurvey, setShowSurvey] = useState(false)
//   const [surveyType, setSurveyType] = useState('before')
//   const [results, setResults] = useState([])
//   const [loading, setLoading] = useState(false)

//   // تحميل النتائج المحفوظة
//   useEffect(() => {
//     const beforeResult = localStorage.getItem(`lesson_${lessonId}_before_survey`)
//     const afterResult = localStorage.getItem(`lesson_${lessonId}_after_survey`)
    
//     const loadedResults = []
//     if (beforeResult) loadedResults.push(JSON.parse(beforeResult))
//     if (afterResult) loadedResults.push(JSON.parse(afterResult))
    
//     setResults(loadedResults)
//   }, [lessonId])

//   const handleSurveyOpen = (type) => {
//     setSurveyType(type)
//     setShowSurvey(true)
//   }

//   const handleSurveySubmit = (mood, energy) => {
//     setLoading(true)
    
//     // محاكاة إرسال البيانات
//     setTimeout(() => {
//       const result = {
//         mood,
//         energy,
//         type: surveyType,
//         timestamp: new Date().toISOString(),
//         lessonId,
//         lessonTitle
//       }
      
//       // حفظ محلي
//       localStorage.setItem(`lesson_${lessonId}_${surveyType}_survey`, JSON.stringify(result))
      
//       // إضافة للنتائج
//       setResults(prev => [...prev.filter(r => r.type !== surveyType), result])
      
//       setLoading(false)
//       setShowSurvey(false)
      
//       alert(`تم حفظ ${surveyType === 'before' ? 'استبيان ما قبل' : 'استبيان ما بعد'} الدرس`)
//     }, 500)
//   }

//   const handleExportData = () => {
//     const data = {
//       lessonId,
//       lessonTitle,
//       results,
//       summary: {
//         avgMood: results.reduce((sum, r) => sum + r.mood, 0) / results.length,
//         avgEnergy: results.reduce((sum, r) => sum + r.energy, 0) / results.length,
//         totalResponses: results.length
//       }
//     }
    
//     const dataStr = JSON.stringify(data, null, 2)
//     const blob = new Blob([dataStr], { type: 'application/json' })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement('a')
//     a.href = url
//     a.download = `mood_data_${lessonId}.json`
//     a.click()
//     URL.revokeObjectURL(url)
//   }

//   const handleReset = () => {
//     if (confirm('هل تريد حذف جميع بيانات الاستبيان لهذا الدرس؟')) {
//       localStorage.removeItem(`lesson_${lessonId}_before_survey`)
//       localStorage.removeItem(`lesson_${lessonId}_after_survey`)
//       setResults([])
//       alert('تم حذف البيانات')
//     }
//   }

//   const hasBeforeSurvey = results.some(r => r.type === 'before')
//   const hasAfterSurvey = results.some(r => r.type === 'after')

//   return (
//     <div className="bg-white rounded-xl shadow-sm border p-6">
//       <div className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-2">
//           <Brain className="w-6 h-6 text-indigo-600" />
//           <h3 className="text-lg font-semibold">تتبع المزاج والطاقة</h3>
//         </div>
        
//         <div className="flex items-center gap-2">
//           <button
//             onClick={handleExportData}
//             className="p-2 hover:bg-gray-100 rounded-lg"
//             title="تصدير البيانات"
//           >
//             <Download className="w-4 h-4" />
//           </button>
//           <button
//             onClick={handleReset}
//             className="p-2 hover:bg-gray-100 rounded-lg"
//             title="إعادة تعيين"
//           >
//             <RefreshCw className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* حالة الاستبيانات */}
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div className={`p-4 rounded-lg border-2 text-center ${hasBeforeSurvey ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
//           <div className="text-sm font-medium mb-1">قبل الدرس</div>
//           <div className="text-2xl font-bold">{hasBeforeSurvey ? '✓' : '—'}</div>
//           <button
//             onClick={() => handleSurveyOpen('before')}
//             className={`mt-2 px-4 py-1 text-sm rounded-lg ${hasBeforeSurvey ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
//           >
//             {hasBeforeSurvey ? 'تعديل' : 'ابدأ'}
//           </button>
//         </div>
        
//         <div className={`p-4 rounded-lg border-2 text-center ${hasAfterSurvey ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
//           <div className="text-sm font-medium mb-1">بعد الدرس</div>
//           <div className="text-2xl font-bold">{hasAfterSurvey ? '✓' : '—'}</div>
//           <button
//             onClick={() => handleSurveyOpen('after')}
//             className={`mt-2 px-4 py-1 text-sm rounded-lg ${hasAfterSurvey ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
//             disabled={!hasBeforeSurvey}
//           >
//             {hasAfterSurvey ? 'تعديل' : 'أكمل الدرس أولاً'}
//           </button>
//         </div>
//       </div>

//       {/* عرض النتائج */}
//       {results.length > 0 && (
//         <div className="space-y-4">
//           <div className="flex items-center gap-2">
//             <BarChart3 className="w-5 h-5 text-gray-500" />
//             <h4 className="font-medium">النتائج</h4>
//           </div>
          
//           <MoodResults results={results} />
          
//           <div className="grid grid-cols-2 gap-4">
//             {results.map((result, index) => (
//               <div key={index} className="p-3 bg-gray-50 rounded-lg">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium">
//                     {result.type === 'before' ? 'قبل الدرس' : 'بعد الدرس'}
//                   </span>
//                   <span className="text-xs text-gray-500">
//                     {new Date(result.timestamp).toLocaleTimeString('ar-SA')}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <div className="text-xs text-gray-600">المزاج</div>
//                     <div className="text-lg font-semibold">{result.mood}/5</div>
//                   </div>
//                   <div>
//                     <div className="text-xs text-gray-600">الطاقة</div>
//                     <div className="text-lg font-semibold">{result.energy}%</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* استبيان المزاج */}
//       <MoodSurveyComponent
//         open={showSurvey}
//         onOpenChange={setShowSurvey}
//         type={surveyType}
//         onSubmit={handleSurveySubmit}
//         isLoading={loading}
//       />
//     </div>
//   )
// }