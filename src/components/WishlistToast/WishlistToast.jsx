import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiHeart, FiCheckCircle, FiX, FiShoppingBag } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';
import './WishlistToast.css';

export const WishlistToast = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';
  const { toastNotification, hideToast } = useWishlist();

  if (!toastNotification.show) return null;

  const { type, product } = toastNotification;
  const img = product?.images?.[0] || product?.image || '';
  const title = typeof product?.title === 'string' ? product.title : product?.title?.en || 'Item';

  const getMessage = () => {
    if (type === 'add') {
      return currentLang === 'ar' ? 'تمت الإضافة للمفضلة' : 'Added to Wishlist';
    }
    if (type === 'remove') {
      return currentLang === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from Wishlist';
    }
    if (type === 'move') {
      return currentLang === 'ar' ? 'تم النقل إلى سلة التسوق' : 'Moved to Shopping Cart';
    }
    return toastNotification.message;
  };

  return (
    <div className={`wishlist-toast-container ${type}`} role="alert">
      <div className="toast-icon-box">
        {type === 'move' ? (
          <FiShoppingBag size={18} color="#ffffff" />
        ) : type === 'add' ? (
          <FiHeart size={18} color="#ffffff" fill="#ffffff" />
        ) : (
          <FiCheckCircle size={18} color="#ffffff" />
        )}
      </div>

      {img && <img src={img} alt={title} className="toast-thumb-img" />}

      <div className="toast-body-text">
        <span className="toast-message-title">{getMessage()}</span>
        {title && <span className="toast-product-name">{title}</span>}
      </div>

      <button type="button" className="toast-dismiss-btn" onClick={hideToast} aria-label="Close notification">
        <FiX size={16} />
      </button>
    </div>
  );
};

export default WishlistToast;
