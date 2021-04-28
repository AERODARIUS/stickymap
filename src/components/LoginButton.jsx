import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Drawer } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import LoginForm from './LoginForm';

const LoginButton = ({ auth }) => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const showDrawer = () => {
    setDisplayLogin(true);
  };
  const onClose = () => {
    setDisplayLogin(false);
  };
  const maxWidth = 512;
  const windowWidth = window?.innerWidth;

  return (
    <div className="leaflet-top leaflet-right">
      <div className="leaflet-control leaflet-bar">
        {!auth && (
        <Button
          type="primary"
          icon={<LoginOutlined />}
          onClick={showDrawer}
        >
          Login
        </Button>
        )}
        <Drawer
          title="Login"
          placement="right"
          onClose={onClose}
          visible={displayLogin}
          width={windowWidth < maxWidth ? '100%' : maxWidth}
        >
          <LoginForm />
        </Drawer>
      </div>
    </div>
  );
};

const mapStateToProps = ({ app }) => ({
  auth: app?.auth,
});

export default connect(mapStateToProps)(LoginButton);
