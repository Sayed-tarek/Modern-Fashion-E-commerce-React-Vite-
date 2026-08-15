import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMaximize2, FiX } from 'react-icons/fi';
import './ProductGallery.css';

export const ProductGallery = ({ images = [], title = 'Product', discount = 0, isNew = false }) => {
  const { t } = useTranslation('common');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeImage = images[selectedIndex] || images[0] || '';

  return (
    <div className="product-gallery-wrapper">
      {/* Main Image Box */}
      <div
        className="main-image-box"
        onClick={() => setIsLightboxOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="View large product image"
      >
        <img
          src={activeImage}
          alt={`${title} - view ${selectedIndex + 1}`}
          className="main-product-img"
        />

        {/* Badges Overlay */}
        <div className="gallery-badges">
          {discount > 0 && (
            <span className="badge-discount-lg">-{discount}%</span>
          )}
          {isNew && !discount && (
            <span className="badge-new-lg">{t('general.new', 'NEW')}</span>
          )}
        </div>

        {/* Actions Overlay */}
        <div className="gallery-actions">
          <button
            type="button"
            className="gallery-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            aria-label="Fullscreen view"
          >
            <FiMaximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="thumbnails-row">
          {images.map((imgUrl, index) => (
            <button
              key={`thumb-${index}`}
              type="button"
              className={`thumbnail-btn ${selectedIndex === index ? 'active' : ''}`}
              onClick={() => setSelectedIndex(index)}
              aria-label={`View thumbnail ${index + 1}`}
            >
              <img src={imgUrl} alt={`${title} thumb ${index + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox-modal" onClick={() => setIsLightboxOpen(false)}>
          <button
            type="button"
            className="lightbox-close-btn"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close modal"
          >
            <FiX />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage} alt={title} className="lightbox-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
