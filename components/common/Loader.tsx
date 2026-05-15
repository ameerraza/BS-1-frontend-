// Loader.tsx
"use client";

import { useLoaderStore } from "@/stores/useLoaderStore";
import React from "react";

const Loader = () => {
  const isLoading = useLoaderStore((state) => state.isLoading);
  if (!isLoading) return null;

  return (
    <div className="fixed flex items-center justify-center w-full h-full bg-black bg-opacity-35 z-[999999]">
      <img
        src="/loader.png"
        alt="Loading..."
        className="w-auto h-40 animate-bounce"
      />
    </div>
  );
};

export default Loader;
