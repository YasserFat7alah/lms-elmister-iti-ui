"use client";
import { useState } from "react";
import Image from "next/image";
import { HiQuestionMarkCircle, HiChevronDown } from "react-icons/hi";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

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
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white py-20 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image Column */}
          <div className="hidden lg:block order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-linear-to-br from-purple-100 to-pink-100 rounded-3xl blur-3xl opacity-60 -z-10"></div>
              <img
                src="https://res.cloudinary.com/dcrps0oeu/image/upload/v1764623480/ImageContainer_xysdoi.png"
                alt="El-Mister Support Team"
                width={600}
                height={600}
                className="rounded-3xl shadow-2xl object-cover w-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* FAQ Content Column */}
          <div className="order-1 lg:order-2">

            {/* Header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
                <HiQuestionMarkCircle className="text-purple-600 text-xl" />
                <span className="text-sm font-semibold text-purple-600 tracking-wide uppercase">Support</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Frequently Asked
                <span className="block text-purple-600">Questions</span>
              </h2>

              <p className="text-xl text-gray-600 leading-relaxed">
                Find quick answers to common questions about our platform and services.
              </p>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden hover:border-purple-200 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center gap-4 p-6 text-left group"
                  >
                    <span className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors text-lg">
                      {faq.question}
                    </span>
                    <HiChevronDown
                      className={`flex-shrink-0 w-6 h-6 text-purple-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <div className="px-6 pb-6 pt-2">
                      <p className="text-gray-600 leading-relaxed text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 p-6 bg-purple-50 rounded-2xl border border-purple-100">
              <p className="text-gray-700 font-medium mb-2">Still have questions?</p>
              <p className="text-gray-600 text-sm mb-4">
                Our support team is here to help you get the most out of El-Mister.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
              >
                Contact Support
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}