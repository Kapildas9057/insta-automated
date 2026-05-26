import { useMemo, useState } from 'react';
import Header from './components/Header';
import StatBar from './components/StatBar';
import IncidentPanel from './components/IncidentPanel';
import AmbulanceList from './components/AmbulanceList';
import MapView from './components/MapView';
import DispatchBanner from './components/DispatchBanner';
import AIRecommendationPanel from './components/AIRecommendationPanel';
import TimelineFeed from './components/TimelineFeed';
import { ambulances as initialAmbulances, initialIncident, stats } from './data/mockData';
import { useTriage } from './hooks/useTriage';
import { sortAmbulances } from './utils/sortAmbulances';
import { calculateEtaMinutes } from './utils/distance';

const formatTime = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

function App() {
  const [fleet, setFleet] = useState(initialAmbulances);
  const [incident, setIncident] = useState(initialIncident);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [dispatchMessage, setDispatchMessage] = useState('');
  const [timeline, setTimeline] = useState([
    { id: 't1', type: 'incident', message: 'Incident reported', time: '14:32' },
    { id: 't2', type: 'caller', message: 'Caller connected', time: '14:33' }
  ]);
  const [recommendation, setRecommendation] = useState(null);
  const { isTriaging, triageResult, runTriage } = useTriage();

  const sortedFleet = useMemo(() => sortAmbulances(fleet), [fleet]);

  const addEvent = (type, message) => {
    setTimeline((prev) => [{ id: `${Date.now()}-${Math.random()}`, type, message, time: formatTime() }, ...prev]);
  };

  const handleRunTriage = async () => {
    const result = await runTriage(incident.description);
    addEvent('triage', 'AI triage completed');
    setIncident((prev) => ({ ...prev, severity: result.severity, recommendedType: result.recommendedType, triageNotes: result.reasoning }));

    const best = fleet.filter((u) => u.status === 'available' && u.type === result.recommendedType)
      .sort((a, b) => calculateEtaMinutes(a, incident) - calculateEtaMinutes(b, incident))[0];

    if (best) {
      setRecommendation({
        unitName: best.name,
        unitId: best.id,
        eta: calculateEtaMinutes(best, incident),
        confidence: result.severityLabel === 'Critical' ? 96 : 88,
        reasoning: [
          `Closest ${result.recommendedType}-equipped vehicle`,
          `Suitable for ${result.reasoning.toLowerCase()}`,
          'Fastest route based on current traffic model'
        ]
      });
    }
  };

  const handleDispatchBest = () => {
    const nearestALS = fleet.filter((u) => u.status === 'available' && u.type === 'ALS')
      .sort((a, b) => calculateEtaMinutes(a, incident) - calculateEtaMinutes(b, incident))[0];
    if (!nearestALS) return setDispatchMessage('No available ALS unit found.');

    const eta = calculateEtaMinutes(nearestALS, incident);
    setFleet((prev) => prev.map((u) => (u.id === nearestALS.id ? { ...u, status: 'dispatched' } : u)));
    setIncident((prev) => ({ ...prev, assignedAmbulance: nearestALS.id, status: 'dispatched' }));
    setSelectedAmbulance(nearestALS);
    setDispatchMessage(`Dispatched ${nearestALS.id} · ETA ${eta} min · 45 sec booking time`);
    addEvent('assign', `Ambulance assigned: ${nearestALS.id}`);
    addEvent('accept', `Driver accepted dispatch: ${nearestALS.driver}`);
    addEvent('eta', `ETA updated: ${eta} minutes`);
  };

  return (
    <div className="app">
      <Header />
      <DispatchBanner message={dispatchMessage} />
      <StatBar stats={stats} />
      <main className="dashboardGrid">
        <div className="col-left">
          <IncidentPanel incident={incident} triageResult={triageResult} isTriaging={isTriaging} onRunTriage={handleRunTriage} onDispatch={handleDispatchBest} />
          <TimelineFeed events={timeline} />
        </div>
        <div className="col-mid">
          <AIRecommendationPanel recommendation={recommendation} />
          <AmbulanceList ambulances={sortedFleet} incident={incident} selectedId={selectedAmbulance?.id} onSelect={setSelectedAmbulance} />
        </div>
        <div className="col-right">
          <MapView incident={incident} ambulances={fleet} selectedAmbulance={selectedAmbulance} />
        </div>
      </main>
    </div>
  );
}

export default App;
