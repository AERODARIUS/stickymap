import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export default ({ auth }) => {
  const [uiInit, setUIInit] = useState(null);

  useEffect(() => {
    if (!uiInit) {
      const ui = new firebaseui.auth.AuthUI(firebase.auth());
      setUIInit(ui);

      ui.start('#firebaseui-auth-container', {
        signInSuccessUrl: process.env.REACT_APP_CALLBACK_URL,
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
        ],
      });
    }
  });

  return (
    <div id="firebaseui-auth-container">
      {auth}
    </div>
  );
};
