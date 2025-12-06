"use client"

import { AboutSection } from "@/components/InstrcutorDetailsComponents/AboutSection"
import { CoursesSection } from "@/components/InstrcutorDetailsComponents/CoursesSection"
import { EducationSection } from "@/components/InstrcutorDetailsComponents/EducationSection"
import { ExperienceSection } from "@/components/InstrcutorDetailsComponents/ExperienceSection"
import { InstructorHeader } from "@/components/InstrcutorDetailsComponents/InstructorHeader"
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa"

// import { InstructorHeader } from "@/components/sections/instructor-header"
// import { AboutSection } from "@/components/sections/about-section"
// import { EducationSection } from "@/components/sections/education-section"
// import { ExperienceSection } from "@/components/sections/experience-section"
// import { CoursesSection } from "@/components/sections/courses-section"
// import { instructorDetailData } from "@/data/instructor-detail"

 const instructorDetailData = {
  instructor: {
    id: 1,
    name: "Rolando Granger",
    specialty: "UX/UI Design Specialist",
    image: "",//profile picture 
    rating: 4.8,
    reviews: 243,
    bio: "I am a designer with 5+ years of experience in digital design. I have worked on multiple large-scale projects and led cross-functional teams. I am passionate about helping others learn design and build their careers.",
  },
  about: {
    preview:
      "I am a designer with 5+ years of experience in digital design. I have worked on multiple large-scale projects and led cross-functional teams. I am passionate about helping others learn design and build their careers.",
    full: "I am a designer with 5+ years of experience in digital design. I have worked on multiple large-scale projects and led cross-functional teams. I am passionate about helping others learn design and build their careers. Throughout my career, I have collaborated with startups, agencies, and Fortune 500 companies to create meaningful digital experiences. My expertise includes user research, wireframing, prototyping, and design systems.",
  },
  education: [
    {
      degree: "BCA - Bachelor of Computer Applications",
      school: "State University",
      year: "2015 - 2018",
    },
    {
      degree: "MCA - Master of Computer Applications",
      school: "Tech Institute",
      year: "2018 - 2020",
    },
    {
      degree: "Design Communication Fundamentals",
      school: "Design Academy",
      year: "2020 - 2021",
    },
  ],
  experience: [
    {
      position: "Senior Designer",
      company: "Design Studio",
      duration: "Jan 2021 - Present",
    },
    {
      position: "Product Manager",
      company: "Tech Company",
      duration: "Jan 2019 - Dec 2020",
    },
  ],
  courses: [
    {
      id: 1,
      title: "Information About UI/UX Design Course",
      description: "Learn the fundamentals of UI/UX design",
      image: "",
      price: 149,
      subject: "programing",
    },
    {
      id: 2,
      title: "Wireframes for Beginners - Master Wireframing Quickly",
      description: "Master wireframing techniques",
      image: "",
      price: 129,
      subject: "programing",
    },
    {
      id: 3,
      title: "Sketch Icon AI 3: Become an Icon Expert",
      description: "Learn advanced icon design",
      image: "",
      price: 99,
      subject: "programing",
    },
    {
      id: 3,
      title: "Sketch Icon AI 3: Become an Icon Expert",
      description: "Learn advanced icon design",
      image: "",
      price: 99,
      subject: "programing",
    },
    {
      id: 3,
      title: "Sketch Icon AI 3: Become an Icon Expert",
      description: "Learn advanced icon design",
      image: "",
      price: 99,
      subject: "programing",
    },
  ],
  certifications: [ //image of certifications
  ],
  contactDetails: [
    {
      icon: <FaEnvelope size={16} />,
      label: "Email",
      value: "rolando@example.com",
    },
    {
      icon: <FaMapMarkerAlt size={16} />,
      label: "Address",
      value: "123 Park Street, Australia",
    },
    {
      icon: <FaPhone size={16} />,
      label: "Phone",
      value: "+1 (123) 456-7890",
    },
  ],
}

export default function InstructorDetailPage() {
  return (
    <main className="bg-background">
      <div className="bg-gradient-to-r from-pink-50 to-blue-50 py-8">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Home</span>
            <span>/</span>
            <span>Instructor Detail</span>
          </nav>
          <h1 className="text-4xl font-bold">Instructor Detail</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <InstructorHeader instructor={instructorDetailData.instructor} />
            <AboutSection about={instructorDetailData.about} />
            <EducationSection education={instructorDetailData.education} />
            <ExperienceSection experience={instructorDetailData.experience} />
             <CoursesSection courses={instructorDetailData.courses} /> 
          </div>
          <div>
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4">
              <h3 className="text-lg text-[#392C7D] font-bold mb-4">Certifications</h3>
              <div className="flex gap-4 mb-6">
                {instructorDetailData.certifications?.map((cert, idx) => (
                  <img
                    key={idx}
                    src={cert || "/placeholder.svg"}
                    alt="certification"
                    className="w-12 h-12 rounded-full"
                  />
                ))}
              </div>
              <h3 className="text-lg font-bold text-[#392C7D] mb-4">Contact Details</h3>
              <div className="space-y-3">
                {instructorDetailData.contactDetails?.map((contact, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#392C7D] rounded-full flex items-center justify-center text-primary-foreground flex-shrink-0">
                      {contact.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{contact.label}</p>
                      <p className="font-medium">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
