function StatBar({ stats }) {
  return (
    <section className="statBar">
      <article className="card statCard">
        <h3>Dispatch Time</h3>
        <p>
          <span>{stats.avgDispatchTimeBefore}</span> → <strong>{stats.avgDispatchTimeAfter}</strong>
        </p>
      </article>
      <article className="card statCard">
        <h3>Response Time</h3>
        <p>
          <span>{stats.avgResponseTimeBefore}</span> → <strong>{stats.avgResponseTimeAfter}</strong>
        </p>
      </article>
      <article className="card statCard">
        <h3>Lives At Risk</h3>
        <p>{stats.livesAtRisk}</p>
      </article>
      <article className="card statCard">
        <h3>Preventable</h3>
        <p>{stats.preventable}</p>
      </article>
    </section>
  );
}

export default StatBar;
