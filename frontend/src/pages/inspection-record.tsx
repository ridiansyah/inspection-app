import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import {
  fetchInspections,
  setStatusFilter,
  setSearchFilter,
} from "../store/slices/inspection";
import StatusFilter from "../components/inputs/status-filter";
import Button from "../components/button";
import SearchBox from "../components/inputs/search-box";
import Icon from "../components/icon";
import InspectionTable from "../components/features/record/inspection-table";
import { formatDate } from "../utils/utils";
import DefaultLayout from "../layouts/default-layout";
import ExportButton from "../components/export-button";
import { useNavigate } from "react-router-dom";

const InspectionRecord: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { records, loading, error, filters } = useSelector(
    (state: RootState) => state.inspection
  );

  useEffect(() => {
    dispatch(fetchInspections());
  }, [dispatch]);

  const sortedData = useMemo(() => {
    return [...records].sort((a, b) => b.create_date - a.create_date);
  }, [records]);

  const filteredRecords = sortedData.filter((record) => {
    const matchesStatus =
      filters.status === "Open"
        ? record.status === "New" || record.status === "In Progress"
        : filters.status === "For Review"
        ? record.status === "Ready to Review"
        : record.status === filters.status;

    const matchesSearch =
      record.no.toLowerCase().includes(filters.search.toLowerCase()) ||
      record.location.name
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      record.insp_type.name
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      record.status.toLowerCase().includes(filters.search.toLowerCase()) ||
      record.third_party
        .toString()
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      record.customer.customer_ref
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      formatDate(record.create_date)
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      formatDate(record.ecd_date)
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      record.sow.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      record.customer.name.toLowerCase().includes(filters.search.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const forReviewCount = sortedData.filter(
    (record) => record.status === "Ready to Review"
  ).length;

  return (
    <DefaultLayout
      title="Inspection Record"
      breadcrumbs={[
        { label: "Quality & HSE", link: "/" },
        { label: "Inspection", link: "/" },
        { label: "Inspection Record" },
      ]}
    >
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 pt-4 border-b border-gray-200">
          <StatusFilter
            activeStatus={filters.status}
            onStatusChange={(status) => dispatch(setStatusFilter(status))}
            forReviewCount={forReviewCount}
          />
        </div>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SearchBox
              value={filters.search}
              onChange={(value) => dispatch(setSearchFilter(value))}
              placeholder="Search inspections..."
              className="w-64"
            />
          </div>
          <div className="flex items-center space-x-2">
            <ExportButton
              data={filteredRecords}
              filename="inspection-records"
            />
            <Button onClick={() => navigate("/inspection-record/create")}>
              <Icon name="plus" size={16} className="mr-2" />
              Create Request
            </Button>
          </div>
        </div>
        {error ? (
          <div className="h-44 flex items-center justify-center">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={() => dispatch(fetchInspections())}>
                Retry
              </Button>
            </div>
          </div>
        ) : (
          <InspectionTable records={filteredRecords} loading={loading} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default InspectionRecord;
