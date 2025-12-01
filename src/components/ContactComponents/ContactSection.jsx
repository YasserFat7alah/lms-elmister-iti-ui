"use client"

import { useState } from "react"
import { FaPhone, FaEnvelope, FaClock } from "react-icons/fa"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("[v0] Form submitted:", formData)
  }

  const contactInfo = [
    {
      icon: FaPhone,
      label: "PHONE NUMBER",
      details: "+1 (555) 123-4567",
    },
    {
      icon: FaEnvelope,
      label: "EMAIL ADDRESS",
      details: "hello@etutorapp.com",
    },
    {
      icon: FaClock,
      label: "WORKING HOURS",
      details: "Mon - Fri: 9AM to 6PM",
    },
  ]

  return (
    <div className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">Contact Us</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We're here to help. Reach out with any questions and we'll respond as soon as possible.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Contact Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in touch</h3>
            <div className="space-y-8">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className="flex gap-4">
                    <div className="text-[#FF4667] text-2xl mt-1">
                      <IconComponent />
                    </div>
                    <div>
                      <p className="text-[#FF4667] font-bold text-sm mb-1">{item.label}</p>
                      <p className="text-gray-900 font-semibold">{item.details}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4667]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4667]"
                  placeholder="Your email"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4667]"
                  placeholder="Your phone"
                />
              </div>
              <div>
                <label className="block text-gray-900 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4667]"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#FF4667] hover:bg-[#e93d5b] text-white font-semibold py-3 px-6 rounded transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}