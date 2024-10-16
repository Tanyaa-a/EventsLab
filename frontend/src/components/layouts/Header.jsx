import React from "react";
import { Link, NavLink } from "react-router-dom";
import loginIcon from '../../assets/icons/user.png';

const Header = () => {
  const activeStyles = "underline font-bold";

  return (
    <header className="flex justify-between items-center h-32 px-4 lg:px-16 xl:px-14 2xl:px-20">
      <Link to="/" className="text-2xl font-bold">
       Event LAB
      </Link>
      <nav className="flex gap-4">
        <NavLink
          to="/events-page"
          style={({ isActive }) => (isActive ? { textDecoration: 'underline', fontWeight: 'bold' } : {})}
          className="text-black"
        >
          Events near you
        </NavLink>
        <NavLink
          to="/About"
          style={({ isActive }) => (isActive ? { textDecoration: 'underline', fontWeight: 'bold' } : {})}
          className="text-black"
        >
          About Us
              </NavLink>
              <NavLink to="/login" className="flex items-center">
          <img
            src={loginIcon}
            alt="Login Icon"
            className="w-6 h-6 mr-2"
          />
        </NavLink>
            
      </nav>
    </header>
  );
};

export default Header;
