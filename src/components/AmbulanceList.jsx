import { calculateEtaMinutes, haversineDistanceKm } from '../utils/distance';

const AmbulanceList = ({ ambulances, incident, selectedId, onSelect }) => (
  <section className="card panel">
    <h2>Ambulance Fleet</h2>
    <div className="listWrap">
      {ambulances.map((unit) => {
        const eta = calculateEtaMinutes(unit, incident);
        const distance = haversineDistanceKm(unit, incident).toFixed(1);
        const normalizedStatus = unit.status === 'dispatched' ? 'enroute' : unit.status;
        return (
          <button
            type="button"
            key={unit.id}
            className={`ambulanceCard status-border-${normalizedStatus} ${selectedId === unit.id ? 'selected' : ''}`}
            onClick={() => onSelect(unit)}
          >
            <div className="rowTop">
              <strong>{unit.name}</strong>
              <span className={`type type-${unit.type}`}>{unit.type}</span>
            </div>
            <p>{unit.id} · Driver: {unit.driver}</p>
            <p>Status: <span className={`status status-${normalizedStatus}`}><i className="statusDot"/> {normalizedStatus}</span></p>
            <p className="bigEta">ETA: {eta} min</p>
            <p>Distance: {distance} km</p>
          </button>
        );
      })}
    </div>
  </section>
);

export default AmbulanceList;
