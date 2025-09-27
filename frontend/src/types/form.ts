import { InferType } from "yup";
import schema from "../form/schema";

export type IDName = { _id: number; name: string };
export type ItemCatalog = {
  _id: number;
  no: string;
  name: string;
  desc: string;
};
export type ScopeDef = { _id: number; name: string; desc: string };
export type SOWTemplate = { _id: number; name: string; scopes: number[] };

export type LotRow = {
  no: string;
  selection: IDName;
  allocation: IDName;
  owner: IDName;
  condition: IDName;
  avail_qty: number;
  qty_req: number;
  insp_req: boolean;
};

export type OrderRow = {
  item: ItemCatalog;
  qty: number;
  lots: LotRow[];
};

export type FormValues = InferType<typeof schema>;
