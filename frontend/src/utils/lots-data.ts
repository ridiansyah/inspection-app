type ID = number;

type InventoryRow = {
  item_id: ID;
  lot_id: ID;
  allocation_id: ID;
  owner_id: ID;
  condition_id: ID;
  available_qty: number;
};

export function getAllocationsByLot(inv: InventoryRow[], lotId: ID) {
  return [
    ...new Set(
      inv.filter((r) => r.lot_id === lotId).map((r) => r.allocation_id)
    ),
  ];
}

export function getOwnersByLotAllocation(
  inv: InventoryRow[],
  lotId: ID,
  allocationId: ID
) {
  return [
    ...new Set(
      inv
        .filter((r) => r.lot_id === lotId && r.allocation_id === allocationId)
        .map((r) => r.owner_id)
    ),
  ];
}

export function getConditionsByLAO(
  inv: InventoryRow[],
  lotId: ID,
  allocationId: ID,
  ownerId: ID
) {
  return [
    ...new Set(
      inv
        .filter(
          (r) =>
            r.lot_id === lotId &&
            r.allocation_id === allocationId &&
            r.owner_id === ownerId
        )
        .map((r) => r.condition_id)
    ),
  ];
}

export function getAvailableQty(
  inv: InventoryRow[],
  lotId: ID,
  allocationId: ID,
  ownerId: ID,
  conditionId: ID
) {
  return inv
    .filter(
      (r) =>
        r.lot_id === lotId &&
        r.allocation_id === allocationId &&
        r.owner_id === ownerId &&
        r.condition_id === conditionId
    )
    .reduce((sum, r) => sum + r.available_qty, 0);
}
