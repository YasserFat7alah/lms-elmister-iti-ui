"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, UserCheck, GraduationCap, Baby } from "lucide-react";
import UserStateCards from "./UserStateCards";
import UserFilteritionTable from "./UserFilteritionTable";

const UsersTabs = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "Ali Hassan", 
      email: "ali@gmail.com", 
      role: "parent",
      phone: "+20 123 456 7890",
      location: "Cairo, Egypt",
      joinDate: "2024-01-15",
      status: "active"
    },
    { 
      id: 2, 
      name: "Sarah Ahmed", 
      email: "sarah@gmail.com", 
      role: "teacher",
      phone: "+20 123 456 7891",
      location: "Alexandria, Egypt",
      joinDate: "2024-01-10",
      status: "active"
    },
    { 
      id: 3, 
      name: "Omar Salah", 
      email: "omar@gmail.com", 
      role: "student",
      phone: "+20 123 456 7892",
      location: "Giza, Egypt",
      joinDate: "2024-01-20",
      status: "active"
    },
    { 
      id: 4, 
      name: "Mona Adel", 
      email: "mona@gmail.com", 
      role: "parent",
      phone: "+20 123 456 7893",
      location: "Cairo, Egypt",
      joinDate: "2024-01-18",
      status: "active"
    },
    { 
      id: 5, 
      name: "Ahmed Ibrahim", 
      email: "ahmed@gmail.com", 
      role: "teacher",
      phone: "+20 123 456 7894",
      location: "Mansoura, Egypt",
      joinDate: "2024-01-12",
      status: "active"
    },
    { 
      id: 6, 
      name: "Layla Mohamed", 
      email: "layla@gmail.com", 
      role: "student",
      phone: "+20 123 456 7895",
      location: "Cairo, Egypt",
      joinDate: "2024-01-22",
      status: "active"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter users by role
  const parents = users.filter((u) => u.role === "parent");
  const teachers = users.filter((u) => u.role === "teacher");
  const students = users.filter((u) => u.role === "student");

  // Delete handler
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // Edit handler
  const handleEdit = (user) => {
    alert(`Edit user: ${user.name}\nThis would open an edit modal/form`);
  };

  // Filter users by search term
  const filteredUsers = (list) => {
    if (!searchTerm) return list;
    return list.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* ________________________Stats Cards_______________________ */}
      <UserStateCards 
        users={users} 
        parents={parents} 
        teachers={teachers} 
        students={students}
      />

      {/* ________________________________Tabs______________________ */}
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="flex items-center justify-around w-full bg-white border border-gray-200 py-7 px-1.5 rounded-xl">
          <TabsTrigger 
            value="all" 
            className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF0055] data-[state=active]:to-rose-600 data-[state=active]:text-white transition-all"
          >
            <Users className="w-4 h-4 mr-2" />
            All Users
          </TabsTrigger>

          <TabsTrigger 
            value="parents" 
            className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all"
          >
            <Baby className="w-4 h-4 mr-2" />
            Parents
          </TabsTrigger>

          <TabsTrigger 
            value="teachers" 
            className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Teachers
          </TabsTrigger>

          <TabsTrigger 
            value="children" 
            className="rounded-lg py-2 px-6 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all"
          >
            <UserCheck className="w-4 h-4 mr-2" />
            Students
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <UserFilteritionTable
            filtered={filteredUsers(users)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            title="All Users" 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="parents">
          <UserFilteritionTable
            filtered={filteredUsers(parents)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            title="Parents" 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="teachers">
          <UserFilteritionTable
            filtered={filteredUsers(teachers)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            title="Teachers" 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="children">
          <UserFilteritionTable
            filtered={filteredUsers(students)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            title="Students" 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersTabs;