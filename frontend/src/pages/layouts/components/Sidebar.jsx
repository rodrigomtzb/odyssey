import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AppLogo } from "../../../components";
import AuthService from "../../../services/auth.service";

const Sidebar = ({ menuItems, onToggleSidebar }) => {
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate();

  const toggleMenu = (menuIndex) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuIndex]: !prevState[menuIndex],
    }));
  };

  const handleLogout = async () => {
    try {
      AuthService.logout().then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        }
      });
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const renderSubItems = (subItems, parentIndex, level = 1) => {
    return (
      <ul className="list-unstyled ps-3">
        {subItems.map((subItem, subIndex) => {
          const currentIndex = `${parentIndex}-${subIndex}`;
          const isFirstLevel = level === 1;
          const icon = isFirstLevel ? "bi-caret-right-fill" : "bi-caret-right";

          return (
            <li key={currentIndex}>
              {subItem.subItems ? (
                <>
                  <button
                    className="w-100 nav-link text-white d-flex justify-content-between align-items-center"
                    onClick={() => toggleMenu(currentIndex)}
                    aria-controls={`collapse-submenu-${currentIndex}`}
                    aria-expanded={openMenus[currentIndex] || false}
                  >
                    <span className="d-flex align-items-center">
                      <i className={`bi ${icon}`} />
                      <span className="ms-2">{subItem.title}</span>
                    </span>
                    <i
                      className={`bi ${
                        openMenus[currentIndex]
                          ? "bi-chevron-up"
                          : "bi-chevron-down"
                      } fs-5`}
                    />
                  </button>
                  <Collapse in={openMenus[currentIndex]}>
                    <ul
                      id={`collapse-submenu-${currentIndex}`}
                      className="ps-3"
                    >
                      {renderSubItems(
                        subItem.subItems,
                        currentIndex,
                        level + 1
                      )}
                    </ul>
                  </Collapse>
                </>
              ) : (
                <Link
                  to={subItem.path}
                  className="nav-link text-white"
                  onClick={onToggleSidebar}
                >
                  <i className={`bi ${icon}`} /> {subItem.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside
      className={"fixed-top flex-column vh-100 d-flex sidebar pe-1"}
      style={{ backgroundColor: "#14233b" }}
    >
      <AppLogo />
      {/* Contenedor botones del sidebar */}
      <div className="flex-grow-1 overflow-auto scroll-gd">
        <ul className="nav flex-column">
          {menuItems.map((menuItem, index) => (
            <li key={index} className="nav-item">
              {menuItem.subItems ? (
                <>
                  <button
                    className="w-100 nav-link text-white d-flex justify-content-between align-items-center pe-1"
                    onClick={() => toggleMenu(index)}
                    aria-controls={`collapse-menu-${index}`}
                    aria-expanded={openMenus[index] || false}
                  >
                    <span className="d-flex align-items-center">
                      <i className={`bi bi-${menuItem.icon} fs-4`} />
                      <span className="ms-2">{menuItem.title}</span>
                    </span>
                    <i
                      className={`bi ${
                        openMenus[index] ? "bi-chevron-up" : "bi-chevron-down"
                      } fs-5`}
                    />
                  </button>
                  <Collapse in={openMenus[index]}>
                    <ul id={`collapse-menu-${index}`} className="ps-3">
                      {renderSubItems(menuItem.subItems, index)}
                    </ul>
                  </Collapse>
                </>
              ) : (
                <Link
                  to={menuItem.path}
                  className="nav-link text-white d-flex align-items-center"
                  onClick={onToggleSidebar}
                >
                  <i className={`bi bi-${menuItem.icon} fs-4`} />{" "}
                  <span className="ms-2">{menuItem.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      {/* Contenedor boton de logout POR CAMBIAR A SECCION USUARIO */}
      <div className="mt-auto p-3 mb-5 mb-md-0">
        <button
          className="btn btn-gd w-100 d-flex align-items-center justify-content-start"
          onClick={() => {
            handleLogout();
            onToggleSidebar();
          }}
        >
          <i className="bi bi-box-arrow-right fs-4 me-2" />
          Salir
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
