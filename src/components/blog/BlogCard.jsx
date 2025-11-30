'use client';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="relative h-48 w-full">
        <Image
          src={post.image || "/default-blog.jpg"}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-sm">
            {post.category}
          </span>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-right line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-gray-600 text-right text-sm line-clamp-3 mb-3">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span className="font-medium">{post.author}</span>
          <span>{new Date(post.date).toLocaleDateString('ar-EG')}</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <Link href={`/blog/${post.id}`}>
            Read More.
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}