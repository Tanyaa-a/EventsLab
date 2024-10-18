import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import loginIcon from '../../assets/icons/user.png';
import { useAuth } from '../../AuthProvider'; 

const Header = () => {
  const activeStyles = "underline font-bold";

  const { isLoggedIn, userData } = useAuth();

  console.log('Is logged in:', isLoggedIn);
  console.log('User data:', userData);

  const getUserInitials = (user) => {
    if (!user) return '';
    const firstNameInitial = user?.firstName?.[0] || '';
    const lastNameInitial = user?.lastName?.[0] || '';
    return `${firstNameInitial}${lastNameInitial}`.toUpperCase();
  };

  const initials = getUserInitials(userData);

  console.log('User initials:', initials);

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

        <NavLink to={isLoggedIn ? "/edit-event" : "/login"} className="flex items-center">
          {isLoggedIn ? (
            <div className="w-8 h-8 flex items-center justify-center bg-gray-500 text-white rounded-full font-bold">
              {initials}
            </div>
          ) : (
            <img
              src={loginIcon}
              alt="Login Icon"
              className="w-6 h-6 mr-2"
            />
          )}
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
