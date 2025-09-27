import React from "react";

interface StatusFilterProps {
  activeStatus: string;
  onStatusChange: (status: string) => void;
  forReviewCount?: number;
}

const StatusFilter: React.FC<StatusFilterProps> = ({
  activeStatus,
  onStatusChange,
  forReviewCount,
}) => {
  const statuses = [
    { key: "Open", label: "Open" },
    { key: "For Review", label: "For Review" },
    { key: "Completed", label: "Completed" },
  ];

  return (
    <div className="">
      <nav className="-mb-px flex space-x-8">
        {statuses.map((status) => (
          <button
            key={status.key}
            onClick={() => onStatusChange(status.key)}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
              activeStatus === status.key
                ? "border-teal-500 text-teal-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {status.label}
            {status.key === "For Review" && (
              <span className="ml-2 bg-teal-100 text-teal-600 py-0.5 px-2 rounded-full text-xs">
                {forReviewCount}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default StatusFilter;
