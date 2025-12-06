'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PlusCircle, BookTemplate, History, Share } from 'lucide-react'

export default function HomePage() {
  const [BookTemplates, setBookTemplates] = useState([])

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Lesson Builder</h1>
        <p className="text-gray-600 mt-2">Design interactive lessons easily and quickly</p>
      </header>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link
          href="/lesson-builder/editor"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <PlusCircle className="w-8 h-8 text-primary-500" />
            <span className="text-sm text-gray-500">New</span>
          </div>
          <h3 className="font-semibold text-lg">Create New Lesson</h3>
          <p className="text-gray-600 text-sm mt-2">Start from scratch</p>
        </Link>

        <Link
          href="/BookTemplates"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <BookTemplate className="w-8 h-8 text-green-500" />
            <span className="text-sm text-gray-500">Templates</span>
          </div>
          <h3 className="font-semibold text-lg">Use a Template</h3>
          <p className="text-gray-600 text-sm mt-2">Choose from ready-made templates</p>
        </Link>

        <Link
          href="/history"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <History className="w-8 h-8 text-purple-500" />
            <span className="text-sm text-gray-500">History</span>
          </div>
          <h3 className="font-semibold text-lg">Previous Lessons</h3>
          <p className="text-gray-600 text-sm mt-2">Review and edit</p>
        </Link>

        <Link
          href="/shared"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <Share className="w-8 h-8 text-orange-500" />
            <span className="text-sm text-gray-500">Share</span>
          </div>
          <h3 className="font-semibold text-lg">Shared Lessons</h3>
          <p className="text-gray-600 text-sm mt-2">From your team or community</p>
        </Link>
      </div>

      {/* Recent BookTemplates */}
      {BookTemplates.length > 0 && (
        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BookTemplates.slice(0, 3).map(BookTemplate => (
              <div key={BookTemplate.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <h4 className="font-medium">{BookTemplate.name}</h4>
                <p className="text-sm text-gray-500">{BookTemplate.updatedAt}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}