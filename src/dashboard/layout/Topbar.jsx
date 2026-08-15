// src/dashboard/layout/Topbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiMail,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiExternalLink,
  FiLogOut,
  FiCheckCircle
} from "react-icons/fi";
import {
  initialNotifications,
  initialMessages,
  initialAdminProfile
} from "../data/mockDashboardData";

const Topbar = ({ mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("dash_theme") === "dark"
  );
  const [activeLang, setActiveLang] = useState(
    localStorage.getItem("dash_lang") || "EN"
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notifRef = useRef(null);
  const msgRef = useRef(null);
  const profileRef = useRef(null);

  // Toggle Dark/Light Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("dash_theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("dash_theme", "light");
    }
  }, [darkMode]);

  // Handle Outside Click for Popovers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (msgRef.current && !msgRef.current.contains(event.target)) {
        setShowMessages(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    setActiveLang(lang);
    localStorage.setItem("dash_lang", lang);
    if (lang === "AR") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="dash-topbar">
      {/* Left Section */}
      <div className="topbar-left">
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Mobile Menu"
        >
          <FiMenu />
        </button>

        {/* Global Search Bar */}
        <form className="topbar-search" onSubmit={handleSearchSubmit}>
          <FiSearch className="topbar-search-icon" />
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Search products, orders, customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      {/* Right Section */}
      <div className="topbar-right">
        {/* Language Selector */}
        <div className="dropdown">
          <button
            className="topbar-btn text-uppercase font-weight-bold btn-sm"
            style={{ width: "auto", padding: "0 10px", fontSize: "0.78rem" }}
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {activeLang} <FiChevronDown className="ml-1" />
          </button>
          <div className="dropdown-menu dropdown-menu-right shadow-sm border-0">
            <button
              className="dropdown-item small"
              onClick={() => handleLanguageChange("EN")}
            >
              🇺🇸 English (EN)
            </button>
            <button
              className="dropdown-item small"
              onClick={() => handleLanguageChange("AR")}
            >
              🇸🇦 العربية (AR)
            </button>
            <button
              className="dropdown-item small"
              onClick={() => handleLanguageChange("FR")}
            >
              🇫🇷 Français (FR)
            </button>
          </div>
        </div>

        {/* Theme Mode Toggle */}
        <button
          className="topbar-btn"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FiSun color="#EBB437" /> : <FiMoon />}
        </button>

        {/* Notifications Dropdown Drawer */}
        <div className="topbar-dropdown" ref={notifRef}>
          <button
            className="topbar-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowMessages(false);
              setShowProfileMenu(false);
            }}
            title="Notifications"
          >
            <FiBell />
            <span className="topbar-btn-badge" />
          </button>

          {showNotifications && (
            <div className="topbar-popover">
              <div className="popover-header">
                <h6 className="popover-title">Notifications</h6>
                <span className="badge badge-pill badge-primary">
                  {initialNotifications.length} New
                </span>
              </div>
              <div>
                {initialNotifications.map((notif) => (
                  <div key={notif.id} className="popover-item">
                    <span className="popover-item-icon">{notif.icon}</span>
                    <div className="popover-item-text">
                      <p className="popover-item-title">{notif.title}</p>
                      <p className="popover-item-desc">{notif.description}</p>
                      <span className="text-muted small mt-1 d-block">
                        {notif.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center pt-2 border-top mt-2">
                <Link
                  to="/dashboard/messages"
                  className="small font-weight-bold text-primary"
                  onClick={() => setShowNotifications(false)}
                >
                  View All Notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Messages Dropdown Drawer */}
        <div className="topbar-dropdown" ref={msgRef}>
          <button
            className="topbar-btn"
            onClick={() => {
              setShowMessages(!showMessages);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            title="Support Messages"
          >
            <FiMail />
            <span className="topbar-btn-badge" />
          </button>

          {showMessages && (
            <div className="topbar-popover">
              <div className="popover-header">
                <h6 className="popover-title">Messages Inbox</h6>
                <span className="badge badge-pill badge-success">2 Unread</span>
              </div>
              <div>
                {initialMessages.map((msg) => (
                  <Link
                    key={msg.id}
                    to="/dashboard/messages"
                    className="popover-item"
                    onClick={() => setShowMessages(false)}
                  >
                    <div className="popover-item-text">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="popover-item-title">{msg.sender}</p>
                        <span className="small text-muted">{msg.date}</span>
                      </div>
                      <p className="popover-item-desc text-truncate">
                        {msg.subject}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center pt-2 border-top mt-2">
                <Link
                  to="/dashboard/messages"
                  className="small font-weight-bold text-primary"
                  onClick={() => setShowMessages(false)}
                >
                  Open Customer Inbox
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div className="topbar-dropdown" ref={profileRef}>
          <button
            className="user-dropdown-btn"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
              setShowMessages(false);
            }}
          >
            <img
              src={initialAdminProfile.avatar}
              alt="Admin"
              className="user-avatar-img"
            />
            <span className="user-name-text d-none d-md-inline">
              {initialAdminProfile.name}
            </span>
            <FiChevronDown className="text-muted" />
          </button>

          {showProfileMenu && (
            <div
              className="topbar-popover"
              style={{ width: "220px", padding: "0.5rem" }}
            >
              <div className="px-3 py-2 border-bottom mb-2">
                <p className="font-weight-bold mb-0 text-truncate">
                  {initialAdminProfile.name}
                </p>
                <span className="small text-muted d-block">
                  {initialAdminProfile.email}
                </span>
              </div>

              <Link
                to="/dashboard/profile"
                className="dropdown-item py-2 d-flex align-items-center gap-2 rounded"
                onClick={() => setShowProfileMenu(false)}
              >
                <FiUser className="mr-2 text-primary" /> Admin Profile
              </Link>
              <Link
                to="/dashboard/settings"
                className="dropdown-item py-2 d-flex align-items-center gap-2 rounded"
                onClick={() => setShowProfileMenu(false)}
              >
                <FiSettings className="mr-2 text-primary" /> Store Settings
              </Link>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="dropdown-item py-2 d-flex align-items-center gap-2 rounded text-dark"
                onClick={() => setShowProfileMenu(false)}
              >
                <FiExternalLink className="mr-2 text-info" /> View Live Storefront
              </a>

              <div className="dropdown-divider my-2" />

              <Link
                to="/login"
                className="dropdown-item py-2 text-danger d-flex align-items-center gap-2 rounded font-weight-bold"
                onClick={() => setShowProfileMenu(false)}
              >
                <FiLogOut className="mr-2" /> Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
