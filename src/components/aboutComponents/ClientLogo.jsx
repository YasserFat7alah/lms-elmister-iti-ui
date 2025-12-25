"use client"

import { HiSparkles, HiAcademicCap, HiBookOpen, HiGlobe, HiLibrary, HiPencil, HiLightningBolt } from "react-icons/hi"

export function ClientLogo() {
  const partners = [
    { name: "Cambridge", icon: HiAcademicCap, color: "text-blue-600" },
    { name: "Oxford", icon: HiBookOpen, color: "text-purple-600" },
    { name: "IB Program", icon: HiGlobe, color: "text-green-600" },
    { name: "Pearson", icon: HiLibrary, color: "text-orange-600" },
    { name: "Scholastic", icon: HiPencil, color: "text-pink-600" },
    { name: "Khan Academy", icon: HiLightningBolt, color: "text-indigo-600" },
  ]

  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full mb-4">
            <HiSparkles className="text-purple-600" />
            <span className="text-sm font-semibold text-purple-600 tracking-wide uppercase">Trusted Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Partnered with Leading
            <span className="block text-purple-600">Educational Institutions</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We collaborate with renowned educational organizations to bring world-class learning resources to our students.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner) => {
            const Icon = partner.icon
            return (
              <div
                key={partner.name}
                className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl hover:bg-purple-50 hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <Icon className={`w-10 h-10 ${partner.color} mb-3 group-hover:scale-110 transition-transform`} />
                <span className="font-semibold text-gray-700 group-hover:text-purple-600 transition-colors text-center text-sm">
                  {partner.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
