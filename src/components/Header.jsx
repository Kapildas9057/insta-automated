import { Ambulance, Activity } from 'lucide-react';

function Header() {
  return (
    <header className="header card">
      <div className="titleWrap">
        <Ambulance size={24} />
        <div>
          <h1>RoadSOS</h1>
          <p>AI-powered accident dispatch dashboard · Coimbatore Command Center</p>
        </div>
      </div>
      <div className="liveBadge">
        <Activity size={16} />
        Live Dispatch
      </div>
    </header>
  );
}

export default Header;
