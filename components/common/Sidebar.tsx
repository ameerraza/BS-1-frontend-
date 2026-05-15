"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import {
  FiUsers,
  FiMail,
  FiGrid,
  FiPackage,
  FiSettings,
  FiLogOut,
  FiHome,
} from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useSidebar } from "../../context/SidebarContext";
import { Button } from "./Button";
import { BiUser } from "react-icons/bi";
import { GrOrderedList } from "react-icons/gr";

const Sidebar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Get user role from localStorage when component mounts
    if (typeof window !== "undefined") {
      const role: any = Cookies.get("role");
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  // Routes not allowed for vendors (matches protected route restrictions)
  const vendorRestrictedRoutes = [
    "/vendor-applications",
    "/contact-applications",
    "/manage-categories",
    "/manage-users",
    "/add-admin",
  ];

  // Menu items (all possible navigation options)
  const allMenuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FiHome className="w-5 h-5" />,
      role: ["Admin", "Vendor"], // available to both roles
    },
    {
      title: "Vendor Applications",
      path: "/vendor-applications",
      icon: <FiUsers className="w-5 h-5" />,
      role: ["Admin"], // Admin only
    },
    {
      title: "Contact Applications",
      path: "/contact-applications",
      icon: <FiMail className="w-5 h-5" />,
      role: ["Admin"], // Admin only
    },
    {
      title: "Manage Categories",
      path: "/manage-categories",
      icon: <FiGrid className="w-5 h-5" />,
      role: ["Admin"], // Admin only
    },
    {
      title: "Manage Products",
      path: "/manage-products",
      icon: <FiPackage className="w-5 h-5" />,
      role: ["Admin", "Vendor"], // Both can access
    },
    {
      title: "Manage Users",
      path: "/manage-users",
      icon: <BiUser className="w-5 h-5" />,
      role: ["Admin"], // Admin only
    },
    {
      title: "Manage Orders",
      path: "/manage-orders",
      icon: <GrOrderedList className="w-5 h-5" />,
      role: ["Admin", "Vendor"], // Both can access
    },
    {
      title: "Add Admin",
      path: "/add-admin",
      icon: <FiSettings className="w-5 h-5" />,
      role: ["Admin"], // Admin only
    },
  ];

  // Filter menu items based on user role
  const menuItems = allMenuItems.filter((item) => {
    if (userRole === "Admin") {
      // Admin can see all menu items
      return true;
    } else if (userRole === "vendor") {
      // Vendor can only see items not in the restricted list
      return !vendorRestrictedRoutes.includes(item.path);
    }
    // Default - show nothing if no role
    return false;
  });

  return (
    <>
      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-[280px] bg-primary
          lg:static lg:z-0
          transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="flex flex-col h-full">
          <div className="my-8 px-4 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white italic">SwapNShare</h1>
          </div>

          <nav className="flex-1 overflow-y-auto px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                        ${
                          isActive
                            ? "bg-white text-primary font-medium"
                            : "text-white hover:bg-white/10"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="p-4 mt-auto">
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white"
              onClick={handleLogout}
            >
              <FiLogOut />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
