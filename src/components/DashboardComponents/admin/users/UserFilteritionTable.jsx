"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, Search, Trash2, Edit, Mail, Phone, ChevronUp, ChevronDown } from "lucide-react";
import { MdAlternateEmail } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import EditUserPopup from "./EditUserPopup ";
import ConfirmDeletePopUp from "./ConfirmDeletePopUp";

const UserFilteritionTable = ({ filtered, setSelectedRows, selectedRows, deleteConfirm, setDeleteConfirm, isBulkDelete, setIsBulkDelete, onEdit, onDelete }) => {
  const [editUser, setEditUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data if sortConfig is set
  const sortedData = React.useMemo(() => {
    const dataToSort = filtered;
    if (!sortConfig.key) return dataToSort;

    return [...dataToSort].sort((a, b) => {
      let aValue, bValue;
      
      if (sortConfig.key === 'name') {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else if (sortConfig.key === 'email') {
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
      } else if (sortConfig.key === 'role') {
        aValue = a.role.toLowerCase();
        bValue = b.role.toLowerCase();
      } else if (sortConfig.key === 'gender') {
        aValue = a.gender?.toLowerCase() || '';
        bValue = b.gender?.toLowerCase() || '';
      } else {
        aValue = a[sortConfig.key];
        bValue = b[sortConfig.key];
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filtered, sortConfig]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronUp className="w-3 h-3 opacity-30" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3 h-3" /> 
      : <ChevronDown className="w-3 h-3" />;
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filtered.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filtered.map((user) => user.id));
    }
  };

  const handleDeleteClick = (e, user) => {
    e.stopPropagation();
    setIsBulkDelete(false);
    setDeleteConfirm(user);
  };

  const confirmDelete = () => {
    if (isBulkDelete) {
      onDelete(selectedRows);
      setSelectedRows([]);
    } else if (deleteConfirm) {
      onDelete(deleteConfirm.id);
    }
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
    setIsBulkDelete(false);
  };

  const handleEditClick = (e, user) => {
    e.stopPropagation();
    setEditUser(user);
    setIsEditOpen(true);
  };

  const handleSaveEdit = (updatedUser) => {
    onEdit(updatedUser);
    setIsEditOpen(false);
    setEditUser(null);
  };

  return (
    <>
      {/* Desktop Table View */}
      <Card className="hidden lg:block shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="pl-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 text-[#FF0055] rounded border-gray-300 focus:ring-[#FF0055] cursor-pointer"
                  />
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    User
                    {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="hidden md:table-cell px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center gap-1">
                    Email
                    {getSortIcon('email')}
                  </div>
                </th>
                <th className="hidden lg:table-cell px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('role')}
                >
                  <div className="flex items-center gap-1">
                    Role
                    {getSortIcon('role')}
                  </div>
                </th>
                <th 
                  className="hidden lg:table-cell px-4 py-3 text-left text-xs whitespace-nowrap font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('gender')}
                >
                  <div className="flex items-center gap-1">
                    Gender
                    {getSortIcon('gender')}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedData.length > 0 ? (
                sortedData.map((user) => (
                  <tr
                    key={user.id}
                    className={`transition-colors cursor-pointer ${
                      selectedRows.includes(user.id) ? "bg-[#FF0055]/10" : "hover:bg-gray-50"
                    }`}
                    onClick={() => toggleRowSelection(user.id)}
                  >
                    <td className="pl-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user.id)}
                        onChange={() => toggleRowSelection(user.id)}
                        className="w-4 h-4 text-[#FF0055] rounded border-gray-300 focus:ring-[#FF0055] cursor-pointer"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                            user.role === "parent" ? "bg-purple-500"
                            : user.role === "teacher" ? "bg-green-500"
                            : user.role === "admin" ? "bg-red-500"
                              : "bg-orange-500"
                          }`}
                        >
                          {user.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                            <MdAlternateEmail className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{user.username}</span>
                          </p>
                          <div className="md:hidden text-xs text-gray-500 mt-1 truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-4 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 whitespace-nowrap">
                        {user.email}
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-4 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 whitespace-nowrap">
                        {user.phone ? (
                          <>
                            <Phone className="w-4 h-4 text-gray-400" />
                            {user.phone}
                          </>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "parent" ? "bg-purple-100 text-purple-700"
                            : user.role === "teacher" ? "bg-green-100 text-green-700"
                            : user.role === "admin" ? "bg-red-100 text-red-700" 
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {user.role === "parent" && <FaUserTie className="w-3.5 h-3.5" />}
                        {user.role === "teacher" && <GraduationCap className="w-3.5 h-3.5" />}
                        {user.role === "student" && <Users className="w-3.5 h-3.5" />}
                        {user.role === "admin" && <MdAdminPanelSettings className="w-3.5 h-3.5"/>}
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="hidden lg:table-cell px-4 py-3 text-sm text-gray-600 whitespace-nowrap capitalize">
                      {user.gender}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleEditClick(e, user)}
                          className="p-2 text-[#FF0055] hover:bg-[#FF0055]/10 rounded-lg transition-colors group"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, user)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-gray-500">No users found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden">
        {/* Select All Checkbox for Mobile - Full width above cards */}
        {filtered.length > 0 && (
          <div className="mb-4 flex items-center gap-3 px-4 py-3 bg-white rounded-xl border border-gray-200">
            <input
              type="checkbox"
              checked={selectedRows.length === filtered.length && filtered.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 text-[#FF0055] rounded border-gray-300 focus:ring-[#FF0055] cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700">Select All Users</span>
          </div>
        )}

        {sortedData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedData.map((user) => (
              <Card
                key={user.id}
                className={`p-4 shadow-lg border rounded-xl transition-all cursor-pointer ${
                  selectedRows.includes(user.id)
                    ? "bg-[#FF0055]/10 border-[#FF0055]"
                    : "bg-white border-gray-200"
                }`}
                onClick={() => toggleRowSelection(user.id)}
              >
                <div className="space-y-4">
                  {/* Header with checkbox and avatar */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(user.id)}
                        onChange={() => toggleRowSelection(user.id)}
                        className="w-4 h-4 text-[#FF0055] rounded border-gray-300 focus:ring-[#FF0055] cursor-pointer mt-1"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-semibold text-base sm:text-lg ${
                          user.role === "parent" ? "bg-purple-500"
                          : user.role === "teacher" ? "bg-green-500"
                          : user.role === "admin" ? "bg-red-500"
                            : "bg-orange-500"
                        }`}
                      >
                        {user.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                          <MdAlternateEmail className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{user.username}</span>
                        </p>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                        user.role === "parent" ? "bg-purple-100 text-purple-700"
                          : user.role === "teacher" ? "bg-green-100 text-green-700"
                          : user.role === "admin" ? "bg-red-100 text-red-700" 
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {user.role === "parent" && <FaUserTie className="w-3 h-3" />}
                      {user.role === "teacher" && <GraduationCap className="w-3 h-3" />}
                      {user.role === "student" && <Users className="w-3 h-3" />}
                      {user.role === "admin" && <MdAdminPanelSettings className="w-3 h-3"/>}
                      <span className="hidden xs:inline">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                      <span className="xs:hidden">{user.role.charAt(0).toUpperCase()}</span>
                    </span>
                  </div>

                  {/* User Details */}
                  <div className="space-y-2 pl-14 sm:pl-16">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    
                    {user.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span>{user.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="capitalize">{user.gender}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                    <button
                      onClick={(e) => handleEditClick(e, user)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 text-[#FF0055] bg-[#FF0055]/10 hover:bg-[#FF0055]/20 rounded-lg transition-colors font-medium text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(e, user)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-medium text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 sm:p-12 text-center bg-white rounded-xl">
            <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" />
            <p className="text-gray-500 text-sm sm:text-lg">No users found</p>
          </Card>
        )}
      </div>

      {/* Edit User Popup */}
      <EditUserPopup
        isOpen={isEditOpen}
        user={editUser}
        onClose={() => {
          setIsEditOpen(false);
          setEditUser(null);
        }}
        onSave={handleSaveEdit}
      />

      {/* Confirm Delete Popup */}
      <ConfirmDeletePopUp
        isOpen={!!deleteConfirm}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        isBulk={isBulkDelete}
        selectedCount={selectedRows.length}
        userName={deleteConfirm?.name}
      />
    </>
  );
};

export default UserFilteritionTable;