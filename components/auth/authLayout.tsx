import React from "react";
import { useRouter } from "next/navigation";

export default function Authlayout({ children, activePage }: any) {
  const router = useRouter();

  return (
    <div className="flex flex-1 justify-center items-center h-screen relative overflow-clip">
      {/* <button
        onClick={() => router.push("/")}
        className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      </button> */}

      <div className="w-full bg-white midMd:shadow-lg shadow-blue-200 max-w-lg px-6 md:px-10 py-4 rounded-3xl flex flex-col justify-center items-center z-50">
        <img src="/logo.jpg" className={`  w-40 h-24`} />
        {children}
      </div>
    </div>
  );
}
