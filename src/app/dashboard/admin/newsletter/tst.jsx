"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { 
  Mail, 
  Trash2, 
  Send, 
  Plus, 
  CheckCircle2, 
  Search,
  Users,
  MessageSquare
} from "lucide-react";

const page = () => {
  const [emails, setEmails] = useState([
    { id: 1, email: "user1@example.com", subscribed: "2024-01-15" },
    { id: 2, email: "user2@example.com", subscribed: "2024-01-16" },
    { id: 3, email: "user3@example.com", subscribed: "2024-01-17" },
    { id: 4, email: "user4@example.com", subscribed: "2024-01-18" },
    { id: 5, email: "user5@example.com", subscribed: "2024-01-19" },
  ]);

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [emailContent, setEmailContent] = useState({
    subject: "",
    message: ""
  });

  const filteredEmails = emails.filter(item =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmail = () => {
    if (newEmail && !emails.find(e => e.email === newEmail)) {
      const newEmailObj = {
        id: Date.now(),
        email: newEmail,
        subscribed: new Date().toISOString().split('T')[0]
      };
      setEmails([newEmailObj, ...emails]);
      setNewEmail("");
    }
  };

  const handleDelete = (id) => {
    setEmails(emails.filter(e => e.id !== id));
    setSelectedEmails(selectedEmails.filter(emailId => emailId !== id));
  };

  const handleSelectEmail = (id) => {
    setSelectedEmails(prev =>
      prev.includes(id)
        ? prev.filter(emailId => emailId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmails.length === filteredEmails.length) {
      setSelectedEmails([]);
    } else {
      setSelectedEmails(filteredEmails.map(e => e.id));
    }
  };

  const handleSendNewsletter = () => {
    if (selectedEmails.length === 0) {
      alert("Please select at least one email recipient");
      return;
    }
    if (!emailContent.subject || !emailContent.message) {
      alert("Please fill in subject and message");
      return;
    }

    const selectedEmailList = emails
      .filter(e => selectedEmails.includes(e.id))
      .map(e => e.email);

    alert(`Newsletter sent to ${selectedEmails.length} recipient(s):\n${selectedEmailList.join(', ')}`);
    
    // Reset after send
    setSelectedEmails([]);
    setEmailContent({ subject: "", message: "" });
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF0055] to-rose-600 rounded-2xl p-8 shadow-xl border border-rose-200/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-md">
              Newsletter Management
            </h1>
            <p className="text-white/90 text-sm mt-1">
              Send emails to your subscribers
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Email List Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500 rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Subscribers</p>
                  <h3 className="text-2xl font-bold text-blue-900">{emails.length}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">Selected</p>
                  <h3 className="text-2xl font-bold text-green-900">{selectedEmails.length}</h3>
                </div>
              </div>
            </Card>

            <Card className="p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-500 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-600 font-medium">This Month</p>
                  <h3 className="text-2xl font-bold text-purple-900">12</h3>
                </div>
              </div>
            </Card>
          </div>

          {/* Email List Card */}
          <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Subscriber List
                <span className="text-lg">📧</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage your email subscribers
              </p>
            </div>

            <div className="p-6">
              {/* Search and Add Email */}
              <div className="flex gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search emails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] transition-all"
                  />
                </div>
              </div>

              {/* Add New Email */}
              <div className="flex gap-3 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Add new subscriber email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddEmail()}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                </div>
                <button
                  onClick={handleAddEmail}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>

              {/* Select All */}
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl mb-4 border border-blue-100">
                <input
                  type="checkbox"
                  checked={selectedEmails.length === filteredEmails.length && filteredEmails.length > 0}
                  onChange={handleSelectAll}
                  className="w-5 h-5 text-[#FF0055] rounded border-gray-300 focus:ring-[#FF0055] cursor-pointer"
                />
                <label className="text-sm font-medium text-gray-700 cursor-pointer" onClick={handleSelectAll}>
                  Select All ({filteredEmails.length})
                </label>
              </div>

              {/* Email List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredEmails.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 border rounded-xl transition-all duration-200 ${
                      selectedEmails.includes(item.id)
                        ? "bg-[#FF0055]/5 border-[#FF0055]/30 shadow-sm"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={selectedEmails.includes(item.id)}
                        onChange={() => handleSelectEmail(item.id)}
                        className="w-5 h-5 text-[#FF0055] rounded border-gray-300 focus:ring-[#FF0055] cursor-pointer"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{item.email}</p>
                        <p className="text-xs text-gray-500">Subscribed: {item.subscribed}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
                    >
                      <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>

              {filteredEmails.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Mail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No subscribers found</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Newsletter Compose Section */}
        <div className="lg:col-span-1">
          <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden sticky top-6">
            <div className="bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Compose Newsletter
                <span className="text-lg">✉️</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {selectedEmails.length} recipient(s) selected
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject Line
                </label>
                <input
                  type="text"
                  placeholder="Enter email subject"
                  value={emailContent.subject}
                  onChange={(e) => setEmailContent({...emailContent, subject: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Write your newsletter content..."
                  value={emailContent.message}
                  onChange={(e) => setEmailContent({...emailContent, message: e.target.value})}
                  rows={8}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF0055]/20 focus:border-[#FF0055] transition-all resize-none"
                />
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendNewsletter}
                disabled={selectedEmails.length === 0}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${
                  selectedEmails.length > 0
                    ? "bg-gradient-to-r from-[#FF0055] to-rose-600 text-white hover:from-[#FF0055] hover:to-rose-700 hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send className="w-5 h-5" />
                Send Newsletter
              </button>

              {selectedEmails.length === 0 && (
                <p className="text-xs text-center text-gray-500 mt-2">
                  Select recipients to enable sending
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;