import React, { lazy, Suspense } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

const LocationButton = lazy(() => import('./components/LocationButton'));
const LoginButton = lazy(() => import('./components/LoginButton'));

export default ({
  latitude, longitude, setMap,
}) => (
  <MapContainer
    center={[latitude, longitude]}
    zoom={13}
    scrollWheelZoom={false}
    whenCreated={setMap}
  >
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Suspense fallback={<div>Loading</div>}>
      <Marker position={[latitude, longitude]}>
        <Popup>
          A pretty CSS3 popup.
          {' '}
          <br />
          {' '}
          Easily customizable.
        </Popup>
      </Marker>
      <LocationButton />
      <LoginButton />
    </Suspense>
  </MapContainer>
);
