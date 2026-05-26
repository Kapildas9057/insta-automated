import { Timer, Gauge, HeartPulse, ShieldCheck } from 'lucide-react';

const StatBar = ({ stats }) => {
  const items = [
    { title: 'Dispatch Time', value: `${stats.avgDispatchTimeBefore} → ${stats.avgDispatchTimeAfter}`, cls: 'kpi-blue', Icon: Timer },
    { title: 'Response Time', value: `${stats.avgResponseTimeBefore} → ${stats.avgResponseTimeAfter}`, cls: 'kpi-cyan', Icon: Gauge },
    { title: 'Lives At Risk', value: stats.livesAtRisk, cls: 'kpi-red', Icon: HeartPulse },
    { title: 'Preventable', value: stats.preventable, cls: 'kpi-green', Icon: ShieldCheck }
  ];

  return (
    <section className="statsGrid">
      {items.map(({ title, value, cls, Icon }) => (
        <article key={title} className={`card statCard ${cls}`}>
          <div className="statHeader"><Icon size={16} /> <h3>{title}</h3></div>
          <p className="countUp">{value}</p>
        </article>
      ))}
    </section>
  );
};

export default StatBar;
