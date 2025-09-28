import React from "react";

type ChipVariant = "primary" | "warning" | "danger" | "info";

const variantClasses: Record<ChipVariant, string> = {
  primary: "bg-teal-100 text-teal-600 border-teal-300",
  warning: "bg-amber-100 text-amber-600 border-amber-300",
  danger: "bg-rose-100 text-rose-600 border-rose-300",
  info: "bg-violet-100 text-violet-600 border-violet-300",
};

interface ChipProps {
  text: string;
  variant?: ChipVariant;
}

const Chip: React.FC<ChipProps> = ({ text, variant }) => {
  const getVariant = (status: string): ChipVariant => {
    switch (status) {
      case "Good":
        return "primary";
      case "Quarantine":
        return "warning";
      case "Damaged":
        return "danger";
      case "Recoat Required":
        return "info";
      default:
        return "primary";
    }
  };

  const variantFinal = variant ?? getVariant(text);

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs border whitespace-nowrap ${variantClasses[variantFinal]}`}
    >
      {text}
    </span>
  );
};

export default Chip;
