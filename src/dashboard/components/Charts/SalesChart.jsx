// src/dashboard/components/Charts/SalesChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SalesChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          font: {
            family: "Outfit, sans-serif",
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: "#1E201B",
        titleFont: { family: "Outfit, sans-serif", size: 13, weight: "bold" },
        bodyFont: { family: "Outfit, sans-serif", size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: { family: "Outfit, sans-serif", size: 11 }
        }
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)"
        },
        ticks: {
          font: { family: "Outfit, sans-serif", size: 11 },
          callback: (value) => `$${value.toLocaleString()}`
        }
      }
    }
  };

  return (
    <div style={{ height: "320px", position: "relative" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;
