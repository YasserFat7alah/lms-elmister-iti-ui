import React from "react";
import { Users, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import StateCard from "@/components/ui/stateCard";

const SubscriptionStateCards = ({ enrollments }) => {

    // Calculate stats
    const stats = {
        total: enrollments.length,
        active: enrollments.filter(e => e.status === "active").length,
        incomplete: enrollments.filter(e => e.status === "incomplete").length,
        pastDue: enrollments.filter(e => e.status === "past_due").length,
        canceled: enrollments.filter(e => e.status === "canceled").length,
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <StateCard
                title="All Subscriptions"
                Icon={Users}
                count={stats.total}
                color="purple"
            />

            <StateCard
                title="Active"
                Icon={CheckCircle}
                count={stats.active}
                color="green"
            />

            <StateCard
                title="Incomplete"
                Icon={Clock}
                count={stats.incomplete}
                color="yellow"
            />

            <StateCard
                title="Past Due"
                Icon={AlertCircle}
                count={stats.pastDue}
                color="orange"
            />

            <StateCard
                title="Canceled"
                Icon={XCircle}
                count={stats.canceled}
                color="red"
            />
        </div>
    );
};

export default SubscriptionStateCards;
