"use client"

import { useState } from "react"
import { FaChevronDown } from "react-icons/fa"

const faqs = [
  {
    question: "What problem does the platform solve?",
    answer:
      "Our platform solves the lack of transparency in private education by connecting parents, teachers, and students in one system. It eliminates manual work and provides real-time visibility into attendance, assignments, and performance.",
  },
  {
    question: "How can parents track their children’s progress?",
    answer:
      "Parents get a dedicated dashboard where they can monitor attendance, grades, assignments, payments, and receive instant notifications about their child’s performance and activities.",
  },
  {
    question: "What tools are available for teachers?",
    answer:
      "Teachers can manage courses, schedule online and offline sessions, track attendance, assign homework, evaluate assignments using AI, and communicate easily with parents and students.",
  },
  {
    question: "What features does the student portal include?",
    answer:
      "Students have access to their sessions, assignments, performance dashboard, submission history, and feedback from teachers in one organized place.",
  },
  {
    question: "Does the platform support online and offline classes?",
    answer:
      "Yes, the platform supports both online and offline classes, allowing teachers to manage attendance, sessions, and assignments regardless of the teaching format.",
  },
  {
    question: "How does AI-based assignment evaluation work?",
    answer:
      "Our AI system helps teachers evaluate assignments faster by providing automated grading suggestions and performance insights, while still allowing full teacher control.",
  },
  {
    question: "Is payment and subscription management included?",
    answer:
      "Yes, the platform includes secure payment integration, subscription management, and automated payment notifications for parents.",
  },
  {
    question: "How does the platform improve communication?",
    answer:
      "It creates transparent communication between parents, teachers, and students through real-time updates, notifications, and centralized data—eliminating misunderstandings and gaps.",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className=" mt-4 mb-4 w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((item, index) => (
        <div
          key={index}
          className="border border-border rounded-lg overflow-hidden bg-card"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent transition-colors"
          >
            <span className="font-medium text-foreground">
              {item.question}
            </span>

            <FaChevronDown
              className={`text-muted-foreground transition-transform duration-200 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-200 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-6 py-4 text-muted-foreground border-t border-border">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}