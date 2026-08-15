// src/dashboard/pages/Customers/CustomersPage.jsx
import React, { useState } from "react";
import { FiSearch, FiMail, FiPhone, FiShoppingBag, FiDollarSign, FiUserCheck } from "react-icons/fi";
import StatusBadge from "../../components/Tables/StatusBadge";
import { initialRecentCustomers } from "../../data/mockDashboardData";

const CustomersPage = () => {
  const [customers, setCustomers] = useState(initialRecentCustomers);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="customers-page">
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Customers Directory</h1>
          <p className="dash-breadcrumb">
            Manage registered buyers, order histories, and customer segments.
          </p>
        </div>
      </div>

      <div className="dash-card mb-4">
        <div className="position-relative">
          <FiSearch
            className="position-absolute text-muted"
            style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            className="form-control pl-5"
            placeholder="Search customers by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredCustomers.map((cust) => (
          <div key={cust.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="dash-card h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={cust.avatar}
                  alt={cust.name}
                  className="rounded-circle"
                  style={{ width: "54px", height: "54px", objectFit: "cover" }}
                />
                <div>
                  <h6 className="font-weight-bold mb-0">{cust.name}</h6>
                  <span className="text-muted small">{cust.email}</span>
                  <div className="mt-1">
                    <StatusBadge status={cust.status} />
                  </div>
                </div>
              </div>

              <div className="p-2 bg-light rounded mb-3">
                <div className="d-flex justify-content-between small py-1 border-bottom">
                  <span className="text-muted">Total Orders:</span>
                  <strong className="text-dark">{cust.ordersCount} Orders</strong>
                </div>
                <div className="d-flex justify-content-between small py-1">
                  <span className="text-muted">Total Lifetime Spent:</span>
                  <strong className="text-primary" style={{ color: "var(--dash-primary)" }}>${cust.spent.toFixed(2)}</strong>
                </div>
              </div>

              <div className="d-flex gap-2">
                <a
                  href={`mailto:${cust.email}`}
                  className="btn btn-sm btn-outline-secondary flex-grow-1 font-weight-bold"
                >
                  <FiMail className="mr-1" /> Send Email
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;
