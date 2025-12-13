import React, { useState } from "react";
import {
  Trash2,
  Mail,
  Search,
  Trash2Icon,
} from "lucide-react";
import AddEmailInput from "./AddEmailInput";
import DeleteModal from "@/components/shared/DeleteModal";
import { useUnsubscribeMutation } from "@/redux/api/endPoints/newsletterApiSlice";
import { toast } from "react-hot-toast";

const SubscibedEmails = ({
  emails,
  setEmails,
  selectedEmails,
  setSelectedEmails,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [unsubscribe, { isLoading: isDeleting }] = useUnsubscribeMutation();

  // _________ Filter Emails Based on Search Term _________
  const filteredEmails = emails.filter((item) =>
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // _________ Confirm Delete Selected Emails _________
  const handleConfirmDelete = async () => {
    try {
      if (deleteTarget === "all") {
        // Delete all selected emails
        // Backend unsubscribe typically takes one email. Need to check if bulk delete is supported or loop.
        // Assuming loop for now as API slice only has unsubscribe (single).
        const emailsToDelete = filteredEmails.filter(e => selectedEmails.includes(e.id));

        await Promise.all(emailsToDelete.map(email => unsubscribe({ email: email.email }).unwrap()));

        // Optimistically update or refetch will handle it (page refreshes usually)
        // But here we might want to update local state if parent doesn't auto-refetch
        toast.success("Selected subscribers deleted successfully");
        setSelectedEmails([]);
      } else {
        // Delete single email
        const emailToDelete = emails.find(e => e.id === deleteTarget);
        if (emailToDelete) {
          await unsubscribe({ email: emailToDelete.email }).unwrap();
          toast.success("Subscriber deleted successfully");
        }
      }
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Failed to delete subscriber");
    }
  };

  // _________ Handle Select/Deselect Email _________
  const toggleSelect = (id) => {
    // Select/Deselect All
    if (id === "all") {
      if (selectedEmails.length === filteredEmails.length) {
        setSelectedEmails([]);
      } else {
        setSelectedEmails(filteredEmails.map((e) => e.id));
      }
      return;
    }

    // Select/Deselect Single Item
    setSelectedEmails((prev) =>
      prev.includes(id)
        ? prev.filter((emailId) => emailId !== id)
        : [...prev, id]
    );
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          Subscriber List <span className="text-lg">📧</span>
        </h2>
        <p className="text-sm text-gray-600">Manage your email subscribers</p>
      </div>

      {/* Add Email */}
      <AddEmailInput emails={emails} setEmails={setEmails} />
      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search emails..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392b80c9]/20 focus:border-green-500 transition-all"
        />
      </div>


      {/* Select All */}
      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
        <input
          type="checkbox"
          checked={
            selectedEmails.length === filteredEmails.length &&
            filteredEmails.length > 0
          }
          onChange={() => toggleSelect("all")}
          className="w-5 h-5 cursor-pointer accent-green-600"
        />
        <label
          className="text-sm font-medium text-gray-700 cursor-pointer"
          onClick={() => toggleSelect("all")}
        >
          Select All ({filteredEmails.length})
        </label>
        {/* ____IF SELECTED APPEAR DELETE ALL ICON____ */}
        {selectedEmails.length > 0 && (
          <span
            onClick={() => setDeleteTarget("all")}
            className="ml-auto w-7 h-7 flex items-center justify-center bg-red-600 text-white 
             transition-all ease-in-out duration-500 rounded-2xl cursor-pointer font-medium"
          >
            <Trash2Icon size={20} />
          </span>
        )}
      </div>

      {/* Emails List */}
      <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
        {filteredEmails.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 border rounded-xl transition-all ${selectedEmails.includes(item.id)
                ? "bg-green-500/5 border-green-500/30 shadow-sm"
                : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={selectedEmails.includes(item.id)}
                onChange={() => toggleSelect(item.id)}
                className="w-4 h-4 cursor-pointer accent-green-600"
              />
              <div
                onClick={() => toggleSelect(item.id)}
                className="cursor-pointer"
              >
                <p className="font-medium text-[#392b80]">{item.email}</p>
                <p className="text-xs text-gray-500">
                  Subscribed: {item.subscribed}
                </p>
              </div>
            </div>

            <button
              onClick={() => setDeleteTarget(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer "
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {filteredEmails.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Mail className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No subscribers found</p>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteTarget !== null}
        onClose={cancelDelete}
        onConfirm={handleConfirmDelete}
        title={deleteTarget === "all" ? "Delete Selected Emails" : "Delete Subscriber"}
        description={
          deleteTarget === "all"
            ? `Are you sure you want to delete ${selectedEmails.length} subscribers? This action cannot be undone.`
            : "Are you sure you want to delete this subscriber? This action cannot be undone."
        }
        isLoading={isDeleting}
      />
    </div>
  );
};

export default SubscibedEmails;
