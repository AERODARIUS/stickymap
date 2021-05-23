import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons';
import firebase from 'firebase/app';
import 'firebase/auth';

export default () => {
  const [showMenu, setShowMenu] = useState(false);
  const maxWidth = 512;
  const windowWidth = window?.innerWidth;

  const logOut = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  };

  return (
    <div className="leaflet-top leaflet-right" style={{ position: 'relative' }}>
      <div
        className="leaflet-control leaflet-bar"
        style={{
          backgroundColor: '#fff',
          border: 'none',
          backgroundClip: 'padding-box',
          margin: '10px 0',
        }}
      >
        <Button
          type="link"
          icon={<MenuOutlined />}
          onClick={() => { setShowMenu(true); }}
          style={{ margin: '0' }}
        >
          Menu
        </Button>
        <Drawer
          title="Sticky Map"
          placement="right"
          onClose={() => { setShowMenu(false); }}
          visible={showMenu}
          width={windowWidth < maxWidth ? '100%' : maxWidth}
        >
          <Button
            type="link"
            icon={<LogoutOutlined />}
            onClick={logOut}
          >
            Logout
          </Button>
        </Drawer>
      </div>
    </div>
  );
};
