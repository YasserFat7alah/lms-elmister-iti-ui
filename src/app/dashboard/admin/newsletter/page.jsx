"use client";
import React, { useState } from "react";
import SubscibedEmails from "@/components/dashboardComponents/admin/newsletter/SubscibedEmails";
import StatsCardsLetter from "@/components/dashboardComponents/admin/newsletter/StateCardsLetter";
import NewsletterTabel from "@/components/dashboardComponents/admin/newsletter/NewsletterTabel";
import NewsPopup from "@/components/dashboardComponents/admin/newsletter/NewsPopup";
import AddNewsLetterBtn from "@/components/dashboardComponents/admin/newsletter/AddNewsLetterBtn";
import HeaderAdmin from "@/components/dashboardComponents/admin/HeaderAdmin";

const page = () => {
  const [newsletterData, setNewsletterData] = useState([
    {
      id: 1,
      title: "Welcome Email",
      subject: "Welcome to our platform!",
      createdat: "2024-01-20",
      updatedat: "2024-04-20",
    },
    {
      id: 2,
      title: "Monthly Update",
      subject: "Here's what's new!",
      createdat: "2024-01-18",
      updatedat: "2024-02-20",
    },
  ]);

  const [emails, setEmails] = useState([
    { id: 1, email: "user1@example.com", subscribed: "2024-01-15" },
    { id: 2, email: "user2@example.com", subscribed: "2024-01-16" },
    { id: 3, email: "user3@example.com", subscribed: "2024-01-17" },
    { id: 4, email: "user4@example.com", subscribed: "2024-01-18" },
    { id: 5, email: "user5@example.com", subscribed: "2024-01-19" },
  ]);

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handle Send/Update Newsletter
  const handleSend = (values) => {
    if (editingItem) {
      // Update existing newsletter
      setNewsletterData((prev) =>
        prev.map((item) =>
          item.id === editingItem.id
            ? {
                ...item,
                title: values.subject,
                subject: values.message,
                date: new Date().toISOString().split("T")[0],
              }
            : item
        )
      );
    } else {
      // Create new newsletter
      const newNewsletter = {
        id: Date.now(),
        title: values.subject,
        subject: values.message,
        date: new Date().toISOString().split("T")[0],
        recipients: selectedEmails.length,
        status: "Sent",
      };
      setNewsletterData((prev) => [newNewsletter, ...prev]);
    }

    // Reset states
    setIsPopupOpen(false);
    setEditingItem(null);
    setSelectedEmails([]);
  };

  // Handle Delete Newsletter
  const handleDelete = (id) => {
      setNewsletterData((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle Edit Newsletter
  const handleEdit = (item) => {
    setEditingItem(item);
    setIsPopupOpen(true);
  };

  // Handle Add New Newsletter
  const handleAddNew = () => {
    setEditingItem(null);
    setIsPopupOpen(true);
  };

  return (
    <div className="space-y-6 p-6  min-h-screen">
      {/* Header */}
      <HeaderAdmin>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold text-[#FF0055]">
                NewsLetter Support
              </h1>
              <p className="text-[#392b80] text-sm mt-1">
                Manage and track all your newsletters in one place
              </p>
            </div>
          </div>
          <AddNewsLetterBtn onOpenPopup={handleAddNew} />
        </div>
      </HeaderAdmin>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
        {/* Left Side - Newsletter Table */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <StatsCardsLetter
            totalSubscribers={emails.length}
            selectedCount={selectedEmails.length}
            thisMonthCount={12}
          />

          {/* Newsletter Table */}
          <NewsletterTabel
            data={newsletterData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>

        {/* Right Side - Subscribed Emails */}
        <div className="space-y-6">
          <SubscibedEmails
            emails={emails}
            setEmails={setEmails}
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
        />
      )}
    </div>
  );
};

export default page;
