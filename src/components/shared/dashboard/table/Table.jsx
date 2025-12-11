"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const Table = ({
  columns,
  data,
  actions = [],
  searchTerm,
  setSearchTerm,
  selectedRows,
  setSelectedRows,
  onDelete,
  onEdit,
  onView,
  headerTabs, // 👈 لو فيه Tabs يظهروا في الهيدر
}) => {
  
  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((r) => r !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    selectedRows.length === data.length
      ? setSelectedRows([])
      : setSelectedRows(data.map((row) => row.id));
  };

  return (
    <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden">
      
      {/* ---------------- HEADER ---------------- */}
      <TableHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCount={selectedRows.length}
        headerTabs={headerTabs}
        onBulkDelete={() => onDelete(selectedRows)}
      />

      {/* ---------------- TABLE ---------------- */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>

              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600"
                >
                  {col.label}
                </th>
              ))}

              {actions.length > 0 && (
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-600">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <TableBody
            data={data}
            columns={columns}
            actions={actions}
            selectedRows={selectedRows}
            toggleRowSelection={toggleRowSelection}
            onDelete={onDelete}
            onEdit={onEdit}
            onView={onView}
          />
        </table>
      </div>

    </Card>
  );
};

export default Table;
