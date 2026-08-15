// src/dashboard/pages/Categories/CategoriesPage.jsx
import React, { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiLayers, FiCheck, FiX } from "react-icons/fi";
import StatusBadge from "../../components/Tables/StatusBadge";
import { initialCategories } from "../../data/mockDashboardData";
import "./CategoriesPage.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", slug: "", icon: "📦", description: "", status: "Active" });

  const handleSaveCategory = (e) => {
    e.preventDefault();
    const newCat = {
      id: Date.now(),
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      count: 0,
      icon: formData.icon,
      description: formData.description,
      status: formData.status
    };
    setCategories([newCat, ...categories]);
    setShowModal(false);
    setFormData({ name: "", slug: "", icon: "📦", description: "", status: "Active" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="categories-page">
      {/* Header */}
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Product Categories</h1>
          <p className="dash-breadcrumb">
            Organize catalog structure and product taxonomies.
          </p>
        </div>
        <button
          className="btn btn-primary font-weight-bold d-flex align-items-center gap-2"
          style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}
          onClick={() => setShowModal(true)}
        >
          <FiPlus /> Add New Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="row">
        {categories.map((cat) => (
          <div key={cat.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="dash-card h-100 d-flex flex-column justify-content-between">
              <div>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="category-card-icon">{cat.icon}</div>
                  <StatusBadge status={cat.status} />
                </div>
                <h5 className="font-weight-bold mb-1">{cat.name}</h5>
                <span className="text-muted small d-block mb-2">/{cat.slug}</span>
                <p className="text-muted small mb-3">{cat.description}</p>
              </div>

              <div className="border-top pt-3 d-flex align-items-center justify-content-between">
                <span className="badge badge-light border text-dark font-weight-bold px-2 py-1">
                  <FiLayers className="mr-1" /> {cat.count} Products
                </span>
                <div>
                  <button
                    className="btn btn-sm btn-light border mr-1 text-danger"
                    onClick={() => handleDelete(cat.id)}
                    title="Delete Category"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-bottom">
                <h5 className="modal-title font-weight-bold">Add New Category</h5>
                <button className="close" onClick={() => setShowModal(false)}>
                  <FiX />
                </button>
              </div>
              <form onSubmit={handleSaveCategory}>
                <div className="modal-body py-3">
                  <div className="form-group">
                    <label className="font-weight-bold small text-muted">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="e.g. Denim & Jeans"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-bold small text-muted">Category Icon (Emoji)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="font-weight-bold small text-muted">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer border-top">
                  <button type="button" className="btn btn-light" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary font-weight-bold" style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}>
                    <FiCheck className="mr-1" /> Save Category
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

export default CategoriesPage;
