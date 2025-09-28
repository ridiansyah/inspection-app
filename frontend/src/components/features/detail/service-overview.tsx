import { Ban } from "lucide-react";
import { InspectionRecord } from "../../../types/inspection";
import Button from "../../button";
import Label from "../../label";
import Badge from "../../badge";
import { formatDate } from "../../../utils/utils";

const ServiceOverview: React.FC<{ data?: InspectionRecord }> = ({ data }) => (
  <div className="flex flex-col gap-4">
    <div className="flex gap-4 max-md:flex-col">
      <div className="flex flex-col flex-1 gap-1">
        <Label>Request No.</Label>
        <p className="font-medium">{data?.no ?? "-"}</p>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <Label>Service Type</Label>
        <p className="font-medium">{data?.insp_type.name ?? "-"}</p>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <Label>Location</Label>
        <p className="font-medium">{data?.location?.name ?? "-"}</p>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <Label>Customer</Label>
        <p className="font-medium">{data?.customer.name ?? "-"}</p>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <Label>Charge to Customer</Label>
        <p className="font-medium">{data?.customer?.charge ? "Yes" : "No"}</p>
      </div>
    </div>
    <div className="flex gap-4 max-md:flex-col">
      <div className="flex flex-col flex-1 gap-1">
        <Label>Date Submitted</Label>
        <p className="font-medium">
          {data?.create_date ? formatDate(data.create_date) : "-"}
        </p>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <Label>Estimated Completion Date</Label>
        <p className="font-medium">
          {data?.ecd_date ? formatDate(data.ecd_date) : "-"}
        </p>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <Label>Related To</Label>
        <p className="font-medium text-teal-600">
          {data?.customer?.customer_ref ?? "-"}
        </p>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <Label>Status</Label>
        <Badge className="w-fit">{data?.status}</Badge>
      </div>
      <div className="flex flex-col flex-1 justify-center">
        <Button variant="secondary" size="sm" disabled>
          <Ban className="w-4 h-4 mr-1" />
          Terminate
        </Button>
      </div>
    </div>
    <div className="flex gap-4 max-md:flex-col">
      <div className="flex flex-col flex-1 gap-1">
        <Label>D/C Code</Label>
        <p className="font-medium">{data?.dc_code ?? "-"}</p>
      </div>
    </div>
  </div>
);

export default ServiceOverview;
