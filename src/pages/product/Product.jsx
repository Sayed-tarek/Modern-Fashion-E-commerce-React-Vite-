import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import RelatedProducts from './RelatedProducts';
import ProductSkeleton from './ProductSkeleton';
import { fetchCachedJson } from '../../utils/apiCache';
import './Product.css';

export const Product = () => {
  const { slug } = useParams();
  const { i18n, t } = useTranslation(['home', 'common']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products using cached API helper
  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchCachedJson('/js/Products.json');
        if (isMounted) {
          setAllProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch Products.json:', error);
        try {
          const fallbackData = await fetchCachedJson('/js/just-landed.json');
          if (isMounted) {
            setAllProducts(fallbackData);
            setLoading(false);
          }
        } catch (fallbackErr) {
          console.error('Fallback fetch failed:', fallbackErr);
          if (isMounted) setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  // Find product matching current slug
  const product = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return null;
    if (!slug) return allProducts[0];
    return (
      allProducts.find((p) => p.slug === slug || String(p.id) === slug) ||
      allProducts[0]
    );
  }, [allProducts, slug]);

  const getLocalizedText = useCallback(
    (field, fallback) => {
      if (!field) return fallback;
      if (typeof field === 'string') return field;
      return field[currentLang] || field.en || fallback;
    },
    [currentLang]
  );

  const title = getLocalizedText(product?.title, currentLang === 'ar' ? 'تفاصيل المنتج' : 'Product Details');
  const categoryName = getLocalizedText(product?.category, currentLang === 'ar' ? 'المتجر' : 'Shop');

  if (loading) {
    return (
      <div className="product-page-wrapper">
        <Navbar />
        <ProductSkeleton />
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page-wrapper">
        <Navbar />
        <div className="product-not-found">
          <h2>{currentLang === 'ar' ? 'المنتج غير موجود' : 'Product Not Found'}</h2>
          <p>{currentLang === 'ar' ? 'المنتج الذي تبحث عنه غير متوفر حالياً.' : 'The product you are looking for does not exist.'}</p>
          <Link to="/" className="not-found-btn">{currentLang === 'ar' ? 'العودة للرئيسية' : 'Return to Home'}</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="product-page-wrapper">
      {/* Fixed Navbar */}
      <Navbar />

      <main className="product-main-container">
        {/* Breadcrumb Bar */}
        <nav className="breadcrumb-bar" aria-label="Breadcrumb" data-aos="fade-down">
          <Link to="/" className="breadcrumb-link">
            {currentLang === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span className="breadcrumb-separator">
            {currentLang === 'ar' ? <FiChevronLeft size={12} /> : <FiChevronRight size={12} />}
          </span>
          <Link to="/shop" className="breadcrumb-link">
            {categoryName}
          </Link>
          <span className="breadcrumb-separator">
            {currentLang === 'ar' ? <FiChevronLeft size={12} /> : <FiChevronRight size={12} />}
          </span>
          <span className="breadcrumb-current">{title}</span>
        </nav>

        {/* 2-Column Product Details Grid */}
        <div className="product-details-grid">
          {/* Left Column: Gallery */}
          <div className="product-gallery-col" data-aos="fade-right">
            <ProductGallery
              images={product.images || []}
              title={title}
              discount={product.discount || 0}
              isNew={product.isNew || false}
            />
          </div>

          {/* Right Column: Sticky Purchase Info Panel */}
          <div className="product-info-sticky-col" data-aos="fade-left">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Product Tabs */}
        <div data-aos="fade-up">
          <ProductTabs product={product} />
        </div>

        {/* Related Products Section */}
        <div data-aos="fade-up">
          <RelatedProducts currentProduct={product} allProducts={allProducts} />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Product;
