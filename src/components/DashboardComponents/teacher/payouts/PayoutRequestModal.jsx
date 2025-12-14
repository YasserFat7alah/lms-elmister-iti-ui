import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const PayoutRequestModal = ({ isOpen, onClose, onSubmit, maxAmount, isLoading }) => {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!amount || amount <= 0) {
            setError("Please enter a valid amount");
            return;
        }
        if (parseFloat(amount) > maxAmount) {
            setError(`Amount cannot exceed available balance ($${maxAmount})`);
            return;
        }
        onSubmit({ amount: parseFloat(amount), note });
        setAmount("");
        setNote("");
        setError("");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request Payout</DialogTitle>
                    <DialogDescription>
                        Withdraw your earnings to your linked Stripe account.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount (USD)</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="0.00"
                            value={amount}
                            onChange={(e) => {
                                setAmount(e.target.value);
                                setError("");
                            }}
                            min="1"
                            max={maxAmount}
                            step="0.01"
                        />
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <p className="text-xs text-gray-500">Available Balance: ${maxAmount?.toFixed(2)}</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="note">Note (Optional)</Label>
                        <Textarea
                            id="note"
                            placeholder="Any additional information..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
                        <Button type="submit" disabled={isLoading} className="bg-[#392b80] hover:bg-[#392b80]/90">
                            {isLoading ? "Submitting..." : "Submit Request"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default PayoutRequestModal;
