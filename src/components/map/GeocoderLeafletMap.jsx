import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder';
import LeafletMap from './LeafletMap';
import { Button } from '../ui/button';
import { API_BASE_URL } from '@/lib/constants';

function GeocoderLeafletMap({returnValues}) {
  const [addressValue, setAddressValue] = useState('');
  const [latlngValue, setLatlngValue] = useState(null);

  const handleGeocode = ({ address, latlng }) => {
    setAddressValue(address);
    setLatlngValue(latlng);
  };

function handleAddress() {
  if (addressValue && latlngValue) {
    returnValues(latlngValue, addressValue); // return values to caller
  }
}

function GeocoderControl({ onGeocode }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !L.Control.Geocoder) return;

    const customGeocoder = {
      geocode: async function (query, context) {
        try {
          console.log('hola masca pitos')
          const res = await fetch(
            `${API_BASE_URL}/geocoder/findAll/search?q=${encodeURIComponent(query)}`
          );
          console.log('hola crack', res)
          if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);

          const data = await res.json();

          const results = data.map((item) => ({
            name: item.display_name,
            center: L.latLng(item.lat, item.lon),
            bbox: L.latLngBounds(
              L.latLng(item.boundingbox[0], item.boundingbox[2]),
              L.latLng(item.boundingbox[1], item.boundingbox[3])
            ),
          }));
          return (context, results);
        } catch (err) {
          console.error('Error de geocodificación:', err);
          return []
        }
      }
    };

    const geocoder = L.Control.geocoder({
      geocoder: customGeocoder,
      defaultMarkGeocode: false,
      collapsed: false,
      placeholder: 'Buscar dirección...',
    })
      .on('markgeocode', function (e) {
        const center = e.geocode.center;
        map.setView(center, 16);
        L.marker(center).addTo(map);
        if (onGeocode) onGeocode(e.geocode);
      })
      .addTo(map);

    return () => {
      map.removeControl(geocoder);
    };
  }, [map, onGeocode]);

  return null;
}


  return (
    <>
      <LeafletMap> {/*calls the map and sends geocode*/}
        <GeocoderControl onGeocode={handleGeocode} />
      </LeafletMap>
      <div>
        <p><strong>Dirección:</strong> {addressValue}</p>
        <p><strong>LatLng:</strong> {latlngValue ? `${latlngValue.lat}, ${latlngValue.lng}` : ''}</p>
        <div className='w-full flex justify-center'>
          <Button className='bg-dubraSecondary' onClick={() => handleAddress()} type='button'>
            Agregar Direccion
          </Button>
        </div>
      </div>
    </>
  );
}

export default GeocoderLeafletMap;
