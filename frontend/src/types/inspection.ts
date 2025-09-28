export interface OriginalInspectionRecord {
  _id: string;
  no: string;
  status: string;
  unit: string;
  yard: string;
  appvwhen: number;
  appvwho: string;
  postingdate: number;
  createdate: number;
  type: string;
  insp_type: string;
  id_transfer: string | null;
  idtrans: string | null;
  screening_number: number;
  items: []; //noted
  carrier: string | null;
  arrivaldate: string | null;
  operatorName: string | null;
  operatorSign: string | null;
  action: string | null;
  notes: {
    initial: {
      msg: string;
      by: string;
    };
  };
  stages: []; //noted
  batchaction: string | null;
  id_si: string | null;
  transfer_condition: string | null;
  works: []; //noted
  tpi: string;
  rack: string | null;
  template: string | null;
  useSow: string | null;
  drift_inspections: [];
  cancelReason: string | null;
  cancelDate: string | null;
  reserved_stock: {
    locked: string;
    allocation: string;
    tag: string | null;
    qty: number;
  }[];
  createid: string;
  createwho: string;
  updateid: string | null;
  updatewho: string | null;
  customer: {
    customer: string;
    customer_ref: string;
    name: string;
  };
  revision_no: number;
  revision_date: number;
  imei: string | null;
  items_raw: {
    id_item: string;
    item_code: string;
    item_desc: string;
    batch: string;
    original_batch: string;
    condition: string;
    owned: string;
    locked: string;
    allocation: string;
    tag: string | null;
    qty: number;
    id_quarantine: string | null;
    customer_item_no: string;
    owned_name: string;
    locked_name: string;
    item_type: string;
    item_type_name: string;
    item_pipe_family: string;
    inspected_qty: number;
    balance: number;
    inprogress_qty: number;
  }[];
  released_stock: {
    id_item: string;
    batch: string;
    original_condition: string;
    condition: string;
    owned: string;
    locked: string;
    allocation: string;
    tag: string | null;
    qty: number;
    id_screening: string;
  }[];
  iwo: string | null;
  sow: {
    template: string;
    works: {
      _id: string;
      subscope: string;
      subscope_name: string;
      fields: {
        name: string;
        type: string;
        selected: boolean;
        value: string;
        editableDescription: boolean;
        requiredDescription: boolean;
        drift_inspection: boolean;
        _id: string;
      }[];
    }[];
    template_name: string;
    items: { id_item: string }[];
  }[];
  journaled: []; //noted
  invoiced: string | null;
  invoicedwhen: string | null;
  invoicedwho: string | null;
  progress: number;
  yardName: string;
  linkTo: string;
  tpiName: string;
  total_lisi: number;
  lisi: {
    id: string;
    no: string;
    url: string;
    type: string;
  }[];
  qty: number;
}

export interface Scope {
  _id: number; //Scope ID
  name: string; //Scope name
  desc: string; //Scope description
}

export interface ScopeOfWork {
  _id: number; //SOW ID
  name: string; //SOW name
  scope_included: Scope[]; //Scope included
}

export interface Lot {
  _id: number; //Lot ID
  no: string; //Lot number
  selection: {
    _id: number; //Selection ID
    name: string; //Selection name
  };
  allocation: {
    _id: number; //Allocation ID
    name: string; //Allocation name
  };
  owner: {
    _id: number; //Owner ID
    name: string; //Owner name
  };
  condition: {
    _id: number; //Condition ID
    name: string; //Condition name
  };
  avail_qty: number; //Available quantity
  qty_req: number; //Requested quantity
  insp_req: boolean; //Inspection required
  requested: {
    pcs: number; //Requested pieces
    mt: number; //Requested metric ton
  };
  pending: {
    pcs: number; //Pending pieces
    mt: number; //Pending metric ton
  };
  completed: {
    pcs: number; //Allocated pieces
    mt: number; //Allocated metric ton
  };
  progress: number; //Progress percentage
}

export interface Order {
  _id: number; //Order ID
  item: {
    _id: number; //Item ID
    no: string; //Item number
    name: string; //Item name
    desc: string; //Item description
  };
  qty: number; //Order quantity
  lots: Lot[];
}

export interface ChargeToCustomer {
  no: string;
  desc: string;
  qty: number;
  price: number;
  total: number;
}

export interface InspectionRecord {
  _id: number; //generated on creation
  no: string; //formatted as "RRIN-YYYY-MMDD-N"
  status: "New" | "In Progress" | "Ready to Review" | "Completed" | "Draft";
  ecd_date: number; //timestamp
  create_date: number; //timestamp
  insp_type: {
    _id: number; //Service Type ID
    name: string; //Service Type
  };
  notes: {
    initial: {
      msg: string; //note to yard
      by: string; //user name
      by_id: number; // user id
    };
  };
  creator_id: number;
  creator_name: string;
  customer: {
    _id: number; //customer ID
    customer_ref: string; //related to
    name: string; //customer name
    charge: boolean; // charge to customer
  };
  sow: ScopeOfWork;
  location: {
    _id: number; //location ID
    name: string; //location name
  };
  dc_code: string; //D/C Code
  order: Order[]; // Order information
  third_party: number; // third party
  ctc: ChargeToCustomer[];
}

export interface InspectionState {
  records: InspectionRecord[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  filters: {
    status: string;
    search: string;
  };
}
