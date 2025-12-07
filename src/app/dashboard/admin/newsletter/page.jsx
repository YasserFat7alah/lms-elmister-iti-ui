"use client";
import React, { useState } from "react";
import SubscibedEmails from "@/components/dashboardComponents/admin/newsletter/SubscibedEmails";
import StatsCardsLetter from "@/components/dashboardComponents/admin/newsletter/StateCardsLetter";
import NewsletterTabel from "@/components/dashboardComponents/admin/newsletter/NewsletterTabel";
import NewsPopup from "@/components/dashboardComponents/admin/newsletter/NewsPopup";
import AddNewsLetterBtn from "@/components/dashboardComponents/admin/newsletter/AddNewsLetterBtn";

const NewsletterPage = () => {

  const [newsletterData, setNewsletterData] = useState([
    { id: 1, title: "Welcome Email", subject: "Welcome to our platform!" },
    { id: 2, title: "Monthly Update", subject: "Here’s what’s new!" },
  ]);

   const [emails, setEmails] = useState([
    { id: 1, email: "user1@example.com", subscribed: "2024-01-15" },
    { id: 2, email: "user2@example.com", subscribed: "2024-01-16" },
    { id: 3, email: "user3@example.com", subscribed: "2024-01-17" },
    { id: 4, email: "user4@example.com", subscribed: "2024-01-18" },
    { id: 5, email: "user5@example.com", subscribed: "2024-01-19" },
  ]);

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [emailContent, setEmailContent] = useState({
    subject: "",
    message: "",
  });

  const [editingItem, setEditingItem] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const handleSend = () => {
    if (!emailContent.subject || !emailContent.message) {
      alert("Please fill all fields");
      return;
    }

    if (editingItem) {
      setNewsletterData(prev =>
        prev.map(item =>
          item.id === editingItem.id
            ? { ...item, title: emailContent.subject, subject: emailContent.message }
            : item
        )
      );
    } else {
      const newNewsletter = {
        id: Date.now(),
        title: emailContent.subject,
        subject: emailContent.message,
      };
      setNewsletterData(prev => [newNewsletter, ...prev]);
    }

    setIsPopupOpen(false);
    setEmailContent({ subject: "", message: "" });
    setEditingItem(null); 
  };

  const handleDelete = (id) => {
    setNewsletterData(prev => prev.filter(item => item.id !== id));
  };

  const handleEdit = (id) => {
    const item = newsletterData.find(n => n.id === id);
    setEditingItem(item);  
    setEmailContent({ subject: item.title, message: item.subject }); 
    setIsPopupOpen(true);
  };


  return (
    <div className="space-y-6 p-6 min-h-screen">
      {/* _______HEADER____________ */}
      <div className=" flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#FF0055]">
            Newsletter Management
          </h1>
          <p className="text-[#392b80] text-sm mt-1">
            Send emails to your subscribers
          </p>
        </div>
        <AddNewsLetterBtn onOpenPopup={() => {
          setEditingItem(null);
          setIsPopupOpen(true);
          }}
        />
      </div>

      

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">

        {/* _________________Table News Letter____________________ */}
        <div>

          {/* _______STATS CARDS____________ */}
          <StatsCardsLetter
            totalSubscribers={emails.length}
            selectedCount={selectedEmails.length}
            thisMonthCount={12} 
          />

          <NewsletterTabel
            data={newsletterData}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            // onOpenPopup={() => {
            //   setEditingItem(null);
            //   setIsPopupOpen(true);
            // }}
          />
        </div>

        {/* _________________List Emails_______________ */}
        <div className="space-y-6">
          <SubscibedEmails
            emails={emails}
            setEmails={setEmails}
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
          />
        </div>
      </div>
      {/* ___________________POPUP______________________ */}
      {isPopupOpen && ( <NewsPopup
        emailContent={emailContent}
        setEmailContent={setEmailContent}
        setIsPopupOpen={setIsPopupOpen}
        handleSend={handleSend}
      /> )}
    </div>
  );
};

export default NewsletterPage;
