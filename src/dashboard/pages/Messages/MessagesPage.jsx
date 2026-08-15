// src/dashboard/pages/Messages/MessagesPage.jsx
import React, { useState } from "react";
import { FiMail, FiSend, FiStar, FiTrash2, FiCornerUpLeft, FiUser } from "react-icons/fi";
import StatusBadge from "../../components/Tables/StatusBadge";
import { initialMessages } from "../../data/mockDashboardData";

const MessagesPage = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [activeMsg, setActiveMsg] = useState(messages[0]);
  const [replyText, setReplyText] = useState("");

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    alert(`Reply sent to ${activeMsg.sender}!`);
    setReplyText("");
  };

  return (
    <div className="messages-page">
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Customer Support Messages</h1>
          <p className="dash-breadcrumb">
            Manage inquiries, order support requests, and wholesale communications.
          </p>
        </div>
      </div>

      <div className="row">
        {/* Messages List Column */}
        <div className="col-12 col-md-5 col-lg-4 mb-4 mb-md-0">
          <div className="dash-card p-0 overflow-hidden">
            <div className="p-3 border-bottom bg-light">
              <h6 className="font-weight-bold mb-0">Inbox ({messages.length})</h6>
            </div>
            <div className="list-group list-group-flush">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  className={`list-group-item list-group-item-action border-0 p-3 text-left ${
                    activeMsg?.id === msg.id ? "bg-light font-weight-bold" : ""
                  }`}
                  onClick={() => setActiveMsg(msg)}
                >
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="small text-dark font-weight-bold">{msg.sender}</span>
                    <span className="small text-muted">{msg.date}</span>
                  </div>
                  <h6 className="small font-weight-bold text-truncate mb-1">{msg.subject}</h6>
                  <p className="small text-muted text-truncate mb-0">{msg.body}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Message View & Reply Box */}
        <div className="col-12 col-md-7 col-lg-8">
          {activeMsg ? (
            <div className="dash-card">
              <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                <div>
                  <h5 className="font-weight-bold text-dark mb-1">{activeMsg.subject}</h5>
                  <div className="d-flex align-items-center gap-2 small text-muted">
                    <FiUser /> <strong>{activeMsg.sender}</strong> ({activeMsg.email})
                  </div>
                </div>
                <StatusBadge status={activeMsg.priority} />
              </div>

              <div className="p-3 bg-light rounded mb-4" style={{ minHeight: "160px" }}>
                <p className="mb-0 text-dark" style={{ lineHeight: "1.6" }}>{activeMsg.body}</p>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="border-top pt-3">
                <h6 className="font-weight-bold small text-uppercase text-muted mb-2">
                  <FiCornerUpLeft className="mr-1" /> Quick Reply
                </h6>
                <div className="form-group mb-3">
                  <textarea
                    className="form-control"
                    rows="4"
                    required
                    placeholder="Type your response to the customer..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  ></textarea>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 font-weight-bold"
                    style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}
                  >
                    <FiSend className="mr-1" /> Send Message
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="dash-card text-center py-5 text-muted">
              Select a message from the inbox to view.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
