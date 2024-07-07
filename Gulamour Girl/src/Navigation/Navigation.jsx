import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";

const Navigation = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const menuItems = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Products",
      to: "/products",
    },
    {
      name: "Dashboard",
      to: "/dashboard",
    },
  ];
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      {auth ? (
        <nav className="w-full flex sticky top-0 px-8 justify-between items-center bg-navbar shadow-lg py-2">
          <div className="container flex justify-between items-center">
            <div className="flex items-center font-serif text-xl font-extrabold">
              <Link to="/">
                <Logo />
              </Link>
              <div>
              <Link to="/">
                <h1>Glamour Girl</h1>
                </Link>
              </div>
            </div>
            </div>
            <div className="hidden md:flex">
              <ul className="flex space-x-10">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `text-lg font-semibold ${
                          isActive ? "text-nav-active" : "text-nav"
                        } hover:text-nav-hover `
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <li>
                  <Link
                    to="/login"
                    onClick={logout}
                    className="text-nav hover:text-nav-hover text-lg font-semibold"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <button
                onClick={toggleSidebar}
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:text-blue-950 dark:text-gray-400 hover:border-spacing-4"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#070F2B"
                >
                  <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
                </svg>
              </button>
            {/* </div> */}
          </div>
        </nav>
      ) : (
        <></>
      )}
      {isSidebarVisible && (
        <aside
          id="logo-sidebar"
          className="fixed top-15 right-0 z-40 w-2/3 h-screen pt-2 transition-transform border-gray-200 bg-sidebar"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-sidebar">
            <ul className="space-y-2 font-medium top-0">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block text-lg font-semibold px-4 py-2 rounded-lg ${
                        isActive ? "bg-nav-active text-white" : "text-nav"
                      } hover:bg-nav-hover hover:text-white`
                    }
                    onClick={toggleSidebar}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link
                  to="/login"
                  onClick={() => {
                    logout();
                    toggleSidebar();
                  }}
                  className="block text-nav hover:text-nav-hover text-lg font-semibold px-4 py-2 rounded-lg"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      )}
    </>
  );
};

export default Navigation;
