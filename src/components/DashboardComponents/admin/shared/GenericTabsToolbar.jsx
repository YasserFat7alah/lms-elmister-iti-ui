"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BulkBtn from "../BulkBtn";

/**
 * Generic Tabs Toolbar Component
 * @param {Object} props
 * @param {Array} props.tabs - Array of tab objects: [{ value: "all", label: "All Items", icon: Icon, color: "from-blue-500 to-blue-600" }]
 * @param {string} props.activeTab - Currently active tab value
 * @param {Function} props.onTabChange - Handler for tab change
 * @param {string} props.searchTerm - Current search term
 * @param {Function} props.onSearchChange - Handler for search input
 * @param {string} props.searchPlaceholder - Placeholder for search input
 * @param {number} props.selectedCount - Number of selected items
 * @param {Function} props.onBulkDelete - Handler for bulk delete
 * @param {string} props.bulkLabel - Label for bulk action button
 */
const GenericTabsToolbar = ({
    tabs = [],
    activeTab,
    onTabChange,
    searchTerm,
    onSearchChange,
    searchPlaceholder = "Search...",
    selectedCount = 0,
    onBulkDelete,
    bulkLabel = "selected",
    selectPlaceholder = "Select filter"
}) => {
    return (
        <TabsList className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 h-auto w-full bg-white border border-gray-200 p-3 sm:p-4 rounded-xl">
            {/* Tabs Container */}
            <div className="w-full lg:w-auto order-1">
                {/* Mobile Dropdown (< md) */}
                <div className="block md:hidden">
                    <Select value={activeTab} onValueChange={onTabChange}>
                        <SelectTrigger className="w-full text-sm sm:text-base font-semibold py-2 sm:py-2.5 px-3 sm:px-4 h-auto focus:ring-blue-500/30 focus:border-blue-500">
                            <SelectValue placeholder={selectPlaceholder || "Select option"} />
                        </SelectTrigger>
                        <SelectContent>
                            {tabs.map((tab) => (
                                <SelectItem key={tab.value} value={tab.value}>
                                    <div className="flex items-center">
                                        {tab.icon && <tab.icon className={`w-4 h-4 mr-2 ${tab.iconColor || "text-gray-600"}`} />}
                                        {tab.label}
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Desktop Tabs (md+) */}
                <div className="hidden md:block">
                    <div className="flex flex-row items-center gap-1 lg:gap-0.5 xl:gap-1.5">
                        {tabs.map((tab) => {
                            // Build gradient class string
                            const gradientClass = tab.gradientFrom && tab.gradientTo
                                ? `data-[state=active]:from-${tab.gradientFrom} data-[state=active]:to-${tab.gradientTo}`
                                : `data-[state=active]:${tab.color}`;

                            return (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={`flex items-center whitespace-nowrap rounded-lg py-1.5 px-2 md:px-2.5 lg:px-1.5 xl:px-3 text-xs md:text-sm lg:text-xs xl:text-sm font-semibold
                                            data-[state=active]:bg-linear-to-r ${gradientClass}
                                            data-[state=active]:text-white transition-all hover:bg-gray-50 cursor-pointer`}
                                >
                                    {tab.icon && <tab.icon className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 mr-1 md:mr-1.5 lg:mr-0.5 xl:mr-1.5" />}
                                    <span className="hidden sm:inline">{tab.label}</span>
                                    <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                                </TabsTrigger>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Actions Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto order-2">
                {/* Bulk Actions Button */}
                {onBulkDelete && (
                    <div className="w-full sm:w-auto">
                        <BulkBtn
                            selectedCount={selectedCount}
                            onDelete={onBulkDelete}
                            label={bulkLabel || "item(s) selected"}
                        />
                    </div>
                )}

                {/* Search */}
                <div className="relative w-full sm:w-48 md:w-56 lg:w-44 xl:w-60">
                    <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder={searchPlaceholder || "Search..."}
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
            </div>
        </TabsList>
    );
};

export default GenericTabsToolbar;
