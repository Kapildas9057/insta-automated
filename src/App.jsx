import { useMemo, useState } from 'react';
import Header from './components/Header';
import StatBar from './components/StatBar';
import IncidentPanel from './components/IncidentPanel';
import AmbulanceList from './components/AmbulanceList';
import MapView from './components/MapView';
import DispatchBanner from './components/DispatchBanner';
import { ambulances as seedAmbulances, initialIncident, stats } from './data/mockData';
import { useTriage } from './hooks/useTriage';
import { haversineDistanceKm, getEtaMinutes } from './utils/distance';
import { sortAmbulances } from './utils/sortAmbulances';

function App() {
  const [incident, setIncident] = useState(initialIncident);
  const [triage, setTriage] = useState(null);
  const [ambulances, setAmbulances] = useState(seedAmbulances);
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState(null);
  const [dispatchMessage, setDispatchMessage] = useState('');
  const { runTriage, isTriageLoading } = useTriage();

  const sortedAmbulances = useMemo(() => sortAmbulances(ambulances), [ambulances]);

  const getEta = (amb) => getEtaMinutes(haversineDistanceKm(amb.lat, amb.lng, incident.lat, incident.lng));

  const handleRunTriage = async () => {
    const result = await runTriage(incident.description);
    setTriage(result);
    setIncident((prev) => ({ ...prev, severity: result.severity, recommendedType: result.recommendedType, triageNotes: result.reasoning }));
  };

  const handleDispatchBest = () => {
    const alsAvailable = ambulances.filter((a) => a.type === 'ALS' && a.status === 'available');
    if (alsAvailable.length === 0) return;

    const best = alsAvailable.reduce((nearest, current) => (getEta(current) < getEta(nearest) ? current : nearest));
    const eta = getEta(best);

    setAmbulances((prev) => prev.map((a) => (a.id === best.id ? { ...a, status: 'dispatched' } : a)));
    setIncident((prev) => ({ ...prev, status: 'dispatched', assignedAmbulance: best.id }));
    setSelectedAmbulanceId(best.id);
    setDispatchMessage(`Dispatched ${best.id} · ETA ${eta} min · 45 sec booking time`);
  };

  const selectedAmbulance = ambulances.find((amb) => amb.id === selectedAmbulanceId) || null;

  return (
    <div className="app">
      <Header />
      <DispatchBanner dispatchMessage={dispatchMessage} />
      <StatBar stats={stats} />

      <main className="dashboard">
        <div style={{ width: '30%' }}>
          <IncidentPanel
            incident={incident}
            triage={triage}
            loading={isTriageLoading}
            onRunTriage={handleRunTriage}
            onDispatch={handleDispatchBest}
          />
        </div>
        <div style={{ width: '25%' }}>
          <AmbulanceList
            ambulances={sortedAmbulances}
            selectedId={selectedAmbulanceId}
            onSelect={setSelectedAmbulanceId}
            getEta={getEta}
          />
        </div>
        <div style={{ width: '45%' }}>
          <MapView incident={incident} ambulances={sortedAmbulances} selectedAmbulance={selectedAmbulance} />
        </div>
      </main>
    </div>
  );
}

export default App;
