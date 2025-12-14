"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle, DollarSign, Loader2, ExternalLink } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const AdminPayoutsTable = ({ payouts, onUpdateStatus, isUpdating }) => {
    const [selectedPayout, setSelectedPayout] = useState(null);
    const [actionType, setActionType] = useState(null); // 'approved', 'rejected', 'paid'
    const [note, setNote] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleActionClick = (payout, type) => {
        setSelectedPayout(payout);
        setActionType(type);
        setNote("");
        setIsDialogOpen(true);
    };

    const confirmAction = () => {
        if (!selectedPayout || !actionType) return;
        onUpdateStatus({
            payoutId: selectedPayout._id,
            status: actionType,
            note: note
        });
        setIsDialogOpen(false);
    };

    const getActionColor = (type) => {
        switch (type) {
            case 'approved': return 'bg-green-600 hover:bg-green-700';
            case 'rejected': return 'bg-red-600 hover:bg-red-700';
            case 'paid': return 'bg-indigo-600 hover:bg-indigo-700';
            default: return 'bg-gray-600';
        }
    };

    return (
        <>
            <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden mt-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="pl-6 py-3 text-left text-md font-bold text-gray-700 w-[100px]">ID</th>
                                <th className="px-3 py-3 text-left text-md font-bold text-gray-700">Teacher</th>
                                <th className="px-3 py-3 text-left text-md font-bold text-gray-700">Amount</th>
                                <th className="px-3 py-3 text-left text-md font-bold text-gray-700">Date</th>
                                <th className="px-3 py-3 text-left text-md font-bold text-gray-700">Status</th>
                                <th className="px-3 py-3 text-left text-md font-bold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {payouts?.length > 0 ? (
                                payouts.map((payout) => (
                                    <tr key={payout._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="pl-6 py-3 font-semibold text-gray-600">
                                            {payout.transactionUrl ? (
                                                <a href={payout.transactionUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline flex items-center gap-1">
                                                    #{payout._id.slice(-6)} <ExternalLink className="w-3 h-3" />
                                                </a>
                                            ) : (
                                                <span>#{payout._id.slice(-6)}</span>
                                            )}
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-900">{payout.teacher?.name || "Unknown"}</span>
                                                <span className="text-xs text-gray-500">{payout.teacher?.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 font-bold text-[#392b80]">
                                            ${payout.amount.toFixed(2)}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-gray-600">
                                            {new Date(payout.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-3 py-3">
                                            <Badge
                                                variant="outline"
                                                className={`capitalize border flex items-center w-fit px-2 py-1 ${payout.status === "paid" ? "bg-green-100 text-green-700 border-green-200" :
                                                    payout.status === "rejected" ? "bg-red-100 text-red-700 border-red-200" :
                                                        payout.status === "approved" ? "bg-blue-100 text-blue-700 border-blue-200" :
                                                            "bg-amber-100 text-amber-700 border-amber-200"
                                                    }`}
                                            >
                                                {payout.status}
                                            </Badge>
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex items-center gap-2">
                                                {payout.status === 'pending' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleActionClick(payout, 'approved')}
                                                            className="h-8 w-8 p-0 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full"
                                                            title="Approve"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleActionClick(payout, 'rejected')}
                                                            className="h-8 w-8 p-0 bg-red-100 hover:bg-red-200 text-red-700 rounded-full"
                                                            title="Reject"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </Button>
                                                    </>
                                                )}
                                                {payout.status === 'approved' && (
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleActionClick(payout, 'paid')}
                                                        className="h-8 px-3 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center gap-1"
                                                        title="Pay Now"
                                                    >
                                                        <DollarSign className="w-4 h-4" /> Pay
                                                    </Button>
                                                )}
                                                {['paid', 'rejected'].includes(payout.status) && (
                                                    <span className="text-gray-400 text-sm italic">Completed</span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No payout requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm {actionType === 'paid' ? 'Payout' : actionType === 'approved' ? 'Approval' : 'Rejection'}</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to {actionType} this request for <b>${selectedPayout?.amount}</b>?
                            {actionType === 'paid' && " This will transfer funds to the teacher's Stripe account immediately."}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-2">
                        <label className="text-sm font-medium mb-1 block">Admin Note (Optional)</label>
                        <Textarea
                            placeholder="Add a reason or reference note..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={confirmAction} className={getActionColor(actionType)} disabled={isUpdating}>
                            {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Confirm {actionType && actionType.charAt(0).toUpperCase() + actionType.slice(1)}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AdminPayoutsTable;
