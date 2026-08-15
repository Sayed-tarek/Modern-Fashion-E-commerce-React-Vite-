// src/dashboard/components/Cards/StatCard.jsx
import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

const StatCard = ({ title, value, change, isPositive, icon, subtitle, color = "primary" }) => {
  return (
    <div className="dash-card h-100 position-relative overflow-hidden">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <span className="text-muted font-weight-bold text-uppercase small tracking-wide">
          {title}
        </span>
        <div
          className={`p-2 rounded-circle d-flex align-items-center justify-content-center text-${color}`}
          style={{
            backgroundColor: `var(--dash-primary-light)`,
            width: "42px",
            height: "42px",
            fontSize: "1.25rem"
          }}
        >
          {icon}
        </div>
      </div>

      <div className="d-flex align-items-baseline justify-content-between mb-2">
        <h3 className="dash-card-title mb-0 font-weight-bold" style={{ fontSize: "1.75rem" }}>
          {value}
        </h3>
        {change !== undefined && (
          <span
            className={`badge badge-pill ${
              isPositive ? "badge-soft-success" : "badge-soft-danger"
            } d-flex align-items-center gap-1 font-weight-bold px-2 py-1`}
            style={{
              backgroundColor: isPositive ? "var(--dash-success-bg)" : "var(--dash-danger-bg)",
              color: isPositive ? "var(--dash-success)" : "var(--dash-danger)",
              fontSize: "0.78rem"
            }}
          >
            {isPositive ? <FiTrendingUp className="mr-1" /> : <FiTrendingDown className="mr-1" />}
            {isPositive ? `+${change}%` : `${change}%`}
          </span>
        )}
      </div>

      {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
