import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import usePosition from './hooks';

const App = ({ allowLocation, grantLocation }) => {
  const [map, setMap] = useState(null);
  const { latitude = 0, longitude = 0 } = usePosition(allowLocation);

  useEffect(() => {
    if (map) {
      map.setView([latitude, longitude], 16);
    }
  }, [map, latitude, longitude]);

  const displayMap = useMemo(() => (
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
      {!allowLocation && (
        <div className="leaflet-bottom leaflet-right">
          <div className="leaflet-control leaflet-bar">
            <input type="button" value="Use Location" onClick={grantLocation} />
          </div>
        </div>
      )}
    </MapContainer>
  ));

  return (
    <div className="App">
      {displayMap}
    </div>
  );
};

const mapStateToProps = ({ app }) => ({
  allowLocation: app?.permissions?.location,
});

const mapDispatchToProps = (dispatch) => ({
  grantLocation: () => {
    dispatch({ type: 'GRANT_LOCATION' });
  },
});

export { App as StatelessApp };

export default connect(mapStateToProps, mapDispatchToProps)(App);
