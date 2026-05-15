"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Authlayout from "../../../components/auth/authLayout";
import Login from "../../../components/auth/Login";
import SignUp from "../../../components/auth/Signup";
import Otp from "../../../components/auth/Otp";

const AuthenticationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
};

// Separate component that uses useSearchParams
const AuthContent = () => {
  const [activePage, setActivePage] = useState("login");
  const searchParams: any = useSearchParams();

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  useEffect(() => {
    const queryEntries: any = Array.from(searchParams.entries());
    if (queryEntries.length > 0) {
      const queryKey = queryEntries[0][0];
      setActivePage(queryKey);
    }
  }, [searchParams]);

  const renderAuthenticationContent = () => {
    const queryEntries: any = Array.from(searchParams.entries());
    if (queryEntries.length > 0) {
      const queryKey = queryEntries[0][0];
      switch (queryKey) {
        case "signup":
          return <SignUp setActivePage={handlePageChange} />;
        case "login":
          return <Login setActivePage={handlePageChange} />;
        // case "forgot":
        //   return <ForgotPassword setActivePage={handlePageChange} />;
        case "otp":
          return <Otp setActivePage={handlePageChange} />;
        default:
          return <Login setActivePage={handlePageChange} />;
      }
    }
    return <Login setActivePage={handlePageChange} />;
  };

  return (
    <Authlayout activePage={activePage}>
      {renderAuthenticationContent()}
    </Authlayout>
  );
};

export default AuthenticationPage;
