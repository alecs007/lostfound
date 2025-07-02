"use client";

import styles from "./PostMap.module.scss";
import { useRef } from "react";
import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationData {
  name: string;
  lat: number;
  lng: number;
  radius: number;
}

const romaniaBounds: LatLngBounds = L.latLngBounds([43.5, 20.2], [48.3, 29.7]);

const customIcon = L.icon({
  iconUrl: "/icons/marker.svg",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const PostMap = ({ location }: { location: LocationData }) => {
  const { lat, lng, radius } = location;
  const mapRef = useRef<L.Map>(null);

  return (
    <div className={styles.map}>
      <MapContainer
        ref={mapRef}
        center={[lat, lng]}
        zoom={14}
        minZoom={6}
        maxZoom={18}
        maxBounds={romaniaBounds}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <Marker position={[lat, lng]} icon={customIcon}></Marker>
        <Circle
          center={[lat, lng]}
          radius={radius}
          pathOptions={{
            color: "rgb(255, 215, 0)",
            fillColor: "rgb(255, 215, 0)",
            fillOpacity: 0.1,
            weight: 2,
          }}
        />
      </MapContainer>
    </div>
  );
};

export default PostMap;
