// src/dashboard/layout/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiGrid,
  FiShoppingBag,
  FiLayers,
  FiShoppingCart,
  FiUsers,
  FiStar,
  FiTag,
  FiBarChart2,
  FiMail,
  FiSettings,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
  FiX
} from "react-icons/fi";
import { initialAdminProfile } from "../data/mockDashboardData";

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const location = useLocation();

  const menuSections = [
    {
      title: "Main Menu",
      items: [
        { path: "/dashboard", label: "Dashboard", icon: <FiGrid /> },
        { path: "/dashboard/products", label: "Products", icon: <FiShoppingBag /> },
        { path: "/dashboard/categories", label: "Categories", icon: <FiLayers /> },
        { path: "/dashboard/orders", label: "Orders", icon: <FiShoppingCart />, badge: "6" },
        { path: "/dashboard/customers", label: "Customers", icon: <FiUsers /> }
      ]
    },
    {
      title: "Marketing & Sales",
      items: [
        { path: "/dashboard/reviews", label: "Reviews", icon: <FiStar /> },
        { path: "/dashboard/coupons", label: "Coupons", icon: <FiTag /> },
        { path: "/dashboard/analytics", label: "Analytics", icon: <FiBarChart2 /> },
        { path: "/dashboard/messages", label: "Messages", icon: <FiMail />, badge: "2" }
      ]
    },
    {
      title: "Account & System",
      items: [
        { path: "/dashboard/settings", label: "Settings", icon: <FiSettings /> },
        { path: "/dashboard/profile", label: "Admin Profile", icon: <FiUser /> }
      ]
    }
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 992) {
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      <div
        className={`mobile-offcanvas-backdrop ${mobileOpen ? "show" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={`dash-sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        {/* Header Branding */}
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-brand" onClick={handleLinkClick}>
            <div className="sidebar-brand-icon">A</div>
            <span className="sidebar-brand-text">AERO ADMIN</span>
          </Link>
          <button
            className="sidebar-toggle-btn d-none d-lg-flex"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
          </button>
          <button
            className="sidebar-toggle-btn d-lg-none"
            onClick={() => setMobileOpen(false)}
          >
            <FiX />
          </button>
        </div>

        {/* Navigation Items */}
        <ul className="sidebar-menu">
          {menuSections.map((section, idx) => (
            <React.Fragment key={idx}>
              <li className="sidebar-section-title">{section.title}</li>
              {section.items.map((item) => {
                const isActive =
                  item.path === "/dashboard"
                    ? location.pathname === "/dashboard"
                    : location.pathname.startsWith(item.path);

                return (
                  <li className="sidebar-item" key={item.path}>
                    <Link
                      to={item.path}
                      className={`sidebar-link ${isActive ? "active" : ""}`}
                      onClick={handleLinkClick}
                    >
                      <span className="sidebar-icon">{item.icon}</span>
                      <span className="sidebar-label">{item.label}</span>
                      {item.badge && (
                        <span className="sidebar-badge">{item.badge}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </React.Fragment>
          ))}
        </ul>

        {/* Footer Quick Profile Info */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <img
              src={initialAdminProfile.avatar}
              alt={initialAdminProfile.name}
              className="sidebar-user-avatar"
            />
            <div className="sidebar-user-info">
              <h6 className="sidebar-user-name">{initialAdminProfile.name}</h6>
              <p className="sidebar-user-role">{initialAdminProfile.role}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
