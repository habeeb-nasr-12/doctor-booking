import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { reservationContext } from "../../context/Reservation";
import { Badge } from "antd";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { reservations } = useContext(reservationContext);
  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };
  return (
    <header role="banner">
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-2 focus:bg-white focus:text-blue-800"
      >
        Skip to main content
      </a>
      <nav
        className="fixed top-0 w-full bg-white border-b border-gray-100 shadow-sm z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="flex items-center"
              aria-label="InVitro capital home"
            >
              <span className="text-xl font-bold bg-gradient-to-r text-blue-800 bg-clip-text">
                InVitro capital
              </span>
            </Link>
            <div
              className="hidden md:flex items-center space-x-8"
              role="menubar"
            >
              <Link
                to="/"
                className="text-blue-800 transition-colors duration-200 font-medium"
                role="menuitem"
              >
                Home
              </Link>
              <Link
                to="/appointments"
                className="text-blue-800 transition-colors duration-200 font-medium relative"
                role="menuitem"
                aria-label={`My Appointments ${
                  reservations?.length
                    ? `(${reservations.length} appointments)`
                    : ""
                }`}
              >
                {reservations && reservations.length > 0 && (
                  <Badge
                    count={reservations.length}
                    className="absolute -top-3 -right-[100%]"
                    style={{
                      backgroundColor: "#1677ff",
                      fontSize: "12px",
                      padding: "0 6px",
                    }}
                  />
                )}
                My Appointments
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={handleKeyPress}
                className="text-blue-800 p-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? (
                  <CloseOutlined style={{ fontSize: "24px" }} />
                ) : (
                  <MenuOutlined style={{ fontSize: "24px" }} />
                )}
              </button>
            </div>
          </div>
          <div
            id="mobile-menu"
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            } overflow-hidden`}
            role="menu"
            aria-hidden={!isOpen}
          >
            <div className="px-2 py-3 space-y-1 bg-white border-t border-gray-100">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-blue-800 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
                onKeyDown={handleKeyPress}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
              >
                Home
              </Link>
              <Link
                to="/appointments"
                className="block px-3 py-2 rounded-md text-blue-800 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
                onKeyDown={handleKeyPress}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                aria-label={`My Appointments ${
                  reservations?.length
                    ? `(${reservations.length} appointments)`
                    : ""
                }`}
              >
                My Appointments
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
