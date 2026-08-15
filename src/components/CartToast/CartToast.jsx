import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import './CartToast.css';

export const CartToast = ({ show, onClose, onViewCart, item }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show || !item) return null;
  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div className="cart-toast-root-wrapper">
      <div className="cart-toast-card">
        {/* Top Status & Close Row */}
        <div className="toast-top-header">
          <div className="toast-status-badge">
            <FiCheckCircle size={18} className="toast-success-icon" />
            <span className="toast-success-title">
              {currentLang === 'ar' ? 'تمت الإضافة للسلة بنجاح!' : 'Added to Cart!'}
            </span>
          </div>

          <button
            type="button"
            className="toast-close-icon"
            onClick={onClose}
            aria-label="Close Toast"
          >
            <FiX size={16} />
          </button>
        </div>

        {/* Product Details & Action Row */}
        <div className="toast-product-row">
          {item.image && (
            <img
              src={item.image}
              alt={item.name || 'Product'}
              className="toast-product-thumb"
            />
          )}

          <div className="toast-info-body">
            <p className="toast-product-name">{item.name}</p>
          </div>

          <button
            type="button"
            className="toast-view-cart-btn"
            onClick={() => {
              onClose();
              onViewCart();
            }}
          >
            {currentLang === 'ar' ? 'عرض السلة' : 'View Cart'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CartToast;
