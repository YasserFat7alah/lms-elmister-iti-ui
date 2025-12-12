// /app/dashboard/teacher/courses/[id]/groups/[groupId]/lessons/[lessonId]/edit/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import { mockLessons, mockGroups, mockCourses } from '@/utils/mockData';

export default function EditLessonPage({ params }) {
  const router = useRouter();
  const { id: courseId, groupId, lessonId } = use(params);
  
  const [lesson, setLesson] = useState(null);
  const [group, setGroup] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: {
      type: 'video',
      url: '',
      duration: '',
      resources: []
    },
    order: 1,
    isPublished: true,
    scheduledDate: ''
  });

  useEffect(() => {
    if (!courseId || !groupId || !lessonId) return;

    // جلب البيانات من mock data
    const foundCourse = mockCourses.find(c => c.id === courseId);
    const foundGroup = mockGroups.find(g => g.id === groupId && g.courseId === courseId);
    const foundLesson = mockLessons.find(l =>
      l.id === lessonId && l.courseId === courseId && l.groupId === groupId
    );

    if (foundCourse && foundGroup && foundLesson) {
      setCourse(foundCourse);
      setGroup(foundGroup);
      setLesson(foundLesson);
      
      // تعبئة نموذج التعديل
      setFormData({
        title: foundLesson.title,
        description: foundLesson.description,
        content: {
          type: foundLesson.content.type,
          url: foundLesson.content.url || '',
          duration: foundLesson.content.duration || '',
          resources: foundLesson.content.resources || []
        },
        order: foundLesson.order,
        isPublished: foundLesson.isPublished,
        scheduledDate: foundLesson.scheduledDate
      });
    }
    
    setLoading(false);
  }, [courseId, groupId, lessonId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('content.')) {
      const contentField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        content: {
          ...prev.content,
          [contentField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // محاكاة API call لحفظ البيانات
      console.log('Saving lesson:', formData);
      
      // تأخير لمحاكاة عملية الحفظ
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // بعد الحفظ، الرجوع لصفحة الدرس
      router.push(`/dashboard/teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}`);
    } catch (error) {
      console.error('Error saving lesson:', error);
      alert('Failed to save lesson. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddResource = () => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        resources: [...prev.content.resources, { name: '', type: 'pdf', url: '' }]
      }
    }));
  };

  const handleResourceChange = (index, field, value) => {
    const updatedResources = [...formData.content.resources];
    updatedResources[index] = {
      ...updatedResources[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        resources: updatedResources
      }
    }));
  };

  const handleRemoveResource = (index) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        resources: prev.content.resources.filter((_, i) => i !== index)
      }
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!course || !group || !lesson) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lesson not found</h2>
          <Link 
            href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/lessons`}
            className="text-blue-600 hover:text-blue-800"
          >
            Back to lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-gray-600 mb-4">
            <Link href="/dashboard/teacher/courses" className="hover:text-blue-600">
              Courses
            </Link>
            <span className="mx-2">›</span>
            <Link href={`/dashboard/teacher/courses/${courseId}`} className="hover:text-blue-600">
              {course.title}
            </Link>
            <span className="mx-2">›</span>
            <Link href={`/dashboard/teacher/courses/${courseId}/groups`} className="hover:text-blue-600">
              Groups
            </Link>
            <span className="mx-2">›</span>
            <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/lessons`} className="hover:text-blue-600">
              {group.name} Lessons
            </Link>
            <span className="mx-2">›</span>
            <Link href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}`} className="hover:text-blue-600">
              {lesson.title}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-blue-600 font-medium">Edit</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Edit Lesson: {lesson.title}
              </h1>
              <p className="text-gray-600 mt-2">
                Make changes to this lesson in {group.name}
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}`}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lesson Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter lesson title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe what students will learn"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lesson Order
                    </label>
                    <input
                      type="number"
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Scheduled Date *
                    </label>
                    <input
                      type="date"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Type & Content */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Type</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {['video', 'article', 'quiz', 'live'].map(type => (
                  <div
                    key={type}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition ${
                      formData.content.type === type
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      content: { ...prev.content, type }
                    }))}
                  >
                    <div className="text-center">
                      <div className={`w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        type === 'video' ? 'bg-red-100 text-red-600' :
                        type === 'article' ? 'bg-green-100 text-green-600' :
                        type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {type === 'video' && '▶️'}
                        {type === 'article' && '📄'}
                        {type === 'quiz' && '❓'}
                        {type === 'live' && '🎥'}
                      </div>
                      <span className="text-sm font-medium capitalize">{type}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Content based on type */}
              {formData.content.type === 'video' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Video URL *
                    </label>
                    <input
                      type="url"
                      name="content.url"
                      value={formData.content.url}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/video"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (HH:MM)
                    </label>
                    <input
                      type="text"
                      name="content.duration"
                      value={formData.content.duration}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="00:45"
                    />
                  </div>
                </div>
              )}

              {formData.content.type === 'article' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article Content *
                  </label>
                  <textarea
                    name="content.content"
                    value={formData.content.content || ''}
                    onChange={handleInputChange}
                    rows="10"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                    placeholder="Write your article content here..."
                    required
                  />
                </div>
              )}

              {formData.content.type === 'live' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Live Session Link *
                    </label>
                    <input
                      type="url"
                      name="content.url"
                      value={formData.content.url}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://meet.google.com/abc-defg-hij"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Resources */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
                <button
                  type="button"
                  onClick={handleAddResource}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  + Add Resource
                </button>
              </div>

              {formData.content.resources.length > 0 ? (
                <div className="space-y-4">
                  {formData.content.resources.map((resource, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium">Resource {index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => handleRemoveResource(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Name</label>
                          <input
                            type="text"
                            value={resource.name}
                            onChange={(e) => handleResourceChange(index, 'name', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            placeholder="Resource name"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">Type</label>
                          <select
                            value={resource.type}
                            onChange={(e) => handleResourceChange(index, 'type', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                          >
                            <option value="pdf">PDF</option>
                            <option value="doc">Document</option>
                            <option value="video">Video</option>
                            <option value="link">Link</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">URL</label>
                          <input
                            type="url"
                            value={resource.url}
                            onChange={(e) => handleResourceChange(index, 'url', e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                            placeholder="https://example.com/resource"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No resources added yet.</p>
              )}
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isPublished"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                    Publish lesson
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowComments"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allowComments" className="ml-2 block text-sm text-gray-900">
                    Allow student comments
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <Link
              href={`/dashboard/teacher/courses/${courseId}/groups/${groupId}/lessons/${lessonId}`}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              disabled={saving}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center ${
                saving ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>

        {/* Danger Zone */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-red-200">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Danger Zone</h3>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Delete this lesson</p>
                <p className="text-sm text-gray-600 mt-1">
                  Once deleted, this lesson cannot be recovered.
                </p>
              </div>
              
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this lesson? This action cannot be undone.')) {
                    // محاكاة حذف الدرس
                    console.log('Deleting lesson:', lessonId);
                    router.push(`/dashboard/teacher/courses/${courseId}/groups/${groupId}/lessons`);
                  }
                }}
                className="mt-4 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete Lesson
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}