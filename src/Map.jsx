import React from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import LocationButton from './components/LocationButton';
import LoginButton from './components/LoginButton';

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
  </MapContainer>
);
