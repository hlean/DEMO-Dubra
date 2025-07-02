import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LeafletMap({children}) {
  return (
    <MapContainer center={[-34.826834, -55.9601643]} zoom={13} className='w-full h-full min-h-[50vh]'>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
}

export default LeafletMap;
