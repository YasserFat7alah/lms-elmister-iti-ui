"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoReturnUpBack } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import ChildCourseDetails from '@/components/DashboardComponents/parent/mychildComponent/ChildCourseDetails';
import Link from "next/link";
import { useGetChildByIdQuery, useDeleteChildMutation } from "@/redux/api/endPoints/childrenApiSlice";
import { useGetEnrollmentsByStudentQuery } from "@/redux/api/endPoints/enrollmentApiSlice";
import { FullPageLoader } from "@/components/shared/Loader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import DeleteModal from "@/components/shared/DeleteModal";
import { toast } from "react-hot-toast";


const page = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: childData, isLoading, isError, error } = useGetChildByIdQuery(id, {
        skip: !id, // Skip query if id is not available
    });
    const { data: enrollmentsData, isLoading: isLoadingEnrollments } = useGetEnrollmentsByStudentQuery(id, {
        skip: !id, // Skip query if id is not available
    });
    const [deleteChild, { isLoading: isDeleting }] = useDeleteChildMutation();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    // Debug logging (remove in production)
    React.useEffect(() => {
        if (childData) {
            console.log('Child Data Response:', childData);
        }
        if (isError) {
            console.error('Error fetching child:', error);
        }
        if (!id) {
            console.warn('No child ID in URL params');
        }
    }, [childData, isError, error, id]);

    if (!id) {
        return (
            <div className='max-w-7xl mx-auto'>
                <Link href={`/dashboard/parent/children`}
                    className=" text-pink-500 font-semibold pb-2 flex items-center gap-2 my-2"
                >
                    <span className="p-1 bg-pink-500 text-white rounded-full"><IoReturnUpBack size={20} /></span>
                    <span className="border-b pb-2">Back To My Children</span>
                </Link>
                <Alert variant="destructive">
                    <AlertDescription>Invalid child ID in URL.</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (isLoading || isLoadingEnrollments) {
        return <FullPageLoader message="Loading child details..." />;
    }

    if (isError) {
        return (
            <div className='max-w-7xl mx-auto'>
                <Link href={`/dashboard/parent/children`}
                    className=" text-pink-500 font-semibold pb-2 flex items-center gap-2 my-2"
                >
                    <span className="p-1 bg-pink-500 text-white rounded-full"><IoReturnUpBack size={20} /></span>
                    <span className="border-b pb-2">Back To My Children</span>
                </Link>
                <Alert variant="destructive">
                    <AlertDescription>
                        {error?.data?.message || error?.message || "Failed to load child details. Please try again."}
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const child = childData;

    // If we have data but it's empty or doesn't have expected fields, show not found
    if (!child || (typeof child === 'object' && Object.keys(child).length === 0)) {
        return (
            <div className='max-w-7xl mx-auto'>
                <Link href={`/dashboard/parent/children`}
                    className=" text-pink-500 font-semibold pb-2 flex items-center gap-2 my-2"
                >
                    <span className="p-1 bg-pink-500 text-white rounded-full"><IoReturnUpBack size={20} /></span>
                    <span className="border-b pb-2">Back To My Children</span>
                </Link>
                <Alert>
                    <AlertDescription>
                        Child not found. The child may not exist or you may not have permission to view it.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    const avatarUrl = child?.avatar?.url || child?.avatar || '';
    const childName = child?.name || 'Unknown';
    const grade = child?.grade ? `Grade ${child.grade}` : 'N/A';

    const handleDelete = async () => {
        try {
            await deleteChild(id).unwrap();
            toast.success("Child deleted successfully");
            router.push("/dashboard/parent/children");
        } catch (error) {
            toast.error(error?.data?.message || "Failed to delete child. Please try again.");
        }
    };

    return (
        <div className='max-w-7xl mx-auto'>
            <div className="my-2 flex items-center justify-between">
                <Link href={`/dashboard/parent/children`}
                    className=" text-pink-500 font-semibold pb-2 flex items-center gap-2"
                >
                    <span className="p-1 bg-pink-500 text-white rounded-full"><IoReturnUpBack size={20} /></span>
                    <span className="border-b pb-2">Back To My Children</span>
                </Link>
                <div className="flex gap-2">
                    <Link href={`/dashboard/parent/children/${id}/edit`}>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Pencil size={16} />
                            Edit
                        </Button>
                    </Link>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="gap-2"
                        onClick={() => setShowDeleteDialog(true)}
                        disabled={isDeleting}
                    >
                        <Trash2 size={16} />
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </div>
            </div>

            {/* Header Card with Child Info */}<div className="relative flex items-center justify-between gap-4 my-6 bg-white p-8 rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-cyan-100/20 rounded-full blur-3xl -z-0"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-slate-100/40 to-transparent rounded-full blur-2xl -z-0"></div>

                <div className="relative flex items-center gap-6 z-10">
                    <div className="relative group">
                        <Avatar className="w-24 h-24 ring-4 ring-slate-200/60 shadow-xl border-4 border-white/60 transition-all duration-300 group-hover:scale-105 group-hover:ring-slate-300/70">
                            <AvatarImage src={avatarUrl} className="w-full h-full object-cover" />
                            <AvatarFallback className="text-4xl font-black bg-gradient-to-br from-teal-400 to-cyan-500 text-white shadow-inner">
                                {childName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        {/* Decorative avatar glow */}
                        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-200/50 to-blue-300/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent tracking-tight">{childName}</h2>
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-1.5 bg-white/60 backdrop-blur-sm text-slate-700 font-semibold rounded-xl text-sm border border-slate-200/50 shadow-sm">
                                {grade}
                            </span>
                            {child?.email && (
                                <span className="px-4 py-1.5 bg-white/60 backdrop-blur-sm text-slate-600 font-medium rounded-xl text-sm border border-slate-200/50 shadow-sm">
                                    {child.email}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {/* Courses Section */}
            <ChildCourseDetails child={child} enrollments={enrollmentsData || []} />

            {/* Delete Confirmation Dialog */}
            <DeleteModal
                isOpen={showDeleteDialog}
                onClose={() => setShowDeleteDialog(false)}
                onConfirm={handleDelete}
                title="Delete Child"
                description={`Are you sure you want to delete ${childName}'s account? This action cannot be undone. This will permanently delete the account and all associated data including enrollments and progress.`}
                isLoading={isDeleting}
            />
        </div>
    );
};

export default page;
