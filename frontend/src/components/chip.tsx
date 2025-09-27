const Chip: React.FC<{ text: string }> = ({ text }) => (
  <span className="px-2 py-1 rounded-full bg-teal-100 text-teal-600 text-xs border">
    {text}
  </span>
);
export default Chip;
