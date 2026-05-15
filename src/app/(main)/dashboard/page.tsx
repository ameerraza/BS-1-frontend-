"use client";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import ActivityCard from "../../../../components/dashboard/ActivityCard";
import StatisticChart from "../../../../components/dashboard/StatisticGraph";

const cardData = [
  { title: "Total Users", number: "1,234" },
  { title: "Active Users", number: "892" },
  { title: "Total Shares", number: "3,456" },
  { title: "Active Shares", number: "1,567" },
  { title: "Total Revenue", number: "$5,678" },
  { title: "Monthly Growth", number: "23%" },
  { title: "Total Revenue", number: "$5,678" },
  { title: "Monthly Growth", number: "23%" },
];

const DashboardPage = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4  ">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between
           ${
             activeIndex === index
               ? "shadow-neumorphism-active bg-gray-100"
               : "hover:shadow-neumorphism-hover hover:bg-gray-100"
           }
           transition-shadow duration-300 cursor-pointer group`}
            onClick={() => handleClick(index)}
          >
            <div>
              <h3 className="text-accent">{card.title}</h3>
              <p className="text-xl font-bold mt-2 text-accent group-hover:animate-bounce">
                {card.number}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-sm text-gray-500">to week</p>
                <p className="text-green-500 mt-1 flex items-center">
                  <FaArrowUp className="mr-1" />
                </p>
              </div>
              <div className="">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                  <path
                    d="M-20 18L4 18L10 4L13 18L18 6L22 18L54 16"
                    stroke="navy"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-xs text-gray-500 tracking-widest">SMTWTFS</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className="col-span-1">
          <ActivityCard />
        </div>
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-md">
          <StatisticChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
