// src/dashboard/pages/Reviews/ReviewsPage.jsx
import React, { useState } from "react";
import { FiStar, FiCheckCircle, FiXCircle, FiMessageSquare } from "react-icons/fi";
import StatusBadge from "../../components/Tables/StatusBadge";
import { initialReviews } from "../../data/mockDashboardData";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyText, setReplyText] = useState("");

  const toggleApproval = (id) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === "Approved" ? "Pending" : "Approved" } : r
      )
    );
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    alert(`Reply sent to ${replyTarget.customer}!`);
    setReplyTarget(null);
    setReplyText("");
  };

  return (
    <div className="reviews-page">
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Product Ratings & Reviews</h1>
          <p className="dash-breadcrumb">
            Monitor buyer feedback, moderate reviews, and respond to customers.
          </p>
        </div>
      </div>

      <div className="dash-card">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="thead-light">
              <tr>
                <th>Customer</th>
                <th>Rating</th>
                <th>Product</th>
                <th>Comment</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((rev) => (
                <tr key={rev.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={rev.avatar}
                        alt={rev.customer}
                        className="rounded-circle"
                        style={{ width: "36px", height: "36px", objectFit: "cover" }}
                      />
                      <span className="font-weight-bold small">{rev.customer}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-warning font-weight-bold small">
                      {"★".repeat(rev.rating)}
                    </span>
                  </td>
                  <td className="font-weight-bold small text-dark">{rev.product}</td>
                  <td className="small text-muted" style={{ maxWidth: "260px" }}>
                    "{rev.comment}"
                  </td>
                  <td className="small text-muted">{rev.date}</td>
                  <td>
                    <StatusBadge status={rev.status} />
                  </td>
                  <td className="text-right">
                    <button
                      className="btn btn-sm btn-light border mr-1"
                      title="Toggle Status"
                      onClick={() => toggleApproval(rev.id)}
                    >
                      {rev.status === "Approved" ? <FiXCircle className="text-danger" /> : <FiCheckCircle className="text-success" />}
                    </button>
                    <button
                      className="btn btn-sm btn-light border text-primary"
                      title="Reply to Review"
                      onClick={() => setReplyTarget(rev)}
                    >
                      <FiMessageSquare />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {replyTarget && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h5 className="modal-title font-weight-bold">Reply to {replyTarget.customer}</h5>
                <button className="close" onClick={() => setReplyTarget(null)}>&times;</button>
              </div>
              <form onSubmit={handleSendReply}>
                <div className="modal-body py-3">
                  <p className="small text-muted mb-2">Review: "{replyTarget.comment}"</p>
                  <textarea
                    className="form-control"
                    rows="4"
                    required
                    placeholder="Type your official store response..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-light" onClick={() => setReplyTarget(null)}>Cancel</button>
                  <button type="submit" className="btn btn-primary font-weight-bold" style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}>Send Public Response</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
