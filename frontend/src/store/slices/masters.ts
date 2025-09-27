import { createSlice } from "@reduxjs/toolkit";

const customerMaster = [
  { _id: 1, name: "MITME", charge: true },
  { _id: 2, name: "ADNOC", charge: false },
  { _id: 3, name: "Third Party Co.", charge: true },
];

const mastersSlice = createSlice({
  name: "masters",
  initialState: {
    customer: [...customerMaster],
    insp_type: [
      { _id: 1, name: "New Arrival" },
      { _id: 2, name: "Maintenance" },
      { _id: 3, name: "On Spot" },
    ],
    location: [
      { _id: 1, name: "MITME Yard" },
      { _id: 2, name: "Abu Dhabi Yard" },
      { _id: 3, name: "Dubai Port" },
    ],
    sow: [
      {
        _id: 2,
        name: "Standard Arrival Check",
        scope_included: [
          {
            _id: 2,
            name: "Visual Inspection",
            desc: "External body, threads, protectors, paint marks.",
          },
          {
            _id: 3,
            name: "Dimensional Inspection",
            desc: "OD/ID, length, thread profile sampling.",
          },
        ],
      },
      {
        _id: 3,
        name: "Coating & NDT Check",
        scope_included: [
          {
            _id: 1,
            name: "Coating Chemical",
            desc: "Coating adhesion & chemical property checks.",
          },
          {
            _id: 4,
            name: "Magnetic Particle",
            desc: "MPI for surface cracks.",
          },
        ],
      },
      {
        _id: 4,
        name: "Routine Visual + Dimensional",
        scope_included: [
          {
            _id: 2,
            name: "Visual Inspection",
            desc: "External body, threads, protectors, paint marks.",
          },
          {
            _id: 3,
            name: "Dimensional Inspection",
            desc: "OD/ID, length, thread profile sampling.",
          },
        ],
      },
      {
        _id: 5,
        name: "Routine + NDT",
        scope_included: [
          {
            _id: 2,
            name: "Visual Inspection",
            desc: "External body, threads, protectors, paint marks.",
          },
          {
            _id: 4,
            name: "Magnetic Particle",
            desc: "MPI for surface cracks.",
          },
        ],
      },
      {
        _id: 6,
        name: "Return Visual + Drift",
        scope_included: [
          {
            _id: 2,
            name: "Visual Inspection",
            desc: "External body, threads, protectors, paint marks.",
          },
          { _id: 6, name: "Drift Test", desc: "API drift test." },
        ],
      },
      {
        _id: 7,
        name: "Routine + Thread Gauging",
        scope_included: [
          {
            _id: 3,
            name: "Dimensional Inspection",
            desc: "OD/ID, length, thread profile sampling.",
          },
          { _id: 7, name: "Hydro Test", desc: "Hydrostatic test sampling." },
        ],
      },
      {
        _id: 8,
        name: "ODM Quick Check",
        scope_included: [
          {
            _id: 2,
            name: "Visual Inspection",
            desc: "External body, threads, protectors, paint marks.",
          },
          {
            _id: 5,
            name: "Ultrasonic Test",
            desc: "UT thickness measurement on suspect areas.",
          },
          { _id: 6, name: "Drift Test", desc: "API drift test." },
          { _id: 7, name: "Hydro Test", desc: "Hydrostatic test sampling." },
        ],
      },
    ],
    related_docs: [
      { no: "RRIN-2025-0105", customer_id: 1 },
      { no: "RET-2025-0009", customer_id: 1 },
      { no: "EMG-ODM-2025-0003", customer_id: 1 },
      { no: "WO-RET-2025-0011", customer_id: 1 },
      { no: "RM-2025-Q2-0004", customer_id: 1 },
      { no: "QA-2025-CHK-0002", customer_id: 1 },

      { no: "WO-NA-2025-0012", customer_id: 2 },
      { no: "RM-2025-AD-0005", customer_id: 2 },
      { no: "RRIN-2025-AD-0107", customer_id: 2 },
      { no: "QC-2025-THR-0001", customer_id: 2 },

      { no: "WO-ODM-2025-0007", customer_id: 3 },
      { no: "WO-VALVE-2025-0002", customer_id: 3 },
      { no: "RM-TP-2025-0008", customer_id: 3 },
      { no: "NA-TP-2025-0014", customer_id: 3 },
      { no: "QA-TP-2025-0003", customer_id: 3 },
    ],
    ///////
    items: [
      {
        _id: 1,
        no: "C-1338-68-L80-JFELION-STD01",
        name: "Casing,13-3/8",
        desc: "L80 JFELION STD-01",
      },
      {
        _id: 2,
        no: "C-0958-47-L80-TPCO-STD01",
        name: "Casing,9-5/8",
        desc: "L80 TPCO STD-01",
      },
    ],
    lots: [
      { _id: 1, item_id: 1, no: "LOT-001", name: "Lot A" },
      { _id: 2, item_id: 1, no: "LOT-002", name: "Lot B" },
      { _id: 3, item_id: 2, no: "LOT-003", name: "Lot C" },
      { _id: 4, item_id: 2, no: "LOT-004", name: "Lot D" },
    ],
    allocations: [
      { _id: 1, name: "PT Sentosa" },
      { _id: 2, name: "Shipper LLC" },
      { _id: 3, name: "Maintenis Inc" },
    ],
    owners: [...customerMaster],
    conditions: [
      { _id: 1, name: "Good" },
      { _id: 2, name: "Quarantine" },
      { _id: 3, name: "Damaged" },
      { _id: 4, name: "Recoat Required" },
    ],
    inventory: [
      {
        item_id: 1,
        lot_id: 1,
        allocation_id: 1,
        owner_id: 1,
        condition_id: 1,
        available_qty: 6,
      },
      {
        item_id: 1,
        lot_id: 1,
        allocation_id: 2,
        owner_id: 1,
        condition_id: 2,
        available_qty: 2,
      },
      {
        item_id: 1,
        lot_id: 1,
        allocation_id: 3,
        owner_id: 2,
        condition_id: 1,
        available_qty: 4,
      },
      {
        item_id: 1,
        lot_id: 2,
        allocation_id: 1,
        owner_id: 2,
        condition_id: 1,
        available_qty: 10,
      },
      {
        item_id: 1,
        lot_id: 2,
        allocation_id: 2,
        owner_id: 2,
        condition_id: 3,
        available_qty: 1,
      },
      {
        item_id: 1,
        lot_id: 2,
        allocation_id: 3,
        owner_id: 3,
        condition_id: 1,
        available_qty: 3,
      },
      {
        item_id: 2,
        lot_id: 3,
        allocation_id: 1,
        owner_id: 1,
        condition_id: 1,
        available_qty: 25,
      },
      {
        item_id: 2,
        lot_id: 3,
        allocation_id: 2,
        owner_id: 1,
        condition_id: 4,
        available_qty: 5,
      },
      {
        item_id: 2,
        lot_id: 3,
        allocation_id: 2,
        owner_id: 3,
        condition_id: 2,
        available_qty: 7,
      },
      {
        item_id: 2,
        lot_id: 4,
        allocation_id: 1,
        owner_id: 2,
        condition_id: 1,
        available_qty: 18,
      },
      {
        item_id: 2,
        lot_id: 4,
        allocation_id: 3,
        owner_id: 2,
        condition_id: 1,
        available_qty: 4,
      },
      {
        item_id: 2,
        lot_id: 4,
        allocation_id: 2,
        owner_id: 3,
        condition_id: 3,
        available_qty: 2,
      },
    ],
  },
  reducers: {},
});

export default mastersSlice.reducer;
