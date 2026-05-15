"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
interface ProtectedRoutesProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  // Only define restricted routes for vendors
  const vendorRestrictedRoutes = [
    "/vendor-applications",
    "/contact-applications",
    "/manage-categories",
    "/manage-users",
    "/add-admin",
  ];

  useEffect(() => {
    // Check authentication
    const authCheck = () => {
      const token = Cookies.get("authToken");
      const userRole = Cookies.get("role");

      // If no token, redirect to login unless already on auth pages
      if (!token) {
        // Modified: use path without query params
        const authPages = ["/authentication", "/register", "/forgot-password"];
        if (!authPages.some((page) => pathname.startsWith(page))) {
          setAuthorized(false);
          router.push("/authentication?login");
          return;
        }
      } else {
        // For Admin, explicitly allow all paths
        if (userRole === "Admin") {
          setAuthorized(true);
          return;
        }

        // For Vendor, check path restrictions
        if (
          userRole === "vendor" &&
          vendorRestrictedRoutes.includes(pathname)
        ) {
          setAuthorized(false);
          router.push("/dashboard"); // Redirect vendor to dashboard
          return;
        }
      }

      setAuthorized(true);
    };

    authCheck();
  }, [pathname, router]);

  // Show loading or nothing while checking authentication
  return authorized ? <>{children}</> : null;
};

export default ProtectedRoutes;
