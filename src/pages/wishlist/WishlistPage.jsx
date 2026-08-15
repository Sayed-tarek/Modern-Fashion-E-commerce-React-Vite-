import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowRight, FiEye } from 'react-icons/fi';
import { useWishlist } from '../../context/WishlistContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import './WishlistPage.css';

export const WishlistPage = () => {
  const { i18n, t } = useTranslation(['common']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';
  const { wishlistItems, totalWishlistItems, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();

  const getLocalizedText = (field, fallback) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || fallback;
  };

  return (
    <div className="wishlist-page-wrapper">
      <Navbar />

      <main className="wishlist-main-content">
        {/* Page Banner Header */}
        <section className="wishlist-hero-section">
          <div className="wishlist-hero-container">
            <div className="wishlist-title-box">
              <span className="wishlist-badge">
                <FiHeart size={14} fill="currentColor" />
                <span>{currentLang === 'ar' ? 'المنتجات المفضلة' : 'SAVED FAVORITES'}</span>
              </span>
              <h1 className="wishlist-page-title">
                {currentLang === 'ar' ? 'قائمة مفضلاتك' : 'My Wishlist'}
              </h1>
              <p className="wishlist-page-subtitle">
                {currentLang === 'ar'
                  ? 'جميع المنتجات التي قمت بحفظها في مكان واحد. يمكنك نقلها لسلة التسوق في أي وقت.'
                  : 'Manage your saved footwear and fashion items. Move them to your cart whenever you are ready.'}
              </p>
            </div>

            {totalWishlistItems > 0 && (
              <div className="wishlist-hero-actions">
                <button type="button" className="btn-clear-wishlist-page" onClick={clearWishlist}>
                  <FiTrash2 size={16} />
                  <span>{currentLang === 'ar' ? 'إفراغ القائمة' : 'Clear Wishlist'}</span>
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Wishlist Items Content Grid */}
        <section className="wishlist-grid-section">
          <div className="wishlist-container">
            {wishlistItems.length === 0 ? (
              <div className="wishlist-page-empty">
                <div className="empty-page-icon">
                  <FiHeart size={54} />
                </div>
                <h2>{currentLang === 'ar' ? 'قائمة المفضلة فارغة حالياً' : 'Your wishlist is currently empty'}</h2>
                <p>
                  {currentLang === 'ar'
                    ? 'لم تقم بإضافة أي منتجات للمفضلة بعد. تصفح تشكيلاتنا المميزة واضغط على زر القلب لحفظ منتجاتك.'
                    : 'You haven’t added any items to your wishlist yet. Explore our collections and click the heart icon to save your favorites.'}
                </p>
                <Link to="/shop" className="btn-browse-catalog">
                  <span>{currentLang === 'ar' ? 'تصفح المتجر الآن' : 'Browse Catalog'}</span>
                  <FiArrowRight size={18} style={{ transform: currentLang === 'ar' ? 'rotate(180deg)' : 'none' }} />
                </Link>
              </div>
            ) : (
              <div className="wishlist-products-grid">
                {wishlistItems.map((product) => {
                  const title = getLocalizedText(product.title, 'Product Title');
                  const category = getLocalizedText(product.category, '');
                  const img = product.images?.[0] || product.image || '';

                  return (
                    <div key={product.id} className="wishlist-grid-card" data-aos="fade-up">
                      <div className="card-img-box">
                        <img src={img} alt={title} className="card-product-img" loading="lazy" />

                        <button
                          type="button"
                          className="card-remove-btn"
                          onClick={() => removeFromWishlist(product.id)}
                          aria-label="Remove from wishlist"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>

                      <div className="card-details-box">
                        {category && <span className="card-category">{category}</span>}
                        <h3 className="card-title" title={title}>{title}</h3>

                        <div className="card-price-row">
                          <span className="card-price">${product.price}</span>
                          {product.oldPrice && <span className="card-old-price">${product.oldPrice}</span>}
                        </div>

                        <div className="card-actions-row">
                          <button
                            type="button"
                            className="btn-add-to-cart-action"
                            onClick={() => moveToCart(product)}
                          >
                            <FiShoppingBag size={16} />
                            <span>{currentLang === 'ar' ? 'نقل للسلة' : 'Move to Cart'}</span>
                          </button>

                          <Link
                            to={`/product/${product.slug || product.id}`}
                            className="btn-view-details-action"
                            aria-label="View product details"
                          >
                            <FiEye size={16} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
