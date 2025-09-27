const Label: React.FC<{ children: React.ReactNode; required?: boolean }> = ({
  children,
  required,
}) => (
  <label className="text-sm text-gray-600">
    {children}
    {required && <span className="text-red-500"> *</span>}
  </label>
);

export default Label;
