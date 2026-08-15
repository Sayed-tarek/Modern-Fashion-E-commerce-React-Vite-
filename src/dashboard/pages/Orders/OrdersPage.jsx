// src/dashboard/pages/Orders/OrdersPage.jsx
import React, { useState, useMemo } from "react";
import { FiSearch, FiFilter, FiEye, FiDownload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import StatusBadge from "../../components/Tables/StatusBadge";
import OrderDetailsModal from "../../components/Modals/OrderDetailsModal";
import { initialRecentOrders } from "../../data/mockDashboardData";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState(initialRecentOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesSearch =
        ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        selectedStatus === "All" || ord.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, selectedStatus]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage]);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
  };

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Orders Management</h1>
          <p className="dash-breadcrumb">
            Track customer orders, payments, and shipping statuses.
          </p>
        </div>
        <button className="btn btn-outline-secondary font-weight-bold btn-sm">
          <FiDownload className="mr-1" /> Export Orders CSV
        </button>
      </div>

      {/* Filters */}
      <div className="dash-card mb-4">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="position-relative">
              <FiSearch
                className="position-absolute text-muted"
                style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                className="form-control pl-5"
                placeholder="Search by Order ID, customer name, or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex align-items-center gap-2">
              <FiFilter className="text-muted" />
              <select
                className="form-control"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Order Statuses</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="dash-card">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length > 0 ? (
                paginatedOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td className="order-table-id font-weight-bold text-dark">{ord.id}</td>
                    <td>
                      <div className="font-weight-bold">{ord.customer}</div>
                      <span className="text-muted small">{ord.email}</span>
                    </td>
                    <td className="small text-muted">{ord.date}</td>
                    <td className="small font-weight-bold text-muted">{ord.paymentMethod}</td>
                    <td className="font-weight-bold text-dark">${ord.total.toFixed(2)}</td>
                    <td>
                      <StatusBadge status={ord.status} />
                    </td>
                    <td className="text-right">
                      <button
                        className="btn btn-sm btn-light border font-weight-bold px-3"
                        onClick={() => {
                          setSelectedOrder(ord);
                          setShowModal(true);
                        }}
                      >
                        <FiEye className="mr-1" /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">
                    No orders matching criteria found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-3 flex-wrap gap-2">
          <span className="text-muted small">
            Showing {paginatedOrders.length} of {filteredOrders.length} orders
          </span>
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <FiChevronLeft /> Prev
            </button>
            <span className="small font-weight-bold px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="btn btn-sm btn-outline-secondary"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      <OrderDetailsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        order={selectedOrder}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default OrdersPage;
