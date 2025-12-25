"use client"

import { HiLocationMarker } from "react-icons/hi"

export default function MapSection() {
  return (
    <div className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-6">
            <HiLocationMarker className="text-purple-600 text-xl" />
            <span className="text-sm font-semibold text-purple-600 tracking-wide uppercase">Find Us</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Visit Our
            <span className="block text-purple-600">Main Office</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Located at the Information Technology Institute in Tanta, Egypt
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
          <iframe
            title="ITI Tanta Location"
            width="100%"
            height="500"
            frameBorder="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3426.1568532385777!2d30.99935917621241!3d30.82627077453931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7c9006c953031%3A0x657b1b2e39db545b!2sITI%20Tanta!5e0!3m2!1sen!2sus!4v1765516832148!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
