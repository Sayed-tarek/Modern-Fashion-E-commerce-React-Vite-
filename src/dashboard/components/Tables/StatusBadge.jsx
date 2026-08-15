// src/dashboard/components/Tables/StatusBadge.jsx
import React from "react";

const StatusBadge = ({ status }) => {
  const getBadgeStyle = (statusStr) => {
    switch (statusStr?.toLowerCase()) {
      case "delivered":
      case "in stock":
      case "active":
      case "approved":
      case "vip":
        return {
          bg: "var(--dash-success-bg)",
          color: "var(--dash-success)",
          label: statusStr
        };
      case "processing":
      case "shipped":
      case "regular":
      case "medium":
        return {
          bg: "var(--dash-info-bg)",
          color: "var(--dash-info)",
          label: statusStr
        };
      case "low stock":
      case "pending":
      case "scheduled":
      case "normal":
        return {
          bg: "var(--dash-warning-bg)",
          color: "var(--dash-warning)",
          label: statusStr
        };
      case "out of stock":
      case "cancelled":
      case "expired":
      case "high":
      case "flagged":
        return {
          bg: "var(--dash-danger-bg)",
          color: "var(--dash-danger)",
          label: statusStr
        };
      default:
        return {
          bg: "rgba(0, 0, 0, 0.05)",
          color: "var(--dash-text-muted)",
          label: statusStr || "N/A"
        };
    }
  };

  const style = getBadgeStyle(status);

  return (
    <span
      className="badge badge-pill font-weight-bold px-2 py-1"
      style={{
        backgroundColor: style.bg,
        color: style.color,
        fontSize: "0.76rem",
        letterSpacing: "0.2px"
      }}
    >
      {style.label}
    </span>
  );
};

export default StatusBadge;
