"use client"

export function ClientLogo() {
  const clients = [
    { name: "Netflix", logo: "🎬" },
    { name: "MLB", logo: "⚾" },
    { name: "Google", logo: "🔍" },
    { name: "Lenovo", logo: "💻" },
    { name: "Slack", logo: "💬" },
    { name: "Vimeo", logo: "🎥" },
    { name: "Amazon", logo: "📦" },
    { name: "Microsoft", logo: "🪟" },
  ]

  return (
    <section className="py-12 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">We and keep growing with 28 Companies</h2>
          <p className="text-gray-600">Trusted by industry leaders and innovative startups</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-3xl mr-2">{client.logo}</span>
              <span className="font-medium text-gray-700">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
