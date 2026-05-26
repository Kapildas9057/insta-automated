function IncidentPanel({ incident, triage, loading, onRunTriage, onDispatch }) {
  return (
    <section className="card panel">
      <h2>Incident Panel</h2>
      <p><strong>ID:</strong> {incident.id}</p>
      <p><strong>Time:</strong> {incident.time}</p>
      <p><strong>Caller:</strong> {incident.callerName}</p>
      <p><strong>Contact:</strong> {incident.callerPhone}</p>
      <p><strong>Location:</strong> {incident.location}</p>
      <p className="description">{incident.description}</p>

      <button className="btn" onClick={onRunTriage} disabled={loading || !!triage}>
        {loading ? 'Analyzing...' : triage ? 'Triage Completed' : 'Run AI Triage'}
      </button>

      {triage && (
        <div className="triageBox">
          <p>
            <strong>Severity:</strong>{' '}
            <span className={triage.severityLabel === 'Critical' ? 'critical' : ''}>
              {triage.severityLabel} (Level {triage.severity})
            </span>
          </p>
          <p><strong>Recommended Unit:</strong> {triage.recommendedType}</p>
          <p><strong>Reasoning:</strong> {triage.reasoning}</p>
          <div>
            <strong>Immediate Actions:</strong>
            <ul>
              {triage.immediateActions.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <button className="btn dispatchBtn" onClick={onDispatch}>
            Dispatch Best Unit
          </button>
        </div>
      )}
    </section>
  );
}

export default IncidentPanel;
