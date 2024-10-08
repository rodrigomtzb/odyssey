import React from "react";
import { Link } from "react-router-dom";

const CardButton = ({ icon, text, to, section }) => {
  return (
    <Link to={to} className="text-decoration-none">
      <div className="d-flex h-100 p-3 pb-4 flex-column align-items-center justify-content-center bg-gd rounded">
        <div className="text-start w-100 mb-auto">
          <p className="text-white fs-2 text-decoration-underline mb-0">
            {text}
          </p>
          <p className="fs-6 text-white mt-0">{section}</p>
        </div>
        <div
          className="rounded-circle d-flex align-items-center justify-content-center bg-white my-2"
          style={{ width: "100px", height: "100px" }}
        >
          <i className={`bi bi-${icon} fs-1 text-gd`} />
        </div>
      </div>
    </Link>
  );
};

export default CardButton;
