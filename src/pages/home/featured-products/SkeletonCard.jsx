import React from 'react';
import './SkeletonCard.css';

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img-wrapper shimmer" />
      <div className="skeleton-content">
        <div className="skeleton-badge shimmer" />
        <div className="skeleton-title shimmer" />
        <div className="skeleton-meta">
          <div className="skeleton-price shimmer" />
          <div className="skeleton-rating shimmer" />
        </div>
        <div className="skeleton-button shimmer" />
      </div>
    </div>
  );
};

export default SkeletonCard;
