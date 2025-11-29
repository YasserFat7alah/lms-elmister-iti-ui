import { mockPosts } from "@/data/mockPosts";
import BlogCard from "@/components/blog/BlogCard";

export const metadata = {
  title: "The Blog - The Imam's Platform",
  description: "Develop your teaching skills and stay up-to-date with the latest trends in education.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Teacher blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Explore the latest articles and educational resources to develop your teaching skills
            and stay up-to-date with the latest trends in education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {mockPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
{/* show when no articles */}
        {mockPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <p className="text-gray-500 text-lg">No articles are currently available.</p>
            <p className="text-gray-400 text-sm mt-2">New articles will be added soon.</p>
          </div>
        )}

{/* pagination of we need it */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            show {mockPosts.length} article {mockPosts.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}