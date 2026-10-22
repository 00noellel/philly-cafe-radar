import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

//Philadelphia's approximate coordinates.
//The map will initially center on the city.
const philadelphia = [39.9526, -75.1636];

function CafeMap() {
  return (
    <MapContainer
      center={philadelphia}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      {/* Loads the map tiles from OpenStreetMap. */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Temporary marker so we can confirm the map works. */}
      <Marker position={philadelphia}>
        <Popup>
          Philadelphia! Add cafe locations here.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default CafeMap;
