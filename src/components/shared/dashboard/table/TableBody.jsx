"use client";
import React from "react";
import { Edit, Eye, Trash2 } from "lucide-react";

const TableBody = ({
  data,
  columns,
  actions,
  selectedRows,
  toggleRowSelection,
  onDelete,
  onEdit,
  onView,
}) => {
  return (
    <tbody className="divide-y divide-gray-200">
      {data.length > 0 ? (
        data.map((row) => (
          <tr
            key={row.id}
            className={`cursor-pointer transition ${
              selectedRows.includes(row.id)
                ? "bg-[#FF0055]/10"
                : "hover:bg-gray-50"
            }`}
            onClick={() => toggleRowSelection(row.id)}
          >
            {/* CHECKBOX */}
            <td className="px-6 py-4">
              <input
                type="checkbox"
                checked={selectedRows.includes(row.id)}
                onChange={() => toggleRowSelection(row.id)}
                onClick={(e) => e.stopPropagation()}
              />
            </td>

            {/* ------ Dynamic Columns ------ */}
            {columns.map((col) => (
              <td key={col.key} className="px-6 py-4 text-sm text-gray-800">
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}

            {/* ------ ACTIONS ------ */}
            {actions.length > 0 && (
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">

                  {actions.includes("view") && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onView(row);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}

                  {actions.includes("edit") && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(row);
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}

                  {actions.includes("delete") && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(row.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                </div>
              </td>
            )}
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={columns.length + 2} className="px-6 py-12 text-center text-gray-500">
            No Data Found
          </td>
        </tr>
      )}
    </tbody>
  );
};

export default TableBody;
