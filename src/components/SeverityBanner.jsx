const severityConfig = {
  Critical: {
    className: 'sev-critical',
    label: 'CRITICAL INCIDENT'
  },
  High: {
    className: 'sev-high',
    label: 'HIGH PRIORITY INCIDENT'
  },
  Moderate: {
    className: 'sev-moderate',
    label: 'MODERATE INCIDENT'
  },
  Low: {
    className: 'sev-low',
    label: 'LOW PRIORITY INCIDENT'
  }
};

const SeverityBanner = ({ triageResult }) => {
  const severityLabel = triageResult?.severityLabel || 'Critical';
  const details = severityConfig[severityLabel] || severityConfig.Critical;

  return (
    <div className={`severityBanner ${details.className}`}>
      <div className="severityTop">{details.label}</div>
      <div className="severityMeta">
        <span>Type: Road Traffic Collision</span>
        <span>Victims: 2</span>
        <span>Concern: Head Trauma</span>
        <span>Urgency: {severityLabel}</span>
      </div>
    </div>
  );
};

export default SeverityBanner;
