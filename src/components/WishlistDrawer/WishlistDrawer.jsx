import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiX, FiTrash2, FiShoppingBag, FiHeart, FiArrowRight } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';
import './WishlistDrawer.css';

export const WishlistDrawer = ({ isOpen, onClose }) => {
  const { i18n, t } = useTranslation(['common']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';
  const { wishlistItems, totalWishlistItems, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();

  if (!isOpen) return null;

  const getLocalizedText = (field, fallback) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || fallback;
  };

  return (
    <div className="wishlist-drawer-overlay" onClick={onClose}>
      <div
        className="wishlist-drawer-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Wishlist Drawer"
      >
        {/* Header */}
        <div className="wishlist-drawer-header">
          <div className="wishlist-header-title">
            <FiHeart className="header-heart-icon" size={20} />
            <h2>{currentLang === 'ar' ? 'المفضلة' : 'My Wishlist'}</h2>
            <span className="wishlist-count-badge">{totalWishlistItems}</span>
          </div>

          <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Close wishlist">
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="wishlist-drawer-body">
          {wishlistItems.length === 0 ? (
            <div className="wishlist-empty-state">
              <div className="empty-heart-icon">
                <FiHeart size={48} />
              </div>
              <h3>{currentLang === 'ar' ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}</h3>
              <p>
                {currentLang === 'ar'
                  ? 'احفظ منتجاتك المفضلة هنا للعودة إليها وتصفحها في أي وقت'
                  : 'Save items you love here to easily find them later and add to your bag.'}
              </p>
              <Link to="/shop" className="btn-explore-shop" onClick={onClose}>
                <span>{currentLang === 'ar' ? 'استكشف المتجر' : 'Explore Shop'}</span>
                <FiArrowRight size={16} style={{ transform: currentLang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </Link>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlistItems.map((product) => {
                const title = getLocalizedText(product.title, 'Product Title');
                const category = getLocalizedText(product.category, '');
                const img = product.images?.[0] || product.image || '';

                return (
                  <div key={product.id} className="wishlist-item-card">
                    <Link to={`/product/${product.slug || product.id}`} onClick={onClose} className="item-img-link">
                      <img src={img} alt={title} className="wishlist-item-img" />
                    </Link>

                    <div className="wishlist-item-info">
                      {category && <span className="item-category">{category}</span>}
                      <Link to={`/product/${product.slug || product.id}`} onClick={onClose} className="item-title-link">
                        <h4 className="item-title">{title}</h4>
                      </Link>
                      <div className="item-price">${product.price}</div>

                      <div className="item-actions">
                        <button
                          type="button"
                          className="btn-move-to-cart"
                          onClick={() => moveToCart(product)}
                        >
                          <FiShoppingBag size={14} />
                          <span>{currentLang === 'ar' ? 'نقل إلى السلة' : 'Move to Cart'}</span>
                        </button>

                        <button
                          type="button"
                          className="btn-remove-item"
                          onClick={() => removeFromWishlist(product.id)}
                          aria-label="Remove item"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="wishlist-drawer-footer">
            <button type="button" className="btn-clear-all" onClick={clearWishlist}>
              <FiTrash2 size={15} />
              <span>{currentLang === 'ar' ? 'إفراغ المفضلة' : 'Clear All'}</span>
            </button>

            <Link to="/wishlist" className="btn-view-full-wishlist" onClick={onClose}>
              <span>{currentLang === 'ar' ? 'عرض الصفحة الكاملة' : 'View Full Wishlist'}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
