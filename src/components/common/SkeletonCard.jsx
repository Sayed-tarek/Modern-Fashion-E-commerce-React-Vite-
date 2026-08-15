import React from 'react';
import './SkeletonCard.css';

/**
 * Reusable Skeleton Card component
 * Supports type: 'product' | 'category' | 'product-detail' | 'dashboard'
 * Accepts count prop to render a grid of skeletons
 */
export const SkeletonCard = ({ type = 'product', count = 1, className = '' }) => {
  const cards = Array.from({ length: count });

  const renderSkeleton = (key) => {
    switch (type) {
      case 'category':
        return (
          <div key={key} className={`skeleton-card skeleton-category-card ${className}`}>
            <div className="skeleton-box skeleton-category-image shimmer" />
            <div className="skeleton-box skeleton-category-title shimmer" />
            <div className="skeleton-box skeleton-category-count shimmer" />
          </div>
        );

      case 'dashboard':
        return (
          <div key={key} className={`skeleton-card skeleton-dashboard-card ${className}`}>
            <div className="skeleton-dashboard-header">
              <div className="skeleton-box skeleton-icon-circle shimmer" />
              <div className="skeleton-box skeleton-badge-small shimmer" />
            </div>
            <div className="skeleton-box skeleton-stat-number shimmer" />
            <div className="skeleton-box skeleton-stat-label shimmer" />
          </div>
        );

      case 'product-detail':
        return (
          <div key={key} className={`skeleton-card skeleton-product-detail ${className}`}>
            <div className="skeleton-detail-gallery">
              <div className="skeleton-box skeleton-main-img shimmer" />
              <div className="skeleton-thumbs-grid">
                <div className="skeleton-box skeleton-thumb shimmer" />
                <div className="skeleton-box skeleton-thumb shimmer" />
                <div className="skeleton-box skeleton-thumb shimmer" />
              </div>
            </div>
            <div className="skeleton-detail-info">
              <div className="skeleton-box skeleton-tag shimmer" />
              <div className="skeleton-box skeleton-title-large shimmer" />
              <div className="skeleton-box skeleton-price-tag shimmer" />
              <div className="skeleton-box skeleton-text-line shimmer" />
              <div className="skeleton-box skeleton-text-line short shimmer" />
              <div className="skeleton-box skeleton-button-lg shimmer" />
            </div>
          </div>
        );

      case 'product':
      default:
        return (
          <div key={key} className={`skeleton-card skeleton-product-card ${className}`}>
            <div className="skeleton-box skeleton-product-image shimmer" />
            <div className="skeleton-product-content">
              <div className="skeleton-box skeleton-category-sm shimmer" />
              <div className="skeleton-box skeleton-title-md shimmer" />
              <div className="skeleton-product-footer">
                <div className="skeleton-box skeleton-price shimmer" />
                <div className="skeleton-box skeleton-action-btn shimmer" />
              </div>
            </div>
          </div>
        );
    }
  };

  if (count > 1) {
    return (
      <div className={`skeleton-grid skeleton-grid-${type}`}>
        {cards.map((_, i) => renderSkeleton(i))}
      </div>
    );
  }

  return renderSkeleton(0);
};

export default SkeletonCard;
