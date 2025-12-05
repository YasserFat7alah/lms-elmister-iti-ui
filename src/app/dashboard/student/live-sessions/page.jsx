"use client";
import React from "react";
import { liveSessions } from "@/data/liveSessions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Radio } from "lucide-react"; 
import LiveSessionCard from "@/components/DashboardComponents/student/live-sessions-components/LiveSessionCard";

export default function LiveSessionsPage() {
  
  const liveNow = liveSessions.filter(s => s.status === "live");
  const upcoming = liveSessions.filter(s => s.status === "upcoming");
  const ended = liveSessions.filter(s => s.status === "ended");

  return (
    <div className="space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Radio className="text-[#FF0055]" /> Live Sessions
        </h1>
        <p className="text-gray-500 mt-1">Join your interactive classes or watch recordings.</p>
      </div>

      {liveNow.length > 0 && (
        <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                Live Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveNow.map(session => (
                    <LiveSessionCard key={session.id} session={session} />
                ))}
            </div>
        </div>
      )}

      <Tabs defaultValue="upcoming" className="w-full">
        <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-white border border-gray-100 p-1 rounded-lg">
                <TabsTrigger value="upcoming" className="px-6 data-[state=active]:bg-[#FF0055] data-[state=active]:text-white">
                    Upcoming ({upcoming.length})
                </TabsTrigger>
                <TabsTrigger value="past" className="px-6 data-[state=active]:bg-[#FF0055] data-[state=active]:text-white">
                    Past Recordings
                </TabsTrigger>
            </TabsList>
        </div>

        <TabsContent value="upcoming" className="animate-in fade-in-50">
            {upcoming.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcoming.map(session => (
                        <LiveSessionCard key={session.id} session={session} />
                    ))}
                </div>
            ) : (
                <EmptyState message="No upcoming sessions scheduled." />
            )}
        </TabsContent>

        <TabsContent value="past" className="animate-in fade-in-50">
            {ended.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ended.map(session => (
                        <LiveSessionCard key={session.id} session={session} />
                    ))}
                </div>
            ) : (
                <EmptyState message="No past recordings available." />
            )}
        </TabsContent>
      </Tabs>

    </div>
  );
}

const EmptyState = ({ message }) => (
    <div className="py-12 text-center bg-white rounded-xl border border-dashed border-gray-200">
        <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
            <Radio className="text-gray-400" size={24} />
        </div>
        <p className="text-gray-500">{message}</p>
    </div>
);