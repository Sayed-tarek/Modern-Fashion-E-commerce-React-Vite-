import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './ProductGallery.css';

export const ProductGallery = ({ images = [], title = 'Product', discount = 0, isNew = false }) => {
  const { t } = useTranslation('common');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeImage = images[selectedIndex] || images[0] || '';

  return (
    <div className="product-gallery-wrapper">
      {/* Main Image Box */}
      <div className="main-image-box">
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
    </div>
  );
};

export default ProductGallery;
