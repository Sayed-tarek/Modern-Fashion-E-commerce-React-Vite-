// src/dashboard/components/Charts/CategoryDistributionChart.jsx
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryDistributionChart = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            family: "Outfit, sans-serif",
            size: 11
          }
        }
      },
      tooltip: {
        backgroundColor: "#1E201B",
        padding: 10,
        cornerRadius: 8,
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`
        }
      }
    },
    cutout: "70%"
  };

  return (
    <div style={{ height: "280px", position: "relative" }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default CategoryDistributionChart;
