export const ambulances = [
  {
    id: 'AMB-001',
    name: 'Apollo ALS Unit 1',
    type: 'ALS',
    paramedics: 2,
    equipment: ['Defibrillator', 'Ventilator', 'IV Meds'],
    status: 'available',
    lat: 11.0168,
    lng: 76.9558,
    driver: 'Rajan K.'
  },
  {
    id: 'AMB-002',
    name: 'GVK BLS Unit 3',
    type: 'BLS',
    paramedics: 1,
    equipment: ['Basic First Aid', 'O2 Tank'],
    status: 'available',
    lat: 11.005,
    lng: 76.975,
    driver: 'Murugan S.'
  },
  {
    id: 'AMB-003',
    name: 'Private Unit 7',
    type: 'Driver-only',
    paramedics: 0,
    equipment: ['Stretcher'],
    status: 'available',
    lat: 11.03,
    lng: 76.94,
    driver: 'Vijay R.'
  },
  {
    id: 'AMB-004',
    name: 'EMRI 108 Unit 2',
    type: 'ALS',
    paramedics: 2,
    equipment: ['Defibrillator', 'Trauma Kit', 'IV Meds', 'Ventilator'],
    status: 'busy',
    lat: 10.99,
    lng: 76.96,
    driver: 'Priya M.'
  },
  {
    id: 'AMB-005',
    name: 'GVK BLS Unit 9',
    type: 'BLS',
    paramedics: 1,
    equipment: ['Basic First Aid', 'O2 Tank', 'Spine Board'],
    status: 'available',
    lat: 11.025,
    lng: 76.99,
    driver: 'Senthil A.'
  }
];

export const initialIncident = {
  id: 'INC-001',
  time: '14:32',
  location: 'NH48, Near Avinashi Toll, Coimbatore',
  lat: 11.01,
  lng: 76.963,
  description:
    'Head-on collision between truck and car. 2 victims. One unconscious, possible head trauma. Another has leg fracture.',
  callerName: 'Suresh Babu',
  callerPhone: '+91 98421 XXXXX',
  status: 'pending',
  severity: null,
  recommendedType: null,
  assignedAmbulance: null,
  triageNotes: null
};

export const stats = {
  avgDispatchTimeBefore: '11 min',
  avgDispatchTimeAfter: '45 sec',
  avgResponseTimeBefore: '50 min',
  avgResponseTimeAfter: '8 min',
  livesAtRisk: '1,50,000/yr',
  preventable: '~50,000'
};
