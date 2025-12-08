"use client";
import { useParams } from "next/navigation";
import { mockPosts } from "@/data/mockPosts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SingleBlogPage() {
  const { id } = useParams();

  const post = mockPosts.find((p) => p.id.toString() === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Article Not Found</h2>
        <p className="text-gray-600 mb-6">The article you are looking for doesn't exist.</p>
        <Link
          href="/teacher/blog"
          className="px-4 py-2 rounded-lg bg-[#FF0055] text-white font-medium hover:bg-[#d80048]"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] font-sans py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

        <Link
          href="/teacher/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        {/* Image */}
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow">
          <img
            src={post.image || "/default-blog.jpg"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-8 mb-4 leading-snug">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-8">
          <span>✍️ {post.author}</span>
          <span>📅 {post.date}</span>
          <span className="px-3 py-1 bg-pink-100 text-[#FF0055] rounded-full text-xs font-medium">
            {post.category}
          </span>
        </div>

        <div
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 prose max-w-none prose-h2:text-[#FF0055] prose-h2:font-bold prose-h2:mt-8 prose-p:text-gray-700 prose-p:leading-7"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <div className="text-center mt-10 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Teacher Blog – All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
