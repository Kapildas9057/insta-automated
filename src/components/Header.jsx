import { Ambulance, Activity } from 'lucide-react';

const Header = () => (
  <header className="header card">
    <div className="brand">
      <Ambulance size={26} />
      <div>
        <h1>RoadSOS</h1>
        <p>AI-Powered Emergency Dispatch Dashboard</p>
      </div>
    </div>
    <div className="liveBadge">
      <Activity size={16} />
      Live Dispatch
    </div>
  </header>
);

export default Header;
