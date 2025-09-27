import React from "react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  className = "",
  onClick,
}) => {
  const iconMap: { [key: string]: string } = {
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    chevronDown: "M19 9l-7 7-7-7",
    chevronUp: "M5 15l7-7 7 7",
    plus: "M12 4v16m8-8H4",
    export: "M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0l4 4m-4-4l-4 4",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  };

  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className={`${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={iconMap[name]}
      />
    </svg>
  );
};

export default Icon;
