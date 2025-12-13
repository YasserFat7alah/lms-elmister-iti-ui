"use client";
import React, { useState } from "react";
import SubscibedEmails from "@/components/DashboardComponents/admin/newsletter/SubscibedEmails";
import StatsCardsLetter from "@/components/DashboardComponents/admin/newsletter/StateCardsLetter";
import NewsletterTabel from "@/components/DashboardComponents/admin/newsletter/NewsletterTabel";
import NewsPopup from "@/components/dashboardComponents/admin/newsletter/NewsPopup";
import AddNewsLetterBtn from "@/components/dashboardComponents/admin/newsletter/AddNewsLetterBtn";
import {
  useGetSubscribersQuery,
  useGetNewslettersQuery,
  useSendNewsletterMutation,
  useDeleteNewsletterMutation,
} from "@/redux/api/endPoints/newsletterApiSlice";
import { toast } from "react-hot-toast";
import { Spinner } from "@/components/shared/Loader";

import HeaderAdmin from '@/components/dashboardComponents/admin/HeaderAdmin';

const page = () => {
  const { data: subscribersData, isLoading: isLoadingSubscribers } = useGetSubscribersQuery();
  const { data: newslettersData, isLoading: isLoadingNewsletters } = useGetNewslettersQuery();
  const [sendNewsletter, { isLoading: isSending }] = useSendNewsletterMutation();
  const [deleteNewsletter] = useDeleteNewsletterMutation();

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Extract data safely
  // Extract data safely and format
  const emails = subscribersData?.data?.subscribers?.map(sub => ({
    id: sub._id,
    email: sub.email,
    subscribed: sub.subscribedAt ? new Date(sub.subscribedAt).toLocaleString() : 'N/A'
  })) || [];
  const newsletters = newslettersData?.data?.newsletters?.map(n => ({
    id: n._id,
    title: n.subject,
    subject: n.message, // Using message as the 'subject' column content for preview
    createdat: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'N/A',
    updatedat: n.updatedAt ? new Date(n.updatedAt).toLocaleDateString() : 'N/A',
    // Preserve original values if needed for actions
    originalSubject: n.subject,
    originalMessage: n.message
  })) || [];

  // Handle Send/Update Newsletter
  const handleSend = async (values) => {
    try {
      const payload = {
        subject: values.subject,
        message: values.message,
        // If selectedEmails is empty, backend handles broadcast. 
        // If frontend logic implies "empty = all", we just send empty array or all emails. 
        // Backend service logic: "if recipientEmails.length > 0 ... else broadcast".
        // Frontend "selectedEmails" is matching backend logic.
        selectedEmails: selectedEmails,
      };

      await sendNewsletter(payload).unwrap();

      toast.success("Newsletter sent successfully!");
      setIsPopupOpen(false);
      setEditingItem(null);
      setSelectedEmails([]);
    } catch (err) {
      console.error("Failed to send newsletter:", err);
      toast.error(err?.data?.message || "Failed to send newsletter");
    }
  };

  // Handle Delete Newsletter
  const handleDelete = async (id) => {
    try {
      await deleteNewsletter(id).unwrap();
      toast.success("Newsletter deleted successfully");
    } catch (err) {
      console.error("Failed to delete newsletter:", err);
      toast.error(err?.data?.message || "Failed to delete newsletter");
    }
  };

  // Handle Edit Newsletter (Repurpose as "Resend" or "View" since we can't edit sent emails history easily in this context)
  const handleEdit = (item) => {
    // For sent newsletters, maybe we just view details? 
    // Or pre-fill popup to send again? 
    // Let's assume view/resend context.
    // Setting editingItem will prefill the popup.
    setEditingItem(item);
    setIsPopupOpen(true);
  };

  // Handle Add New Newsletter
  const handleAddNew = () => {
    setEditingItem(null);
    setSelectedEmails([]); // Reset selection for new draft
    setIsPopupOpen(true);
  };

  if (isLoadingSubscribers || isLoadingNewsletters) {
    return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  }

  return (
    <div className="space-y-6 p-6 min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <HeaderAdmin
        title="NewsLetter Support"
        description="Manage and send newsletters to your subscribers"
      >
        <AddNewsLetterBtn onOpenPopup={handleAddNew} />
      </HeaderAdmin>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        <div>
          {/* Left Side - Newsletter Table */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <StatsCardsLetter
              totalSubscribers={emails.length}
              selectedCount={selectedEmails.length}
              thisMonthCount={newsletters.filter(n => new Date(n.createdAt).getMonth() === new Date().getMonth()).length}
            />

            {/* Newsletter Table */}
            <NewsletterTabel
              data={newsletters}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </div>

        </div>
        {/* Right Side - Subscribed Emails */}
        <div className="space-y-6">
          <SubscibedEmails
            emails={emails}
            setEmails={() => { }} // Read-only from API mostly, or implement local set if filter needed
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
          />
        </div>

      </div>

      {/* Popup Dialog */}
      {isPopupOpen && (
        <NewsPopup
          editingItem={editingItem}
          setIsPopupOpen={setIsPopupOpen}
          handleSend={handleSend}
          isSending={isSending}
        />
      )}
    </div>
  );
};

export default page;
