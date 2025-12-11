"use client";
import React from "react";
import { Search, Trash2 } from "lucide-react";

const TableHeader = ({
  searchTerm,
  setSearchTerm,
  selectedCount,
  onBulkDelete,
  headerTabs,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#FF0055]/5 to-indigo-500/5 px-7 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between flex-wrap gap-4">

        {/* ---------- LEFT SIDE: TABS ---------- */}
        <div className="flex items-center">
          {headerTabs /* 👈 هنا بتيجي التابس */ }
        </div>

        {/* ---------- RIGHT SIDE: SEARCH + BULK ---------- */}
        <div className="flex items-center gap-4 flex-wrap">
          
          {selectedCount > 0 && (
            <button
              onClick={onBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Delete {selectedCount}
            </button>
          )}

          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TableHeader;
