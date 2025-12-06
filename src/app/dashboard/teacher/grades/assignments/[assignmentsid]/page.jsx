"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Save, Download, Send, CheckCircle,
  XCircle, FileText, Users, Clock, Calculator,
  MessageSquare, ThumbsUp, ThumbsDown, Star
} from "lucide-react";

const GradeAssignmentPage = () => {
  const params = useParams();
  const router = useRouter();
  const assignmentId = params.assignmentId;

  const [assignment, setAssignment] = useState({
    id: assignmentId,
    title: "Final HTML Exam",
    course: "Integrated Web Development",
    group: "Morning Group",
    totalPoints: 100,
    dueDate: "2024-03-15",
    submissions: [
      {
        id: 1,
        studentId: 101,
        studentName: "Ahmed Mohamed",
        submittedAt: "2024-03-14 14:30",
        file: "ahmed_assignment.pdf",
        status: "graded",
        score: 85,
        feedback: "Good work, but needs improvement in the second section.",
        criteria: [
          { id: 1, title: "Scientific Accuracy", score: 35, max: 40 },
          { id: 2, title: "Methodology", score: 25, max: 30 },
          { id: 3, title: "Creativity", score: 18, max: 20 },
          { id: 4, title: "Formatting", score: 7, max: 10 }
        ]
      },
      {
        id: 2,
        studentId: 102,
        studentName: "Sara Ali",
        submittedAt: "2024-03-14 16:45",
        file: "sara_assignment.pdf",
        status: "pending",
        score: null,
        feedback: "",
        criteria: [
          { id: 1, title: "Scientific Accuracy", score: null, max: 40 },
          { id: 2, title: "Methodology", score: null, max: 30 },
          { id: 3, title: "Creativity", score: null, max: 20 },
          { id: 4, title: "Formatting", score: null, max: 10 }
        ]
      },
      {
        id: 3,
        studentId: 103,
        studentName: "Mohamed Khaled",
        submittedAt: "2024-03-15 09:20",
        file: "mohamed_assignment.pdf",
        status: "graded",
        score: 92,
        feedback: "Excellent! Outstanding work in all sections.",
        criteria: [
          { id: 1, title: "Scientific Accuracy", score: 38, max: 40 },
          { id: 2, title: "Methodology", score: 28, max: 30 },
          { id: 3, title: "Creativity", score: 19, max: 20 },
          { id: 4, title: "Formatting", score: 9, max: 10 }
        ]
      }
    ]
  });

  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [currentSubmission, setCurrentSubmission] = useState(assignment.submissions[0]);
  const [feedback, setFeedback] = useState("");
  const [quickComments, setQuickComments] = useState([
    { id: 1, text: "Very good work", type: "positive" },
    { id: 2, text: "Needs more details", type: "improvement" },
    { id: 3, text: "Organized and well formatted", type: "positive" },
    { id: 4, text: "Needs methodology improvement", type: "improvement" },
    { id: 5, text: "Creative and innovative", type: "positive" }
  ]);

  const handleScoreChange = (criteriaId, score) => {
    const updatedSubmission = {
      ...currentSubmission,
      criteria: currentSubmission.criteria.map(criterion =>
        criterion.id === criteriaId ? { ...criterion, score: parseInt(score) || 0 } : criterion
      )
    };

    // Automatic total calculation
    const totalScore = updatedSubmission.criteria.reduce((sum, criterion) =>
      sum + (criterion.score || 0), 0
    );

    updatedSubmission.score = totalScore;

    // Update main list
    const updatedSubmissions = [...assignment.submissions];
    updatedSubmissions[currentStudentIndex] = updatedSubmission;

    setAssignment({
      ...assignment,
      submissions: updatedSubmissions
    });

    setCurrentSubmission(updatedSubmission);
  };

  const handleStatusChange = (status) => {
    const updatedSubmission = {
      ...currentSubmission,
      status: status
    };

    const updatedSubmissions = [...assignment.submissions];
    updatedSubmissions[currentStudentIndex] = updatedSubmission;

    setAssignment({
      ...assignment,
      submissions: updatedSubmissions
    });

    setCurrentSubmission(updatedSubmission);
  };

  const handleAddQuickComment = (comment) => {
    setFeedback(prev => prev + (prev ? "\n" : "") + comment);
  };

  const handleSaveAndNext = () => {
    if (currentStudentIndex < assignment.submissions.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1);
      setCurrentSubmission(assignment.submissions[currentStudentIndex + 1]);
      setFeedback(assignment.submissions[currentStudentIndex + 1].feedback || "");
    }
  };

  const handleSubmitAll = () => {
    console.log('All grades submitted:', assignment.submissions);
    alert('All grades saved and sent to students!');
    router.push("/grades");
  };

  const calculateProgress = () => {
    const graded = assignment.submissions.filter(s => s.status === "graded").length;
    return (graded / assignment.submissions.length) * 100;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'graded': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'late': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'graded': return 'Graded';
      case 'pending': return 'Pending';
      case 'late': return 'Late';
      default: return 'Undefined';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <Link href={`/grades/assignments/${assignmentId}`}>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors rtl:space-x-reverse">
                <ArrowLeft size={20} />
                <span>Back to Assessment</span>
              </button>
            </Link>

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-800">{assignment.title}</h1>
              <p className="text-gray-600">{assignment.course} • {assignment.group}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors rtl:space-x-reverse">
              <Download size={18} />
              <span>Download All Submissions</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Grading Progress</span>
            <span>{Math.round(calculateProgress())}% Completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>
              {assignment.submissions.filter(s => s.status === "graded").length} of {assignment.submissions.length} Graded
            </span>
            <span>Total Score: {assignment.totalPoints}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Students List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800">Students ({assignment.submissions.length})</h3>
            </div>

            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {assignment.submissions.map((student, index) => (
                <button
                  key={student.id}
                  onClick={() => {
                    setCurrentStudentIndex(index);
                    setCurrentSubmission(student);
                    setFeedback(student.feedback || "");
                  }}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${currentStudentIndex === index ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800">{student.studentName}</div>
                      <div className="text-sm text-gray-500">ID: {student.studentId}</div>
                    </div>

                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      {student.score !== null && (
                        <div className="text-lg font-bold text-gray-800">
                          {student.score}/{assignment.totalPoints}
                        </div>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(student.status)}`}>
                        {getStatusLabel(student.status)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <Clock size={12} />
                      <span>Submitted: {new Date(student.submittedAt).toLocaleDateString('en-US')}</span>
                    </div>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      <FileText size={12} />
                      <span className="truncate max-w-[100px]">{student.file}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Comments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800">Quick Comments</h3>
            </div>

            <div className="p-4 space-y-2">
              {quickComments.map((comment) => (
                <button
                  key={comment.id}
                  onClick={() => handleAddQuickComment(comment.text)}
                  className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${comment.type === 'positive'
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{comment.text}</span>
                    {comment.type === 'positive' ? (
                      <ThumbsUp size={14} />
                    ) : (
                      <ThumbsDown size={14} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Grading Interface */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">
                  Grading: {currentSubmission.studentName}
                </h2>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <span className="text-sm text-gray-600">Submission #{currentSubmission.id}</span>
                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(currentSubmission.status)}`}>
                    {getStatusLabel(currentSubmission.status)}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* File Preview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-800">Submitted File</h4>
                  <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 rtl:space-x-reverse">
                    <Download size={16} />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-800 font-medium mb-2">{currentSubmission.file}</p>
                  <p className="text-gray-600 text-sm">
                    Submitted at: {new Date(currentSubmission.submittedAt).toLocaleString('en-US')}
                  </p>
                </div>
              </div>

              {/* Grading Criteria */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-800">Grading Criteria</h4>

                {currentSubmission.criteria.map((criterion) => (
                  <div key={criterion.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h5 className="font-medium text-gray-800">{criterion.title}</h5>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <span className="text-sm text-gray-600">Max: {criterion.max}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max={criterion.max}
                          value={criterion.score || 0}
                          onChange={(e) => handleScoreChange(criterion.id, e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>0</span>
                          <span>{criterion.max}</span>
                        </div>
                      </div>

                      <div className="ml-6 w-24">
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max={criterion.max}
                            value={criterion.score || 0}
                            onChange={(e) => handleScoreChange(criterion.id, e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2 text-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Total Score */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="font-bold text-blue-800">Final Total</h5>
                      <p className="text-sm text-blue-600">Sum of all criteria</p>
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                      {currentSubmission.score || 0}/{assignment.totalPoints}
                      <div className="text-sm font-normal text-gray-600">
                        {currentSubmission.score ? `${Math.round((currentSubmission.score / assignment.totalPoints) * 100)}%` : '0%'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Feedback and Evaluation</h4>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows="6"
                  className="w-full border border-gray-300 rounded-lg p-4"
                  placeholder="Enter your feedback for the student here..."
                />

                <div className="flex items-center space-x-3 rtl:space-x-reverse mt-3">
                  <button
                    onClick={() => handleAddQuickComment("Excellent! Great work.")}
                    className="flex items-center space-x-1 text-green-600 hover:text-green-800 rtl:space-x-reverse"
                  >
                    <ThumbsUp size={16} />
                    <span className="text-sm">Excellent</span>
                  </button>
                  <button
                    onClick={() => handleAddQuickComment("Needs improvement in:")}
                    className="flex items-center space-x-1 text-yellow-600 hover:text-yellow-800 rtl:space-x-reverse"
                  >
                    <MessageSquare size={16} />
                    <span className="text-sm">Improvement</span>
                  </button>
                  <button
                    onClick={() => handleAddQuickComment("Creative and innovative.")}
                    className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 rtl:space-x-reverse"
                  >
                    <Star size={16} />
                    <span className="text-sm">Creativity</span>
                  </button>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <button
                    onClick={() => handleStatusChange("graded")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors rtl:space-x-reverse ${currentSubmission.status === "graded"
                        ? "bg-green-600 text-white"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                  >
                    <CheckCircle size={18} />
                    <span>Graded</span>
                  </button>

                  <button
                    onClick={() => handleStatusChange("pending")}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors rtl:space-x-reverse ${currentSubmission.status === "pending"
                        ? "bg-yellow-600 text-white"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      }`}
                  >
                    <Clock size={18} />
                    <span>Save as Draft</span>
                  </button>
                </div>

                <div className="flex space-x-3 rtl:space-x-reverse">
                  {currentStudentIndex < assignment.submissions.length - 1 ? (
                    <button
                      onClick={handleSaveAndNext}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors rtl:space-x-reverse"
                    >
                      <Save size={18} />
                      <span>Save and Next</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitAll}
                      className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors rtl:space-x-reverse"
                    >
                      <Send size={18} />
                      <span>Finish and Send All Grades</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Grading Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 p-6">
            <h4 className="font-medium text-gray-800 mb-4">Grading Summary</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {assignment.submissions.filter(s => s.score).length}
                </div>
                <div className="text-sm text-gray-600">Graded</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {assignment.submissions.filter(s => !s.score).length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">
                  {assignment.submissions.length}
                </div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeAssignmentPage;