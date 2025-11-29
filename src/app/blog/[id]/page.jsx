
//ابحث عن esam ahmed  وحط الرابط بتاع env url بدل ما هو مكتوب كده
'use client';

import { mockPosts } from "@/data/mockPosts";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from 'react';

import { getPostInteractions, toggleLike, addComment, likeComment } from "@/utils/blogInteractions";

import { validateComment } from "@/utils/validation";

/**
 * صفحة عرض تفاصيل البوست مع نظام التفاعلات
 */
export default function BlogDetailsPage({ params }) {
  const [post, setPost] = useState(null);
  const [interactions, setInteractions] = useState({ likes: 0, comments: [], userLiked: false });
  const [loading, setLoading] = useState(true);
  const [commentForm, setCommentForm] = useState({ name: '', email: '', comment: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // كومنتات افتراضية للعرض الأولي
  const defaultComments = [
    {
      id: 1,
      name: "Mohamed Ahmed",
      email: "mohamed@example.com",
      comment: "This is a very insightful article! I've been using these teaching methods in my classroom and the results are amazing.",
      date: "2024-01-16T10:30:00Z",
      likes: 5
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      comment: "Great points about collaborative learning. Do you have any resources for implementing project-based learning in science classes?",
      date: "2024-01-16T14:20:00Z",
      likes: 3
    }
  ];

  // تحميل البيانات عند فتح الصفحة
  useEffect(() => {
    const loadData = async () => {
      const { id } = await params;
      
      // البحث عن البوست
      const foundPost = mockPosts.find((p) => p.id.toString() === id);
      setPost(foundPost);

      // تحميل التفاعلات
      if (foundPost) {
        const postInteractions = getPostInteractions(id);
        
        // دمج الكومنتات الافتراضية مع المحفوظة
        const allComments = [
          ...(postInteractions.comments || []),
          ...defaultComments.filter(defaultComment => 
            !postInteractions.comments?.some(savedComment => savedComment.id === defaultComment.id)
          )
        ];
        
        setInteractions({
          ...postInteractions,
          comments: allComments
        });
      }
      
      setLoading(false);
    };

    loadData();
  }, [params]);

  // التعامل مع الإعجاب على البوست
  const handleLike = () => {
    if (!post) return;
    
    const updatedInteractions = toggleLike(post.id.toString());
    if (updatedInteractions) {
      setInteractions(updatedInteractions);
    }
  };

  // التعامل مع إرسال الكومنت
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!post) return;

    // التحقق من صحة البيانات
    const validation = validateComment(commentForm);
    setFormErrors(validation.errors);

    if (!validation.isValid) return;

    setSubmitting(true);
    
    try {
      const newComment = addComment(post.id.toString(), {
        name: commentForm.name,
        email: commentForm.email,
        comment: commentForm.comment
      });

      if (newComment) {
        // تحديث القائمة بإضافة الكومنت الجديد
        setInteractions(prev => ({
          ...prev,
          comments: [newComment, ...prev.comments]
        }));

        // مسح النموذج
        setCommentForm({ name: '', email: '', comment: '' });
        setFormErrors({});
        
        // رسالة نجاح
        alert('Comment added successfully!');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Error adding comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // التعامل مع الإعجاب على الكومنت
  const handleCommentLike = (commentId) => {
    if (!post) return;
    
    likeComment(post.id.toString(), commentId);
    
    // تحديث الواجهة
    setInteractions(prev => ({
      ...prev,
      comments: prev.comments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: (comment.likes || 0) + 1 }
          : comment
      )
    }));
  };

  // التعامل مع تغيير حقول النموذج
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentForm({
      ...commentForm,
      [name]: value
    });
    
    // مسح خطأ الحقل عند الكتابة
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  // حالة التحميل
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  // حالة عدم وجود البوست
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">
          Post not found
        </h1>
        <p className="text-gray-500">This blog article does not exist.</p>
        <Link 
          href="/blog" 
          className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-10 max-w-4xl">

        {/* زر العودة */}
        <section className="mb-6">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </section>

        {/* صورة البوست */}
        <section className="mb-8">
          <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={post.image || "/default-blog.jpg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* التصنيف وزر الإعجاب */}
        <section className="mb-4 flex justify-between items-center">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
          
          {/* زر الإعجاب */}
          <button 
            onClick={handleLike}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              interactions.userLiked 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg 
              className={`w-5 h-5 ${interactions.userLiked ? 'fill-current' : ''}`} 
              fill={interactions.userLiked ? "currentColor" : "none"} 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="font-medium">{interactions.likes} Likes</span>
          </button>
        </section>

        {/* عنوان البوست */}
        <section className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
        </section>

        {/* معلومات البوست */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">By: {post.author}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                Published on: {new Date(post.date).toLocaleDateString("en-US", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </section>

        {/* محتوى البوست */}
        <section className="mb-8">
          <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {post.content.includes('<') ? (
              <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {post.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </article>
        </section>

        {/* قسم الكومنتات */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            {/* عنوان القسم */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Comments ({interactions.comments.length})
              </h2>
              <div className="text-sm text-gray-500">
                Join the discussion
              </div>
            </div>

            {/* نموذج إضافة كومنت */}
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add a Comment
              </h3>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={commentForm.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Your name"
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={commentForm.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                    Comment *
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows="4"
                    value={commentForm.comment}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.comment ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Share your thoughts..."
                  ></textarea>
                  {formErrors.comment && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.comment}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {submitting ? 'Posting...' : 'Post Comment'}
                </button>
              </form>
            </div>

            {/* قائمة الكومنتات */}
            <div className="space-y-6">
              {interactions.comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start gap-4">
                    {/* صورة المستخدم */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold text-sm">
                          {comment.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    
                    {/* محتوى الكومنت */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                        <span className="text-gray-500 text-sm">
                          {new Date(comment.date).toLocaleDateString("en-US", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {comment.comment}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <button 
                          onClick={() => handleCommentLike(comment.id)}
                          className="text-sm text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          Like ({comment.likes || 0})
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* رسالة إذا لا توجد كومنتات */}
            {interactions.comments.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 text-6xl mb-4">💬</div>
                <p className="text-gray-500 text-lg">No comments yet</p>
                <p className="text-gray-400 text-sm mt-2">Be the first to share your thoughts!</p>
              </div>
            )}
          </div>
        </section>

         {/* سكشن أزرار المشاركة */}
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Link
              href="/blog"
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center w-full sm:w-auto"
            >
              ← Back to Blog
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">Share this article:</span>
              <div className="flex items-center gap-3">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`esam ahmed env url /blog/${post.id}`)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`esam ahmed env url /blog/${post.id}`)}&text=${encodeURIComponent(post.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.51 2.02-4.51 4.5 0 .38.03.76.09 1.13A13.11 13.11 0 011.1 7.74a5 5 0 00.6 3.06A3.57 3.57 0 01.35 11.72a6.65 6.65 0 00.93.09c1.3 0 2.4-.42 3.22-1.37a.84.84 0 00.1-.1l1.72-.66a5.42 5.42 0 01.81 3.46A10.9 10.9 0 0123 3z" />
                  </svg>
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`esam ahmed env url /blog/${post.id}`)}&title=${encodeURIComponent(post.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.025-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.352V9h3.414v1.561h.049c.476-.954 1.637-1.852 3.37-1.852 3.602 0 4.268 2.37 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* سكشن المقالات ذات الصلة */}
        <section className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockPosts
              .filter(p => p.id !== post.id && p.category === post.category)
              .slice(0, 2)
              .map(relatedPost => (
                <Link 
                  key={relatedPost.id} 
                  href={`/blog/${relatedPost.id}`}
                  className="block bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
                >
                  <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{relatedPost.author}</span>
                    <span>
                      {new Date(relatedPost.date).toLocaleDateString('en-US')}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
}