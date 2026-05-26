import { useState } from 'react';

const criticalResult = {
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

const getNonCriticalTriage = (description) => {
  const text = description.toLowerCase();
  const moderateKeywords = ['fracture', 'bleeding', 'chest pain', 'multiple'];
  const isModerate = moderateKeywords.some((word) => text.includes(word));

  if (isModerate) {
    return {
      severity: 3,
      severityLabel: 'Moderate',
      recommendedType: 'BLS',
      reasoning:
        'Patient is stable but has injuries needing basic life support and transport monitoring.',
      immediateActions: [
        'Dispatch nearest BLS unit',
        'Keep caller on line for monitoring updates',
        'Prepare triage handover at receiving hospital'
      ],
      etaWindowMinutes: 10
    };
  }

  return {
    severity: 2,
    severityLabel: 'Low',
    recommendedType: 'Driver-only',
    reasoning:
      'No immediate high-risk indicators detected; transport-focused unit is sufficient initially.',
    immediateActions: [
      'Dispatch nearest transport unit',
      'Advise caller to avoid moving victims unless unsafe',
      'Escalate to BLS/ALS if symptoms worsen'
    ],
    etaWindowMinutes: 14
  };
};

export const triageIncident = (description) => {
  const text = description.toLowerCase();
  if (text.includes('unconscious') || text.includes('head trauma')) {
    return criticalResult;
  }
  return getNonCriticalTriage(description);
};

export const useTriage = () => {
  const [isTriaging, setIsTriaging] = useState(false);
  const [triageResult, setTriageResult] = useState(null);

  const runTriage = async (description) => {
    setIsTriaging(true);
    const waitMs = 1000 + Math.floor(Math.random() * 501);
    await new Promise((resolve) => setTimeout(resolve, waitMs));
    const result = triageIncident(description);
    setTriageResult(result);
    setIsTriaging(false);
    return result;
  };

  return { isTriaging, triageResult, runTriage };
};
