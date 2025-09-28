import { InspectionRecord } from "../../../types/inspection";
import Chip from "../../chip";
import Label from "../../label";

const ScopeOfWork: React.FC<{ data?: InspectionRecord["sow"] }> = ({
  data,
}) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-lg font-bold">Scope Of Work</h3>
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="text-left text-gray-700 p-3">
              <Label>Service Type</Label>
            </th>
            <th className="text-left text-gray-700 p-3">
              <Label>Scope Name</Label>
            </th>
            <th className="text-left  text-gray-700 p-3">
              <Label>Scope Description</Label>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.scope_included.map((scope, idx) => (
            <tr
              key={scope._id}
              className={`${
                data?.scope_included.length !== idx + 1 &&
                "border-b border-gray-200"
              }`}
            >
              <td className="p-3 whitespace-nowrap">
                {idx === 0 && (
                  <p className="text-sm text-gray-600">{data?.name ?? "-"}</p>
                )}
              </td>
              <td className="p-3 whitespace-nowrap">
                <Chip text={scope.name} />
              </td>
              <td className="p-3">
                <p className="text-sm text-gray-600">{scope?.desc ?? "-"}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ScopeOfWork;
