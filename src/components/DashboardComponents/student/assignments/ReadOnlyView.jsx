// components/ReadOnlyView.jsx
import { Download } from "lucide-react";

export default function ReadOnlyView({ submission, feedback, grade }) {
  return (
    <div className="space-y-6">
        {/* 1. The Grade & Feedback (If available) */}
        {grade !== undefined && (
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="font-bold text-green-900 mb-2">Teacher Feedback</h3>
                <div className="text-3xl font-bold text-green-700 mb-2">{grade} <span className="text-lg text-green-600 font-normal">/ 100</span></div>
                <p className="text-green-800 italic">"{feedback || 'Great job!'}"</p>
            </div>
        )}

        {/* 2. The Student's Work */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 opacity-80">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                Submitted Work 
                <span className="text-xs font-normal bg-gray-200 px-2 py-0.5 rounded text-gray-600">Locked</span>
            </h2>
            
            <div className="bg-white p-4 rounded border border-gray-200 text-gray-600 mb-4">
                {submission?.content || "No text content submitted."}
            </div>

            {submission?.file?.url && (
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded">
                        <Download className="w-5 h-5 text-blue-600"/>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Attached File</p>
                        <a href={submission.file.url} className="text-xs text-blue-600 hover:underline">Download</a>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}