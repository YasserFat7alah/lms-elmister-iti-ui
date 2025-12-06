"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserTable from "./UserTable";

const UsersTabs = () => {
  const users = [
    { id: 1, name: "Ali Hassan", email: "ali@gmail.com", role: "parent" },
    { id: 2, name: "Sarah Ahmed", email: "sarah@gmail.com", role: "teacher" },
    { id: 3, name: "Omar Salah", email: "omar@gmail.com", role: "student" },
    { id: 4, name: "Mona Adel", email: "mona@gmail.com", role: "parent" },
  ];

  const parents = users.filter((u) => u.role === "parent");
  const teachers = users.filter((u) => u.role === "teacher");
  const children = users.filter((u) => u.role === "student");

  return (
    <div className="w-full mt-4">
      <Tabs defaultValue="all">
        <TabsList className="grid grid-cols-4 w-full bg-gray-100 p-1 rounded-xl shadow-sm">
          <TabsTrigger value="all" className="rounded-lg py-2">
            All Users
          </TabsTrigger>

          <TabsTrigger value="parents" className="rounded-lg py-2">
            Parents
          </TabsTrigger>

          <TabsTrigger value="teachers" className="rounded-lg py-2">
            Teachers
          </TabsTrigger>

          <TabsTrigger value="children" className="rounded-lg py-2">
            Students
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <UserTable data={users} title="All Users" />
        </TabsContent>

        <TabsContent value="parents">
          <UserTable data={parents} title="Parents" />
        </TabsContent>

        <TabsContent value="teachers">
          <UserTable data={teachers} title="Teachers" />
        </TabsContent>

        <TabsContent value="children">
          <UserTable data={children} title="Students" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersTabs;
