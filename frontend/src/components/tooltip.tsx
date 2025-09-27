type TooltipProps = {
  content: string;
  className?: string;
  placement?: "top" | "bottom" | "left" | "right";
};

export function Tooltip({
  content,
  className = "",
  placement = "top",
}: TooltipProps) {
  const basePos =
    placement === "top"
      ? "bottom-full mb-2 left-1/2 -translate-x-1/2"
      : placement === "bottom"
      ? "top-full mt-2 left-1/2 -translate-x-1/2"
      : placement === "left"
      ? "right-full mr-2 top-1/2 -translate-y-1/2"
      : "left-full ml-2 top-1/2 -translate-y-1/2";

  const arrowPos =
    placement === "top"
      ? "absolute -bottom-1 left-1/2 -translate-x-1/2"
      : placement === "bottom"
      ? "absolute -top-1 left-1/2 -translate-x-1/2"
      : placement === "left"
      ? "absolute left-full -ml-1 top-1/2 -translate-y-1/2"
      : "absolute right-full -mr-1 top-1/2 -translate-y-1/2";

  return (
    <div
      className={`relative inline-flex items-center group ${className} ml-1`}
    >
      <button
        type="button"
        aria-describedby="tooltip-content"
        className="inline-flex h-4 w-4 items-center justify-center rounded-full border text-[11px] font-semibold text-teal-500 border-teal-500 bg-white hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      >
        i
      </button>

      <div
        id="tooltip-content"
        role="tooltip"
        className={`border border-gray-300 pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-white p-4 text-xs font-medium text-black opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 ${basePos}`}
      >
        {content}
        <span className={`h-2 w-2 rotate-45 bg-white ${arrowPos}`} />
      </div>
    </div>
  );
}
