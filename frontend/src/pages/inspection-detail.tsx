import React, { useMemo } from "react";
import DefaultLayout from "../layouts/default-layout";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ChevronLeft, Edit, FileText } from "lucide-react";
import Button from "../components/button";
import Divider from "../components/divider";
import ServiceOverview from "../components/features/detail/service-overview";
import { InspectionRecord } from "../types/inspection";
import ScopeOfWork from "../components/features/detail/scope-of-work";
import ItemInformation from "../components/features/detail/item-information";
import ChargesToCustomer from "../components/features/detail/charges-to-customer";

const InspectionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { records } = useSelector((state: RootState) => state.inspection);

  const dataMemo = useMemo<InspectionRecord | undefined>(
    () => records.find((find) => find._id === Number(id)),
    [id, records]
  );

  return (
    <DefaultLayout
      title="Inspection Detail"
      breadcrumbs={[
        { label: "Quality & HSE", link: "/" },
        { label: "Inspection", link: "/" },
        { label: "Inspection Record", link: "/" },
        { label: "Detail Inspection" },
      ]}
    >
      <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between max-sm:flex-col gap-2">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("/inspection-record")}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back
            </Button>
          </div>
          <div className="flex items-center max-sm:flex-col gap-2">
            <Button variant="outline" disabled>
              <Edit className="w-4 h-4 mr-1" />
              Modify
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <FileText className="w-4 h-4 mr-1" />
              Export / Share Document
            </Button>
          </div>
        </div>
        <Divider />
        <ServiceOverview data={dataMemo} />
        <Divider />
        <ScopeOfWork data={dataMemo?.sow} />
        <Divider />
        <ItemInformation data={dataMemo?.order} />
        <Divider />
        <ChargesToCustomer data={dataMemo?.ctc} />
      </div>
    </DefaultLayout>
  );
};

export default InspectionDetail;
