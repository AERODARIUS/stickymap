import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import LogOutButton from './LogOutButton';
import AddMarker from './AddMarker';
import './index.css';

export default () => {
  const [showMenu, setShowMenu] = useState(false);
  const maxWidth = 200;
  const width = window?.innerWidth < maxWidth ? '100%' : maxWidth;

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
          width={width}
        >
          <div className="sticky-drawer">
            <AddMarker />
            <LogOutButton />
          </div>
        </Drawer>
      </div>
    </div>
  );
};
