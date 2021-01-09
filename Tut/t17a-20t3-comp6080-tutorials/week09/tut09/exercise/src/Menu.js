import * as React from "react";
import "./Menu.css";

export const Menu = ({ items }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="menu-container">
      <MenuButton onClick={() => setOpen(!open)} open={open} key={0} />
      {open &&
        items.map((item, i) => (
          <MenuItem
            onClick={() => console.log(item)}
            title={item}
            key={i + 1}
          />
        ))}
    </div>
  );
};

export const MenuButton = ({ open, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="menu-button"
      aria-label="Toggle Menu"
      aria-expanded={open}
    >
      <svg viewBox="0 0 100 100" width="50" height="50">
        <rect x="20" y="20" width="60" height="10" fill="black" />
        <rect x="20" y="45" width="60" height="10" fill="black" />
        <rect x="20" y="70" width="60" height="10" fill="black" />
      </svg>
    </button>
  );
};

export const MenuItem = ({ onClick, title }) => {
  return (
    <a href="#" onClick={() => onClick(title)} className="menu-item">
      {title}
    </a>
  );
};
