import React, { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import menuList from "./menuList";

// css
import "./style.scss";

const NavMenu = () => {
  const [openKeys, updateOpenKeys] = useState([]);
  const handleGroupClick = (key) => {
    let stateOpenKeys = [...openKeys];
    if (stateOpenKeys.includes(key)) {
      stateOpenKeys = stateOpenKeys.filter((x) => x !== key);
    } else {
      stateOpenKeys.push(key);
    }
    updateOpenKeys(stateOpenKeys);
  };
  const renderNav = (navList) => {
    return (
      <ul className="nav-menu-ul">
        {navList.map((x) => {
          const isOpen = openKeys.includes(x.key);
          return x.children ? (
            <React.Fragment>
              <p
                className="nav-menu-group-title"
                key={x.key}
                onClick={() => handleGroupClick(x.key)}
              >
                {x.label}
                <RightOutlined />
              </p>
              <div className={`nav-menu-group ${isOpen ? "show" : ""}`}>
                {renderNav(x.children)}
              </div>
            </React.Fragment>
          ) : (
            <li key={x.key}>{x.label}</li>
          );
        })}
      </ul>
    );
  };
  return (
    <div className="nav-menu">
      {menuList.map((x) => {
        return (
          <React.Fragment>
            <p className="nav-menu-title">{x.label}</p>
            {x.children && renderNav(x.children)}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NavMenu;
