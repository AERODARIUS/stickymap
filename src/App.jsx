import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import { connect } from 'react-redux';
import usePosition from './hooks';
import Map from './Map';

const App = ({ allowLocation }) => {
  const [map, setMap] = useState(null);
  const { latitude = 0, longitude = 0 } = usePosition(allowLocation);

  useEffect(() => {
    if (map) {
      map.setView([latitude, longitude], 16);
    }
  }, [map, latitude, longitude]);

  const displayMap = useMemo(() => (
    <Map
      latitude={latitude}
      longitude={longitude}
      setMap={setMap}
    />
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
