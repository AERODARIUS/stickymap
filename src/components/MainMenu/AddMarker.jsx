import React, {
  useState, useRef, useMemo, useEffect,
} from 'react';
import { connect } from 'react-redux';
import {
  Button, Modal, Form, Input,
} from 'antd';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { useAuth, usePosition } from '../../hooks';

const AddMarker = ({ allowLocation }) => {
  const [showModal, setShowModal] = useState(false);
  const [map, setMap] = useState(null);
  const { latitude = null, longitude = null } = usePosition(allowLocation);
  const [positionInit, setPositionInit] = useState(null);
  const [location, setLocation] = useState([0, 0]);
  const markerRef = useRef(null);
  const [form] = Form.useForm();
  const auth = useAuth();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;

        if (marker != null) {
          const { lat, lng } = marker.getLatLng();
          setLocation([lat, lng]);
        }
      },
    }),
    [],
  );

  const onOkModal = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then(() => {
        // Add a new geolocated note to the DB
        // eslint-disable-next-line no-console
        console.log({
          ...form.getFieldsValue(),
          location,
        });
        const db = firebase.firestore();
        const note = {
          ...form.getFieldsValue(),
          location: new firebase.firestore.GeoPoint(...location),
          ownerId: auth.uid,
        };
        db.collection('notes').add(note)
          .then((docRef) => {
            // eslint-disable-next-line no-console
            console.log('Document written with ID: ', docRef.id);
            form.resetFields();
            setConfirmLoading(false);
            setShowModal(false);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error('Error adding document: ', error);
            setConfirmLoading(false);
          });
      })
      .catch((info) => {
        // eslint-disable-next-line no-console
        console.error('Validate Failed:', info);
        setConfirmLoading(false);
      });
  };

  const onCancelModal = () => {
    form.resetFields();
    setShowModal(false);
  };

  useEffect(() => {
    if (!positionInit && latitude !== null && longitude !== null) {
      setPositionInit([latitude, longitude]);
      setLocation([latitude, longitude]);
    }
  }, [positionInit, latitude, longitude, positionInit]);

  useEffect(() => {
    if (map && positionInit) {
      map.setView([latitude, longitude], 16);
    }
  }, [map, latitude, longitude, positionInit]);

  return (
    <>
      <Button
        type="link"
        onClick={() => setShowModal(true)}
      >
        New Note
      </Button>
      <Modal
        title="Add New Note"
        visible={showModal}
        onOk={onOkModal}
        onCancel={onCancelModal}
        okText="Save"
        centered
        confirmLoading={confirmLoading}
      >
        <Form
          form={form}
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please give it a title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Enter your thoughts' }]}
          >
            <Input.TextArea showCount maxLength={100} style={{ height: 120 }} />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
          >
            <MapContainer
              center={positionInit ?? [0, 0]}
              zoom={13}
              scrollWheelZoom={false}
              style={{
                height: '200px',
                width: '100%',
              }}
              whenCreated={setMap}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker
                draggable
                position={location}
                eventHandlers={eventHandlers}
                ref={markerRef}
              >
                <Popup>
                  Drop note here
                </Popup>
              </Marker>
            </MapContainer>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const mapStateToProps = ({ app }) => ({
  allowLocation: app?.permissions?.location,
});

export default connect(mapStateToProps, null)(AddMarker);
