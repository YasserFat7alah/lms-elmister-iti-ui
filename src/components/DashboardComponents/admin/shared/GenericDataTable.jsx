"use client";
import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import PaginationControls from "../PaginationControls";
import ConfirmDeletePopUp from "../newsletter/ConfirmDeletePopup";

/**
 * Generic Data Table Component
 * @param {Object} props
 * @param {Array} props.data - Array of data objects to display
 * @param {Array} props.columns - Column definitions: [{ key: 'name', label: 'Name', sortable: true, render: (item) => <div>{item.name}</div> }]
 * @param {Function} props.renderMobileCard - Function to render mobile card view: (item) => <div>...</div>
 * @param {Function} props.getItemId - Function to extract ID from item: (item) => item.id
 * @param {Array} props.selectedRows - Array of selected row IDs
 * @param {Function} props.setSelectedRows - Function to update selected rows
 * @param {boolean} props.isBulkDelete - Whether bulk delete is active
 * @param {Function} props.setIsBulkDelete - Function to update bulk delete state
 * @param {any} props.deleteConfirm - Delete confirmation item
 * @param {Function} props.setDeleteConfirm - Function to update delete confirmation
 * @param {Function} props.onDelete - Delete handler
 * @param {number} props.itemsPerPage - Items per page for pagination
 */
const GenericDataTable = ({
    data = [],
    columns = [],
    renderMobileCard,
    getItemId = (item) => item.id,
    selectedRows = [],
    setSelectedRows,
    isBulkDelete,
    setIsBulkDelete,
    deleteConfirm,
    setDeleteConfirm,
    onDelete,
    itemsPerPage = 5,
    emptyMessage = "No data found"
}) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);

    // Sort data
    const sortedData = useMemo(() => {
        const dataToSort = [...data];
        if (!sortConfig.key) return dataToSort;

        return dataToSort.sort((a, b) => {
            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];

            if (aVal === null || aVal === undefined) aVal = '';
            if (bVal === null || bVal === undefined) bVal = '';

            if (typeof aVal === 'string') aVal = aVal.toLowerCase();
            if (typeof bVal === 'string') bVal = bVal.toLowerCase();

            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    // Pagination
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedData.slice(startIndex, endIndex);
    }, [sortedData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleSort = (key) => {
        if (!columns.find(col => col.key === key)?.sortable) return;
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
        setCurrentPage(1);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return <ChevronUp className="w-3 h-3 opacity-30" />;
        return sortConfig.direction === 'asc'
            ? <ChevronUp className="w-3 h-3" />
            : <ChevronDown className="w-3 h-3" />;
    };

    const toggleRowSelection = (id) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === paginatedData.length && paginatedData.length > 0) {
            setSelectedRows([]);
        } else {
            setSelectedRows(paginatedData.map(getItemId));
        }
    };

    const confirmDelete = () => {
        if (isBulkDelete) {
            onDelete(selectedRows);
            setSelectedRows([]);
        } else if (deleteConfirm) {
            onDelete(getItemId(deleteConfirm));
        }
        setDeleteConfirm(null);
        setIsBulkDelete(false);
    };

    const cancelDelete = () => {
        setDeleteConfirm(null);
        setIsBulkDelete(false);
    };

    return (
        <>
            <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden mt-6">
                {/* Desktop Table */}
                <div className="overflow-x-auto hidden md:block">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="pl-4 py-3 text-left w-12">
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-gray-300 cursor-pointer text-[#392b80] focus:ring-[#392b80]"
                                    />
                                </th>
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className={`px-3 py-3 text-left text-md font-bold text-gray-700 ${col.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                                        onClick={() => col.sortable && handleSort(col.key)}
                                    >
                                        <div className="flex items-center gap-1">
                                            {col.label}
                                            {col.sortable && getSortIcon(col.key)}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item) => {
                                    const itemId = getItemId(item);
                                    return (
                                        <tr
                                            key={itemId}
                                            className={`cursor-pointer transition-colors ${selectedRows.includes(itemId) ? "bg-[#392b80]/10" : "hover:bg-gray-50"}`}
                                            onClick={() => toggleRowSelection(itemId)}
                                        >
                                            <td className="pl-4 py-3 w-12">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(itemId)}
                                                    onChange={() => toggleRowSelection(itemId)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-4 h-4 text-[#392b80] border-gray-300 rounded cursor-pointer focus:ring-[#392b80]"
                                                />
                                            </td>
                                            {columns.map((col) => (
                                                <td key={col.key} className="px-3 py-3">
                                                    {col.render ? col.render(item) : item[col.key]}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-gray-500">
                                        {emptyMessage}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Desktop */}
                {sortedData.length > 0 && (
                    <div className="hidden md:block">
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            itemsPerPage={itemsPerPage}
                            totalItems={sortedData.length}
                            showInfo={true}
                        />
                    </div>
                )}
            </Card>

            {/* Mobile View */}
            <div className="md:hidden mt-4 space-y-4">
                {paginatedData.length > 0 ? (
                    paginatedData.map((item) => renderMobileCard ? renderMobileCard(item, selectedRows, toggleRowSelection) : null)
                ) : (
                    <div className="bg-white rounded-xl shadow border border-gray-200 p-8 text-center text-gray-500">
                        {emptyMessage}
                    </div>
                )}

                {sortedData.length > 0 && (
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={sortedData.length}
                        showInfo={false}
                    />
                )}
            </div>

            <ConfirmDeletePopUp
                item={deleteConfirm}
                isOpen={!!deleteConfirm}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                isBulk={isBulkDelete}
                selectedCount={selectedRows.length}
            />
        </>
    );
};

export default GenericDataTable;
