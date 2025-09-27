import { ControllerRenderProps, FieldError } from "react-hook-form";
import { FormValues } from "../../types/form";
import { classNames } from "../../utils/utils";

interface Props {
  field: ControllerRenderProps<FormValues>;
  error?: FieldError;
  type?: string;
  placeHolder?: string;
  disabled?: boolean;
  className?: string;
}
const Input: React.FC<Props> = ({
  field,
  error,
  type = "text",
  placeHolder,
  disabled = false,
  className,
}) => {
  return (
    <div className={classNames(className && `${className}`)}>
      <input
        type={type}
        {...field}
        onChange={(value) => {
          if (type === "number") {
            field.onChange(Number(value.target.value));
          } else {
            field.onChange(value.target.value);
          }
        }}
        onFocus={(e) => {
          if (type === "number") {
            e.target.select();
          }
        }}
        value={
          typeof field.value === "string" || typeof field.value === "number"
            ? field.value
            : field.value === undefined || field.value === null
            ? ""
            : typeof field.value === "boolean"
            ? field.value
              ? "true"
              : "false"
            : typeof field.value === "object"
            ? JSON.stringify(field.value)
            : ""
        }
        className={classNames(
          "mt-1 w-full rounded-lg border border-gray-200 p-2 text-sm",
          error && "border-red-500",
          disabled && "bg-gray-100"
        )}
        placeholder={placeHolder}
        disabled={disabled}
      />
      {error && (
        <span className="text-xs text-red-500">
          {error?.message || "Something's wrong here"}
        </span>
      )}
    </div>
  );
};

export default Input;
