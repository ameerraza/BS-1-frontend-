"use client";
import { Bar } from "react-chartjs-2";
import { ResponsiveContainer } from "recharts";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatisticChart = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "July", // Corrected month name
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Finished",
        data: [400, 600, 800, 1000, 800, 600, 180, 500, 700, 900, 800, 600],
        backgroundColor: "#2DD4BF",
        borderRadius: 4,
        barThickness: 20, // Increased bar thickness
        categoryPercentage: 0.6, // Adjust spacing between bars
        barPercentage: 0.8, // Adjust bar width relative to category space
      },
      {
        label: "To Do",
        data: [300, 400, 500, 600, 700, 800, 190, 400, 500, 600, 700, 800],
        backgroundColor: "#A78BFA",
        borderRadius: 4,
        barThickness: 20, // Increased bar thickness
        categoryPercentage: 0.6, // Adjust spacing between bars
        barPercentage: 0.8, // Adjust bar width relative to category space
      },
      {
        label: "In Progress",
        data: [200, 300, 400, 500, 600, 700, 100, 300, 400, 500, 600, 700],
        backgroundColor: "#3B82F6",
        borderRadius: 4,
        barThickness: 20, // Increased bar thickness
        categoryPercentage: 0.6, // Adjust spacing between bars
        barPercentage: 0.8, // Adjust bar width relative to category space
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to resize according to its container
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            // Removed unnecessary type annotation
            const arrow = context.raw > 150 ? "🔼" : "🔽";
            return `${context.dataset.label}: ${context.raw} ${arrow}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        categoryPercentage: 0.6, // Adjust spacing between bars
        barPercentage: 0.8, // Adjust bar width relative to category space
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: { color: "#E5E7EB" },
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    <div className="">
      <div className="text-left">
        <h2 className="text-lg font-semibold">Revenue Analytics</h2>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <Bar options={options} data={data} />
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticChart;
