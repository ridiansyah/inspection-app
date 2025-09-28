import { InspectionRecord } from "../../../types/inspection";
import React, { useState } from "react";
import Icon from "../../../components/icon";
import Badge from "../../../components/badge";
import { formatDate } from "../../../utils/utils";
import { Tooltip } from "../../tooltip";
import { useNavigate } from "react-router-dom";

interface InspectionTableProps {
  records: InspectionRecord[];
  loading: boolean;
}

const InspectionTable: React.FC<InspectionTableProps> = ({
  records,
  loading,
}) => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (recordId: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(recordId)) {
      newExpanded.delete(recordId);
    } else {
      newExpanded.add(recordId);
    }
    setExpandedRows(newExpanded);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden pb-4">
      <div className="block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request No.
                </th>
                <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scope of Work
                </th>
                <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ECD
                </th>
                <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Related To
                </th>
                <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  3rd Party
                </th>
                <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-2 xl:px-4 py-3 text-left text-xs font-medium text-gray-500 tracking-wider" />
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <React.Fragment key={record._id}>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleRow(record._id)}
                  >
                    <td className="px-3 xl:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <span
                        className="truncate max-w-[120px] xl:max-w-none"
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          navigate(`/inspection-record/${record._id}`);
                        }}
                      >
                        {record.no}
                      </span>
                    </td>
                    <td className="px-2 xl:px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="truncate max-w-[80px] xl:max-w-none block">
                        {record.location.name}
                      </span>
                    </td>
                    <td className="px-2 xl:px-4 py-4 text-sm text-gray-900">
                      <div className="flex items-center space-x-1">
                        <span className="truncate max-w-[100px] xl:max-w-none">
                          {record.sow.name}
                        </span>
                        <Tooltip
                          content={
                            record.sow.scope_included
                              .map((w) => w.name)
                              .join(", ") || ""
                          }
                        />
                      </div>
                    </td>
                    <td className="px-2 xl:px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="truncate max-w-[120px] xl:max-w-none block">
                        {record.insp_type.name}
                      </span>
                    </td>
                    <td className="px-2 xl:px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(record.create_date)}
                    </td>
                    <td className="px-2 xl:px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(record.ecd_date)}
                    </td>
                    <td className="px-2 xl:px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className="text-teal-500 hover:text-teal-800 truncate max-w-[120px] xl:max-w-none block">
                        {record.customer.customer_ref}
                      </span>
                    </td>
                    <td className="px-2 xl:px-4 py-4 text-sm text-gray-900">
                      <div className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                        {record.third_party}
                      </div>
                    </td>
                    <td className="px-2 xl:px-4 py-4 whitespace-nowrap">
                      <Badge>{record.status}</Badge>
                    </td>
                    <td className="px-2 xl:px-4 py-4 whitespace-nowrap">
                      <button className="flex items-center space-x-2">
                        <Icon
                          name={
                            expandedRows.has(record._id)
                              ? "chevronUp"
                              : "chevronDown"
                          }
                          size={16}
                        />
                      </button>
                    </td>
                  </tr>
                  {expandedRows.has(record._id) && (
                    <React.Fragment>
                      <tr className="bg-gray-200">
                        <td
                          className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                          colSpan={4}
                        >
                          Item Description
                        </td>
                        <td
                          className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                          colSpan={2}
                        >
                          Ownership
                        </td>
                        <td className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Lot No.
                        </td>
                        <td className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                          Qty
                        </td>
                        <td
                          className="px-3 xl:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                          colSpan={2}
                        >
                          Progress
                        </td>
                      </tr>
                      {record.order.map((order) => (
                        <React.Fragment key={order._id}>
                          {order.lots.map((lot) => (
                            <tr key={lot._id} className="bg-gray-200">
                              <td
                                className="px-3 xl:px-6 py-2 text-sm text-gray-900"
                                colSpan={4}
                              >
                                {order.item.desc}
                              </td>
                              <td
                                className="px-3 xl:px-6 py-2 text-sm text-gray-900"
                                colSpan={2}
                              >
                                {record.customer.name}
                              </td>
                              <td className="px-3 xl:px-6 py-2 text-sm text-gray-900">
                                {lot.no}
                              </td>
                              <td className="px-3 xl:px-6 py-2 text-sm text-gray-900">
                                {lot.qty_req}
                              </td>
                              <td
                                className="px-3 xl:px-6 py-2 text-sm text-gray-900"
                                colSpan={2}
                              >
                                {lot.progress}%
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {records.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No inspection records found.</p>
        </div>
      )}

      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm text-gray-700">
              {records.length} Entries Displayed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionTable;
