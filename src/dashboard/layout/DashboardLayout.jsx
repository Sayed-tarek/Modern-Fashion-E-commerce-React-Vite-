// src/dashboard/layout/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="dash-wrapper">
      {/* Collapsible / Mobile Offcanvas Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Right Content Section */}
      <div className={`dash-main-container ${collapsed ? "expanded" : ""}`}>
        {/* Sticky Header Topbar */}
        <Topbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Dynamic Nested Page Content */}
        <main className="dash-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
