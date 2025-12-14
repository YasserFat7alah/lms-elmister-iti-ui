"use client";
import React from 'react';
import { useGetSubscriptionsQuery } from '@/redux/api/endPoints/childrenApiSlice';
import { useCancelEnrollmentMutation, useRenewEnrollmentMutation } from '@/redux/api/endPoints/enrollmentApiSlice';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Loader2, Wallet, Sparkles } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PaymentsPage = () => {
  const { data: subscriptionData, isLoading, isError } = useGetSubscriptionsQuery();
  const [cancelEnrollment] = useCancelEnrollmentMutation();
  const [renewEnrollment] = useRenewEnrollmentMutation();
  const [cancellingId, setCancellingId] = React.useState(null);
  const [renewingId, setRenewingId] = React.useState(null);

  const handleCancel = async (enrollmentId) => {
    setCancellingId(enrollmentId);
    try {
      await cancelEnrollment(enrollmentId).unwrap();
      toast.success("Subscription cancelled successfully. Access will continue until end of period.");
    } catch (error) {
      console.error("Failed to cancel:", error);
      toast.error(error?.data?.message || "Failed to cancel subscription");
    } finally {
      setCancellingId(null);
    }
  };

  const handleRenew = async (enrollmentId) => {
    setRenewingId(enrollmentId);
    try {
      await renewEnrollment(enrollmentId).unwrap();
      toast.success("Subscription renewed successfully. It will continue after the current period.");
    } catch (error) {
      console.error("Failed to renew:", error);
      toast.error(error?.data?.message || "Failed to renew subscription");
    } finally {
      setRenewingId(null);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading subscriptions...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load subscriptions.</div>;

  const children = subscriptionData?.children || [];
  const hasEnrollments = children.some(child => child.enrolledCourses?.length > 0);

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      {/* CTA Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#392b80] via-[#5243aa] to-[#6a5acd] rounded-3xl py-6 px-10 text-white shadow-2xl hover:shadow-3xl transition-shadow duration-300">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h5 className="text-3xl font-extrabold mb-3 flex items-center gap-3 justify-center md:justify-start">
              <span className="bg-white/20 p-3 rounded-xl backdrop-blur-sm animate-pulse"><Sparkles className="w-6 h-6 text-yellow-300" /></span>
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Explore New Horizons</span>
            </h5>
            <p className="text-blue-100 max-w-lg text-lg font-medium">Discover amazing new courses to enrich your child's learning journey and unlock their potential.</p>
          </div>
          <Link href="/courses">
            <Button className="bg-white text-[#392b80] hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all duration-300 font-bold rounded-full px-10 py-7 shadow-2xl border-0 text-lg">
              Surf Our Courses
            </Button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-[#FF0055]/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h4 className='font-extrabold text-3xl bg-gradient-to-r from-[#392b80] to-[#6a5acd] bg-clip-text text-transparent'>Active Subscriptions</h4>
          <p className="text-gray-600 text-base mt-2 font-medium">Manage your children's enrollments and payments with ease</p>
        </div>

        <div className="bg-white px-8 py-4 rounded-2xl shadow-lg border border-gray-200 flex items-center gap-5 hover:shadow-xl hover:scale-105 transition-all duration-300">
          <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl shadow-inner">
            <Wallet className="w-7 h-7 text-[#FF0055]" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Monthly Fee</p>
            <p className="text-3xl font-extrabold bg-gradient-to-r from-[#392b80] to-[#6a5acd] bg-clip-text text-transparent">${subscriptionData?.totalMonthlyFee || 0}</p>
          </div>
        </div>
      </div>

      {!hasEnrollments ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 mb-6 text-lg font-medium">No active subscriptions found.</p>
          <Link href="/courses">
            <Button className="bg-gradient-to-r from-[#392b80] to-[#6a5acd] hover:from-[#2a2060] hover:to-[#5243aa] text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 rounded-full text-lg font-bold">
              Surf Our Courses
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {children.map(child => (
            child.enrolledCourses && child.enrolledCourses.length > 0 && (
              <div key={child.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-5 border-b border-gray-200 flex items-center gap-4">
                  <Avatar className="w-12 h-12 ring-4 ring-white shadow-lg">
                    <AvatarImage src={child.avatar} alt={child.name} className="rounded-full overflow-hidden object-cover" />
                    <AvatarFallback className="bg-gradient-to-br from-[#392b80] to-[#6a5acd] text-white text-lg font-bold">
                      {child.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-xl text-gray-800">{child.name}</h3>
                    <p className="text-sm text-gray-500">Enrolled Courses: {child.enrolledCourses.length}</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 border-b-2 border-gray-200">
                        <TableHead className="font-bold text-gray-700">Course / Group</TableHead>
                        <TableHead className="font-bold text-gray-700">Teacher</TableHead>
                        <TableHead className="font-bold text-gray-700">Price</TableHead>
                        <TableHead className="font-bold text-gray-700">Next Session</TableHead>
                        <TableHead className="font-bold text-gray-700">Status</TableHead>
                        <TableHead className="font-bold text-gray-700">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {child.enrolledCourses.map(course => (
                        <TableRow key={course.enrollmentId} className="hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100">
                          <TableCell className="font-semibold text-gray-800">{course.title}</TableCell>
                          <TableCell className="text-gray-600">{course.instructor}</TableCell>
                          <TableCell className="font-bold text-[#392b80]">${course.price}</TableCell>
                          <TableCell className="text-gray-600 text-sm">{course.nextAttendance}</TableCell>
                          <TableCell>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${course.cancelAtPeriodEnd ? 'bg-yellow-100 text-yellow-700 ring-2 ring-yellow-200' :
                              course.status === 'active' ? 'bg-green-100 text-green-700 ring-2 ring-green-200' :
                                course.status === 'canceled' ? 'bg-red-100 text-red-700 ring-2 ring-red-200' :
                                  'bg-gray-100 text-gray-700 ring-2 ring-gray-200'
                              }`}>
                              {course.cancelAtPeriodEnd ? 'Cancels at end' : course.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            {course.status !== 'canceled' && !course.cancelAtPeriodEnd && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-2 border-red-300 hover:bg-red-50 hover:border-red-400 font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                                onClick={() => handleCancel(course.enrollmentId)}
                                disabled={cancellingId === course.enrollmentId}
                              >
                                {cancellingId === course.enrollmentId ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cancel"}
                              </Button>
                            )}
                            {(course.cancelAtPeriodEnd || course.status === 'canceled') && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-2 border-green-300 hover:bg-green-50 hover:border-green-400 font-semibold shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                                onClick={() => handleRenew(course.enrollmentId)}
                                disabled={renewingId === course.enrollmentId}
                              >
                                {renewingId === course.enrollmentId ? <Loader2 className="w-4 h-4 animate-spin" /> : "Renew"}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )
          ))}


        </div>
      )}
    </div>
  );
};

export default PaymentsPage;