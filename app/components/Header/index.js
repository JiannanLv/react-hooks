import React from "react";

// css
import "./style.scss";

const Header = () => {
  return (
    <div className="header">
      <svg
        width="100%"
        height="100%"
        viewBox="-10.5 -9.45 21 18.9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="text-sm me-0 w-10 h-10 text-link dark:text-link-dark flex origin-center transition-all ease-in-out"
      >
        <circle cx="0" cy="0" r="2" fill="#1A6A93"></circle>
        <g stroke="#1A6A93" stroke-width="1" fill="none">
          <ellipse rx="10" ry="4.5"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
          <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
        </g>
      </svg>
      <span className="logo-sapn">React Hooks</span>
    </div>
  );
};

export default Header;
