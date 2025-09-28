import { InspectionRecord } from "../../../types/inspection";
import Button from "../../button";
import Label from "../../label";

const ChargesToCustomer: React.FC<{ data?: InspectionRecord["ctc"] }> = ({
  data,
}) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center justify-between ">
      <h3 className="text-lg font-bold">Charges to Customer</h3>
      <Button size="sm" disabled>
        + Add Charges
      </Button>
    </div>

    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left text-gray-700 p-3 whitespace-nowrap">
              <Label>Order No.</Label>
            </th>
            <th className="text-left text-gray-700 p-3 whitespace-nowrap">
              <Label>Service Description</Label>
            </th>
            <th className="text-left text-gray-700 p-3">
              <Label>Qty</Label>
            </th>
            <th className="text-left text-gray-700 p-3 whitespace-nowrap">
              <Label>Unit Price</Label>
            </th>
            <th className="text-left text-gray-700 p-3">
              <Label>Total</Label>
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((obj) => (
            <tr key={obj.no} className="border-t border-gray-200">
              <td className="p-3">
                <p className="text-sm text-gray-600">{obj.no}</p>
              </td>
              <td className="p-3">
                <p className="text-sm text-gray-600">{obj.desc}</p>
              </td>
              <td className="p-3">
                <p className="text-sm text-gray-600">{`${obj.qty} PCS`}</p>
              </td>
              <td className="p-3">
                <p className="text-sm text-gray-600">{`USD $${obj.price}.00`}</p>
              </td>
              <td className="p-3">
                <p className="text-sm text-gray-600">{`USD $${obj.total}.00`}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ChargesToCustomer;
