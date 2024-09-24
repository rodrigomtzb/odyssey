import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <div style={overlayStyle}>
      <Spinner animation="border" role="status" />
    </div>
  );
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999,
};

export default Loader;
