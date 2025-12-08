"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const UserTable = ({ data, title }) => {
  const [users, setUsers] = useState(data);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  // Add User
  const addUser = () => {
    const newUser = {
      id: Date.now(),
      ...form,
    };
    setUsers([...users, newUser]);
    setForm({ name: "", email: "", role: "" });
  };

  // Edit User
  const saveEdit = () => {
    setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
    setSelectedUser(null);
  };

  // Delete User
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <Card className="mt-6 shadow-sm border rounded-xl">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          {/* Add User Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus size={18} /> Add User
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>

              <div className="grid gap-3 mt-3">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <Label>Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />

                <Label>Role</Label>
                <Input
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                />
              </div>

              <DialogFooter>
                <Button onClick={addUser}>Add</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 text-left text-sm text-gray-600">
                <th className="p-4 border-b">Name</th>
                <th className="p-4 border-b">Email</th>
                <th className="p-4 border-b">Role</th>
                <th className="p-4 border-b">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="text-sm border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.role}</td>

                  <td className="p-4 flex gap-3">
                    {/* View */}
                    <Dialog>
                      <DialogTrigger>
                        <Eye className="text-green-600 cursor-pointer" />
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>User Info</DialogTitle>
                        </DialogHeader>

                        <p className="text-sm">
                          <strong>Name:</strong> {user.name}
                        </p>
                        <p className="text-sm">
                          <strong>Email:</strong> {user.email}
                        </p>
                        <p className="text-sm">
                          <strong>Role:</strong> {user.role}
                        </p>
                      </DialogContent>
                    </Dialog>

                    {/* Edit */}
                    <Dialog>
                      <DialogTrigger>
                        <Pencil
                          className="text-blue-600 cursor-pointer"
                          onClick={() => setSelectedUser(user)}
                        />
                      </DialogTrigger>

                      {selectedUser && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                          </DialogHeader>

                          <div className="grid gap-3 mt-3">
                            <Label>Name</Label>
                            <Input
                              value={selectedUser.name}
                              onChange={(e) =>
                                setSelectedUser({
                                  ...selectedUser,
                                  name: e.target.value,
                                })
                              }
                            />

                            <Label>Email</Label>
                            <Input
                              value={selectedUser.email}
                              onChange={(e) =>
                                setSelectedUser({
                                  ...selectedUser,
                                  email: e.target.value,
                                })
                              }
                            />

                            <Label>Role</Label>
                            <Input
                              value={selectedUser.role}
                              onChange={(e) =>
                                setSelectedUser({
                                  ...selectedUser,
                                  role: e.target.value,
                                })
                              }
                            />
                          </div>

                          <DialogFooter>
                            <Button onClick={saveEdit}>Save</Button>
                          </DialogFooter>
                        </DialogContent>
                      )}
                    </Dialog>

                    {/* Delete */}
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteUser(user.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTable;
