import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import { fetchCachedJson } from '../../../utils/apiCache';
import './FeaturedProducts.css';

export const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['home', 'common']);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchCachedJson('/js/just-landed.json');
        const featuredList = data
          .filter((item) => item.isFeatured === true)
          .slice(0, 10);

        if (isMounted) {
          setProducts(featuredList);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewAll = useCallback(() => {
    navigate('/best-sellers');
  }, [navigate]);

  return (
    <section className="featured-products-section" aria-labelledby="featured-products-title">
      {/* Section Header */}
      <div className="featured-header" data-aos="fade-up">
        <div className="featured-header-left">
          <span className="featured-badge">
            {t('home:featuredProducts.badge', 'BEST SELLERS')}
          </span>
          <h2 id="featured-products-title" className="featured-title">
            {t('home:featuredProducts.title', 'Featured Products')}
          </h2>
          <p className="featured-subtitle">
            {t(
              'home:featuredProducts.subtitle',
              'Discover our most loved products chosen by thousands of customers.'
            )}
          </p>
        </div>

        <button
          type="button"
          className="view-all-btn"
          onClick={handleViewAll}
          aria-label="View All Featured Products"
        >
          <span>{t('home:featuredProducts.viewAll', 'View All')}</span>
          <FiArrowRight size={18} />
        </button>
      </div>

      {/* 5-Column Grid Content */}
      <div className="featured-grid">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
            ))
          : products.map((product, i) => (
              <ProductCard key={product.id || product.slug} product={product} index={i} />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
