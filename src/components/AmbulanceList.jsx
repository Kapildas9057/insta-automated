function AmbulanceList({ ambulances, selectedId, onSelect, getEta }) {
  return (
    <section className="card panel">
      <h2>Ambulance Fleet</h2>
      <div className="listWrap">
        {ambulances.map((amb) => (
          <button
            type="button"
            key={amb.id}
            className={`ambulanceCard ${selectedId === amb.id ? 'selected' : ''}`}
            onClick={() => onSelect(amb.id)}
          >
            <div className="ambTop">
              <h3>{amb.name}</h3>
              <span className={`type ${amb.type.toLowerCase().replace('-', '')}`}>{amb.type}</span>
            </div>
            <p>{amb.id}</p>
            <p><strong>Status:</strong> <span className={amb.status}>{amb.status}</span></p>
            <p><strong>Driver:</strong> {amb.driver}</p>
            <p><strong>ETA:</strong> {getEta(amb)} min</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default AmbulanceList;
