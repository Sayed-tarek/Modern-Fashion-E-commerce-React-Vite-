// src/dashboard/components/Forms/ProductModalForm.jsx
import React, { useState, useEffect } from "react";
import { FiX, FiCheck } from "react-icons/fi";

const ProductModalForm = ({ show, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Men's Wear",
    price: "",
    originalPrice: "",
    stock: "",
    status: "In Stock",
    image: "",
    description: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
        category: "Men's Wear",
        price: "",
        originalPrice: "",
        stock: "10",
        status: "In Stock",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=200&auto=format&fit=crop&q=80",
        description: ""
      });
    }
  }, [initialData, show]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0
    });
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
            <h5 className="modal-title font-weight-bold text-main">
              {initialData ? "Edit Product" : "Add New Fashion Item"}
            </h5>
            <button type="button" className="close text-muted" onClick={onClose}>
              <FiX />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body py-4">
              <div className="row">
                <div className="col-md-8 form-group">
                  <label className="font-weight-bold small text-muted">Product Title</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Leather Parka Jacket"
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold small text-muted">SKU Code</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold small text-muted">Category</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option>Men's Wear</option>
                    <option>Women's Fashion</option>
                    <option>Footwear</option>
                    <option>Accessories</option>
                    <option>Activewear</option>
                  </select>
                </div>
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold small text-muted">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="col-md-4 form-group">
                  <label className="font-weight-bold small text-muted">Stock Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="font-weight-bold small text-muted">Product Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="font-weight-bold small text-muted">Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter detailed description..."
                ></textarea>
              </div>
            </div>
            <div className="modal-footer border-top">
              <button type="button" className="btn btn-light" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary px-4 font-weight-bold" style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}>
                <FiCheck className="mr-1" /> Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductModalForm;
