"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft, Save, FileText, Calendar, Clock,
    Plus, Trash2, Upload, Paperclip, Type,
    Hash, FileCode, FileImage, Award, Target,
    AlertCircle, X, ChevronDown
} from "lucide-react";

const NewAssignmentPage = () => {
    const params = useParams();
    const router = useRouter();
    const { courseId, groupId } = params;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        dueTime: "23:59",
        points: 100,
        type: "project",
        status: "draft",
        allowLateSubmission: false,
        latePenalty: 10,
        maxSubmissions: 1,
        attachments: [],
        rubric: [
            { criteria: "Completeness", weight: 30, description: "" },
            { criteria: "Quality", weight: 40, description: "" },
            { criteria: "Timeliness", weight: 30, description: "" }
        ]
    });

    const [attachments, setAttachments] = useState([]);

    const assignmentTypes = [
        { value: "project", label: "Project", icon: FileCode },
        { value: "homework", label: "Homework", icon: FileText },
        { value: "quiz", label: "Quiz", icon: Type },
        { value: "challenge", label: "Challenge", icon: Target },
        { value: "presentation", label: "Presentation", icon: FileImage }
    ];

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRubricChange = (index, field, value) => {
        const updatedRubric = [...formData.rubric];
        updatedRubric[index] = { ...updatedRubric[index], [field]: value };
        setFormData(prev => ({ ...prev, rubric: updatedRubric }));
    };

    const addRubricCriteria = () => {
        setFormData(prev => ({
            ...prev,
            rubric: [...prev.rubric, { criteria: "", weight: 0, description: "" }]
        }));
    };

    const removeRubricCriteria = (index) => {
        if (formData.rubric.length > 1) {
            const updatedRubric = formData.rubric.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, rubric: updatedRubric }));
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newAttachments = files.map(file => ({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            type: file.type.split('/')[1]
        }));
        setAttachments([...attachments, ...newAttachments]);
    };

    const removeAttachment = (index) => {
        const updatedAttachments = attachments.filter((_, i) => i !== index);
        setAttachments(updatedAttachments);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit logic here
        console.log("Creating assignment:", { ...formData, attachments });
        router.push(`/courses/${courseId}/groups/${groupId}/assignments`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Create New Assignment</h1>
                        <p className="text-gray-600 mt-1">Group #{groupId}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href={`/courses/${courseId}/groups/${groupId}/assignments`}>
                            <button
                                type="button"
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 border border-gray-300 rounded-lg"
                            >
                                <ArrowLeft size={18} />
                                Cancel
                            </button>
                        </Link>

                        <button
                            type="submit"
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700"
                        >
                            <Save size={18} />
                            Create Assignment
                        </button>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Basic Information</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Assignment Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-3"
                                placeholder="e.g., HTML Portfolio Project"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows="6"
                                className="w-full border border-gray-300 rounded-lg p-3"
                                placeholder="Describe the assignment requirements, instructions, and expectations..."
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Assignment Type
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => handleChange('type', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                >
                                    {assignmentTypes.map(type => (
                                        <option key={type.value} value={type.value}>
                                            {type.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Points *
                                </label>
                                <div className="relative">
                                    <Award className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        value={formData.points}
                                        onChange={(e) => handleChange('points', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                                        min="0"
                                        max="1000"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Submissions
                                </label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="number"
                                        value={formData.maxSubmissions}
                                        onChange={(e) => handleChange('maxSubmissions', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                                        min="1"
                                        max="10"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Date *
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => handleChange('dueDate', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Due Time *
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                    <input
                                        type="time"
                                        value={formData.dueTime}
                                        onChange={(e) => handleChange('dueTime', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 pl-10"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <div className="font-medium text-gray-800">Allow Late Submissions</div>
                                <div className="text-sm text-gray-600">With penalty deduction</div>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.allowLateSubmission}
                                    onChange={(e) => handleChange('allowLateSubmission', e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        {formData.allowLateSubmission && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Late Penalty (% per day)
                                </label>
                                <input
                                    type="number"
                                    value={formData.latePenalty}
                                    onChange={(e) => handleChange('latePenalty', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3"
                                    min="0"
                                    max="100"
                                    step="5"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Attachments */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Attachments</h2>

                    <div className="space-y-4">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <Upload size={24} className="text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Click to upload files</p>
                            <p className="text-xs text-gray-500">PDF, ZIP, Images, Docs (Max 10MB each)</p>
                        </label>

                        {attachments.length > 0 && (
                            <div className="space-y-2">
                                <h4 className="font-medium text-gray-700">Uploaded Files:</h4>
                                {attachments.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Paperclip size={16} className="text-gray-500" />
                                            <div>
                                                <div className="font-medium text-gray-800">{file.name}</div>
                                                <div className="text-sm text-gray-500">{file.size}</div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => removeAttachment(index)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Grading Rubric */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Grading Rubric</h2>
                        <button
                            type="button"
                            onClick={addRubricCriteria}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                        >
                            <Plus size={16} />
                            Add Criteria
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.rubric.map((criteria, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Criteria
                                    </label>
                                    <input
                                        type="text"
                                        value={criteria.criteria}
                                        onChange={(e) => handleRubricChange(index, 'criteria', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        placeholder="e.g., Code Quality"
                                    />
                                </div>

                                <div className="w-32">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Weight (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={criteria.weight}
                                        onChange={(e) => handleRubricChange(index, 'weight', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        min="0"
                                        max="100"
                                    />
                                </div>

                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        value={criteria.description}
                                        onChange={(e) => handleRubricChange(index, 'description', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        placeholder="e.g., Clean, well-commented code"
                                    />
                                </div>

                                {formData.rubric.length > 1 && (
                                    <div className="flex items-end">
                                        <button
                                            type="button"
                                            onClick={() => removeRubricCriteria(index)}
                                            className="p-2 text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-3">
                            <AlertCircle size={20} className="text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-blue-800">Rubric Tips</h4>
                                <p className="text-sm text-blue-700 mt-1">
                                    Total weight should add up to 100%. Be specific in descriptions to ensure consistent grading.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end gap-3">
                    <Link href={`/courses/${courseId}/groups/${groupId}/assignments`}>
                        <button
                            type="button"
                            className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                    </Link>

                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Create Assignment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewAssignmentPage;