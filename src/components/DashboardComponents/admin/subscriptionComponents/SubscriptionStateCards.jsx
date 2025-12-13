import React from "react";
import { Users, CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import StateCard from "@/components/ui/stateCard";

const SubscriptionStateCards = ({ stats }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <StateCard
                title="Total"
                Icon={Users}
                count={stats?.total || 0}
                color="gray"
            />

            <StateCard
                title="Active"
                Icon={CheckCircle}
                count={stats?.active || 0}
                color="green"
            />

            <StateCard
                title="Incomplete"
                Icon={Clock}
                count={stats?.incomplete || 0}
                color="yellow"
            />

            <StateCard
                title="Past Due"
                Icon={AlertCircle}
                count={stats?.past_due || 0}
                color="orange"
            />

            <StateCard
                title="Canceled"
                Icon={XCircle}
                count={stats?.canceled || 0}
                color="red"
            />
        </div>
    );
};

export default SubscriptionStateCards;
