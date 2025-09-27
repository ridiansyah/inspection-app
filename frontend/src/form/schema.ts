import * as yup from "yup";

const schema = yup.object({
  customer: yup
    .object({
      _id: yup.number().required("Customer is required"),
      name: yup.string().required(),
      charge: yup.boolean().required(),
      customer_ref: yup.string().required(),
    })
    .required("Customer is required"),
  insp_type: yup
    .object({
      _id: yup.number().required("Service Type is required"),
      name: yup.string().required(),
    })
    .required("Service Type is required"),
  sow: yup
    .object({
      _id: yup.number().required("Scope of Work is required"),
      name: yup.string().required(),
      scope_included: yup
        .array()
        .of(
          yup.object({
            _id: yup.number().required("Scope Included is required"),
            name: yup.string().required(),
            desc: yup.string().required(),
          })
        )
        .min(1)
        .required(),
    })
    .required("Scope of Work is required"),
  location: yup
    .object({
      _id: yup.number().required("Location is required"),
      name: yup.string().required(),
    })
    .required("Location is required"),
  ecd_date: yup.string().required("Estimated Completion Date is required"),
  dc_code: yup.string().notRequired().default(""),
  notes: yup.object({
    initial: yup.object({
      msg: yup.string().notRequired().default(""),
      by: yup.string().required(),
      by_id: yup.number().required(),
    }),
  }),
  status: yup.string().required(),

  ////
  order: yup
    .array()
    .of(
      yup.object({
        item: yup
          .object({
            _id: yup.number().required().min(1, "Is required"),
            no: yup.string().required(),
            name: yup.string().required(),
            desc: yup.string().required(),
          })
          .required("Item is required"),
        qty: yup
          .number()
          .min(1, "Min 1")
          .required("Qty is required")
          .test("qty-equals-sum", function (value) {
            const lots = Array.isArray(this.parent?.lots)
              ? this.parent.lots
              : [];
            const sum = lots.reduce(
              (acc: number, l: { qty_req?: number }) =>
                acc + (Number(l?.qty_req) || 0),
              0
            );
            if (value === sum) return true;
            return this.createError({
              path: this.path,
              message: `Qty must equal total Qty Required (${sum})`,
            });
          }),
        lots: yup
          .array()
          .of(
            yup.object({
              no: yup.string().required(),
              selection: yup
                .object({
                  _id: yup.number().required().min(1, "Is required"),
                  name: yup.string().required(),
                })
                .required(),
              allocation: yup
                .object({
                  _id: yup.number().required().min(1, "Is required"),
                  name: yup.string().required(),
                })
                .required(),
              owner: yup
                .object({
                  _id: yup.number().required().min(1, "Is required"),
                  name: yup.string().required(),
                })
                .required(),
              condition: yup
                .object({
                  _id: yup.number().required().min(1, "Is required"),
                  name: yup.string().required(),
                })
                .required(),
              avail_qty: yup.number().required(),
              qty_req: yup
                .number()
                .min(1, "Min 1")
                .required()
                .lessThan(
                  yup.ref("avail_qty"),
                  "Request qty must be less than available qty"
                ),
              insp_req: yup.boolean().required(),
            })
          )
          .min(1, "At least 1 lot")
          .required("is required"),
      })
    )
    .min(1, "At least 1 item")
    .required(),
});

export default schema;
