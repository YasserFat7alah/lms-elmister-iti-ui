"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Users, CheckCircle2, MessageSquare } from "lucide-react";

const StatsCardsLetter = ({ totalSubscribers, selectedCount, thisMonthCount }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-500 rounded-xl">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium">Total Subscribers</p>
            <h3 className="text-2xl font-bold text-blue-900">{totalSubscribers}</h3>
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
            <h3 className="text-2xl font-bold text-green-900">{selectedCount}</h3>
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
            <h3 className="text-2xl font-bold text-purple-900">{thisMonthCount}</h3>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StatsCardsLetter;
