// src/dashboard/components/Modals/OrderDetailsModal.jsx
import React, { useState } from "react";
import { FiX, FiPrinter, FiCheckCircle } from "react-icons/fi";
import StatusBadge from "../Tables/StatusBadge";

const OrderDetailsModal = ({ show, onClose, order, onStatusChange }) => {
  if (!show || !order) return null;

  const [currentStatus, setCurrentStatus] = useState(order.status);

  const handleUpdate = () => {
    onStatusChange(order.id, currentStatus);
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 shadow-lg" style={{ borderRadius: "var(--dash-radius)", backgroundColor: "var(--dash-surface)" }}>
          <div className="modal-header border-bottom">
            <div>
              <h5 className="modal-title font-weight-bold mb-0">Order {order.id}</h5>
              <span className="text-muted small">Placed on {order.date}</span>
            </div>
            <button type="button" className="close text-muted" onClick={onClose}>
              <FiX />
            </button>
          </div>
          <div className="modal-body py-4">
            <div className="row mb-4">
              <div className="col-md-6">
                <div className="p-3 rounded bg-light">
                  <h6 className="font-weight-bold small text-uppercase text-muted">Customer Details</h6>
                  <p className="font-weight-bold mb-1">{order.customer}</p>
                  <p className="text-muted small mb-1">{order.email}</p>
                  <p className="text-muted small mb-0">Payment Method: <strong>{order.paymentMethod}</strong></p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 rounded bg-light">
                  <h6 className="font-weight-bold small text-uppercase text-muted">Fulfillment Status</h6>
                  <div className="d-flex align-items-center gap-2 my-2">
                    <StatusBadge status={currentStatus} />
                  </div>
                  <div className="form-group mb-0">
                    <label className="small text-muted font-weight-bold mb-1">Update Status:</label>
                    <select
                      className="form-control form-control-sm"
                      value={currentStatus}
                      onChange={(e) => setCurrentStatus(e.target.value)}
                    >
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

            <h6 className="font-weight-bold mb-3">Order Items ({order.items})</h6>
            <div className="table-responsive border rounded">
              <table className="table mb-0 small">
                <thead className="thead-light">
                  <tr>
                    <th>Item Description</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Urban Dark Olive Parka Jacket</td>
                    <td>1</td>
                    <td>$189.90</td>
                    <td className="text-right font-weight-bold">$189.90</td>
                  </tr>
                  {order.items > 1 && (
                    <tr>
                      <td>Minimalist Leather Sneakers</td>
                      <td>{order.items - 1}</td>
                      <td>$60.00</td>
                      <td className="text-right font-weight-bold">${((order.items - 1) * 60).toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <div className="text-right" style={{ minWidth: "220px" }}>
                <div className="d-flex justify-content-between mb-1 text-muted small">
                  <span>Subtotal:</span>
                  <span>${(order.total * 0.9).toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-1 text-muted small">
                  <span>Shipping:</span>
                  <span>$15.00</span>
                </div>
                <div className="d-flex justify-content-between mb-2 font-weight-bold text-dark" style={{ fontSize: "1.1rem" }}>
                  <span>Grand Total:</span>
                  <span className="text-primary" style={{ color: "var(--dash-primary)" }}>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer border-top">
            <button className="btn btn-outline-secondary btn-sm" onClick={() => window.print()}>
              <FiPrinter className="mr-1" /> Print Invoice
            </button>
            <button className="btn btn-primary btn-sm px-3 font-weight-bold" style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }} onClick={handleUpdate}>
              <FiCheckCircle className="mr-1" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
