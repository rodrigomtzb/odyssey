import React from "react";
import logoGif from "../assets/gif/O3.gif";

const Loader = () => {
  return (
    <div
      className="d-flex position-fixed w-100 h-100 bg-white opacity-50 justify-content-center align-items-center"
      style={overlayStyle}
    >
      <img src={logoGif} alt="Loading..." className="w-50" />
    </div>
  );
};

const overlayStyle = {
  top: 0,
  left: 0,
  zIndex: 1000,
};

export default Loader;
