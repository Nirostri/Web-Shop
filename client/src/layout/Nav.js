import React from "react";
import { NavLink } from "react-router-dom";

const navs = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/admin",
    name: "Admin",
  },
  {
    path: "/stats",
    name: "Stats",
  },
];

const Nav = () => (
  <nav
    className="bg-purple-600 p-4 text-white shadow"
    style={{ fontWeight: "bold" }}
  >
    <ul className="flex space-x-6 justify-start">
      {navs.map((navItem) => (
        <li>
          <NavLink to={navItem.path}>{navItem.name}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
