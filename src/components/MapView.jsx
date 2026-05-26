import { MapContainer, TileLayer, CircleMarker, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';

const iconFromEmoji = (emoji, glow = false) =>
  L.divIcon({
    className: 'custom-marker',
    html: `<span class="emojiMarker ${glow ? 'glow' : ''}">${emoji}</span>`
  });

const getAmbIcon = (unit, selected) => {
  if (unit.status === 'busy') return iconFromEmoji('🚑', false);
  return iconFromEmoji('🚑', selected);
};

const MapView = ({ incident, ambulances, selectedAmbulance }) => (
  <section className="card mapPanel">
    <h2>Interactive Map</h2>
    <MapContainer center={[11.0168, 76.9558]} zoom={12} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      <CircleMarker center={[incident.lat, incident.lng]} radius={12} pathOptions={{ color: '#dc2626', fillOpacity: 0.8 }} className="pulse-marker">
        <Popup>Incident Location</Popup>
      </CircleMarker>

      <Marker position={[11.009, 76.958]} icon={iconFromEmoji('🏥')}><Popup>Trauma Hospital</Popup></Marker>
      <Marker position={[11.014, 76.968]} icon={iconFromEmoji('🛡️')}><Popup>Police Unit</Popup></Marker>

      {ambulances.map((unit) => (
        <Marker key={unit.id} position={[unit.lat, unit.lng]} icon={getAmbIcon(unit, selectedAmbulance?.id === unit.id)}>
          <Popup>{unit.name} ({unit.status})</Popup>
        </Marker>
      ))}

      {selectedAmbulance && (
        <Polyline
          positions={[[selectedAmbulance.lat, selectedAmbulance.lng], [incident.lat, incident.lng]]}
          pathOptions={{ color: '#22d3ee', dashArray: '12, 8', weight: 6, opacity: 0.95 }}
        />
      )}
    </MapContainer>
  </section>
);

export default MapView;
