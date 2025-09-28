import { FormValues } from "../types/form";
import { ChargeToCustomer } from "../types/inspection";

export const formatDate = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  });
};

export function classNames(...v: (string | false | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

export function calculateThirdParty(data: FormValues): number {
  const customerID = data.customer?._id;
  const owners = data.order.flatMap((o) => o.lots.map((l) => l.owner?._id));

  const uniqueOwners = new Set(owners);
  // hitung owner yang berbeda dari customer
  const thirdPartyOwners = [...uniqueOwners].filter((o) => o !== customerID);

  return thirdPartyOwners.length;
}

export function toUnixSeconds(dateStr: string): number {
  const [year, month, day] = dateStr.split("-").map(Number);

  // bulan di JS mulai dari 0
  const date = new Date(year, month - 1, day);

  // getTime() = ms → bagi 1000 biar jadi detik
  return Math.floor(date.getTime() / 1000);
}

export const generateDummyCTC = (): ChargeToCustomer[] => {
  const count = Math.floor(Math.random() * 5) + 3; // 3–7 baris
  const data: ChargeToCustomer[] = [];

  // random starting number 3 digit (100–999)
  const start = Math.floor(Math.random() * 900) + 100;

  for (let i = 0; i < count; i++) {
    const currentNo = start + i; // tetap berurutan
    const qty = Math.floor(Math.random() * 10) + 1; // 1–10
    const price = Math.floor(Math.random() * 10) + 5; // 5–15

    data.push({
      no: `OD-${String(currentNo).padStart(3, "0")}`,
      desc: `SERV-${String(currentNo).padStart(3, "0")} Inspection`,
      qty,
      price,
      total: qty * price,
    });
  }

  return data;
};
