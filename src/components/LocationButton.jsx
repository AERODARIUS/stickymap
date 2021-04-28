import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { AimOutlined } from '@ant-design/icons';

const LocationButton = ({ locationEnabled, grantLocation }) => (
  <>
    {!locationEnabled && (
    <div className="leaflet-bottom leaflet-left">
      <div className="leaflet-control leaflet-bar">
        <Button
          type="primary"
          icon={<AimOutlined />}
          onClick={grantLocation}
        >
          Use current location
        </Button>
      </div>
    </div>
    )}
  </>
);

const mapStateToProps = ({ app }) => ({
  locationEnabled: app?.permissions?.location,
});

const mapDispatchToProps = (dispatch) => ({
  grantLocation: () => {
    dispatch({ type: 'GRANT_LOCATION' });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationButton);
