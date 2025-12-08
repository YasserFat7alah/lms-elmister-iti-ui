import React from 'react'

const StatusBadge  = ({ status }) => {

    const config = {
        pending: { color: 'bg-amber-100 text-amber-700 border-amber-200', label: 'Pending' },
        approved: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Approved' },
        paid: { color: 'bg-green-100 text-green-700 border-green-200', label: 'Paid' },
        rejected: { color: 'bg-red-100 text-red-700 border-red-200', label: 'Rejected' }
    };

    const { color, label } = config[status] || config.pending;

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${color}`}>
            {label}
        </span>
    )
}

export default StatusBadge 
