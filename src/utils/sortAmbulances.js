const priority = {
  'available-ALS': 1,
  'available-BLS': 2,
  'available-Driver-only': 3,
  dispatched: 4,
  busy: 5
};

export const sortAmbulances = (fleet) =>
  [...fleet].sort((a, b) => {
    const aKey = a.status === 'available' ? `available-${a.type}` : a.status;
    const bKey = b.status === 'available' ? `available-${b.type}` : b.status;
    return (priority[aKey] ?? 99) - (priority[bKey] ?? 99);
  });
