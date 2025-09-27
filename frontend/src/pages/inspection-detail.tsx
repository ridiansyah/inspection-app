import React from "react";
import DefaultLayout from "../layouts/default-layout";

const InspectionDetail: React.FC = () => {
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
      <div className="bg-white rounded-lg shadow h-48"></div>
    </DefaultLayout>
  );
};

export default InspectionDetail;
