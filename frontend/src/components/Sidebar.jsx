import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 

const Sidebar = ({ menuItems }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuIndex) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuIndex]: !prevState[menuIndex],
    }));
  };

  return (
    <div className="d-flex fixed-top flex-column vh-100 bg-black border-end" style={{ width: '250px' }}>
      <ul className="nav flex-column">
        {menuItems.map((menuItem, index) => (
          <li key={index} className="nav-item">
            {menuItem.subItems ? (
              <>
                <button
                  className="btn btn-link nav-link"
                  onClick={() => toggleMenu(index)}
                  aria-controls={`collapse-menu-${index}`}
                  aria-expanded={openMenus[index] || false}
                >
                  {menuItem.title}
                </button>
                <Collapse in={openMenus[index]}>
                  <ul id={`collapse-menu-${index}`} className="list-unstyled">
                    {menuItem.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subItem.path} className="nav-link">
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Collapse>
              </>
            ) : (
              <Link to={menuItem.path} className="nav-link">
                {menuItem.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
