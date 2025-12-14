"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, UserCheck, GraduationCap, Search } from "lucide-react";
import UserFilteritionTable from "./UserFilteritionTable";
import { MdAdminPanelSettings } from "react-icons/md";
import BulkBtn from "../BulkBtn";
import { FaUserTie } from "react-icons/fa";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserDetailModal from "./UserDetailModal";
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import { useDeleteUserMutation, useUpdateUserMutation } from "@/redux/api/endPoints/usersApiSlice";

import { toast } from "react-hot-toast";

const UsersTabs = ({ users, parents, teachers, students, admins }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Toggle row selection
  const toggleRowSelection = (userId) => {
    setSelectedRows(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  // Handle single click - Open Modal
  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  // Handle double click - Toggle Selection
  const handleRowDoubleClick = (userId) => {
    toggleRowSelection(userId);
  };

  // Delete handler - handles both single and bulk delete
  const handleDelete = async (idOrIds) => {
    try {
      if (Array.isArray(idOrIds)) {
        await Promise.all(idOrIds.map(id => deleteUser(id).unwrap()));
        setSelectedRows([]);
        toast.success("User(s) deleted successfully");
      } else {
        await deleteUser(idOrIds).unwrap();
        toast.success("User deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error(error?.data?.message || "Failed to delete user. Please check if they have associated data.");
    }
  };

  // Edit handler
  const handleEdit = async (updatedUser) => {
    try {
      const { id, ...data } = updatedUser;
      // API expects 'id' or '_id'? usually it's id in url. 
      // Admin service likely uses id.
      await updateUser({ id, ...data }).unwrap();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  // Filter users by search term
  const filteredUsers = (list) => {
    if (!searchTerm) return list || [];
    return list.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedRows.length === 0) return;
    setIsBulkDelete(true);
    setDeleteConfirm(true);
  };

  return (
    <div className="space-y-6 pt-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* ________________________________Tabs______________________ */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 h-auto w-full bg-white border border-gray-200 p-4 rounded-xl">
          <div className="w-full lg:w-auto">
            {/* --- 1. MOBILE DROPDOWN (Visible only below MD) --- */}
            <div className="w-full md:hidden">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full text-base font-semibold py-2.5 px-4 h-auto focus:ring-blue-500/30 focus:border-blue-500">
                  <SelectValue placeholder="Select User Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-500" /> All Users
                    </div>
                  </SelectItem>
                  <SelectItem value="admins">
                    <div className="flex items-center">
                      <MdAdminPanelSettings className="w-4 h-4 mr-2 text-red-500" /> Admins
                    </div>
                  </SelectItem>
                  <SelectItem value="parents">
                    <div className="flex items-center">
                      <FaUserTie className="w-4 h-4 mr-2 text-purple-500" /> Parents
                    </div>
                  </SelectItem>
                  <SelectItem value="teachers">
                    <div className="flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-green-500" /> Teachers
                    </div>
                  </SelectItem>
                  <SelectItem value="children">
                    <div className="flex items-center">
                      <UserCheck className="w-4 h-4 mr-2 text-orange-500" /> Students
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* --- 2. DESKTOP TABS (Hidden below MD) --- */}
            <div className="hidden md:block">
              <div className="flex flex-row flex-wrap items-center gap-2">
                <TabsTrigger
                  value="all"
                  className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all hover:bg-gray-50"
                >
                  <Users className="w-4 h-4 mr-2" /> All Users
                </TabsTrigger>

                <TabsTrigger
                  value="admins"
                  className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all hover:bg-gray-50"
                >
                  <MdAdminPanelSettings className="w-4 h-4 mr-2" /> Admins
                </TabsTrigger>

                <TabsTrigger
                  value="parents"
                  className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-all hover:bg-gray-50"
                >
                  <FaUserTie className="w-4 h-4 mr-2" /> Parents
                </TabsTrigger>

                <TabsTrigger
                  value="teachers"
                  className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all hover:bg-gray-50"
                >
                  <GraduationCap className="w-4 h-4 mr-2" /> Teachers
                </TabsTrigger>

                <TabsTrigger
                  value="children"
                  className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all hover:bg-gray-50"
                >
                  <UserCheck className="w-4 h-4 mr-2" /> Students
                </TabsTrigger>
              </div>
            </div>
          </div>

          {/* Actions Group */}
          <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto">
            {/* Bulk Actions Button */}
            <div className="w-full sm:w-auto">
              <BulkBtn
                selectedCount={selectedRows.length}
                onDelete={handleBulkDelete}
                label="user(s) selected"
              />
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>
        </TabsList>

        <TabsContent value="all">
          <UserFilteritionTable
            filtered={filteredUsers(users)}
            searchTerm={searchTerm}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            isBulkDelete={isBulkDelete}
            setIsBulkDelete={setIsBulkDelete}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            title="All Users"
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUserClick={handleUserClick}
            onRowDoubleClick={handleRowDoubleClick}
          />
        </TabsContent>

        <TabsContent value="admins">
          <UserFilteritionTable
            filtered={filteredUsers(admins)}
            searchTerm={searchTerm}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            isBulkDelete={isBulkDelete}
            setIsBulkDelete={setIsBulkDelete}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            title="Admins"
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUserClick={handleUserClick}
            onRowDoubleClick={handleRowDoubleClick}
          />
        </TabsContent>

        <TabsContent value="parents">
          <UserFilteritionTable
            filtered={filteredUsers(parents)}
            searchTerm={searchTerm}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            isBulkDelete={isBulkDelete}
            setIsBulkDelete={setIsBulkDelete}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            title="Parents"
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUserClick={handleUserClick}
            onRowDoubleClick={handleRowDoubleClick}
          />
        </TabsContent>

        <TabsContent value="teachers">
          <UserFilteritionTable
            filtered={filteredUsers(teachers)}
            searchTerm={searchTerm}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            isBulkDelete={isBulkDelete}
            setIsBulkDelete={setIsBulkDelete}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            title="Teachers"
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUserClick={handleUserClick}
            onRowDoubleClick={handleRowDoubleClick}
          />
        </TabsContent>

        <TabsContent value="children">
          <UserFilteritionTable
            filtered={filteredUsers(students)}
            searchTerm={searchTerm}
            setSelectedRows={setSelectedRows}
            selectedRows={selectedRows}
            isBulkDelete={isBulkDelete}
            setIsBulkDelete={setIsBulkDelete}
            deleteConfirm={deleteConfirm}
            setDeleteConfirm={setDeleteConfirm}
            title="Students"
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUserClick={handleUserClick}
            onRowDoubleClick={handleRowDoubleClick}
          />
        </TabsContent>
      </Tabs>

      {/* Bulk Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!deleteConfirm}
        onClose={() => {
          setDeleteConfirm(null);
          setIsBulkDelete(false);
        }}
        onConfirm={async () => {
          if (selectedRows.length > 0) {
            await handleDelete(selectedRows);
          }
          setDeleteConfirm(null);
          setIsBulkDelete(false);
        }}
        title="Delete Selected Users"
        message={`Are you sure you want to delete ${selectedRows.length} selected user(s)?`}
        description="This action is irreversible. All data associated with these users will be permanently removed."
        confirmText="Delete Selected"
        theme="danger"
      />

      {/* Detailed View Modal */}
      <UserDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={selectedUserId}
      />
    </div>
  );
};

export default UsersTabs;
