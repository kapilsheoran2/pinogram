import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiSearch, FiUser, FiLogOut,FiMessageCircle } from "react-icons/fi";

export default function Header({ handleLogout }) {
  return (
    <nav className="bg-white border-gray-200 fixed w-full z-10 top-0">
      <div className="max-w-fscreen-xl flex flex-col md:flex-row items-center justify-center mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <NavLink
            to="/"
            className="pr-5 text-red-600 self-start text-dancing text-red whitespace-nowrap"
          >
            Pinogram &#9876;
          </NavLink>
        </div>
        <div className="text-3xl hidden md:block text-red-200 px-4">|</div>
        <div
          className="items-center px-4 w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex justify-center text-xl items-center font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <NavLink
                to="/home"
                className={`block py-2 pl-3 pr-4  md:hover:text-red-600 md:p-0 `}
              >
                <FiHome />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={`block py-2 pl-3 pr-4  md:hover:text-red-600 md:p-0 `}
              >
                <FiSearch />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={`block py-2 pl-3 pr-4  md:hover:text-red-600 md:p-0 `}
              >
                <FiUser />
              </NavLink>
            </li>
            
            <li>
              <button
                className="block py-2 pl-3 pr-4  md:hover:text-red-600 md:p-0 text-red-800"
                onClick={handleLogout}
              >
                <FiLogOut />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
