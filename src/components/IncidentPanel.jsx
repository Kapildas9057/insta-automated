import SeverityBanner from './SeverityBanner';

const IncidentPanel = ({ incident, triageResult, isTriaging, onRunTriage, onDispatch }) => (
  <section className="card panel">
    <h2>Incident Details</h2>
    <SeverityBanner triageResult={triageResult} />
    <div className="kv"><span>ID</span><strong>{incident.id}</strong></div>
    <div className="kv"><span>Time</span><strong>{incident.time}</strong></div>
    <div className="kv"><span>Caller</span><strong>{incident.callerName}</strong></div>
    <div className="kv"><span>Phone</span><strong>{incident.callerPhone}</strong></div>
    <div className="kv"><span>Location</span><strong>{incident.location}</strong></div>
    <p className="description">{incident.description}</p>

    <button className="btn" onClick={onRunTriage} disabled={isTriaging || Boolean(triageResult)}>
      {isTriaging ? 'Running AI Triage...' : triageResult ? 'Triage Complete' : 'Run AI Triage'}
    </button>

    {triageResult && (
      <div className="triageBox fadeIn">
        <p><span>Severity:</span> <strong className="criticalText">{triageResult.severityLabel} ({triageResult.severity}/5)</strong></p>
        <p><span>Recommended Unit:</span> <strong>{triageResult.recommendedType}</strong></p>
        <p><span>Reasoning:</span> {triageResult.reasoning}</p>
        <ul>
          {triageResult.immediateActions.map((action) => <li key={action}>{action}</li>)}
        </ul>
        <button className="btn dispatchBtn" onClick={onDispatch}>Dispatch Best Unit</button>
      </div>
    )}
  </section>
);

export default IncidentPanel;
