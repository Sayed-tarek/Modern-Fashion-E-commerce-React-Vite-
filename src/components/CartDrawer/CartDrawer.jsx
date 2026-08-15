import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from 'react-use-cart';
import { FiX, FiShoppingBag, FiTrash2, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi';
import './CartDrawer.css';

export const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation(['common', 'navbar']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const {
    isEmpty,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
  } = useCart();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const freeShippingThreshold = 100;
  const progressPercent = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - cartTotal, 0);

  const handleGoToCart = () => {
    onClose();
    navigate('/cart');
  };

  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div className="cart-drawer-root-wrapper">
      {/* Overlay Backdrop */}
      <div
        className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Drawer Slide-in Panel */}
      <aside
        className={`cart-drawer-panel ${isOpen ? 'open' : ''}`}
        aria-label="Shopping Cart Drawer"
      >
        {/* Drawer Header */}
        <div className="drawer-cart-header">
          <div className="drawer-cart-title">
            <FiShoppingBag size={20} color="var(--primary)" />
            <span>{currentLang === 'ar' ? 'سلة التسوق' : 'Shopping Cart'}</span>
            <span className="cart-items-count-tag">{totalItems}</span>
          </div>

          <button
            type="button"
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        {!isEmpty && (
          <div className="free-shipping-bar-box">
            <span className="free-shipping-text">
              {remainingForFreeShipping === 0
                ? (currentLang === 'ar' ? 'تهانينا! حصلت على شحن مجاني 🎉' : 'Congrats! You unlocked Free Shipping 🎉')
                : (currentLang === 'ar'
                    ? `أضف $${remainingForFreeShipping.toFixed(2)} للحصول على شحن مجاني`
                    : `Add $${remainingForFreeShipping.toFixed(2)} more for Free Shipping`)}
            </span>
            <div className="free-shipping-track">
              <div
                className="free-shipping-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Cart Body / Items */}
        {isEmpty ? (
          <div className="empty-cart-drawer">
            <FiShoppingBag className="empty-cart-icon" />
            <h3>{currentLang === 'ar' ? 'سلتك فارغة حالياً' : 'Your cart is empty'}</h3>
            <p>
              {currentLang === 'ar'
                ? 'استكشف تشكيلة متجرنا المميزة وأضف أفضل المنتجات لسلتك'
                : 'Browse our catalog and discover our premium shoes and apparel.'}
            </p>
            <button
              type="button"
              className="shop-now-btn"
              onClick={() => {
                onClose();
                navigate('/shop');
              }}
            >
              {currentLang === 'ar' ? 'تصفح المتجر الان' : 'Shop Now'}
            </button>
          </div>
        ) : (
          <div className="drawer-cart-body">
            {items.map((item) => {
              const itemTitle = typeof item.name === 'object'
                ? (item.name[currentLang] || item.name.en || '')
                : (item.title ? (typeof item.title === 'object' ? item.title[currentLang] || item.title.en : item.title) : item.name);

              const thumbImg = item.image || (item.images && item.images[0]) || '';

              return (
                <div key={item.id} className="cart-drawer-item">
                  {thumbImg && (
                    <img
                      src={thumbImg}
                      alt={itemTitle}
                      className="cart-item-thumb"
                    />
                  )}

                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{itemTitle}</h4>

                    {(item.color || item.size) && (
                      <div className="cart-item-meta">
                        {item.color && <span>{item.color}</span>}
                        {item.color && item.size && <span>•</span>}
                        {item.size && <span>EU {item.size}</span>}
                      </div>
                    )}

                    <span className="cart-item-price">${item.price}</span>

                    <div className="cart-item-qty-row">
                      <div className="qty-mini-box">
                        <button
                          type="button"
                          className="qty-mini-btn"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="qty-mini-val">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-mini-btn"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        title="Remove item"
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

        {/* Drawer Footer */}
        {!isEmpty && (
          <div className="drawer-cart-footer">
            <div className="footer-subtotal-row">
              <span>{currentLang === 'ar' ? 'المجموع الجزئي:' : 'Subtotal:'}</span>
              <span className="subtotal-amount">${cartTotal.toFixed(2)}</span>
            </div>

            <div className="drawer-actions-btns">
              <button
                type="button"
                className="btn-view-cart"
                onClick={handleGoToCart}
              >
                {currentLang === 'ar' ? 'عرض صفحة السلة الكاملة' : 'View Shopping Cart'}
              </button>

              <button
                type="button"
                className="btn-drawer-checkout"
                onClick={() => {
                  onClose();
                  alert(currentLang === 'ar' ? 'الانتقال لصفحة إتمام الدفع الشامل' : 'Proceeding to Secure Checkout');
                }}
              >
                <span>{currentLang === 'ar' ? 'إتمام الشراء والانتقال للدفع' : 'Proceed To Checkout'}</span>
                <FiArrowRight size={16} style={{ transform: currentLang === 'ar' ? 'rotate(180deg)' : 'none' }} />
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>,
    document.body
  );
};

export default CartDrawer;
