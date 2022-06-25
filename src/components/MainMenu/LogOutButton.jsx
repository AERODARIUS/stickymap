import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import firebase from 'firebase/app';
import 'firebase/auth';

export default () => {
  const logOut = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  };

  return (
    <Button
      type="link"
      icon={<LogoutOutlined />}
      onClick={logOut}
    >
      Logout
    </Button>
  );
};
