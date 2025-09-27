import { ControllerRenderProps } from "react-hook-form";
import { classNames } from "../../utils/utils";
import { FormValues } from "../../types/form";

interface Props {
  field: ControllerRenderProps<FormValues>;
}
const Switch: React.FC<Props> = ({ field }) => {
  return (
    <button
      type="button"
      onClick={() => field.onChange(!field.value)}
      className={classNames(
        "w-12 h-6 rounded-full relative transition cursor-pointer",
        field.value ? "bg-teal-500" : "bg-gray-300"
      )}
    >
      <span
        className={classNames(
          "absolute top-0.5 w-5 h-5 rounded-full bg-white transition",
          field.value ? "left-6.5" : "left-0.5"
        )}
      ></span>
    </button>
  );
};

export default Switch;
