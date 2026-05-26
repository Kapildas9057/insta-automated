import { Siren, Phone, Brain, Ambulance, CheckCircle2, Clock3 } from 'lucide-react';

const iconByType = {
  incident: Siren,
  caller: Phone,
  triage: Brain,
  assign: Ambulance,
  accept: CheckCircle2,
  eta: Clock3
};

const TimelineFeed = ({ events }) => (
  <section className="card timelinePanel">
    <h2>Live Event Timeline</h2>
    <div className="timelineList">
      {events.map((event) => {
        const Icon = iconByType[event.type] || Clock3;
        return (
          <article key={event.id} className="timelineItem fadeIn">
            <Icon size={16} />
            <div>
              <p>{event.message}</p>
              <span>{event.time}</span>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default TimelineFeed;
