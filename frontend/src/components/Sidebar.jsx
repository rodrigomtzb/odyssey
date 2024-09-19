import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link } from "react-router-dom";
import AppLogo from "./AppLogo";

const Sidebar = ({ menuItems }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuIndex) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuIndex]: !prevState[menuIndex],
    }));
  };

  return (
    <aside
      className="d-flex fixed-top flex-column vh-100"
      style={{ width: "250px", backgroundColor: "#14233b" }}
    >
      <AppLogo />
      <ul className="nav flex-column">
        {menuItems.map((menuItem, index) => (
          <li key={index} className="nav-item">
            {menuItem.subItems ? (
              <>
                <button
                  className="w-100 nav-link text-white d-flex justify-content-between align-items-center"
                  onClick={() => toggleMenu(index)}
                  aria-controls={`collapse-menu-${index}`}
                  aria-expanded={openMenus[index] || false}
                >
                  <span className="d-flex align-items-center">
                    <i className={`bi bi-${menuItem.icon} fs-4`} />{" "}
                    <span className="ms-2">{menuItem.title}</span>
                  </span>
                  <i
                    className={`bi ${
                      openMenus[index] ? "bi-chevron-up" : "bi-chevron-down"
                    } fs-5`}
                  />
                </button>
                <Collapse in={openMenus[index]}>
                  <ul
                    id={`collapse-menu-${index}`}
                    className="list-unstyled ps-3" // Adds indentation to sub-items
                  >
                    {menuItem.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subItem.path} className="nav-link text-white">
                          <i className="bi bi-caret-right-fill" />{" "}
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </>
            ) : (
              <Link
                to={menuItem.path}
                className="nav-link text-white d-flex align-items-center"
              >
                <i className={`bi bi-${menuItem.icon} fs-4`} />{" "}
                <span className="ms-2">{menuItem.title}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
