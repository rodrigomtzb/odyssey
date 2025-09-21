import React from "react";
import Logo from "../assets/img/Odyssey.png";

const AppLogo = () => {
  return (
    <div className="p-3 w-100">
      <img style={{ width: "-webkit-fill-available" }} src={Logo} />
    </div>
  );
};

export default AppLogo;
