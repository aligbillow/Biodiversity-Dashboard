"use client";

import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import "leaflet/dist/leaflet.css";
import { ParkData } from "@/types/park";
import styles from "./NationalParksMap.module.css";

type Props = {
  parkData: any;
  onSelectPark: (park: ParkData) => void;
  className?: string;
};

const NationalParksMap = ({ parkData, onSelectPark, className }: Props) => {
  const LocationMarker = ({ park }: { park: any }) => {
    return (
      <Marker
        position={[park.Latitude, park.Longitude]}
        eventHandlers={{
          click: () => {
            onSelectPark(park);
          },
        }}
      >
        <Popup>{park["Park"]}</Popup>
      </Marker>
    );
  };

  return (
    <div className={styles.map}>
      <MapContainer
        dragging={true}
        scrollWheelZoom={true}
        center={[37.0902, -95.7129]}
        zoom={3}
        style={{ height: "70vh", width: "80%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parkData?.map((park: any) => (
          <LocationMarker key={park.Code} park={park} />
        ))}
      </MapContainer>
    </div>
  );
};

export default NationalParksMap;
