import React, { lazy, Suspense } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { useAuth } from './hooks';

const LocationButton = lazy(() => import('./components/LocationButton'));
const LoginButton = lazy(() => import('./components/LoginButton'));
const LogOutButton = lazy(() => import('./components/LogOutButton'));

export default ({
  allowLocation, latitude, longitude, setMap,
}) => {
  const auth = useAuth();

  return (
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
        {allowLocation && (
          <Marker position={[latitude, longitude]}>
            <Popup>
              You are here
            </Popup>
          </Marker>
        )}

        <div className="leaflet-top leaflet-right">
          <div
            className="leaflet-control leaflet-bar"
            style={{
              border: 'none',
              display: 'flex',
              flexDirection: 'column-reverse',
              gap: '5px',
            }}
          >
            <LocationButton />
            {auth && (
              <>
                {auth.uid ? <LogOutButton /> : <LoginButton />}
              </>
            )}
          </div>
        </div>
      </Suspense>
    </MapContainer>
  );
};
