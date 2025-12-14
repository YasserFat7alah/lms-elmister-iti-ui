import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const StatsCard = ({ icon: Icon, title, value, color }) => {
    return (
        <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                    <div className="flex flex-col space-y-1">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</span>
                        <span className="text-2xl font-bold text-gray-900">{value}</span>
                    </div>
                    <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-white shadow-md`}>
                        {Icon && <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
