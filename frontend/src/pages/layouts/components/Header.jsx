import Logo from "../../../assets/img/logo-03.png";

const Header = ({ onToggleSidebar }) => {
  return (
    <div
      style={{ height: "100px", zIndex: "100" }}
      className="bg-gd w-100 d-flex align-items-center position-fixed d-lg-none"
    >
      <div className="position-absolute start-0 ps-3">
        <i
          className="bi bi-list"
          style={{ fontSize: "40px", cursor: "pointer" }}
          onClick={onToggleSidebar}
        />
      </div>
      <div className="mx-auto">
        <img
          src={Logo}
          alt="logo"
          className="img-fluid"
          style={{ maxHeight: "60px" }}
        />
      </div>
    </div>
  );
};

export default Header;
