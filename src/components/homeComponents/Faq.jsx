"use client"

import { useState } from "react"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "What is El-Mister platform?",
      answer:
        "El-Mister is an online private lessons management platform that connects teachers, students, and parents, helping manage courses, sessions, attendance, and assignments efficiently.",
    },
    {
      question: "How can parents subscribe to lessons?",
      answer:
        "Parents can subscribe to lessons by creating a family account, adding their children, and selecting the desired courses from the dashboard.",
    },
    {
      question: "Can teachers track attendance?",
      answer: "Yes, teachers can take and track attendance for all their sessions through their dashboard.",
    },
    {
      question: "How are assignments managed and evaluated?",
      answer:
        "Teachers and parents can upload assignments, and AI tools can assist in evaluating them and providing feedback.",
    },
    {
      question: "What features does the admin have?",
      answer:
        "Admins can manage teachers, courses, and parents, track assignments and grades, and handle feedback and support requests.",
    },
    {
      question: "Can students join online and offline sessions?",
      answer: "Yes, students can join both online and offline sessions for the courses they are enrolled in.",
    },
    {
      question: "How can parents track grades and attendance?",
      answer:
        "Parents can monitor their children's progress, attendance, and grades through their family account dashboard.",
    },
    {
      question: "Is the teacher profile verified?",
      answer: "Yes, all teacher profiles undergo verification to ensure quality and reliability of the lessons.",
    },
  ]

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="w-full bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-black mb-2">FAQ</h2>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-300">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center gap-4 py-4 hover:bg-gray-50 transition-colors"
              >
                <span className="text-left text-black text-base">{faq.question}</span>
                <span className="text-black text-lg flex-shrink-0 font-bold">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="pb-4">
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}