import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaStar } from 'react-icons/fa6';
import './ProductTabs.css';

export const ProductTabs = ({ product }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const [activeTab, setActiveTab] = useState('description');

  const getLocalizedText = (field, fallback) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || fallback;
  };

  const description = getLocalizedText(
    product.description,
    currentLang === 'ar' ? 'لا يوجد وصف تفصيلي متوفر حالياً.' : 'No detailed description available.'
  );
  const material = getLocalizedText(
    product.material,
    currentLang === 'ar' ? 'خامة عالية الجودة' : 'Premium Synthetic'
  );
  const categoryName = getLocalizedText(
    product.category,
    currentLang === 'ar' ? 'الأحذية' : 'Footwear'
  );

  return (
    <section className="product-tabs-section" aria-label="Product Information Tabs">
      {/* Tabs Header Bar */}
      <div className="tabs-header-bar" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'description'}
          className={`tab-nav-btn ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          {currentLang === 'ar' ? 'الوصف' : 'Description'}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'specifications'}
          className={`tab-nav-btn ${activeTab === 'specifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('specifications')}
        >
          {currentLang === 'ar' ? 'المواصفات' : 'Specifications'}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'reviews'}
          className={`tab-nav-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          {currentLang === 'ar'
            ? `التقييمات (${product.reviews || 0})`
            : `Reviews (${product.reviews || 0})`}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'shipping'}
          className={`tab-nav-btn ${activeTab === 'shipping' ? 'active' : ''}`}
          onClick={() => setActiveTab('shipping')}
        >
          {currentLang === 'ar' ? 'الشحن والاسترجاع' : 'Shipping & Returns'}
        </button>
      </div>

      {/* Tab Panels */}
      <div className="tab-content-panel">
        {activeTab === 'description' && (
          <div className="tab-desc-text">
            <p>{description}</p>
            <p>
              {currentLang === 'ar'
                ? 'مصمم للأداء العالي، المتانة، والأناقة اليومية. يتميز بتبطين فوم مرن، وقماش شبكي عالي التهوية، ونعل مطاطي مانع للانزلاق.'
                : 'Designed for performance, durability, and daily street style. Features responsive foam cushioning, breathable mesh ventilation, and non-slip traction rubber outsoles.'}
            </p>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">{currentLang === 'ar' ? 'رمز المنتج (SKU)' : 'SKU'}</span>
              <span className="spec-val">{product.sku || 'SNB-0001'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">{currentLang === 'ar' ? 'العلامة التجارية' : 'Brand'}</span>
              <span className="spec-val">{product.brand || 'Snaabble'}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">{currentLang === 'ar' ? 'الفئة' : 'Category'}</span>
              <span className="spec-val">{categoryName}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">{currentLang === 'ar' ? 'الجنس' : 'Gender'}</span>
              <span className="spec-val">
                {product.gender === 'Unisex'
                  ? (currentLang === 'ar' ? 'للجنسين' : 'Unisex')
                  : product.gender === 'Men'
                  ? (currentLang === 'ar' ? 'للرجال' : 'Men')
                  : (currentLang === 'ar' ? 'للنساء' : 'Women')}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">{currentLang === 'ar' ? 'الخامة' : 'Material'}</span>
              <span className="spec-val">{material}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">{currentLang === 'ar' ? 'المخزون المتاح' : 'In Stock'}</span>
              <span className="spec-val">
                {product.stock || 0} {currentLang === 'ar' ? 'قطعة' : 'units'}
              </span>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="reviews-tab-box">
            <div className="review-summary-card">
              <span className="summary-score">{product.rating || 4.5}</span>
              <div>
                <div style={{ display: 'flex', gap: '4px', color: 'var(--accent)', marginBottom: '4px' }}>
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
                <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                  {currentLang === 'ar'
                    ? `بناءً على ${product.reviews || 342} تقييم معتمد من العملاء`
                    : `Based on ${product.reviews || 342} verified customer reviews`}
                </span>
              </div>
            </div>

            <div className="review-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="review-author">{currentLang === 'ar' ? 'ماركوس فانس' : 'Marcus Vance'}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {currentLang === 'ar' ? 'مشتري معتمد' : 'Verified Buyer'}
                </span>
              </div>
              <div style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>★★★★★</div>
              <p className="review-text">
                {currentLang === 'ar'
                  ? 'مريح جداً للمشي الطويل والجري. المقاس ممتاز والتبطين عالي الجودة.'
                  : 'Super comfortable for long walks and running. The fit is true to size and the cushioning is top notch.'}
              </p>
            </div>

            <div className="review-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="review-author">{currentLang === 'ar' ? 'سارة جينكينز' : 'Sarah Jenkins'}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {currentLang === 'ar' ? 'مشتري معتمد' : 'Verified Buyer'}
                </span>
              </div>
              <div style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>★★★★★</div>
              <p className="review-text">
                {currentLang === 'ar'
                  ? 'خامات ممتازة وتصميم عصري أنيق. الشحن كان سريعاً خلال يومين فقط!'
                  : 'Great quality materials and stylish design. Delivery was super fast within 2 days!'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="tab-desc-text">
            <h4>{currentLang === 'ar' ? 'شحن سريع ومجاني لجميع الطلبات' : 'Free Worldwide Express Shipping'}</h4>
            <p>
              {currentLang === 'ar'
                ? 'نوفر شحن سريع مجاني لكافة الطلبات فوق 100 دولار. يتم تجهيز وشحن الطلب خلال 24 ساعة من إتمامه.'
                : 'We offer free standard shipping on all orders over $100. Orders are dispatched within 24 hours of placement.'}
            </p>
            <h4>{currentLang === 'ar' ? 'ضمان استرجاع الأموال خلال 30 يوماً' : '30-Day Money-Back Guarantee & Easy Returns'}</h4>
            <p>
              {currentLang === 'ar'
                ? 'إذا لم تكن راضياً بنسبة 100% عن مشترياتك، يمكنك إرجاع المنتج خلال 30 يوماً واسترداد قيمته كاملاً.'
                : 'If you are not 100% satisfied with your purchase, you can return your item within 30 days of delivery for a full refund or free exchange.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductTabs;
