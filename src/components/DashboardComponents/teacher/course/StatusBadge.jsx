import React from 'react'


const StatusBadge = ({ status }) => {

    
  const styles = {
    published: "bg-green-50 text-green-700 border-green-200 ring-1 ring-green-300",
    "in-review": "bg-blue-50 text-blue-700 border-blue-200 ring-1 ring-blue-300",
    draft: "bg-yellow-50 text-yellow-700 border-yellow-200 ring-1 ring-yellow-300",
    archived: "bg-gray-50 text-gray-600 border-gray-200 ring-1 ring-gray-300",
  };

  const labels = {
    published: "Published",
    "in-review": "In Review",
    draft: "Draft",
    archived: "Archived",
  };

  const normalizedStatus = status === 'inReview' ? 'in-review' : status;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles[normalizedStatus] || styles.draft}`}>
      {labels[normalizedStatus] || status}
    </span>
  );
};

export default StatusBadge
