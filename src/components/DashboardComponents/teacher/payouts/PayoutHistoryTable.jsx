import React from "react";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

const PayoutHistoryTable = ({ payouts }) => {
    return (
        <Card className="shadow-xl border border-gray-100 bg-white rounded-2xl overflow-hidden mt-6">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="pl-6 py-3 text-left text-md font-bold text-gray-700 w-[80px]">ID</th>
                            <th className="px-3 py-3 text-left text-md font-bold text-gray-700 w-[120px]">Date</th>
                            <th className="px-3 py-3 text-left text-md font-bold text-gray-700">Amount</th>
                            <th className="px-3 py-3 text-left text-md font-bold text-gray-700">Status</th>
                            <th className="px-3 py-3 text-left text-md font-bold text-gray-700">Note</th>
                            <th className="px-3 py-3 text-left text-md font-bold text-gray-700">Admin Note</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {payouts?.length > 0 ? (
                            payouts.map((payout) => (
                                <tr key={payout._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="pl-6 py-3 font-semibold text-gray-600">
                                        {payout.transactionUrl ? (
                                            <a
                                                href={payout.transactionUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#392b80] hover:underline hover:text-[#5d46cc] transition-colors"
                                                title="View on Stripe"
                                            >
                                                #{payout._id.slice(-6)}
                                            </a>
                                        ) : (
                                            <span>#{payout._id.slice(-6)}</span>
                                        )}
                                    </td>
                                    <td className="px-3 py-3 font-semibold text-gray-600">
                                        {new Date(payout.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 py-3 font-bold text-[#392b80]">
                                        ${payout.amount.toFixed(2)}
                                    </td>
                                    <td className="px-3 py-3">
                                        <Badge
                                            variant="outline"
                                            className={`capitalize border flex items-center w-fit ${payout.status === "paid" ? "bg-green-100 text-green-700 border-green-200" :
                                                payout.status === "rejected" ? "bg-red-100 text-red-700 border-red-200" :
                                                    "bg-amber-100 text-amber-700 border-amber-200"
                                                }`}
                                        >
                                            {payout.status === "paid" && <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>}
                                            {payout.status === "pending" && <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>}
                                            {payout.status === "rejected" && <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>}
                                            {payout.status}
                                        </Badge>
                                    </td>
                                    <td className="px-3 py-3 text-sm text-gray-500 max-w-[200px] truncate" title={payout.teacherNote}>
                                        {payout.teacherNote || "-"}
                                    </td>
                                    <td className="px-3 py-3 text-left text-sm text-gray-500 max-w-[200px] truncate" title={payout.adminNote}>
                                        {payout.adminNote || "-"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                    No past payouts found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default PayoutHistoryTable;
