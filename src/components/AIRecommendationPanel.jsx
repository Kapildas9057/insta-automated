import { Sparkles } from 'lucide-react';

const AIRecommendationPanel = ({ recommendation }) => {
  if (!recommendation) return null;

  return (
    <section className="card aiPanel">
      <div className="aiTitle">
        <Sparkles size={18} />
        <h2>AI Dispatch Recommendation</h2>
      </div>
      <p><strong>Recommended Unit:</strong> {recommendation.unitName} ({recommendation.unitId})</p>
      <p><strong>ETA:</strong> {recommendation.eta} min</p>
      <p><strong>Confidence:</strong> {recommendation.confidence}%</p>
      <div className="confidenceTrack">
        <div className="confidenceFill" style={{ width: `${recommendation.confidence}%` }} />
      </div>
      <ul>
        {recommendation.reasoning.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
};

export default AIRecommendationPanel;
