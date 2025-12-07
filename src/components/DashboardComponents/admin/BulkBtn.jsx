"use client";
import React from 'react'
import { Trash2 } from "lucide-react";

const BulkBtn = ({ selectedCount = 0, onDelete = () => {}, deleteIcon = <Trash2 className="w-4 h-4" />, label = "selected" }) => {

    if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-3 animate-in slide-in-from-right duration-300">
      <span className="text-sm font-medium text-gray-700">
        {selectedCount} {label}
      </span>

      <button
        onClick={onDelete}
        className="flex items-center gap-2 px-4 py-2.5 cursor-pointer text-white rounded-xl font-semibold bg-red-500 hover:bg-red-600 transition-all hover:shadow-sm"
      >
        {deleteIcon}
      </button>
    </div>
  )
}

export default BulkBtn
