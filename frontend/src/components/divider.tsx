const Divider: React.FC<{ orientation?: string }> = ({
  orientation = "horizontal",
}) => {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className="mx-2 my-0 flex h-full items-stretch"
      >
        <span
          aria-hidden
          className="w-px grow self-stretch border-r border-gray-200"
        />
      </div>
    );
  } else {
    return (
      <div role="separator" aria-orientation="horizontal" className="w-full">
        <div className="border-t border-gray-200" />
      </div>
    );
  }
};
export default Divider;
