import { useState } from 'react';

function triageIncident(description) {
  const text = description.toLowerCase();

  if (text.includes('unconscious') || text.includes('head trauma')) {
    return {
      severity: 5,
      severityLabel: 'Critical',
      recommendedType: 'ALS',
      reasoning:
        'Patient unconscious with possible head trauma requiring advanced life support.',
      immediateActions: [
        'Dispatch ALS immediately',
        'Alert nearest trauma center',
        'Prepare airway support'
      ],
      etaWindowMinutes: 6
    };
  }

  if (
    text.includes('fracture') ||
    text.includes('bleeding') ||
    text.includes('multiple victims')
  ) {
    return {
      severity: 3,
      severityLabel: 'High',
      recommendedType: 'BLS',
      reasoning:
        'Injury pattern suggests urgent stabilization and oxygen support, suitable for BLS team.',
      immediateActions: [
        'Dispatch BLS unit',
        'Guide caller on bleeding control',
        'Keep patient immobilized'
      ],
      etaWindowMinutes: 10
    };
  }

  return {
    severity: 2,
    severityLabel: 'Moderate',
    recommendedType: 'Driver-only',
    reasoning:
      'No severe trauma indicators detected, so rapid transport support is prioritized.',
    immediateActions: [
      'Dispatch nearest transport unit',
      'Collect updated symptoms',
      'Escalate if condition worsens'
    ],
    etaWindowMinutes: 14
  };
}

export function useTriage() {
  const [isTriageLoading, setIsTriageLoading] = useState(false);

  const runTriage = async (description) => {
    setIsTriageLoading(true);
    const result = triageIncident(description);

    await new Promise((resolve) => {
      const delay = 1000 + Math.floor(Math.random() * 500);
      setTimeout(resolve, delay);
    });

    setIsTriageLoading(false);
    return result;
  };

  return { runTriage, isTriageLoading };
}
