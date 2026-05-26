import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const makeIcon = (color, opacity = 1) =>
  L.divIcon({
    html: `<div style="background:${color};opacity:${opacity};width:14px;height:14px;border-radius:50%;border:2px solid #fff;"></div>`,
    className: '',
    iconSize: [14, 14]
  });

const incidentIcon = L.divIcon({
  html: '<div class="incidentPulse"></div>',
  className: '',
  iconSize: [18, 18]
});

function MapView({ incident, ambulances, selectedAmbulance }) {
  return (
    <section className="card panel mapPanel">
      <h2>Interactive Map</h2>
      <MapContainer center={[11.01, 76.963]} zoom={12} className="map">
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; OpenStreetMap contributors &copy; CARTO'
        />

        <Marker position={[incident.lat, incident.lng]} icon={incidentIcon}>
          <Popup>{incident.location}</Popup>
        </Marker>

        {ambulances.map((amb) => {
          const color = amb.type === 'ALS' ? '#7c3aed' : amb.type === 'BLS' ? '#0284c7' : '#6b7280';
          const opacity = amb.status === 'busy' ? 0.4 : 1;
          return (
            <Marker key={amb.id} position={[amb.lat, amb.lng]} icon={makeIcon(color, opacity)}>
              <Popup>{amb.name}</Popup>
            </Marker>
          );
        })}

        {selectedAmbulance && (
          <Polyline
            positions={[
              [selectedAmbulance.lat, selectedAmbulance.lng],
              [incident.lat, incident.lng]
            ]}
            pathOptions={{ color: '#22d3ee', dashArray: '8 6' }}
          />
        )}
      </MapContainer>
    </section>
  );
}

export default MapView;
