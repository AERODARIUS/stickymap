import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Marker, Popup } from 'react-leaflet';
import { useAuth } from '../hooks';

export default () => {
  const auth = useAuth();
  const db = firebase.firestore();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (db && auth) {
      const unsubscribe = db.collection('notes').where('ownerId', '==', auth?.uid)
        .onSnapshot((querySnapshot) => {
          const firebaseNotes = [];

          querySnapshot.forEach((doc) => {
            firebaseNotes.push(doc.data());
          });

          setNotes(firebaseNotes);
        });

      return () => {
        unsubscribe();
      };
    }

    return null;
  }, [db, auth]);

  return (
    <>
      {notes.map(({ title, location }) => {
        const coords = [location.latitude, location.longitude];

        return (
          <Marker position={coords} key={coords}>
            <Popup>
              {title}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};
