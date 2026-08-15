import React from 'react';
import './ProductSkeleton.css';

export const ProductSkeleton = () => {
  return (
    <div className="product-skeleton-container">
      <div className="product-skeleton-grid">
        <div className="skeleton-gallery-col">
          <div className="skeleton-gallery-box shimmer" />
          <div className="skeleton-thumbs-row">
            <div className="skeleton-thumb-box shimmer" />
            <div className="skeleton-thumb-box shimmer" />
            <div className="skeleton-thumb-box shimmer" />
          </div>
        </div>

        <div className="skeleton-info-col">
          <div className="skeleton-badge shimmer" />
          <div className="skeleton-heading shimmer" />
          <div className="skeleton-price shimmer" />
          <div className="skeleton-desc shimmer" />
          <div className="skeleton-selector shimmer" />
          <div className="skeleton-selector shimmer" />
          <div className="skeleton-btn-row">
            <div className="skeleton-btn shimmer" />
            <div className="skeleton-btn shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
