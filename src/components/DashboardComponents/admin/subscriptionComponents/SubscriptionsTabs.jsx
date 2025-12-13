"use client";
import React, { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, CheckCircle, Clock, XCircle, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SubscriptionsTable from "./SubscriptionsTable";
import RecietPopup from "./RecietPopup";
import BulkBtn from "../BulkBtn";
import { useGetAllEnrollmentsQuery, useDeleteEnrollmentMutation, useUpdateEnrollmentStatusMutation } from "@/redux/api/endPoints/enrollmentApiSlice";

const SubscriptionsTabs = () => {
    const { data: enrollmentsData, isLoading, isError } = useGetAllEnrollmentsQuery();
    const [deleteEnrollment] = useDeleteEnrollmentMutation();
    const [updateEnrollmentStatus] = useUpdateEnrollmentStatusMutation();
    const enrollments = enrollmentsData?.data?.enrollments || [];

    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [selectedRows, setSelectedRows] = useState([]);
    const [isBulkDelete, setIsBulkDelete] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [isOpenReceipt, setIsOpenReceipt] = useState(false);
    const [selectedItemView, setSelectedItemView] = useState(null);

    // Map Data
    const mappedData = useMemo(() => {
        return enrollments.map((e) => ({
            id: e._id,
            studentName: e.student?.name || "Unknown",
            courseGroup: `${e.group?.courseId?.title || "Course"} - ${e.group?.title || "Group"}`,
            teacher: e.teacher?.name || "Unknown",
            parent: e.parent?.name || "Unknown",
            status: e.status || "active",
            paidAt: e.currentPeriodStart ? new Date(e.currentPeriodStart).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A",
            endAt: e.currentPeriodEnd ? new Date(e.currentPeriodEnd).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A",
            invoice: e.lastInvoiceId || (e.charges && e.charges.length > 0 ? e.charges[e.charges.length - 1].invoiceId : "N/A"),
            invoiceUrl: e.lastInvoiceUrl || null,
            // Flattened structure for RecietPopup
            student: e.student,
            course: e.group?.courseId,
            group: e.group,
            original: e
        }));
    }, [enrollments]);


    // Search Logic
    const filteredList = useMemo(() => {
        let data = mappedData;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            data = data.filter(item =>
                item.studentName.toLowerCase().includes(term) ||
                item.courseGroup.toLowerCase().includes(term) ||
                item.teacher.toLowerCase().includes(term) ||
                item.parent.toLowerCase().includes(term) ||
                item.invoice.toLowerCase().includes(term) ||
                item.id.toLowerCase().includes(term)
            );
        }
        return data;
    }, [mappedData, searchTerm]);

    // Tab Filtering
    const getTabContent = (status) => {
        if (status === 'all') return filteredList;
        return filteredList.filter(item => item.status === status);
    };

    const handleView = (item) => {
        setSelectedItemView(item);
        setIsOpenReceipt(true);
    };

    const handleDelete = async (idOrIds) => {
        try {
            if (Array.isArray(idOrIds)) {
                await Promise.all(idOrIds.map(id => deleteEnrollment(id).unwrap()));
                setSelectedRows([]); // Clear selection after bulk delete
            } else {
                await deleteEnrollment(idOrIds).unwrap();
            }
        } catch (error) {
            console.error("Failed to delete subscription:", error);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateEnrollmentStatus({ id, status: newStatus }).unwrap();
            // Refetch is automatic due to tag invalidation or cache update if implemented in slice
            // If not using tags, we rely on automatic refetching or we might need to invalidate tags.
            // Assumption: Generic RTK Query setup handles this via providing/invalidating "Enrollments" tag if configured.
            // If not, we might need `refetch()` from the query hook, but that's cleaner with Tags.
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const handleBulkDelete = () => {
        if (selectedRows.length === 0) return;
        setIsBulkDelete(true);
        setDeleteConfirm(true);
    };

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading subscriptions...</div>;
    if (isError) return <div className="p-8 text-center text-red-500">Error loading data.</div>;

    return (
        <div className="space-y-6 py-6 bg-linear-to-br from-gray-50 to-white min-h-screen">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="flex flex-col sm:flex-row flex-wrap justify-between items-center gap-4 h-auto w-full bg-white border border-gray-200 p-4 rounded-xl">
                    <div className="w-full lg:w-auto">
                        {/* Mobile Dropdown */}
                        <div className="w-full md:hidden">
                            <Select value={activeTab} onValueChange={setActiveTab}>
                                <SelectTrigger className="w-full text-base font-semibold py-2.5 px-4 h-auto focus:ring-[#392b80]/30 focus:border-[#392b80]">
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        <div className="flex items-center">
                                            <Users className="w-4 h-4 mr-2 text-[#392b80]" /> All Subscriptions
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="active">
                                        <div className="flex items-center">
                                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Active
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="incomplete">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2 text-yellow-500" /> Incomplete
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="past_due">
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-2 text-orange-500" /> Past Due
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="canceled">
                                        <div className="flex items-center">
                                            <XCircle className="w-4 h-4 mr-2 text-red-500" /> Canceled
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Desktop Tabs */}
                        <div className="hidden md:block">
                            <div className="flex flex-row flex-wrap items-center gap-2">
                                <TabsTrigger
                                    value="all"
                                    className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-linear-to-r data-[state=active]:from-[#392b80] data-[state=active]:to-purple-700 data-[state=active]:text-white transition-all hover:bg-gray-50 cursor-pointer"
                                >
                                    <Users className="w-4 h-4 mr-2" /> All Subscriptions
                                </TabsTrigger>

                                <TabsTrigger
                                    value="active"
                                    className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-linear-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-all hover:bg-gray-50 cursor-pointer"
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" /> Active
                                </TabsTrigger>

                                <TabsTrigger
                                    value="incomplete"
                                    className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-linear-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-white transition-all hover:bg-gray-50 cursor-pointer"
                                >
                                    <Clock className="w-4 h-4 mr-2" /> Incomplete
                                </TabsTrigger>

                                <TabsTrigger
                                    value="past_due"
                                    className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-linear-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-all hover:bg-gray-50 cursor-pointer"
                                >
                                    <Clock className="w-4 h-4 mr-2" /> Past Due
                                </TabsTrigger>

                                <TabsTrigger
                                    value="canceled"
                                    className="flex items-center whitespace-nowrap rounded-lg py-2 px-4 font-semibold data-[state=active]:bg-linear-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white transition-all hover:bg-gray-50 cursor-pointer"
                                >
                                    <XCircle className="w-4 h-4 mr-2" /> Canceled
                                </TabsTrigger>
                            </div>
                        </div>
                    </div>

                    {/* Actions Group */}
                    <div className="flex flex-col lg:flex-row items-center gap-3 w-full lg:w-auto">
                        {/* Bulk Actions Button */}
                        <div className="w-full sm:w-auto">
                            <BulkBtn
                                selectedCount={selectedRows.length}
                                onDelete={handleBulkDelete}
                                label="selected"
                            />
                        </div>

                        {/* Search */}
                        <div className="relative w-full sm:w-60">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search student, invoice, teacher..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#392b80]/20 focus:border-[#392b80] transition-all"
                            />
                        </div>
                    </div>
                </TabsList>

                {['all', 'active', 'incomplete', 'past_due', 'canceled'].map((tab) => (
                    <TabsContent key={tab} value={tab} className="mt-0">
                        <SubscriptionsTable
                            data={getTabContent(tab)}
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                            isBulkDelete={isBulkDelete}
                            setIsBulkDelete={setIsBulkDelete}
                            deleteConfirm={deleteConfirm}
                            setDeleteConfirm={setDeleteConfirm}
                            onView={handleView}
                            onDelete={handleDelete}
                            onStatusChange={handleStatusChange}
                        />
                    </TabsContent>
                ))}
            </Tabs>

            <RecietPopup
                subscription={selectedItemView}
                isOpen={isOpenReceipt}
                onClose={() => setIsOpenReceipt(false)}
            />
        </div>
    );
};

export default SubscriptionsTabs;
