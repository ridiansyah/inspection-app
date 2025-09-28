import { InspectionRecord } from "../../../types/inspection";
import Chip from "../../chip";
import Label from "../../label";

const ItemInformation: React.FC<{ data?: InspectionRecord["order"] }> = ({
  data,
}) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-lg font-bold">Item Information</h3>
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th rowSpan={2} className="text-left p-3 text-gray-700">
              <Label>Item No.</Label>
            </th>
            <th rowSpan={2} className="text-left p-3 text-gray-700">
              <Label>Item Description</Label>
            </th>
            <th rowSpan={2} className="text-left p-3 text-gray-700">
              <Label>Lot No.</Label>
            </th>
            <th rowSpan={2} className="text-left p-3 text-gray-700">
              <Label>Allocation</Label>
            </th>
            <th rowSpan={2} className="text-left p-3 text-gray-700">
              <Label>Owner</Label>
            </th>
            <th rowSpan={2} className="text-left p-3 text-gray-700">
              <Label>Condition</Label>
            </th>
            <th colSpan={2} className="text-center p-3 text-gray-700">
              <Label>Requested</Label>
            </th>
            <th colSpan={2} className="text-center p-3 text-gray-700">
              <Label>Pending</Label>
            </th>
            <th colSpan={2} className="text-center p-3 text-gray-700">
              <Label>Completed</Label>
            </th>
          </tr>
          <tr className="bg-gray-200 border-t border-gray-200">
            <th className="p-2 text-xs text-center ">
              <span>PCS</span>
            </th>
            <th className="p-2 text-xs text-center ">
              <span>MT</span>
            </th>
            <th className="p-2 text-xs text-center ">
              <span>PCS</span>
            </th>
            <th className="p-2 text-xs text-center ">
              <span>MT</span>
            </th>
            <th className="p-2 text-xs text-center ">
              <span>PCS</span>
            </th>
            <th className="p-2 text-xs text-center ">
              <span>MT</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((orderItem) =>
            orderItem.lots.map((lot) => (
              <tr
                key={`${orderItem._id}-${lot._id}`}
                className="border-t border-gray-200"
              >
                <td className="p-3">
                  <p className="text-sm text-gray-600">
                    {orderItem?.item?.no ?? "-"}
                  </p>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600">
                    {orderItem?.item?.desc ?? "-"}
                  </p>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600">{lot?.no ?? "-"}</p>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600">
                    {lot?.allocation?.name ?? "-"}
                  </p>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600">
                    {lot?.owner?.name ?? "-"}
                  </p>
                </td>
                <td className="p-3">
                  <Chip text={lot?.condition?.name ?? ""} />
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600">
                    {lot?.requested?.pcs ?? "-"}
                  </p>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600">
                    {lot?.requested?.mt ?? "-"}
                  </p>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600">
                    {lot?.pending?.pcs ?? "-"}
                  </p>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600">
                    {lot?.pending?.mt ?? "-"}
                  </p>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600">
                    {lot?.completed?.pcs ?? "-"}
                  </p>
                </td>
                <td className="p-3">
                  <p className="text-sm text-gray-600">
                    {lot?.completed?.mt ?? "-"}
                  </p>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ItemInformation;
