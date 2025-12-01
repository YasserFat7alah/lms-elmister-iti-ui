"use client";
import { useState } from "react";
import Image from "next/image";

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
    <section className="w-full bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* الصورة على الشمال */}
          <div className="hidden lg:block order-1">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl blur-3xl opacity-60 -z-10"></div>
              <Image
                src="/ImageContainer.png"      
                alt="El-Mister Team"
                width={600}
                height={600}
                className="rounded-3xl shadow-2xl object-cover w-full"
              />
             
            </div>
          </div>
          </div>

          {/* الأكورديون على اليمين */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-4xl font-black text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mb-10">
              Explore detailed answers to the most common questions about our platform.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center gap-4 py-3 text-left hover:text-[#FF4667] transition-colors group"
                  >
                    <span className="font-medium text-gray-800 group-hover:text-[#FF4667]">
                      {faq.question}
                    </span>
                    <span className="text-2xl font-bold text-[#FF4667]">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="mt-3 pb-2">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}