import DefaultLayout from "../layouts/default-layout";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { FormValues, OrderRow } from "../types/form";
import {
  useForm,
  useFieldArray,
  Controller,
  FormProvider,
  DeepPartial,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../form/schema";
import { Fragment, useEffect, useMemo } from "react";
import Label from "../components/label";
import {
  calculateThirdParty,
  classNames,
  generateDummyCTC,
  toUnixSeconds,
} from "../utils/utils";
import Chip from "../components/chip";
import LotsSection from "../components/features/create/lots-selection";
import Badge from "../components/badge";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";
import Select from "../components/inputs/select";
import Switch from "../components/inputs/switch";
import Input from "../components/inputs/input";
import { InspectionRecord } from "../types/inspection";
import { addRecord } from "../store/slices/inspection";

const InspectionCreate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    insp_type,
    sow,
    location,
    items,
    customer: customerMaster,
    related_docs,
  } = useSelector((state: RootState) => state.masters);

  const defaultOrder: OrderRow = {
    item: {
      _id: 0,
      no: "",
      name: "",
      desc: "",
    },
    qty: 0,
    lots: [
      {
        no: "",
        selection: { _id: 0, name: "" },
        allocation: { _id: 0, name: "" },
        owner: { _id: 0, name: "" },
        condition: { _id: 0, name: "" },
        avail_qty: 0,
        qty_req: 0,
        insp_req: false,
      },
    ],
  };

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      customer: {
        _id: undefined,
        name: "",
        charge: false,
        customer_ref: "",
      },
      status: "Draft",
      insp_type: {
        _id: undefined,
        name: "",
      },
      sow: {
        _id: undefined,
        name: "",
        scope_included: [],
      },
      location: {
        _id: undefined,
        name: "",
      },
      notes: {
        initial: {
          msg: "",
          by: "Developer",
          by_id: 1,
        },
      },
      ecd_date: "",
      dc_code: "",
      ///
      order: [defaultOrder],
    },
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods;

  const optionsCustomer = useMemo(
    () =>
      customerMaster
        ? customerMaster.map((obj) => ({
            value: String(obj._id),
            label: obj.name,
          }))
        : [],
    [customerMaster]
  );

  const optionsServiceType = useMemo(
    () =>
      insp_type
        ? insp_type.map((obj) => ({
            value: String(obj._id),
            label: obj.name,
          }))
        : [],
    [insp_type]
  );
  const optionsSow = useMemo(
    () =>
      sow
        ? sow.map((obj) => ({
            value: String(obj._id),
            label: obj.name,
          }))
        : [],
    [sow]
  );
  const optionsLocation = useMemo(
    () =>
      location
        ? location.map((obj) => ({
            value: String(obj._id),
            label: obj.name,
          }))
        : [],
    [location]
  );

  const watchCust = watch("customer._id");
  const optionsRelatedDocs = useMemo(
    () =>
      related_docs
        ? related_docs
            .filter((filter) => filter.customer_id === watchCust)
            .map((obj) => ({
              value: obj.no,
              label: obj.no,
            }))
        : [],
    [related_docs, watchCust]
  );

  const usedIds = watch("order").map((o) => o.item._id);
  const optionsItems = useMemo(
    () =>
      items
        ? items.map((obj) => ({
            value: String(obj._id),
            label: obj.name,
          }))
        : [],
    [items, usedIds]
  );

  useEffect(() => {
    const sub = watch((values: DeepPartial<FormValues>, { name, type }) => {
      // Abaikan saat non-change event
      if (type !== "change") return;

      if (name === "customer._id") {
        const tempSel = customerMaster.find(
          (obj) => obj._id === values.customer?._id
        );
        setValue("customer.name", tempSel?.name ?? "");
        setValue("customer.charge", tempSel?.charge ?? false);
        setValue("customer.customer_ref", "");
      }
      if (name === "insp_type._id") {
        const tempSel = insp_type.find(
          (obj) => obj._id === values.insp_type?._id
        );
        setValue("insp_type.name", tempSel?.name ?? "");
      }
      if (name === "sow._id") {
        const tempSel = sow.find((obj) => obj._id === values.sow?._id);
        setValue("sow.name", tempSel?.name ?? "");
        setValue("sow.scope_included", tempSel?.scope_included ?? []);
      }
      if (name === "location._id") {
        const tempSel = location.find(
          (obj) => obj._id === values.location?._id
        );
        setValue("location.name", tempSel?.name ?? "");
      }
    });

    return () => sub.unsubscribe();
  }, [watch, setValue]);

  const {
    fields: orderFields,
    append: appendOrder,
    remove: removeOrder,
  } = useFieldArray({ control, name: "order" });

  // Submit
  const onSubmit = (data: FormValues) => {
    try {
      const payload: InspectionRecord = {
        _id: Math.floor(1 + Math.random() * 1000),
        no: `RRIN-2025-0103-${Math.floor(100 + Math.random() * 900)}`,
        status: "New",
        ecd_date: toUnixSeconds(data.ecd_date),
        create_date: Math.floor(Date.now() / 1000),
        insp_type: data.insp_type,
        notes: {
          initial: {
            ...data.notes.initial,
            msg: data?.notes?.initial?.msg ?? "",
          },
        },
        creator_id: 1,
        creator_name: "Developer",
        customer: data.customer,
        sow: data.sow,
        location: data.location,
        dc_code: data?.dc_code ?? "",
        third_party: calculateThirdParty(data),
        order: data.order.map((r) => ({
          _id: Math.floor(1 + Math.random() * 1000),
          item: r.item,
          qty: r.qty,
          lots: r.lots.map((l) => ({
            _id: Math.floor(1 + Math.random() * 1000),
            no: l.no,
            selection: l.selection!,
            allocation: l.allocation!,
            owner: l.owner!,
            condition: l.condition!,
            avail_qty: l.avail_qty ?? 0,
            qty_req: l.qty_req ?? 1,
            insp_req: !!l.insp_req,
            requested: { pcs: l.qty_req ?? 0, mt: l.qty_req ?? 0 * 10 },
            pending: { pcs: 0, mt: 0 },
            completed: { pcs: 0, mt: 0 },
            progress: 0,
          })),
        })),
        ctc: data.customer?.charge ? generateDummyCTC() : [],
      };
      dispatch(addRecord(payload));
      navigate(`/inspection-record/${payload._id}`);
    } catch (err) {
      console.error("Failed to create inspection", err);
    }
  };

  return (
    <DefaultLayout
      title="Create Inspection"
      breadcrumbs={[
        { label: "Quality & HSE", link: "/" },
        { label: "Inspection", link: "/" },
        { label: "Inspection Record", link: "/" },
        { label: "Create Inspection" },
      ]}
    >
      <div className="bg-white rounded-lg shadow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 text-gray-900 flex gap-4 flex-col"
        >
          <div className="border-b border-gray-200 bg-white flex flex-col sm:flex-row gap-4 pb-4">
            <div className="flex flex-1 justify-center flex-col gap-1">
              <Label required>Customer Name</Label>
              <Controller
                control={control}
                name="customer._id"
                render={({ field }) => (
                  <Select
                    options={optionsCustomer}
                    placeholder="Select Customer"
                    searchPlaceholder="Search Customer..."
                    value={String(field.value)}
                    onChange={(value) => field.onChange(Number(value))}
                    error={errors.customer?._id}
                  />
                )}
              />
            </div>
            <div className="flex flex-1 justify-center flex-row gap-2">
              <div className="flex flex-1 justify-center flex-col gap-2">
                <Label required>Charge to Customer</Label>
                <Controller
                  control={control}
                  name="customer.charge"
                  render={({ field }) => <Switch field={field} />}
                />
              </div>

              <div className="flex flex-1 justify-center flex-col gap-1">
                <Label>Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Badge className="w-fit">{field.value}</Badge>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 bg-white flex flex-col gap-4 pb-4 align-middle">
            <div className="flex flex-col sm:flex-row gap-4 align-middle">
              <div className="flex flex-1 justify-center flex-col gap-1">
                <Label required>Service Type</Label>
                <Controller
                  control={control}
                  name="insp_type._id"
                  render={({ field }) => (
                    <Select
                      options={optionsServiceType}
                      placeholder="Select Service Type"
                      searchPlaceholder="Search Service Type..."
                      value={String(field.value)}
                      onChange={(value) => field.onChange(Number(value))}
                      error={errors.insp_type?._id}
                    />
                  )}
                />
              </div>
              <div className="flex flex-1 justify-center flex-col gap-1">
                <Label required>Scope of Work</Label>
                <Controller
                  control={control}
                  name="sow._id"
                  render={({ field }) => (
                    <Select
                      options={optionsSow}
                      placeholder="Select Scope of Work"
                      searchPlaceholder="Search Scope of Work..."
                      value={String(field.value)}
                      onChange={(value) => field.onChange(Number(value))}
                      error={errors.sow?._id}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex justify-center flex-col gap-1">
              <Label required>Scope included</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {watch("sow.scope_included")?.map((s) => (
                  <Chip key={s._id} text={s.name} />
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 align-middle">
              <div className="flex flex-1 justify-center flex-col gap-1">
                <Label required>Location</Label>
                <Controller
                  control={control}
                  name="location._id"
                  render={({ field }) => (
                    <Select
                      options={optionsLocation}
                      placeholder="Select Location"
                      searchPlaceholder="Search Location..."
                      value={String(field.value)}
                      onChange={(value) => field.onChange(Number(value))}
                      error={errors.location?._id}
                    />
                  )}
                />
              </div>
              <div className="flex flex-1 justify-center flex-col gap-1">
                <Label required>Estimated Completion Date</Label>
                <Controller
                  control={control}
                  name="ecd_date"
                  render={({ field }) => (
                    <Input field={field} error={errors?.ecd_date} type="date" />
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 align-middle">
              <div className="flex flex-1 justify-center flex-col gap-1">
                <Label required>Related To</Label>
                <Controller
                  control={control}
                  name="customer.customer_ref"
                  render={({ field }) => (
                    <Select
                      options={optionsRelatedDocs}
                      placeholder="Select Related To"
                      searchPlaceholder="Search Related To..."
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      error={errors.customer?.customer_ref}
                    />
                  )}
                />
              </div>
              <div className="flex flex-1 justify-center flex-col gap-1">
                <Label>D/C Code</Label>
                <Controller
                  control={control}
                  name="dc_code"
                  render={({ field }) => (
                    <Input
                      field={field}
                      error={errors?.dc_code}
                      type="text"
                      placeHolder="Enter D/C Code"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-200 bg-white pb-4">
            <div className="text-md font-semibold">Order Information</div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 mt-4">
              <table className="w-full">
                <tbody>
                  {orderFields.map((field, idx) => {
                    const optionsFillItems = optionsItems
                      ? optionsItems
                          .filter((item) => {
                            const val = Number(item.value);
                            return (
                              !usedIds.includes(val) ||
                              val === watch(`order.${idx}.item._id`)
                            );
                          })
                          .map((obj) => ({
                            value: String(obj.value),
                            label: obj.label,
                          }))
                      : [];
                    return (
                      <Fragment key={field.id}>
                        <tr
                          className={classNames(
                            "bg-gray-100",
                            idx === 0
                              ? "rounded-t-xl"
                              : "border-t border-t-gray-200"
                          )}
                        >
                          <td
                            className="text-left text-gray-700 p-3"
                            colSpan={4}
                          >
                            <Label>Item Description</Label>
                          </td>
                          <td
                            className="text-left text-gray-700 p-3"
                            colSpan={4}
                          >
                            <Label>Qty</Label>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3" colSpan={4}>
                            <Controller
                              control={control}
                              name={`order.${idx}.item._id` as const}
                              render={({ field }) => (
                                <Select
                                  options={optionsFillItems}
                                  placeholder="Select an item"
                                  searchPlaceholder="Search Item..."
                                  value={String(field.value)}
                                  onChange={(value) => {
                                    const tempItem = items.find(
                                      (find) =>
                                        String(find._id) === String(value)
                                    );
                                    field.onChange(Number(value));
                                    setValue(
                                      `order.${idx}.item.no`,
                                      tempItem?.no ?? ""
                                    );
                                    setValue(
                                      `order.${idx}.item.name`,
                                      tempItem?.name ?? ""
                                    );
                                    setValue(
                                      `order.${idx}.item.desc`,
                                      tempItem?.desc ?? ""
                                    );
                                    setValue(`order.${idx}.lots`, [
                                      {
                                        no: "",
                                        selection: { _id: 0, name: "" },
                                        allocation: { _id: 0, name: "" },
                                        owner: { _id: 0, name: "" },
                                        condition: { _id: 0, name: "" },
                                        avail_qty: 0,
                                        qty_req: 0,
                                        insp_req: false,
                                      },
                                    ]);
                                  }}
                                  error={errors.order?.[idx]?.item?._id}
                                />
                              )}
                            />
                          </td>
                          <td className="p-3" colSpan={3}>
                            <Controller
                              control={control}
                              name={`order.${idx}.qty` as const}
                              render={({ field }) => (
                                <Input
                                  field={field}
                                  error={errors?.order?.[idx]?.qty}
                                  type="number"
                                  placeHolder="Enter Qty"
                                  className="flex-1"
                                />
                              )}
                            />
                          </td>
                          <td className="p-3">
                            <Button
                              variant="secondary"
                              className="w-36"
                              disabled={orderFields.length === 1}
                              onClick={() => removeOrder(idx)}
                            >
                              Delete Item
                            </Button>
                          </td>
                        </tr>
                        <FormProvider {...methods}>
                          <LotsSection idx={idx} errors={errors} />
                        </FormProvider>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
              <div className="p-4 border-t border-t-gray-200">
                <Button
                  variant="outline"
                  onClick={() => appendOrder(defaultOrder)}
                >
                  + Add Item
                </Button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="border-b border-b-gray-200 bg-white pb-4">
            <Label>Note to Yard</Label>
            <Controller
              control={control}
              name="notes.initial.msg"
              render={({ field }) => (
                <textarea
                  rows={4}
                  placeholder="Enter Note"
                  {...field}
                  value={field.value ?? ""}
                  className="mt-2 w-full rounded-lg border p-4 text-sm border-gray-200 text-black"
                />
              )}
            />
          </div>
          <div className="flex gap-2 max-sm:flex-col ">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/inspection-record")}
            >
              Cancel
            </Button>
            <Button
              className="sm:ml-auto"
              variant="outline"
              size="lg"
              onClick={() => {}}
              disabled
            >
              Save as Draft
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default InspectionCreate;
