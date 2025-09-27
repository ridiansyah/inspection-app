import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "danger" | "info" | "default";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => {
  return (
    <span
      className={`border border-gray-300 min-w-[125px] inline-flex items-center justify-center py-1 rounded-full text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
