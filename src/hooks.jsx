import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

export const usePosition = (allowLocation) => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (e) => {
    setError(e.message);
  };

  useEffect(() => {
    if (!allowLocation) {
      return undefined;
    }

    const geo = navigator.geolocation;
    if (!geo) {
      setError('Geolocation is not supported');
      return undefined;
    }

    const watcher = geo.watchPosition(onChange, onError);

    return () => geo.clearWatch(watcher);
  }, [allowLocation]);

  return { ...position, error };
};

export const useAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (!auth) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setAuth(user);
        } else {
          setAuth({});
        }
      });
    }
  });

  return auth;
};
