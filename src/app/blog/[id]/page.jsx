// src/app/blog/[id]/page.jsx
import { mockPosts } from "@/data/mockPosts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const post = mockPosts.find(p => p.id.toString() === params.id);
  
  if (!post) {
    return {
      title: "this article not found -",
    };
  }

  return {
    title: `${post.title} - The Imam's Platform`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return mockPosts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default function BlogPostPage({ params }) {
  const post = mockPosts.find(p => p.id.toString() === params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* back button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/blog">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              back to blog
            </Link>
          </Button>
        </div>

        <div className="relative h-80 w-full mb-8 rounded-xl overflow-hidden shadow-lg">
          <Image
            src={post.image || "/images/default-blog.jpg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          />
        </div>

        <article className="max-w-none">
          <header className="mb-8 text-center border-b border-gray-200 pb-6">
            <div className="mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <span>✍️</span>
                <span>by: {post.author}</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{new Date(post.date).toLocaleDateString('ar-EG', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </header>

          <div 
            className="prose prose-lg max-w-none text-right text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* share */}
          <footer className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button asChild variant="outline">
                <Link href="/blog">
                  back to blog 
                </Link>
              </Button>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>شارك هذا المقال:</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">📱</Button>
                  <Button variant="ghost" size="sm">💬</Button>
                  <Button variant="ghost" size="sm">📤</Button>
                </div>
              </div>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}