"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "../../context/SidebarContext";
import { BiBell, BiMessage } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi";

const Header = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useSidebar();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const getPageTitle = (path: string) => {
    if (path === "/") return "Dashboard";
    const cleanPath = path.slice(1); // Remove leading slash
    return cleanPath
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 w-full bg-white text-gray-800 border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        <div className="flex items-center">
          <button
            className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="w-full flex items-center justify-center gap-2">
            <h1 className="whitespace-nowrap text-xl font-semibold text-gray-800">
              {pageTitle}
            </h1>
          </div>
        </div>

        <div className="w-full flex items-center justify-end space-x-4">
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <BiMessage
                className="w-6 h-6 text-gray-600"
                onClick={() => router.push("/chat")}
              />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          <div className="relative">
            <button
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=random"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium">Admin User</p>
                <p className="text-gray-500 text-xs">Administrator</p>
              </div>
              {/* <FiChevronDown className="w-4 h-4 text-gray-600" /> */}
            </button>

            {/* {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Settings
                </a>
                <hr className="my-1" />
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
