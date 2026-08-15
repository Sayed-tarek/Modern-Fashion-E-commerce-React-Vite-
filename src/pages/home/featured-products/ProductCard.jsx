import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiHeart, FiEye } from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa6';
import './ProductCard.css';

export const ProductCard = memo(({ product, index = 0 }) => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation(['home', 'common']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const [isWishlisted, setIsWishlisted] = useState(product.wishlist || false);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted((prev) => !prev);
  };

  const handleCardClick = () => {
    const slug = product.slug || product.id || 'urban-classic-sneakers';
    navigate(`/product/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getLocalizedText = (field, fallback) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || fallback;
  };

  const title = getLocalizedText(product.title, 'Product Title');
  const category = getLocalizedText(product.category, '');
  const primaryImg = product.images && product.images[0] ? product.images[0] : '';
  const hoverImg = product.images && product.images[1] ? product.images[1] : primaryImg;

  const delay = (index % 4) * 100;

  return (
    <div
      className="product-card"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Image Container */}
      <div className="card-img-wrapper">
        <img
          src={primaryImg}
          alt={title}
          className="product-img primary-img"
          loading="lazy"
          decoding="async"
        />
        {hoverImg && (
          <img
            src={hoverImg}
            alt={`${title} - view 2`}
            className="product-img hover-img"
            loading="lazy"
            decoding="async"
          />
        )}

        {/* Badges */}
        <div className="card-badges">
          {product.discount > 0 && (
            <span className="badge-discount">-{product.discount}%</span>
          )}
          {product.isNew && !product.discount && (
            <span className="badge-new">{t('common:general.new', 'NEW')}</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={toggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? <FaHeart color="#DC6860" size={15} /> : <FiHeart size={15} />}
        </button>
      </div>

      {/* Card Details */}
      <div className="card-body">
        {category && (
          <span className="product-category">{category}</span>
        )}
        <h3 className="product-title" title={title}>{title}</h3>

        {/* Price & Rating Row */}
        <div className="product-price-rating-row">
          <div className="product-prices">
            <span className="current-price">${product.price}</span>
            {product.oldPrice && product.oldPrice > product.price && (
              <span className="old-price">${product.oldPrice}</span>
            )}
          </div>

          {product.rating && (
            <div className="product-rating">
              <FaStar size={12} className="star-icon" />
              <span className="rating-value">{product.rating}</span>
            </div>
          )}
        </div>

        {/* View Details Button */}
        <button
          type="button"
          className="view-details-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          <FiEye size={15} />
          <span>{t('common:buttons.viewDetails', 'View Details')}</span>
        </button>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
