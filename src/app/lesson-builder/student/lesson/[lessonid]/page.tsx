'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

type Lesson = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  // Add other lesson properties as needed
};

export default function StudentLessonPage() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`/api/lessons/${lessonId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lesson');
        }
        const data = await response.json();
        setLesson(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching lesson:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="p-6">
        <p>Lesson not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{lesson.title}</h1>
        <div className="space-x-2">
          <Button variant="outline">Previous Lesson</Button>
          <Button>Next Lesson</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button variant="outline">Mark as Complete</Button>
        <div className="space-x-2">
          <Button variant="outline">Save Progress</Button>
          <Button>Continue</Button>
        </div>
      </div>
    </div>
  );
}
