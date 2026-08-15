// src/dashboard/pages/Profile/ProfilePage.jsx
import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiShield, FiSave, FiCheck, FiKey } from "react-icons/fi";
import { initialAdminProfile } from "../../data/mockDashboardData";

const ProfilePage = () => {
  const [profile, setProfile] = useState(initialAdminProfile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="profile-page">
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Admin Profile</h1>
          <p className="dash-breadcrumb">
            Manage your personal account credentials, role permissions, and activity history.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="alert alert-success d-flex align-items-center mb-4 font-weight-bold" role="alert">
          <FiCheck className="mr-2" /> Admin profile updated successfully!
        </div>
      )}

      <div className="row">
        {/* Left Column: Avatar & Overview Card */}
        <div className="col-12 col-md-4 mb-4 mb-md-0">
          <div className="dash-card text-center">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="rounded-circle mb-3 border p-1"
              style={{ width: "110px", height: "110px", objectFit: "cover" }}
            />
            <h5 className="font-weight-bold mb-1">{profile.name}</h5>
            <span className="badge badge-primary px-3 py-1 font-weight-bold mb-3" style={{ backgroundColor: "var(--dash-primary)" }}>
              {profile.role}
            </span>
            <p className="text-muted small px-2 mb-3">{profile.bio}</p>

            <div className="border-top pt-3 text-left small">
              <div className="d-flex align-items-center gap-2 mb-2 text-muted">
                <FiMail className="text-primary" /> {profile.email}
              </div>
              <div className="d-flex align-items-center gap-2 mb-2 text-muted">
                <FiPhone className="text-primary" /> {profile.phone}
              </div>
              <div className="d-flex align-items-center gap-2 text-muted">
                <FiMapPin className="text-primary" /> {profile.location}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile & Security Settings */}
        <div className="col-12 col-md-8">
          <div className="dash-card">
            <h5 className="font-weight-bold mb-3 border-bottom pb-2">Account Profile Information</h5>
            <form onSubmit={handleSave}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold small text-muted">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold small text-muted">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold small text-muted">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold small text-muted">Office / Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="font-weight-bold small text-muted">Bio Description</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                ></textarea>
              </div>

              <h5 className="font-weight-bold mb-3 border-bottom pb-2">Security & Credentials</h5>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold small text-muted">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Leave blank to keep current password"
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label className="font-weight-bold small text-muted">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <div className="text-right border-top pt-3 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary font-weight-bold px-4"
                  style={{ backgroundColor: "var(--dash-primary)", borderColor: "var(--dash-primary)" }}
                >
                  <FiSave className="mr-1" /> Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
