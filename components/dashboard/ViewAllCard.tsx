"use client";
import React, { useState } from "react";

const ViewAllCard = ({ title, viewAllLink, children }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <div
        className={`bg-white rounded-lg p-4 w-full transition-all duration-300 ease-in-out
          ${
            isExpanded
              ? "h-[550px] transform -translate-y-2 shadow-2xl"
              : "h-[350px] shadow-md"
          }`}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-semibold">{title}</h2>
        </div>
        <div
          className={`${
            isExpanded ? "h-[calc(650px-4rem)]" : "h-[calc(350px-4rem)]"
          } ${
            title.includes("Graph") || title.includes("Chart")
              ? ""
              : "overflow-auto"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ViewAllCard;
