// src/dashboard/pages/DashboardHome/DashboardHome.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiDollarSign,
  FiShoppingCart,
  FiUsers,
  FiShoppingBag,
  FiArrowRight,
  FiAlertTriangle,
  FiEye,
  FiTrendingUp,
  FiFilter
} from "react-icons/fi";
import StatCard from "../../components/Cards/StatCard";
import SalesChart from "../../components/Charts/SalesChart";
import CategoryDistributionChart from "../../components/Charts/CategoryDistributionChart";
import StatusBadge from "../../components/Tables/StatusBadge";
import OrderDetailsModal from "../../components/Modals/OrderDetailsModal";
import {
  initialStatsData,
  initialRevenueChartData,
  initialCategoryDistribution,
  initialRecentOrders,
  initialLowStockProducts,
  initialRecentCustomers
} from "../../data/mockDashboardData";
import "./DashboardHome.css";

const DashboardHome = () => {
  const [orders, setOrders] = useState(initialRecentOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [chartRange, setChartRange] = useState("Year 2026");

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  return (
    <div className="dashboard-home-page">
      {/* Page Header */}
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Dashboard Overview</h1>
          <p className="dash-breadcrumb">
            Welcome back, <strong>Said Al-Rashid</strong> 👋 Here is what's happening with your store today.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <Link
            to="/dashboard/products"
            className="btn btn-sm btn-outline-secondary font-weight-bold"
          >
            + Add Product
          </Link>
          <Link
            to="/dashboard/analytics"
            className="btn btn-sm btn-primary font-weight-bold"
            style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}
          >
            View Full Reports
          </Link>
        </div>
      </div>

      {/* 1. Statistics Cards Row */}
      <div className="row mb-4">
        <div className="col-12 col-sm-6 col-lg-3 mb-3 mb-lg-0">
          <StatCard
            title="Total Revenue"
            value={`$${initialStatsData.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
            change={initialStatsData.revenueChange}
            isPositive={true}
            icon={<FiDollarSign />}
            subtitle="vs. $112,400.00 last month"
            color="success"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 mb-3 mb-lg-0">
          <StatCard
            title="Total Orders"
            value={initialStatsData.totalOrders.toLocaleString()}
            change={initialStatsData.ordersChange}
            isPositive={true}
            icon={<FiShoppingCart />}
            subtitle="142 pending dispatch"
            color="primary"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3 mb-3 mb-sm-0">
          <StatCard
            title="Customers"
            value={initialStatsData.totalCustomers.toLocaleString()}
            change={initialStatsData.customersChange}
            isPositive={true}
            icon={<FiUsers />}
            subtitle="320 new this month"
            color="info"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <StatCard
            title="Active Products"
            value={initialStatsData.totalProducts.toLocaleString()}
            change={initialStatsData.productsChange}
            isPositive={true}
            icon={<FiShoppingBag />}
            subtitle="4 low in stock"
            color="warning"
          />
        </div>
      </div>

      {/* 2. Charts Row */}
      <div className="row mb-4">
        <div className="col-12 col-lg-8 mb-4 mb-lg-0">
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h5 className="dash-card-title">Revenue Analytics</h5>
                <span className="text-muted small">Monthly sales growth & comparison</span>
              </div>
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-light border font-weight-bold"
                  type="button"
                  data-toggle="dropdown"
                >
                  <FiFilter className="mr-1" /> {chartRange}
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button
                    className="dropdown-item small"
                    onClick={() => setChartRange("Year 2026")}
                  >
                    Year 2026
                  </button>
                  <button
                    className="dropdown-item small"
                    onClick={() => setChartRange("Last 6 Months")}
                  >
                    Last 6 Months
                  </button>
                </div>
              </div>
            </div>
            <SalesChart chartData={initialRevenueChartData} />
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h5 className="dash-card-title">Category Share</h5>
                <span className="text-muted small">Sales volume breakdown</span>
              </div>
            </div>
            <CategoryDistributionChart chartData={initialCategoryDistribution} />
          </div>
        </div>
      </div>

      {/* 3. Recent Orders & Low Stock Row */}
      <div className="row mb-4">
        {/* Recent Orders Table */}
        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h5 className="dash-card-title">Recent Orders</h5>
                <span className="text-muted small">Real-time store transactions</span>
              </div>
              <Link
                to="/dashboard/orders"
                className="btn btn-sm btn-link font-weight-bold p-0 text-primary"
              >
                View All Orders <FiArrowRight />
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 small">
                <thead className="thead-light">
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id}>
                      <td className="font-weight-bold text-dark">{ord.id}</td>
                      <td>
                        <div className="font-weight-bold">{ord.customer}</div>
                        <span className="text-muted small">{ord.email}</span>
                      </td>
                      <td className="text-muted">{ord.date}</td>
                      <td className="font-weight-bold">${ord.total.toFixed(2)}</td>
                      <td>
                        <StatusBadge status={ord.status} />
                      </td>
                      <td className="text-right">
                        <button
                          className="btn btn-sm btn-light border p-1"
                          title="View Details"
                          onClick={() => {
                            setSelectedOrder(ord);
                            setShowOrderModal(true);
                          }}
                        >
                          <FiEye />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="col-12 col-xl-4">
          <div className="dash-card">
            <div className="dash-card-header">
              <div className="d-flex align-items-center gap-2">
                <FiAlertTriangle color="var(--dash-danger)" className="mr-1" />
                <h5 className="dash-card-title mb-0">Low Stock Alert</h5>
              </div>
              <Link
                to="/dashboard/products"
                className="btn btn-sm btn-link p-0 small text-danger font-weight-bold"
              >
                Restock All
              </Link>
            </div>

            <div className="d-flex flex-column gap-3">
              {initialLowStockProducts.map((prod) => (
                <div key={prod.id} className="d-flex align-items-center gap-3 p-2 rounded border-bottom">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="dash-quick-table-img"
                  />
                  <div className="flex-grow-1 min-w-0">
                    <h6 className="font-weight-bold small text-truncate mb-0">
                      {prod.name}
                    </h6>
                    <span className="text-muted small">SKU: {prod.sku}</span>
                    <div className="stock-progress-bar mt-1">
                      <div
                        className="stock-progress-fill bg-danger"
                        style={{ width: `${(prod.stock / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="badge badge-danger font-weight-bold">
                      {prod.stock} left
                    </span>
                    <div className="small font-weight-bold mt-1">${prod.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recent Customers Row */}
      <div className="row">
        <div className="col-12">
          <div className="dash-card">
            <div className="dash-card-header">
              <div>
                <h5 className="dash-card-title">Top Active Customers</h5>
                <span className="text-muted small">High value buyers overview</span>
              </div>
              <Link
                to="/dashboard/customers"
                className="btn btn-sm btn-link font-weight-bold p-0 text-primary"
              >
                View Customer Directory <FiArrowRight />
              </Link>
            </div>

            <div className="row">
              {initialRecentCustomers.map((cust) => (
                <div key={cust.id} className="col-12 col-sm-6 col-md-4 col-lg-2.4 mb-3">
                  <div className="p-3 border rounded text-center h-100 bg-light">
                    <img
                      src={cust.avatar}
                      alt={cust.name}
                      className="rounded-circle mb-2"
                      style={{ width: "48px", height: "48px", objectFit: "cover" }}
                    />
                    <h6 className="font-weight-bold small mb-0 text-truncate">
                      {cust.name}
                    </h6>
                    <span className="text-muted small d-block text-truncate mb-2">
                      {cust.email}
                    </span>
                    <div className="d-flex justify-content-between align-items-center border-top pt-2 small">
                      <span className="text-muted">Spent:</span>
                      <strong className="text-dark">${cust.spent.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        show={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default DashboardHome;
