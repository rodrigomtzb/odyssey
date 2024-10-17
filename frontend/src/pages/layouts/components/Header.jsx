import Logo from "../../../assets/img/logo-03.png";

const Header = () => {
  return (
    <div
      style={{ height: "100px" }}
      className="bg-gd w-100 d-flex align-items-center position-relative d-md-none"
    >
      <div className="position-absolute start-0 ps-3">
        <i className="bi bi-list" style={{ fontSize: "40px" }} />
      </div>
      <div className="mx-auto">
        <img src={Logo} alt="logo" className="img-fluid" style={{ maxHeight: "60px" }} />
      </div>
    </div>
  );
};

export default Header;
