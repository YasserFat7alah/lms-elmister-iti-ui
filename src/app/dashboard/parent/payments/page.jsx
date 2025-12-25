"use client";
import React from 'react';
import { useGetSubscriptionsQuery } from '@/redux/api/endPoints/childrenApiSlice';
import {
  useCancelEnrollmentMutation,
  useRenewEnrollmentMutation,
  useCompletePaymentMutation,
  useRemoveEnrollmentMutation,
  useForceCancelEnrollmentMutation
} from '@/redux/api/endPoints/enrollmentApiSlice';
import ConfirmationModal from "@/components/shared/ConfirmationModal";
import CancellationReasonModal from "@/components/modals/CancellationReasonModal";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Loader2, Wallet, Sparkles, Trash2 } from 'lucide-react';


const PaymentsPage = () => {
  const { data: subscriptionData, isLoading, isError } = useGetSubscriptionsQuery();
  const [cancelEnrollment] = useCancelEnrollmentMutation();
  const [renewEnrollment] = useRenewEnrollmentMutation();
  const [completePayment] = useCompletePaymentMutation();
  const [removeEnrollment] = useRemoveEnrollmentMutation();
  const [forceCancelEnrollment] = useForceCancelEnrollmentMutation();

  const [cancellingId, setCancellingId] = React.useState(null);
  const [renewingId, setRenewingId] = React.useState(null);
  const [payingId, setPayingId] = React.useState(null);
  const [removingId, setRemovingId] = React.useState(null);

  // Confirmation Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);

  // Cancellation Flow State
  const [isCancelConfirmOpen, setIsCancelConfirmOpen] = React.useState(false); // 1st Step: Are you sure?
  const [isReasonModalOpen, setIsReasonModalOpen] = React.useState(false);     // 2nd Step: Why?
  const [cancelEnrollmentId, setCancelEnrollmentId] = React.useState(null);    // Stores ID only

  // Helper to find the course object safely
  const itemToCancel = React.useMemo(() => {
    if (!cancelEnrollmentId || !subscriptionData?.children) return null;
    for (const child of subscriptionData.children) {
      const found = child.enrolledCourses?.find(c => c.enrollmentId === cancelEnrollmentId);
      if (found) return found;
    }
    return null;
  }, [cancelEnrollmentId, subscriptionData]);

  // 1. Trigger Initial Confirmation
  const handleCancelClick = (course) => {
    console.log("Clicked Cancel Now for:", course.enrollmentId);
    setCancelEnrollmentId(course.enrollmentId);
    setIsCancelConfirmOpen(true);
  };

  // 2. Proceed to Reason Modal
  const proceedToReason = () => {
    setIsCancelConfirmOpen(false);
    setIsReasonModalOpen(true);
  };

  // 3. Final Submit
  // 3. Final Submit
  const handleForceCancel = async (reasonData) => {
    // We can use cancelEnrollmentId directly even if itemToCancel is not found (unlikely)
    if (!cancelEnrollmentId) return;

    setCancellingId(cancelEnrollmentId);
    try {
      await forceCancelEnrollment({
        enrollmentId: cancelEnrollmentId,
        data: reasonData
      }).unwrap();
      toast.success("Subscription cancelled immediately. A support ticket has been created.");
      setIsReasonModalOpen(false);
    } catch (error) {
      console.error("Failed to cancel:", error);
      toast.error(error?.data?.message || "Failed to cancel subscription");
    } finally {
      setCancellingId(null);
      setCancelEnrollmentId(null);
    }
  };

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

  const handlePayment = async (enrollmentId) => {
    setPayingId(enrollmentId);
    try {
      const res = await completePayment(enrollmentId).unwrap();
      if (res.url) {
        window.location.href = res.url;
      }
    } catch (error) {
      console.error("Failed to initiate payment:", error);
      toast.error(error?.data?.message || "Failed to initiate payment");
    } finally {
      setPayingId(null);
    }
  };

  // Trigger modal
  const handleRemove = (enrollmentId) => {
    setItemToDelete(enrollmentId);
    setIsModalOpen(true);
  };

  // Actual logic after confirmation
  const confirmRemove = async () => {
    if (!itemToDelete) return;
    setRemovingId(itemToDelete);
    try {
      await removeEnrollment(itemToDelete).unwrap();
      toast.success("Subscription removed successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to remove:", error);
      toast.error(error?.data?.message || "Failed to remove subscription");
    } finally {
      setRemovingId(null);
      setItemToDelete(null);
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading subscriptions...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load subscriptions.</div>;

  const children = subscriptionData?.children || [];
  const hasEnrollments = children.some(child => child.enrolledCourses?.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Subscriptions
        </h1>
        <div className="text-sm text-gray-500">
          Total Monthly: <span className="font-semibold text-gray-900">${subscriptionData?.totalMonthlyFee?.toFixed(2) || '0.00'}</span>
        </div>
      </div>

      {subscriptionData?.children?.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No active subscriptions found.</p>
          <Link href="/courses">
            <Button variant="link" className="mt-2 text-blue-600">Browse Courses</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {subscriptionData.children.map((child) => (
            child.enrolledCourses.length > 0 && (
              <div key={child.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src={child.avatar} alt={child.name} />
                      <AvatarFallback>{child.name ? child.name[0] : '?'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{child.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                      {child.enrolledCourses.length} Total Courses
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-gray-100">
                  {child.enrolledCourses.map((course) => {
                    const status = course.status;
                    const daysUntilEnd = (new Date(course.nextBillingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
                    const isExpiringSoon = course.cancelAtPeriodEnd && daysUntilEnd <= 3;
                    const isCanceledAtEnd = course.cancelAtPeriodEnd && !isExpiringSoon;

                    return (
                      <div key={course.enrollmentId} className="p-4 hover:bg-gray-50/50 transition-colors border-b last:border-0 border-gray-100 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Column 1: Group, Course, Teacher - Spans 4 */}
                        <div className="md:col-span-4 space-y-1">
                          <h4 className="font-semibold text-gray-900 leading-tight">{course.groupTitle}</h4>
                          <div className="text-sm text-gray-500 flex flex-wrap gap-x-2">
                            <span className="text-blue-600 font-medium">{course.courseTitle}</span>
                            <span className="text-gray-300">•</span>
                            <span>{course.instructor}</span>
                          </div>
                        </div>

                        {/* Column 2: Price - Spans 1 */}
                        <div className="md:col-span-1">
                          <span className="md:hidden text-xs text-gray-400 uppercase tracking-wide mr-2">Price:</span>
                          <span className="font-medium text-gray-700">${course.price}</span>
                        </div>

                        {/* Column 3: Start Date - Spans 2 */}
                        <div className="md:col-span-2">
                          <span className="md:hidden text-xs text-gray-400 uppercase tracking-wide mr-2">Started:</span>
                          <span className="text-sm text-gray-600">{new Date(course.startDate).toLocaleDateString()}</span>
                        </div>

                        {/* Column 4: End Date - Spans 2 */}
                        <div className="md:col-span-2">
                          <span className="md:hidden text-xs text-gray-400 uppercase tracking-wide mr-2">
                            {course.cancelAtPeriodEnd ? 'Ends:' : 'Renews:'}
                          </span>
                          <span className={`text-sm ${course.cancelAtPeriodEnd ? 'text-yellow-600' : 'text-gray-600'}`}>
                            {new Date(course.nextBillingDate).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Column 5: Status - Spans 1 */}
                        <div className="md:col-span-1">
                          <span className="md:hidden text-xs text-gray-400 uppercase tracking-wide mr-2">Status:</span>
                          {status === 'active' && !course.cancelAtPeriodEnd && (
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium text-green-700 bg-green-50 border border-green-200">Active</span>
                          )}
                          {status === 'active' && isExpiringSoon && (
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium text-yellow-700 bg-yellow-50 border border-yellow-200">Expiring Soon</span>
                          )}
                          {status === 'active' && isCanceledAtEnd && (
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300">Canceled End</span>
                          )}
                          {status === 'canceled' && (
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100 border border-gray-200">Canceled</span>
                          )}
                          {status === 'incomplete' && (
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium text-orange-700 bg-orange-50 border border-orange-200">Unpaid</span>
                          )}
                          {status === 'past_due' && (
                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium text-red-700 bg-red-50 border border-red-200">Past Due</span>
                          )}
                        </div>

                        {/* Column 6: Actions - Spans 2 */}
                        <div className="md:col-span-2 flex justify-end gap-2">
                          {status === 'active' && !course.cancelAtPeriodEnd && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancel(course.enrollmentId)}
                              disabled={cancellingId === course.enrollmentId}
                              className="w-full md:w-auto text-xs px-3 h-8"
                            >
                              {cancellingId === course.enrollmentId ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                              Cancel
                            </Button>
                          )}

                          {/* "Cancel Now" for Expiring/CanceledAtEnd items */}
                          {course.cancelAtPeriodEnd && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleCancelClick(course)}
                              disabled={cancellingId === course.enrollmentId}
                              className="w-full md:w-auto text-xs px-3 h-8 bg-red-700 hover:bg-red-800"
                            >
                              {cancellingId === course.enrollmentId ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                              Cancel Now
                            </Button>
                          )}

                          {(course.cancelAtPeriodEnd || status === 'canceled') && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRenew(course.enrollmentId)}
                                disabled={renewingId === course.enrollmentId}
                                className="border-green-200 text-green-700 hover:bg-green-50 text-xs px-3 h-8"
                              >
                                {renewingId === course.enrollmentId ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                                Renew
                              </Button>

                              {status === 'canceled' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleRemove(course.enrollmentId)}
                                  disabled={removingId === course.enrollmentId}
                                  className="text-gray-400 hover:text-red-600 text-xs px-2 h-8"
                                >
                                  {removingId === course.enrollmentId ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                </Button>
                              )}
                            </>
                          )}

                          {(status === 'incomplete' || status === 'past_due') && (
                            <Button
                              size="sm"
                              onClick={() => handlePayment(course.enrollmentId)}
                              disabled={payingId === course.enrollmentId}
                              className="bg-blue-600 hover:bg-blue-700 text-xs px-3 h-8 w-full md:w-auto"
                            >
                              {payingId === course.enrollmentId ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : null}
                              Pay
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
          ))}
        </div>
      )
      }
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmRemove}
        title="Remove Subscription"
        message="Are you sure you want to remove this canceled subscription from your history?"
        description="This action cannot be undone. The subscription record will be permanently deleted."
        confirmText="Remove"
        cancelText="Keep"
        theme="danger"
        isLoading={!!removingId}
      />

      {/* 1. Confirm Cancellation Modal */}
      <ConfirmationModal
        isOpen={isCancelConfirmOpen}
        onClose={() => setIsCancelConfirmOpen(false)}
        onConfirm={proceedToReason}
        title="Stop Subscription?"
        message="Are you sure you want to cancel this subscription?"
        description="Proceeding will allow you to provide a reason and officially end the subscription immediately due to early cancellation."
        confirmText="Yes, Cancel Now"
        cancelText="No, Keep It"
        theme="warning"
      />

      {/* 2. Reason Modal */}
      <CancellationReasonModal
        isOpen={isReasonModalOpen}
        onClose={() => setIsReasonModalOpen(false)}
        onSubmit={handleForceCancel}
        isLoading={!!cancellingId}
        courseTitle={itemToCancel?.courseTitle || 'Course'}
      />

      <div className="mt-8 text-center bg-blue-50 py-8 rounded-xl border border-blue-100">
        <h3 className="text-lg font-bold text-gray-900 mb-2">Want to give your child more learning powers?</h3>
        <p className="text-sm text-gray-600 mb-6 max-w-2xl mx-auto">
          Explore our diverse catalog of expert-led courses designed to inspire and educate. Find the perfect class to support their unique journey.
        </p>
        <Link href="/courses">
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors text-sm px-5 py-4 h-auto font-medium">
            <Sparkles className="w-4 h-4 mr-2 text-blue-600" />
            Find New Courses for Your Child
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentsPage;