// src/dashboard/pages/Settings/SettingsPage.jsx
import React, { useState } from "react";
import { FiSave, FiCreditCard, FiTruck, FiShield, FiGlobe, FiCheck } from "react-icons/fi";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [general, setGeneral] = useState({
    storeName: "AERO STEP Fashion Store",
    storeEmail: "support@aerostep.com",
    phone: "+1 (555) 019-2834",
    currency: "USD ($)",
    timezone: "UTC-5 (Eastern Time)"
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="settings-page">
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Store Settings</h1>
          <p className="dash-breadcrumb">
            Manage operational parameters, payment processors, and security policies.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="alert alert-success d-flex align-items-center mb-4 font-weight-bold" role="alert">
          <FiCheck className="mr-2" /> Store settings successfully saved and applied!
        </div>
      )}

      <div className="dash-card p-0 overflow-hidden">
        {/* Settings Navigation Tabs */}
        <div className="bg-light border-bottom px-3 pt-2 d-flex gap-2">
          <button
            className={`btn btn-sm border-0 font-weight-bold px-3 py-2 ${
              activeTab === "general" ? "bg-white text-primary shadow-sm" : "text-muted"
            }`}
            onClick={() => setActiveTab("general")}
          >
            <FiGlobe className="mr-1" /> General Information
          </button>
          <button
            className={`btn btn-sm border-0 font-weight-bold px-3 py-2 ${
              activeTab === "payments" ? "bg-white text-primary shadow-sm" : "text-muted"
            }`}
            onClick={() => setActiveTab("payments")}
          >
            <FiCreditCard className="mr-1" /> Payment Gateways
          </button>
          <button
            className={`btn btn-sm border-0 font-weight-bold px-3 py-2 ${
              activeTab === "shipping" ? "bg-white text-primary shadow-sm" : "text-muted"
            }`}
            onClick={() => setActiveTab("shipping")}
          >
            <FiTruck className="mr-1" /> Shipping & Taxes
          </button>
          <button
            className={`btn btn-sm border-0 font-weight-bold px-3 py-2 ${
              activeTab === "security" ? "bg-white text-primary shadow-sm" : "text-muted"
            }`}
            onClick={() => setActiveTab("security")}
          >
            <FiShield className="mr-1" /> Security & 2FA
          </button>
        </div>

        <form onSubmit={handleSave} className="p-4">
          {activeTab === "general" && (
            <div>
              <h5 className="font-weight-bold mb-3">Store Details</h5>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold small text-muted">Store Display Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={general.storeName}
                    onChange={(e) => setGeneral({ ...general, storeName: e.target.value })}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold small text-muted">Support Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={general.storeEmail}
                    onChange={(e) => setGeneral({ ...general, storeEmail: e.target.value })}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold small text-muted">Support Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={general.phone}
                    onChange={(e) => setGeneral({ ...general, phone: e.target.value })}
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold small text-muted">Store Currency</label>
                  <select
                    className="form-control"
                    value={general.currency}
                    onChange={(e) => setGeneral({ ...general, currency: e.target.value })}
                  >
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>AED (د.إ)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold small text-muted">Default Timezone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={general.timezone}
                    onChange={(e) => setGeneral({ ...general, timezone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div>
              <h5 className="font-weight-bold mb-3">Connected Payment Gateways</h5>
              <div className="p-3 border rounded mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="font-weight-bold mb-1">Stripe Credit Card Processing</h6>
                  <span className="text-muted small">Status: Connected & Active</span>
                </div>
                <span className="badge badge-success px-3 py-2 font-weight-bold">Connected</span>
              </div>
              <div className="p-3 border rounded mb-3 d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="font-weight-bold mb-1">PayPal Express Checkout</h6>
                  <span className="text-muted small">Status: Enabled</span>
                </div>
                <span className="badge badge-success px-3 py-2 font-weight-bold">Connected</span>
              </div>
              <div className="p-3 border rounded d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="font-weight-bold mb-1">Apple Pay & Google Pay</h6>
                  <span className="text-muted small">Status: Ready</span>
                </div>
                <span className="badge badge-success px-3 py-2 font-weight-bold">Connected</span>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div>
              <h5 className="font-weight-bold mb-3">Default Shipping Rules</h5>
              <div className="form-group">
                <label className="font-weight-bold small text-muted">Flat Standard Shipping Rate ($)</label>
                <input type="number" className="form-control" defaultValue="15.00" />
              </div>
              <div className="form-group">
                <label className="font-weight-bold small text-muted">Free Shipping Minimum Threshold ($)</label>
                <input type="number" className="form-control" defaultValue="150.00" />
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div>
              <h5 className="font-weight-bold mb-3">Security & Access Controls</h5>
              <div className="form-group">
                <div className="custom-control custom-switch">
                  <input type="checkbox" className="custom-control-input" id="2faSwitch" defaultChecked />
                  <label className="custom-control-label font-weight-bold" htmlFor="2faSwitch">
                    Enforce Two-Factor Authentication (2FA) for Admin Users
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="border-top pt-3 mt-4 text-right">
            <button
              type="submit"
              className="btn btn-primary font-weight-bold px-4"
              style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}
            >
              <FiSave className="mr-1" /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
