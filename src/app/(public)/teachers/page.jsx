"use client"

import { FilterSidebar } from "@/components/TeacherComponents/FilterSidebar"
import { TeacherCard } from "@/components/TeacherComponents/TeacherCard"
import { Pagination } from "@/components/TeacherComponents/Pagination"
import { useState, useMemo } from "react"
import CourseBreadcrumb from "@/components/shared/courses/CourseBreadcrumb"

const teachers = [
  {
    _id: "6931b09ada0a1f809a19bac0",
    name: "Yasser Fathallah",
    gender: "male",
    email: "yass@teacher.com",
    role: "teacher",
    emailVerified: false,
    linkedProviders: [],
    createdAt: "2025-12-04T16:02:34.196Z",
    updatedAt: "2025-12-04T16:02:46.058Z",
    username: "yasserfathallah4473",
    __v: 0,
    teacherData: {
      pendingPayouts: 0,
      _id: "6931b0a6da0a1f809a19bac6",
      user: "6931b09ada0a1f809a19bac0",
      bio: "Expert in Mathematics",
      subjects: ["Math", "Mechanics"],
      qualifications: [{ degree: "Bachelor", university: "Alexandria", year: 2019, _id: "6931b0a6da0a1f809a19bac7" }],
      yearsOfExperience: 0,
      isVerified: false,
      totalEarnings: 0,
      balance: 0,
      averageRating: 0,
      totalRatings: 0,
      certificates: [],
      createdAt: "2025-12-04T16:02:46.177Z",
      updatedAt: "2025-12-04T16:02:46.177Z",
      __v: 0
    },
    studentData: null,
    parentData: null,
    id: "6931b09ada0a1f809a19bac0"
  },
  {
    _id: "7931c11ada0b2f809a19baa1",
    name: "Mona Ibrahim",
    gender: "female",
    email: "mona@teacher.com",
    role: "teacher",
    emailVerified: true,
    linkedProviders: ["google"],
    createdAt: "2025-11-21T10:12:20.196Z",
    updatedAt: "2025-11-22T09:11:10.058Z",
    username: "monaiibrahim9821",
    __v: 0,
    teacherData: {
      pendingPayouts: 120,
      _id: "7931c11ada0b2f809a19baa2",
      user: "7931c11ada0b2f809a19baa1",
      bio: "Physics lecturer with passion for teaching",
      subjects: ["Physics", "Science"],
      qualifications: [{ degree: "Master", university: "Cairo University", year: 2018, _id: "7931c11ada0b2f809a19baa3" }],
      yearsOfExperience: 5,
      isVerified: true,
      totalEarnings: 12500,
      balance: 2500,
      averageRating: 4.8,
      totalRatings: 140,
      certificates: [],
      createdAt: "2025-11-21T10:13:20.177Z",
      updatedAt: "2025-11-21T10:13:20.177Z",
      __v: 0
    },
    studentData: null,
    parentData: null,
    id: "7931c11ada0b2f809a19baa1"
  },
  {
    _id: "8931d22ada0c3f809a19bbd9",
    name: "Omar El-Sayed",
    gender: "male",
    email: "omar@teacher.com",
    role: "teacher",
    emailVerified: false,
    linkedProviders: [],
    createdAt: "2025-10-02T08:30:10.196Z",
    updatedAt: "2025-10-02T08:31:22.058Z",
    username: "omarelsayed5520",
    __v: 0,
    teacherData: {
      pendingPayouts: 60,
      _id: "8931d22ada0c3f809a19bbda",
      user: "8931d22ada0c3f809a19bbd9",
      bio: "Chemistry specialist",
      subjects: ["Chemistry", "Biology"],
      qualifications: [{ degree: "Bachelor", university: "Ain Shams University", year: 2017, _id: "8931d22ada0c3f809a19bbdb" }],
      yearsOfExperience: 3,
      isVerified: false,
      totalEarnings: 7200,
      balance: 300,
      averageRating: 4.3,
      totalRatings: 88,
      certificates: [],
      createdAt: "2025-10-02T08:31:40.177Z",
      updatedAt: "2025-10-02T08:31:40.177Z",
      __v: 0
    },
    studentData: null,
    parentData: null,
    id: "8931d22ada0c3f809a19bbd9"
  },

  {
    _id: "9931e33ada0d4f809a19bbc1",
    name: "Sara Mahmoud",
    gender: "female",
    email: "sara@teacher.com",
    role: "teacher",
    emailVerified: true,
    linkedProviders: ["google"],
    createdAt: "2025-09-10T11:00:00.000Z",
    updatedAt: "2025-09-11T12:00:00.000Z",
    username: "saramahmoud101",
    __v: 0,
    teacherData: {
      pendingPayouts: 80,
      _id: "9931e33ada0d4f809a19bbc2",
      user: "9931e33ada0d4f809a19bbc1",
      bio: "English Literature lecturer",
      subjects: ["English", "Literature"],
      qualifications: [{ degree: "Master", university: "Ain Shams", year: 2016, _id: "9931e33ada0d4f809a19bbc3" }],
      yearsOfExperience: 7,
      isVerified: true,
      totalEarnings: 15000,
      balance: 5000,
      averageRating: 4.9,
      totalRatings: 200,
      certificates: [],
      createdAt: "2025-09-10T11:01:00.000Z",
      updatedAt: "2025-09-10T11:01:00.000Z",
      __v: 0
    },
    studentData: null,
    parentData: null,
    id: "9931e33ada0d4f809a19bbc1"
  },

  {
    _id: "a031f44ada1e5f809a19bbf2",
    name: "Ali Hassan",
    gender: "male",
    email: "ali@teacher.com",
    role: "teacher",
    emailVerified: false,
    linkedProviders: [],
    createdAt: "2025-08-05T09:20:00.000Z",
    updatedAt: "2025-08-06T10:30:00.000Z",
    username: "alihassan202",
    __v: 0,
    teacherData: {
      pendingPayouts: 50,
      _id: "a031f44ada1e5f809a19bbf3",
      user: "a031f44ada1e5f809a19bbf2",
      bio: "History teacher",
      subjects: ["History", "Geography"],
      qualifications: [{ degree: "Bachelor", university: "Cairo University", year: 2015, _id: "a031f44ada1e5f809a19bbf4" }],
      yearsOfExperience: 4,
      isVerified: false,
      totalEarnings: 9000,
      balance: 400,
      averageRating: 4.2,
      totalRatings: 120,
      certificates: [],
      createdAt: "2025-08-05T09:21:00.000Z",
      updatedAt: "2025-08-05T09:21:00.000Z",
      __v: 0
    },
    studentData: null,
    parentData: null,
    id: "a031f44ada1e5f809a19bbf2"
  },

  {
    _id: "b041g55ada2f6f809a19bc01",
    name: "Laila Ahmed",
    gender: "female",
    email: "laila@teacher.com",
    role: "teacher",
    emailVerified: true,
    linkedProviders: ["facebook"],
    createdAt: "2025-07-15T08:10:00.000Z",
    updatedAt: "2025-07-16T09:15:00.000Z",
    username: "lailaahmed303",
    __v: 0,
    teacherData: {
      pendingPayouts: 70,
      _id: "b041g55ada2f6f809a19bc02",
      user: "b041g55ada2f6f809a19bc01",
      bio: "Computer Science lecturer",
      subjects: ["Computer Science", "Programming"],
      qualifications: [{ degree: "Master", university: "Alexandria", year: 2019, _id: "b041g55ada2f6f809a19bc03" }],
      yearsOfExperience: 6,
      isVerified: true,
      totalEarnings: 20000,
      balance: 6000,
      averageRating: 4.7,
      totalRatings: 180,
      certificates: [],
      createdAt: "2025-07-15T08:11:00.000Z",
      updatedAt: "2025-07-15T08:11:00.000Z",
      __v: 0
    },
    studentData: null,
    parentData: null,
    id: "b041g55ada2f6f809a19bc01"
  },

  {
    _id: "c051h66ada3g7f809a19bc14",
    name: "Hassan Tarek",
    gender: "male",
    email: "hassan@teacher.com",
    role: "teacher",
    emailVerified: true,
    linkedProviders: ["google"],
    createdAt: "2025-06-10T07:05:00.000Z",
    updatedAt: "2025-06-11T08:10:00.000Z",
    username: "hassantarek404",
    __v: 0,
    teacherData: {
      pendingPayouts: 30,
      _id: "c051h66ada3g7f809a19bc15",
      user: "c051h66ada3g7f809a19bc14",
      bio: "Math and Physics tutor",
      subjects: ["Math", "Physics"],
      qualifications: [{ degree: "Bachelor", university: "Cairo University", year: 2014, _id: "c051h66ada3g7f809a19bc16" }],
      yearsOfExperience: 5,
      isVerified: true,
      totalEarnings: 11000,
      balance: 500,
      averageRating: 4.5,
      totalRatings: 95,
      certificates: [],
      createdAt: "2025-06-10T07:06:00.000Z",
      updatedAt: "2025-06-10T07:06:00.000Z",
      __v: 0
    },
    studentData: null,
    parentData: null,
    id: "c051h66ada3g7f809a19bc14"
  },

  {
    _id: "d061i77ada4h8f809a19bc27",
    name: "Nadia Samir",
    gender: "female",
    email: "nadia@teacher.com",
    role: "teacher",
    emailVerified: false,
    linkedProviders: [],
    createdAt: "2025-05-05T06:00:00.000Z",
    updatedAt: "2025-05-06T07:00:00.000Z",
    username: "nadiasamir505",
    __v: 0,
    teacherData: {
      pendingPayouts: 40,
      _id: "d061i77ada4h8f809a19bc28",
      user: "d061i77ada4h8f809a19bc27",
      bio: "Biology teacher",
      subjects: ["Biology", "Chemistry"],
      qualifications: [{ degree: "Master", university: "Helwan", year: 2016, _id: "d061i77ada4h8f809a19bc29" }],
      yearsOfExperience: 4,
      isVerified: false,
      totalEarnings: 9500,
      balance: 300,
      averageRating: 4.1,
      totalRatings: 85,
      certificates: [],
      createdAt: "2025-05-05T06:01:00.000Z",
      updatedAt: "2025-05-05T06:01:00.000Z",
      __v: 0
    },
    studentData: null,
    parentData: null,
    id: "d061i77ada4h8f809a19bc27"
  },

  {
    _id: "e071j88ada5i9f809a19bc30",
    name: "Karim Fathy",
    gender: "male",
    email: "karim@teacher.com",
    role: "teacher",
    emailVerified: true,
    linkedProviders: ["facebook"],
    createdAt: "2025-04-01T05:00:00.000Z",
    updatedAt: "2025-04-02T06:00:00.000Z",
    username: "karimfathy606",
    __v: 0,
    teacherData: {
      pendingPayouts: 55,
      _id: "e071j88ada5i9f809a19bc31",
      user: "e071j88ada5i9f809a19bc30",
      bio: "Computer Science lecturer",
      subjects: ["Computer Science", "AI"],
      qualifications: [{ degree: "Master", university: "Mansoura", year: 2018, _id: "e071j88ada5i9f809a19bc32" }],
      yearsOfExperience: 6,
      isVerified: true,
      totalEarnings: 18000,
      balance: 4000,
      averageRating: 4.6,
      totalRatings: 150,
      certificates: [],
      createdAt: "2025-04-01T05:01:00.000Z",
      updatedAt: "2025-04-01T05:01:00.000Z",
      __v: 0
    },
    studentData: null,
    parentData: null,
    id: "e071j88ada5i9f809a19bc30"
  },

  {
    _id: "f081k99ada6j0f809a19bc43",
    name: "Salma Nabil",
    gender: "female",
    email: "salma@teacher.com",
    role: "teacher",
    emailVerified: false,
    linkedProviders: [],
    createdAt: "2025-03-01T04:00:00.000Z",
    updatedAt: "2025-03-02T05:00:00.000Z",
    username: "salmanabil707",
    __v: 0,
    teacherData: {
      pendingPayouts: 35,
      _id: "f081k99ada6j0f809a19bc44",
      user: "f081k99ada6j0f809a19bc43",
      bio: "English teacher",
      subjects: ["English", "Grammar"],
      qualifications: [{ degree: "Bachelor", university: "Helwan", year: 2017, _id: "f081k99ada6j0f809a19bc45" }],
      yearsOfExperience: 3,
      isVerified: false,
      totalEarnings: 8000,
      balance: 200,
      averageRating: 4.0,
      totalRatings: 70,
      certificates: [],
      createdAt: "2025-03-01T04:01:00.000Z",
      updatedAt: "2025-03-01T04:01:00.000Z",
      __v: 0
    },
    studentData: null,
    parentData: null,
    id: "f081k99ada6j0f809a19bc43"
  }
];
export default function TeachersPage() {
  const [currentPage, setCurrentPage] = useState(1)
const [filters, setFilters] = useState({
  subjects: [],
  gender: "",
  totalRatings: null,
  degree: [],
  university: []
})
  const itemsPerPage = 6

// ========== FILTER LOGIC ==========
  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const td = teacher.teacherData
      const { subjects, gender, totalRatings, degree, university } = filters

      // Filter: subjects
      if (subjects.length > 0 && !td.subjects.some(sub => subjects.includes(sub))) return false

      // Filter: gender
      if (gender && teacher.gender !== gender) return false

      // Filter: totalRatings
      if (totalRatings !== null && td.totalRatings < totalRatings) return false

      // Filter: degree
      if (degree.length > 0 && !td.qualifications.some(q => degree.includes(q.degree))) return false

      // Filter: university
      if (university.length > 0 && !td.qualifications.some(q => university.includes(q.university))) return false

      return true
    })
  }, [filters])

const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage)

  const startIdx = (currentPage - 1) * itemsPerPage
  const displayedTeachers = filteredTeachers.slice(startIdx, startIdx + itemsPerPage)

  return (
    <main className="bg-background">

<CourseBreadcrumb title="teachers" currentPage="teachers" />

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Sidebar */}
          <FilterSidebar
            teachers={teachers}
            filters={filters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters)
              setCurrentPage(1) // reset page when filter changes
            }}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Instructor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {displayedTeachers.map((teacher) => (
                <TeacherCard key={teacher.name} teacher={teacher} /> //use .name
              ))}
            </div>

            {/* Pagination */}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </div>
      </div>

    </main>
  )
}
