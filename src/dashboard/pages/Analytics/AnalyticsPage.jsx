// src/dashboard/pages/Analytics/AnalyticsPage.jsx
import React from "react";
import { FiTrendingUp, FiDollarSign, FiUsers, FiShoppingBag, FiGlobe, FiPieChart } from "react-icons/fi";
import SalesChart from "../../components/Charts/SalesChart";
import CategoryDistributionChart from "../../components/Charts/CategoryDistributionChart";
import { initialRevenueChartData, initialCategoryDistribution } from "../../data/mockDashboardData";

const AnalyticsPage = () => {
  return (
    <div className="analytics-page">
      <div className="dash-page-header">
        <div>
          <h1 className="dash-page-title">Store Analytics & Reports</h1>
          <p className="dash-breadcrumb">
            Deep dive into revenue trends, customer acquisition, and product sales performance.
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <div className="dash-card">
            <span className="text-muted small font-weight-bold text-uppercase">Conversion Rate</span>
            <h3 className="font-weight-bold my-2 text-dark">3.42%</h3>
            <span className="text-success small font-weight-bold">↑ +0.8% from last month</span>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <div className="dash-card">
            <span className="text-muted small font-weight-bold text-uppercase">Avg. Order Value</span>
            <h3 className="font-weight-bold my-2 text-dark">$90.45</h3>
            <span className="text-success small font-weight-bold">↑ +$4.20 from last month</span>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="dash-card">
            <span className="text-muted small font-weight-bold text-uppercase">Return Rate</span>
            <h3 className="font-weight-bold my-2 text-dark">1.2%</h3>
            <span className="text-success small font-weight-bold">↓ -0.3% low return rate</span>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 col-lg-8 mb-4 mb-lg-0">
          <div className="dash-card">
            <div className="dash-card-header">
              <h5 className="dash-card-title">Annual Revenue Growth</h5>
            </div>
            <SalesChart chartData={initialRevenueChartData} />
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="dash-card">
            <div className="dash-card-header">
              <h5 className="dash-card-title">Sales by Category</h5>
            </div>
            <CategoryDistributionChart chartData={initialCategoryDistribution} />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <div className="dash-card">
            <h5 className="dash-card-title mb-3">Top Traffic Channels</h5>
            <ul className="list-group list-group-flush small">
              <li className="list-group-item d-flex justify-content-between px-0">
                <span>Google Organic Search</span>
                <strong>42% (18,400 visits)</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between px-0">
                <span>Instagram & TikTok Ads</span>
                <strong>31% (13,600 visits)</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between px-0">
                <span>Direct Traffic</span>
                <strong>18% (7,900 visits)</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between px-0">
                <span>Email Newsletter</span>
                <strong>9% (3,950 visits)</strong>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="dash-card">
            <h5 className="dash-card-title mb-3">Sales by Country</h5>
            <ul className="list-group list-group-flush small">
              <li className="list-group-item d-flex justify-content-between px-0">
                <span>🇺🇸 United States</span>
                <strong>$68,400.00 (53%)</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between px-0">
                <span>🇦🇪 United Arab Emirates</span>
                <strong>$28,500.00 (22%)</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between px-0">
                <span>🇬🇧 United Kingdom</span>
                <strong>$18,900.00 (15%)</strong>
              </li>
              <li className="list-group-item d-flex justify-content-between px-0">
                <span>🇨🇦 Canada</span>
                <strong>$12,650.00 (10%)</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
