"use client";
import Image from "next/image";
import { FiCalendar, FiUser } from "react-icons/fi";

export default function Blog() {
  const posts = [
    {
      title: "Mastering Programming with a Technical Mentor",
      excerpt: "Learning to code can be overwhelming, but a mentor can make the journey smoother...",
      author: "Reni Sarow",
      authorAvatar: "/AuthorImageContainer.png",
      date: "09 Aug 2025",
      image: "/article1.png",
    },
    {
      title: "How to Level Up Your Coding Skills with the Help of a Mentor",
      excerpt: "Whether you're a beginner or an advanced coder, this blog will explore how...",
      author: "Christoper Daniel",
      authorAvatar: "/Instructor 7.png",
      date: "15 Jul 2025",
      image: "/article2.png",
    },
    {
      title: "Navigating the Tech World: The Ultimate Guide",
      excerpt: "The tech industry is vast and ever-changing, but a mentor can help you stay ahead...",
      author: "Andrew Jermi",
      authorAvatar: "/blog1.png",
      date: "20 Jun 2025",
      image: "/article3.png",
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-white to-purple-50 py-10 md:py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
            Blog
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Latest Articles & News
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore curated content to enlighten, entertain and engage global readers.
          </p>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {posts.map((post, index) => (
            <article
              key={index}
              className={`
                group cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500
                ${post.featured ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
                ${post.featured ? "lg:scale-110" : ""}
              `}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={post.featured ? 500 : 300}
                  className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  priority={post.featured}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-6 md:p-8">
                <h3 className={`font-bold text-gray-900 mb-3 leading-tight ${post.featured ? "text-2xl" : "text-lg"}`}>
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Author + Date  */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      width={36}
                      height={36}
                      className="rounded-full ring-2 ring-white shadow"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{post.author}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4 text-gray-500" />
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}