"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function Features() {
  const roles = [
    {
      name: "Teacher",
      description: "Build courses",
      features: ["Create courses", "Manage students", "Set assignments", "Track grades"],
    },
    {
      name: "Student",
      description: "Learn online",
      features: ["Take courses", "Submit work", "View grades", "Get certificates"],
    },
    {
      name: "Parent",
      description: "Track progress",
      features: ["Monitor grades", "View progress", "Get updates", "Chat teachers"],
    },
    {
      name: "Admin",
      description: "Manage platform",
      features: ["Manage users", "View reports", "System settings", "Content control"],
    },
  ]

  return (
    <section className="w-full py-12 px-4 bg-[#F5E6D3]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">For Everyone</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                {/* Role Icon Circle */}
                <div className="w-12 h-12 bg-[#D97706] rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg font-bold">{role.name.charAt(0)}</span>
                </div>

                {/* Role Name */}
                <CardTitle>{role.name}</CardTitle>
              </CardHeader>

              <CardContent>
                <ul className="text-sm text-gray-600 space-y-1">
                  {role.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#D97706] mr-2">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
