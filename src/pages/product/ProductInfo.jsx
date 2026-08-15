import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from 'react-use-cart';
import {
  FiShoppingBag,
  FiHeart,
  FiTruck,
  FiShield,
  FiRotateCcw,
  FiCheckCircle,
  FiCalendar,
} from 'react-icons/fi';
import { FaHeart, FaStar } from 'react-icons/fa6';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import CartDrawer from '../../components/CartDrawer/CartDrawer';
import CartToast from '../../components/CartToast/CartToast';
import { useWishlist } from '../../context/WishlistContext';
import './ProductInfo.css';

export const ProductInfo = ({ product }) => {
  const { i18n, t } = useTranslation(['home', 'common']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState(null);

  const isWishlisted = isInWishlist(product.id);

  const getLocalizedText = (field, fallback) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || fallback;
  };

  const title = getLocalizedText(product.title, 'Product Title');
  const shortDesc = getLocalizedText(product.shortDescription, product.description);
  const categoryName = getLocalizedText(product.category, 'Apparel');

  const stock = product.stock || 0;
  const isLowStock = stock > 0 && stock <= 10;

  const handleAddToCart = () => {
    const cartItemId = `${product.id || product.slug}-${selectedColor}-${selectedSize}`;
    const addedObj = {
      id: cartItemId,
      productId: product.id,
      slug: product.slug,
      name: title,
      price: product.price,
      image: product.images ? product.images[0] : '',
      color: selectedColor,
      size: selectedSize,
    };

    addItem(addedObj, quantity);

    // DO NOT open CartDrawer; instead show Toast Notification!
    setLastAddedItem(addedObj);
    setShowToast(true);
  };

  // Calculate estimated delivery dates (3 to 5 days from now)
  const deliveryStart = new Date();
  deliveryStart.setDate(deliveryStart.getDate() + 3);
  const deliveryEnd = new Date();
  deliveryEnd.setDate(deliveryEnd.getDate() + 5);

  const options = { month: 'short', day: 'numeric' };
  const dateStr = `${deliveryStart.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', options)} - ${deliveryEnd.toLocaleDateString(currentLang === 'ar' ? 'ar-EG' : 'en-US', options)}`;

  return (
    <>
      <div className="product-info-wrapper">
        {/* Brand & Stock Status Header */}
        <div className="info-header">
          <span className="product-brand-tag">{product.brand || 'Snaabble'} • {categoryName}</span>
          {stock > 0 ? (
            <span className={`stock-status-badge ${isLowStock ? 'stock-low' : 'stock-in'}`}>
              {isLowStock
                ? t('common:general.lowStock', `Only ${stock} left!`)
                : t('common:general.inStock', 'In Stock')}
            </span>
          ) : (
            <span className="stock-status-badge stock-low">
              {t('common:general.outOfStock', 'Out Of Stock')}
            </span>
          )}
        </div>

        {/* Product Title */}
        <h1 className="info-title">{title}</h1>

        {/* Rating & SKU Row */}
        {product.rating && (
          <div className="info-rating-row">
            <div className="info-stars">
              <FaStar size={14} />
              <span className="info-rating-num">{product.rating}</span>
            </div>
            <span className="info-reviews-count">
              ({product.reviews || 0} {currentLang === 'ar' ? 'تقييم' : 'reviews'})
            </span>
            {product.sku && <span className="info-sku">SKU: {product.sku}</span>}
          </div>
        )}

        {/* Price Box */}
        <div className="info-price-box">
          <span className="info-current-price">${product.price}</span>
          {product.oldPrice && product.oldPrice > product.price && (
            <>
              <span className="info-old-price">${product.oldPrice}</span>
              <span className="info-save-badge">
                {currentLang === 'ar'
                  ? `وفر $${product.oldPrice - product.price} (خصم ${product.discount}%)`
                  : `Save $${product.oldPrice - product.price} (${product.discount}% OFF)`}
              </span>
            </>
          )}
        </div>

        {/* Short Description */}
        {shortDesc && <p className="info-description">{shortDesc}</p>}

        {/* Color Selector */}
        {product.colors && product.colors.length > 0 && (
          <ColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
          />
        )}

        {/* Size Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <SizeSelector
            sizes={product.sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />
        )}

        {/* Quantity & Actions Grid */}
        <div className="actions-section">
          <div className="quantity-row">
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((q) => Math.min(q + 1, stock))}
              onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
              maxStock={stock}
            />
          </div>

          <div className="main-btn-row">
            <button
              type="button"
              className="btn-add-cart"
              onClick={handleAddToCart}
            >
              <FiShoppingBag size={20} />
              <span>{t('common:buttons.addToCart', 'Add To Cart')}</span>
            </button>

            <button
              type="button"
              className={`icon-action-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Wishlist"
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isWishlisted ? <FaHeart color="#DC6860" size={20} /> : <FiHeart size={20} />}
            </button>
          </div>
        </div>

        {/* Delivery Estimate */}
        <div className="delivery-estimate-box">
          <FiCalendar size={18} color="var(--primary)" />
          <span>
            {currentLang === 'ar' ? 'موعد التوصيل المتوقع:' : 'Estimated Delivery:'}{' '}
            <strong>{dateStr}</strong>
          </span>
        </div>

        {/* Trust Badges Grid */}
        <div className="trust-badges-grid">
          <div className="trust-badge-item">
            <span className="trust-icon"><FiCheckCircle size={16} /></span>
            <span>{currentLang === 'ar' ? 'منتج أصلي 100%' : '100% Authentic Product'}</span>
          </div>
          <div className="trust-badge-item">
            <span className="trust-icon"><FiTruck size={16} /></span>
            <span>{currentLang === 'ar' ? 'شحن سريع مجاني' : 'Free Express Shipping'}</span>
          </div>
          <div className="trust-badge-item">
            <span className="trust-icon"><FiRotateCcw size={16} /></span>
            <span>{currentLang === 'ar' ? 'استرجاع خلال 30 يوم' : '30-Day Easy Returns'}</span>
          </div>
          <div className="trust-badge-item">
            <span className="trust-icon"><FiShield size={16} /></span>
            <span>{currentLang === 'ar' ? 'دفع آمن 100%' : 'Secure Checkout Guarantee'}</span>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      <CartToast
        show={showToast}
        item={lastAddedItem}
        onClose={() => setShowToast(false)}
        onViewCart={() => setIsCartDrawerOpen(true)}
      />

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />
    </>
  );
};

export default ProductInfo;
