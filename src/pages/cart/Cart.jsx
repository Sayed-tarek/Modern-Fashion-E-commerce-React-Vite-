import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from 'react-use-cart';
import {
  FiShoppingBag,
  FiTrash2,
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiTag,
  FiCheckCircle,
  FiTruck,
} from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './Cart.css';

export const Cart = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation(['common', 'navbar']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const {
    isEmpty,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const freeShippingThreshold = 100;
  const shippingFee = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 10;
  const discountAmount = couponApplied ? cartTotal * 0.1 : 0;
  const grandTotal = cartTotal + shippingFee - discountAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  return (
    <div className="cart-page-wrapper">
      <Navbar />

      <main className="cart-main-container">
        {isEmpty ? (
          <div className="cart-empty-page">
            <FiShoppingBag className="empty-cart-page-icon" />
            <h2>{currentLang === 'ar' ? 'سلة التسوق فارغة' : 'Your Shopping Cart is Empty'}</h2>
            <p>
              {currentLang === 'ar'
                ? 'يبدو أنك لم تقم بإضافة أي منتجات للسلة بعد. تصفح تشكيلتنا المميزة وابدأ التسوق الآن!'
                : 'Looks like you have not added anything to your cart yet. Explore our store to find your favorite products!'}
            </p>
            <Link to="/shop" className="empty-cart-page-btn">
              {currentLang === 'ar' ? 'استكشف المنتجات الآن' : 'Start Shopping'}
            </Link>
          </div>
        ) : (
          <>
            {/* Title & Clear Cart Header */}
            <div className="cart-title-header">
              <h1 className="cart-page-title">
                {currentLang === 'ar' ? 'سلة التسوق' : 'Shopping Cart'} ({totalItems})
              </h1>

              <button
                type="button"
                className="clear-cart-btn"
                onClick={() => {
                  if (window.confirm(currentLang === 'ar' ? 'هل أنت تأكد من إفراغ السلة بالكامل؟' : 'Are you sure you want to clear your cart?')) {
                    emptyCart();
                  }
                }}
              >
                <FiTrash2 size={15} />
                <span>{currentLang === 'ar' ? 'إفراغ السلة' : 'Clear Cart'}</span>
              </button>
            </div>

            {/* 2-Column Grid */}
            <div className="cart-layout-grid">
              {/* Left Column: Items List & Coupon */}
              <div className="cart-items-col">
                {items.map((item) => {
                  const itemTitle = typeof item.name === 'object'
                    ? (item.name[currentLang] || item.name.en || '')
                    : (item.title ? (typeof item.title === 'object' ? item.title[currentLang] || item.title.en : item.title) : item.name);

                  const thumbImg = item.image || (item.images && item.images[0]) || '';
                  const itemSubtotal = item.price * item.quantity;

                  return (
                    <div key={item.id} className="cart-page-item-card">
                      {/* Top Info Row */}
                      <div className="cart-card-main-info">
                        {thumbImg && (
                          <img
                            src={thumbImg}
                            alt={itemTitle}
                            className="cart-card-thumb"
                          />
                        )}

                        <div className="cart-card-info">
                          <h3 className="cart-card-title">{itemTitle}</h3>
                          {(item.color || item.size) && (
                            <div className="cart-card-meta">
                              {item.color && <span>{currentLang === 'ar' ? 'اللون:' : 'Color:'} {item.color}</span>}
                              {item.color && item.size && <span>•</span>}
                              {item.size && <span>{currentLang === 'ar' ? 'المقاس:' : 'Size:'} EU {item.size}</span>}
                            </div>
                          )}
                          <span className="cart-card-unit-price">${item.price}</span>
                        </div>

                        <button
                          type="button"
                          className="cart-card-remove-btn desktop-remove-btn"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          title="Remove item"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>

                      {/* Bottom Controls Row */}
                      <div className="cart-card-controls-row">
                        {/* Quantity Controls */}
                        <div className="cart-card-qty">
                          <div className="qty-mini-box">
                            <button
                              type="button"
                              className="qty-mini-btn"
                              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease"
                            >
                              <FiMinus size={13} />
                            </button>
                            <span className="qty-mini-val">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="qty-mini-btn"
                              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase"
                            >
                              <FiPlus size={13} />
                            </button>
                          </div>
                        </div>

                        {/* Subtotal & Mobile Remove */}
                        <div className="cart-card-subtotal-box">
                          <span className="cart-card-subtotal-label">{currentLang === 'ar' ? 'الإجمالي:' : 'Subtotal:'}</span>
                          <span className="cart-card-subtotal-price">${itemSubtotal.toFixed(2)}</span>
                          <button
                            type="button"
                            className="cart-card-remove-btn mobile-remove-btn"
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

                {/* Coupon Promo Box */}
                <form className="cart-coupon-card" onSubmit={handleApplyCoupon}>
                  <FiTag size={18} color="var(--primary)" />
                  <input
                    type="text"
                    placeholder={currentLang === 'ar' ? 'أدخل كود الخصم...' : 'Enter promo code...'}
                    className="coupon-input-field"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button type="submit" className="apply-coupon-btn">
                    {currentLang === 'ar' ? 'تطبيق الكوبون' : 'Apply Code'}
                  </button>
                </form>
              </div>

              {/* Right Column: Order Summary Card */}
              <div className="cart-summary-col">
                <div className="summary-card">
                  <h3 className="summary-card-title">
                    {currentLang === 'ar' ? 'ملخص الطلب' : 'Order Summary'}
                  </h3>

                  <div className="summary-row">
                    <span>{currentLang === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                    <span style={{ fontWeight: '700' }}>${cartTotal.toFixed(2)}</span>
                  </div>

                  <div className="summary-row">
                    <span>{currentLang === 'ar' ? 'مصاريف الشحن:' : 'Estimated Shipping:'}</span>
                    <span style={{ fontWeight: '700', color: shippingFee === 0 ? 'var(--success)' : 'inherit' }}>
                      {shippingFee === 0
                        ? (currentLang === 'ar' ? 'مجاني' : 'FREE')
                        : `$${shippingFee.toFixed(2)}`}
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="summary-row" style={{ color: 'var(--success)' }}>
                      <span>{currentLang === 'ar' ? 'خصم الكوبون (10%):' : 'Promo Discount (10%):'}</span>
                      <span style={{ fontWeight: '700' }}>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="summary-row total-row">
                    <span>{currentLang === 'ar' ? 'الإجمالي الكلي:' : 'Total Amount:'}</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>

                  <button
                    type="button"
                    className="btn-proceed-checkout"
                    onClick={() => alert(currentLang === 'ar' ? 'الانتقال لصفحة الدفع والتسليم الآمن' : 'Proceeding to Checkout')}
                  >
                    <span>{currentLang === 'ar' ? 'الانتقال لإتمام الدفع' : 'Proceed to Checkout'}</span>
                    <FiArrowRight size={18} style={{ transform: currentLang === 'ar' ? 'rotate(180deg)' : 'none' }} />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="trust-badges-grid" style={{ paddingTop: '10px', borderTop: 'none' }}>
                  <div className="trust-badge-item">
                    <span className="trust-icon"><FiCheckCircle size={16} /></span>
                    <span>{currentLang === 'ar' ? 'دفع آمن 100%' : '100% Secure Checkout'}</span>
                  </div>
                  <div className="trust-badge-item">
                    <span className="trust-icon"><FiTruck size={16} /></span>
                    <span>{currentLang === 'ar' ? 'شحن سريع وموثوق' : 'Fast Delivery Service'}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
