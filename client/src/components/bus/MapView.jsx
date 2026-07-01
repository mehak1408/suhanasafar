import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function FocusMap({ bus }) {
  const map = useMap();

  useEffect(() => {
    if (bus?.currentLocation?.latitude && bus?.currentLocation?.longitude) {
      map.flyTo(
        [bus.currentLocation.latitude, bus.currentLocation.longitude],
        13
      );
    }
  }, [bus, map]);

  return null;
}

function MapView({ buses, selectedBus }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm">
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={11}
        className="h-[500px] w-full rounded-lg z-0"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FocusMap bus={selectedBus} />

        {buses.map((bus) =>
          bus.currentLocation?.latitude && bus.currentLocation?.longitude ? (
            <Marker
              key={bus._id}
              position={[
                bus.currentLocation.latitude,
                bus.currentLocation.longitude,
              ]}
            >
              <Popup>
                <div className="text-sm">
                  <h2 className="font-bold text-slate-900">{bus.busNumber}</h2>
                  <p className="text-slate-700">Route: {bus.route}</p>
                  <p className="text-slate-700">Driver: {bus.driverName}</p>
                  <p className="text-slate-700">Fare: ₹{bus.fare}</p>
                </div>
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}

export default MapView;