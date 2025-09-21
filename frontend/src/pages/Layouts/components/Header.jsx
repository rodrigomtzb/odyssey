import Logo from "../../../assets/img/Odyssey.png";

const Header = ({ onToggleSidebar }) => {
  return (
    <div
      style={{ height: "62px", zIndex: "99" }}
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
          style={{ maxHeight: "50px" }}
        />
      </div>
    </div>
  );
};

export default Header;
