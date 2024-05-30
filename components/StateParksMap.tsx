'use client';

import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import 'leaflet/dist/leaflet.css';

function LocationMarker({park}:any) {
  console.log('park: ', park);
    const [position, setPosition] = useState<any>([park.Latitude, park.Longitude])

    const map = useMapEvents({
      click(e) {
        console.log('e: ', e);
        map.locate()
        setPosition(e.latlng)
      },
      locationfound(e) {
        console.log('e: ', e);
        
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are at {park["Park Name"]}</Popup>
      </Marker>
    )
  }
  

export default function StateParksMap({parkData} :any) {
  console.log('parkData: ', parkData);

  return (
    <MapContainer
    dragging={false}
      scrollWheelZoom={false}
      center={ [37.0902, -95.7129]}      
      zoom={3.5}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {parkData.map((park:any, idx: number) => {
        return (
          <LocationMarker key={idx} park={park} />
        )
      })}
      {/* iterate through your state parks with postion available for each one 
      and populate a marker that is clickable for each park, when clicked it shows the popup with some details
      from the park you've clicked  */}
    </MapContainer>
  );
}
