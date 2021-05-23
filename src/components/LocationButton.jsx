import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { AimOutlined } from '@ant-design/icons';

const LocationButton = ({ locationEnabled, grantLocation }) => (
  <>
    {!locationEnabled && (
      <Button
        type="primary"
        icon={<AimOutlined />}
        onClick={grantLocation}
        style={{ position: 'relative' }}
      >
        Use current location
      </Button>
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
