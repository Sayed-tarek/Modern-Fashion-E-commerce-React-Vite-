// src/dashboard/pages/Products/ProductsPage.jsx
import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FiPlus,
  FiSearch,
  FiFilter,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiChevronLeft,
  FiChevronRight
} from "react-icons/fi";
import StatusBadge from "../../components/Tables/StatusBadge";
import ProductModalForm from "../../components/Forms/ProductModalForm";
import { initialProductsList } from "../../data/mockProductsData";
import "./ProductsPage.css";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState(initialProductsList);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewProduct, setViewProduct] = useState(null);

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || prod.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All" || prod.status === selectedStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleSaveProduct = (productData) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...productData } : p))
      );
    } else {
      const newProd = {
        ...productData,
        id: Date.now(),
        sales: 0,
        rating: 5.0
      };
      setProducts((prev) => [newProd, ...prev]);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="products-page">
      {/* Page Header */}
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Products Inventory</h1>
          <p className="dash-breadcrumb">
            Manage your fashion catalog, prices, and stock levels.
          </p>
        </div>
        <button
          className="btn btn-primary font-weight-bold d-flex align-items-center gap-2"
          style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}
          onClick={() => {
            setEditingProduct(null);
            setShowModal(true);
          }}
        >
          <FiPlus /> Add New Product
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="dash-card mb-4">
        <div className="row align-items-center">
          <div className="col-12 col-md-5 mb-3 mb-md-0">
            <div className="position-relative">
              <FiSearch
                className="position-absolute text-muted"
                style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                className="form-control pl-5"
                placeholder="Search products by title or SKU..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="col-6 col-md-3 mb-3 mb-md-0">
            <div className="d-flex align-items-center gap-2">
              <FiFilter className="text-muted" />
              <select
                className="form-control"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="All">All Categories</option>
                <option>Men's Wear</option>
                <option>Women's Fashion</option>
                <option>Footwear</option>
                <option>Accessories</option>
                <option>Activewear</option>
              </select>
            </div>
          </div>

          <div className="col-6 col-md-4">
            <select
              className="form-control"
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Stock Statuses</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Data Table */}
      <div className="dash-card">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Sales</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <div className="d-flex align-items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="product-table-img"
                        />
                        <div>
                          <h6 className="font-weight-bold small mb-0">{prod.name}</h6>
                          <span className="text-muted small">Rating: ⭐ {prod.rating}</span>
                        </div>
                      </div>
                    </td>
                    <td className="small font-weight-bold text-muted">{prod.sku}</td>
                    <td className="small">{prod.category}</td>
                    <td className="font-weight-bold text-dark">${prod.price.toFixed(2)}</td>
                    <td className="font-weight-bold small">{prod.stock} units</td>
                    <td>
                      <StatusBadge status={prod.status} />
                    </td>
                    <td className="small text-muted">{prod.sales} sold</td>
                    <td className="text-right">
                      <button
                        className="btn btn-sm btn-light border mr-1"
                        title="View Details"
                        onClick={() => setViewProduct(prod)}
                      >
                        <FiEye />
                      </button>
                      <button
                        className="btn btn-sm btn-light border mr-1 text-primary"
                        title="Edit Product"
                        onClick={() => {
                          setEditingProduct(prod);
                          setShowModal(true);
                        }}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="btn btn-sm btn-light border text-danger"
                        title="Delete Product"
                        onClick={() => handleDeleteProduct(prod.id)}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    No products found matching your search filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-3 flex-wrap gap-2">
          <span className="text-muted small">
            Showing {paginatedProducts.length} of {filteredProducts.length} entries
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

      {/* Product Create / Edit Modal Form */}
      <ProductModalForm
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSaveProduct}
        initialData={editingProduct}
      />

      {/* View Details Modal */}
      {viewProduct && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-bottom">
                <h5 className="modal-title font-weight-bold">{viewProduct.name}</h5>
                <button className="close" onClick={() => setViewProduct(null)}>
                  &times;
                </button>
              </div>
              <div className="modal-body text-center py-4">
                <img
                  src={viewProduct.image}
                  alt={viewProduct.name}
                  className="rounded mb-3"
                  style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
                />
                <p className="text-muted small px-3">{viewProduct.description}</p>
                <div className="d-flex justify-content-around border-top pt-3 mt-3">
                  <div>
                    <span className="text-muted small d-block">Price</span>
                    <strong className="text-primary">${viewProduct.price}</strong>
                  </div>
                  <div>
                    <span className="text-muted small d-block">Stock</span>
                    <strong>{viewProduct.stock} units</strong>
                  </div>
                  <div>
                    <span className="text-muted small d-block">Total Sales</span>
                    <strong>{viewProduct.sales} units</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
