import React, { Fragment, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  Controller,
  FieldErrors,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { FormValues } from "../../../types/form";
import Button from "../../button";
import Select from "../../inputs/select";
import {
  getAllocationsByLot,
  getOwnersByLotAllocation,
  getConditionsByLAO,
  getAvailableQty,
} from "../../../utils/lots-data";
import Input from "../../inputs/input";

const LotsSection: React.FC<{
  idx: number;
  errors: FieldErrors<FormValues>;
}> = ({ idx, errors }) => {
  const { lots, allocations, owners, conditions, inventory } = useSelector(
    (state: RootState) => state.masters
  );
  const { control, watch, setValue, getValues } = useFormContext<FormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `order.${idx}.lots` as const,
  });

  const watchItemID = watch(`order.${idx}.item._id`);
  const optionsLots = useMemo(
    () =>
      lots
        ? lots
            .filter((filter) => filter.item_id === watchItemID)
            .map((obj) => ({
              value: String(obj._id),
              label: obj.name,
            }))
        : [],
    [lots, watchItemID]
  );

  const computeQty = (row: number) => {
    const selId = getValues(`order.${idx}.lots.${row}.selection._id`);
    const allocId = getValues(`order.${idx}.lots.${row}.allocation._id`);
    const ownerId = getValues(`order.${idx}.lots.${row}.owner._id`);
    const condId = getValues(`order.${idx}.lots.${row}.condition._id`);
    if (selId && allocId && ownerId && condId) {
      return getAvailableQty(inventory, selId, allocId, ownerId, condId);
    }
    return 0;
  };

  return (
    <>
      {fields.map((f, rIdx) => {
        const sectionID = watch(`order.${idx}.lots.${rIdx}.selection._id`);
        const allocationID = watch(`order.${idx}.lots.${rIdx}.allocation._id`);
        const ownerID = watch(`order.${idx}.lots.${rIdx}.owner._id`);

        const availableAllocations = sectionID
          ? getAllocationsByLot(inventory, sectionID)
          : [];
        const optionsAllocations = availableAllocations.map((aid) => {
          const alloc = allocations.find((a) => a._id === aid)!;
          return {
            value: String(alloc?._id),
            label: alloc.name,
          };
        });

        const availableOwners =
          sectionID && allocationID
            ? getOwnersByLotAllocation(inventory, sectionID, allocationID)
            : [];
        const optionsOwners = availableOwners.map((aid) => {
          const own = owners.find((a) => a._id === aid)!;
          return {
            value: String(own?._id),
            label: own.name,
          };
        });

        const availableConditions =
          sectionID && allocationID && ownerID
            ? getConditionsByLAO(inventory, sectionID, allocationID, ownerID)
            : [];
        const optionsCondition = availableConditions.map((aid) => {
          const con = conditions.find((a) => a._id === aid)!;
          return {
            value: String(con?._id),
            label: con.name,
          };
        });

        return (
          <Fragment key={f.id}>
            <div className="col-span-12 grid grid-cols-12 gap-0 items-end">
              <div className="col-span-3 leading-none">
                <span className="text-xs font-semibold">Lot Selection</span>
              </div>
              <div className="col-span-2 leading-none">
                <span className="text-xs font-semibold">Allocation</span>
              </div>
              <div className="col-span-2 leading-none">
                <span className="text-xs font-semibold">Owner</span>
              </div>
              <div className="col-span-2 leading-none">
                <span className="text-xs font-semibold">Condition</span>
              </div>
              <div className="col-span-1 leading-none">
                <span className="text-xs font-semibold">Avail. Qty</span>
              </div>
              <div className="col-span-1 leading-none">
                <span className="text-xs font-semibold">Qty Required</span>
              </div>
              <div className="col-span-1 leading-none">
                <span className="text-xs font-semibold">
                  Inspection Required
                </span>
              </div>
              <div className="col-span-0 md:col-span-0"></div>
            </div>
            <div className="col-span-12 grid grid-cols-12 gap-3 items-center">
              <div className="col-span-3">
                <Controller
                  control={control}
                  name={`order.${idx}.lots.${rIdx}.selection._id` as const}
                  render={({ field }) => (
                    <Select
                      options={optionsLots}
                      placeholder="Select Lot Selection"
                      searchPlaceholder="Search Lot Selection..."
                      value={String(field.value)}
                      onChange={(value) => {
                        field.onChange(Number(value));
                        const temp = lots.find(
                          (find) => String(find._id) === String(value)
                        );
                        setValue(
                          `order.${idx}.lots.${rIdx}.selection.name`,
                          temp?.name ?? ""
                        );
                        setValue(
                          `order.${idx}.lots.${rIdx}.no`,
                          temp?.no ?? ""
                        );
                        setValue(
                          `order.${idx}.lots.${rIdx}.avail_qty`,
                          computeQty(rIdx)
                        );
                      }}
                      error={errors?.order?.[idx]?.lots?.[rIdx]?.selection?._id}
                    />
                  )}
                />
              </div>
              <div className="col-span-2">
                <Controller
                  control={control}
                  name={`order.${idx}.lots.${rIdx}.allocation._id` as const}
                  render={({ field }) => (
                    <Select
                      options={optionsAllocations}
                      placeholder="Select Allocation"
                      searchPlaceholder="Search Allocation..."
                      value={String(field.value)}
                      onChange={(value) => {
                        field.onChange(Number(value));
                        const temp = optionsAllocations.find(
                          (find) => String(find.value) === String(value)
                        );
                        setValue(
                          `order.${idx}.lots.${rIdx}.allocation.name`,
                          temp?.label ?? ""
                        );
                        setValue(
                          `order.${idx}.lots.${rIdx}.avail_qty`,
                          computeQty(rIdx)
                        );
                      }}
                      error={
                        errors?.order?.[idx]?.lots?.[rIdx]?.allocation?._id
                      }
                    />
                  )}
                />
              </div>
              <div className="col-span-2">
                <Controller
                  control={control}
                  name={`order.${idx}.lots.${rIdx}.owner._id` as const}
                  render={({ field }) => (
                    <Select
                      options={optionsOwners}
                      placeholder="Select Owner"
                      searchPlaceholder="Search Owner..."
                      value={String(field.value)}
                      onChange={(value) => {
                        field.onChange(Number(value));
                        const temp = optionsAllocations.find(
                          (find) => String(find.value) === String(value)
                        );
                        setValue(
                          `order.${idx}.lots.${rIdx}.owner.name`,
                          temp?.label ?? ""
                        );
                        setValue(
                          `order.${idx}.lots.${rIdx}.avail_qty`,
                          computeQty(rIdx)
                        );
                      }}
                      error={errors?.order?.[idx]?.lots?.[rIdx]?.owner?._id}
                    />
                  )}
                />
              </div>
              <div className="col-span-2">
                <Controller
                  control={control}
                  name={`order.${idx}.lots.${rIdx}.condition._id` as const}
                  render={({ field }) => (
                    <Select
                      options={optionsCondition}
                      placeholder="Select Condition"
                      searchPlaceholder="Search Condition..."
                      value={String(field.value)}
                      onChange={(value) => {
                        field.onChange(Number(value));
                        const temp = optionsCondition.find(
                          (find) => String(find.value) === String(value)
                        );
                        setValue(
                          `order.${idx}.lots.${rIdx}.condition.name`,
                          temp?.label ?? ""
                        );
                        setValue(
                          `order.${idx}.lots.${rIdx}.avail_qty`,
                          computeQty(rIdx)
                        );
                      }}
                      error={errors?.order?.[idx]?.lots?.[rIdx]?.condition?._id}
                    />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Controller
                  control={control}
                  name={`order.${idx}.lots.${rIdx}.avail_qty` as const}
                  render={({ field }) => (
                    <Input type="number" field={field} disabled />
                  )}
                />
              </div>
              <div className="col-span-1">
                <Controller
                  control={control}
                  name={`order.${idx}.lots.${rIdx}.qty_req` as const}
                  render={({ field }) => <Input type="number" field={field} />}
                />
              </div>
              <div className="col-span-1 flex items-center justify-center">
                <Controller
                  control={control}
                  name={`order.${idx}.lots.${rIdx}.insp_req` as const}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-4 h-4"
                    />
                  )}
                />
              </div>
              <div className="col-span-12 md:col-span-12 flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() =>
                    append({
                      no: "",
                      selection: { _id: 0, name: "" },
                      allocation: { _id: 0, name: "" },
                      owner: { _id: 0, name: "" },
                      condition: { _id: 0, name: "" },
                      avail_qty: 0,
                      qty_req: 0,
                      insp_req: false,
                    })
                  }
                >
                  + Add Lot
                </Button>
                <Button
                  variant="secondary"
                  disabled={fields.length === 1}
                  onClick={() => remove(rIdx)}
                >
                  Delete Lot
                </Button>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default LotsSection;
