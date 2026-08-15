// src/dashboard/pages/Coupons/CouponsPage.jsx
import React, { useState } from "react";
import { FiPlus, FiTag, FiCopy, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import StatusBadge from "../../components/Tables/StatusBadge";
import { initialCoupons } from "../../data/mockDashboardData";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    type: "Percentage",
    value: 15,
    minSpend: 50,
    usageLimit: 200,
    expiry: "2026-12-31"
  });

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    const newCoupon = {
      id: Date.now(),
      code: formData.code.toUpperCase(),
      discount: formData.type === "Percentage" ? `${formData.value}% OFF` : `$${formData.value}.00 OFF`,
      type: formData.type,
      value: formData.value,
      minSpend: formData.minSpend,
      usageLimit: formData.usageLimit,
      usedCount: 0,
      expiry: formData.expiry,
      status: "Active"
    };
    setCoupons([newCoupon, ...coupons]);
    setShowModal(false);
    setFormData({ code: "", discount: "", type: "Percentage", value: 15, minSpend: 50, usageLimit: 200, expiry: "2026-12-31" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete coupon?")) {
      setCoupons(coupons.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="coupons-page">
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Coupons & Promotions</h1>
          <p className="dash-breadcrumb">
            Create discount promo codes and special marketing campaign vouchers.
          </p>
        </div>
        <button
          className="btn btn-primary font-weight-bold d-flex align-items-center gap-2"
          style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}
          onClick={() => setShowModal(true)}
        >
          <FiPlus /> Create Coupon
        </button>
      </div>

      <div className="dash-card">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>Coupon Code</th>
                <th>Discount Value</th>
                <th>Min Spend</th>
                <th>Usage Limit</th>
                <th>Used Count</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coup) => (
                <tr key={coup.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <FiTag className="text-primary" />
                      <span className="font-weight-bold text-dark font-monospace" style={{ letterSpacing: "1px" }}>
                        {coup.code}
                      </span>
                    </div>
                  </td>
                  <td className="font-weight-bold text-success">{coup.discount}</td>
                  <td className="small text-muted">${coup.minSpend}</td>
                  <td className="small text-muted">{coup.usageLimit} max</td>
                  <td className="small font-weight-bold">{coup.usedCount} used</td>
                  <td className="small text-muted">{coup.expiry}</td>
                  <td>
                    <StatusBadge status={coup.status} />
                  </td>
                  <td className="text-right">
                    <button
                      className="btn btn-sm btn-light border text-danger"
                      onClick={() => handleDelete(coup.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title font-weight-bold">Create Coupon</h5>
                <button className="close" onClick={() => setShowModal(false)}><FiX /></button>
              </div>
              <form onSubmit={handleCreateCoupon}>
                <div className="modal-body py-3">
                  <div className="form-group">
                    <label className="font-weight-bold small text-muted">Promo Code</label>
                    <input
                      type="text"
                      className="form-control font-monospace"
                      required
                      placeholder="e.g. AUTUMN2026"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label className="font-weight-bold small text-muted">Discount Type</label>
                      <select
                        className="form-control"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      >
                        <option value="Percentage">Percentage (%)</option>
                        <option value="Fixed Amount">Fixed Amount ($)</option>
                      </select>
                    </div>
                    <div className="col-md-6 form-group">
                      <label className="font-weight-bold small text-muted">Value</label>
                      <input
                        type="number"
                        className="form-control"
                        required
                        value={formData.value}
                        onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <label className="font-weight-bold small text-muted">Min Purchase ($)</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.minSpend}
                        onChange={(e) => setFormData({ ...formData, minSpend: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="col-md-6 form-group">
                      <label className="font-weight-bold small text-muted">Expiry Date</label>
                      <input
                        type="date"
                        className="form-control"
                        required
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary font-weight-bold" style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}>
                    <FiCheck className="mr-1" /> Activate Promo Code
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponsPage;
