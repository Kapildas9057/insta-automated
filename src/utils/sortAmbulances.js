const typeRank = {
  ALS: 1,
  BLS: 2,
  'Driver-only': 3
};

const statusRank = {
  available: 1,
  dispatched: 2,
  busy: 3
};

export function sortAmbulances(ambulances) {
  return [...ambulances].sort((a, b) => {
    if (statusRank[a.status] !== statusRank[b.status]) {
      return statusRank[a.status] - statusRank[b.status];
    }

    if (a.status === 'available' && b.status === 'available') {
      return typeRank[a.type] - typeRank[b.type];
    }

    return a.id.localeCompare(b.id);
  });
}
