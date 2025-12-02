"use client"

export function StatsSection() {
  const stats = [
    { label: "Clients", value: "831" },
    { label: "Projects", value: "27k" },
    { label: "Employees", value: "72" },
    { label: "Success Rate", value: "99.2%" },
    { label: "Awards", value: "57" },
  ]

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#FF4667] mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
