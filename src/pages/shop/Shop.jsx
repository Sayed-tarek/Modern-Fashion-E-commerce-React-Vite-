import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiGrid, FiX, FiInbox, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../home/featured-products/ProductCard';
import SkeletonCard from '../home/featured-products/SkeletonCard';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { fetchCachedJson } from '../../utils/apiCache';
import './Shop.css';

const ITEMS_PER_PAGE = 8;

export const Shop = () => {
  const { i18n, t } = useTranslation(['shop', 'common']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchCachedJson('/js/Products.json');
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch Products.json:', error);
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

  // Reset to Page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const getLocalizedText = useCallback((field, fallback) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || fallback;
  }, [currentLang]);

  // Dynamically extract unique categories and counts from Products.json
  const categoriesList = useMemo(() => {
    if (!products || products.length === 0) return [];

    const categoryMap = new Map();

    products.forEach((p) => {
      let enName = '';
      let arName = '';

      if (typeof p.category === 'string') {
        enName = p.category;
        arName = p.category;
      } else if (p.category && typeof p.category === 'object') {
        enName = p.category.en || '';
        arName = p.category.ar || enName;
      }

      if (enName) {
        if (!categoryMap.has(enName)) {
          categoryMap.set(enName, {
            id: enName,
            en: enName,
            ar: arName,
            count: 0,
          });
        }
        categoryMap.get(enName).count += 1;
      }
    });

    return [
      { id: 'All', en: 'All Products', ar: 'الكل', count: products.length },
      ...Array.from(categoryMap.values()),
    ];
  }, [products]);

  // Sort Options for CustomSelect
  const sortOptions = useMemo(() => [
    { value: 'featured', label: currentLang === 'ar' ? 'المميزة' : 'Featured' },
    { value: 'price-low', label: t('shop:sorting.priceLowToHigh', 'Price: Low to High') },
    { value: 'price-high', label: t('shop:sorting.priceHighToLow', 'Price: High to Low') },
    { value: 'rating', label: t('shop:sorting.highestRated', 'Highest Rated') },
    { value: 'newest', label: t('shop:sorting.newest', 'Newest Arrivals') },
  ], [currentLang, t]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (selectedCategory !== 'All') {
      list = list.filter((p) => {
        const catEn = typeof p.category === 'object' ? p.category?.en : p.category;
        return catEn === selectedCategory;
      });
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      list = list.filter((p) => {
        const title = getLocalizedText(p.title, '').toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        const cat = getLocalizedText(p.category, '').toLowerCase();
        return title.includes(query) || brand.includes(query) || cat.includes(query);
      });
    }

    // Sort Products
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy, getLocalizedText]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = useCallback((page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    const toolbar = document.querySelector('.shop-toolbar-bar');
    if (toolbar) {
      toolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [totalPages]);

  const currentCount = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);
  const progressPercent = filteredProducts.length > 0 ? (currentCount / filteredProducts.length) * 100 : 0;

  return (
    <div className="shop-page-wrapper">
      <Navbar />

      <main className="shop-main-container">
        {/* Banner Hero */}
        <div className="shop-banner-hero" data-aos="fade-up">
          <div className="shop-banner-content">
            <span className="shop-hero-badge">
              <FiGrid size={14} />
              <span>{currentLang === 'ar' ? 'المتجر الشامل' : 'FULL CATALOG'}</span>
            </span>

            <h1 className="shop-hero-title">
              {currentLang === 'ar' ? 'استكشف تشكيلة المتجر الكاملة' : 'Explore Our Full Collection'}
            </h1>

            <p className="shop-hero-subtitle">
              {currentLang === 'ar'
                ? 'تصفح أحدث تصاميم الأحذية، السنيكرز، والأزياء الرياضية والعصرية المصممة لأعلى مستويات الراحة والأناقة.'
                : 'Discover premium sneakers, running shoes, hoodies, and accessories engineered for ultimate style and comfort.'}
            </p>

            {/* Glassmorphic Stats Pills */}
            <div className="shop-hero-stats">
              <div className="stat-pill">
                <span className="stat-num">{products.length}+</span>
                <span className="stat-text">{currentLang === 'ar' ? 'منتج حصري' : 'Products'}</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <span className="stat-num">100%</span>
                <span className="stat-text">{currentLang === 'ar' ? 'منتجات أصلية' : 'Original'}</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-pill">
                <span className="stat-num">24h</span>
                <span className="stat-text">{currentLang === 'ar' ? 'توصيل سريع' : 'Fast Shipping'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="category-filter-bar" data-aos="fade-up" data-aos-delay="100">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const label = currentLang === 'ar' ? cat.ar : cat.en;

            return (
              <button
                key={cat.id}
                type="button"
                className={`category-filter-pill ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{label}</span>
                <span className="pill-count-badge">{cat.count}</span>
              </button>
            );
          })}
        </div>

        {/* Toolbar: Search & Modern CustomSelect */}
        <div className="shop-toolbar-bar" data-aos="fade-up" data-aos-delay="150">
          <div className="shop-search-box">
            <FiSearch size={18} />
            <input
              type="text"
              placeholder={currentLang === 'ar' ? 'ابحث باسم المنتج أو الماركة...' : 'Search by name, brand...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="shop-toolbar-right">
            <CustomSelect
              label={currentLang === 'ar' ? 'ترتيب حسب' : 'Sort By'}
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
            />
          </div>
        </div>

        {/* Progress Bar & Counter Row */}
        <div className="results-summary-row" data-aos="fade-up" data-aos-delay="200">
          <div className="progress-text-row">
            <span>
              {currentLang === 'ar'
                ? `عرض ${currentCount} من أصل ${filteredProducts.length} منتج`
                : `Showing ${currentCount} of ${filteredProducts.length} Products`}
            </span>
            {(selectedCategory !== 'All' || searchQuery !== '') && (
              <div className="active-filter-tag">
                <span>{currentLang === 'ar' ? 'تصفية نِشطة' : 'Active Filter'}</span>
              </div>
            )}
          </div>

          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="shop-products-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={`shop-skel-${i}`} />
            ))}
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="shop-empty-state" data-aos="zoom-in">
            <FiInbox className="empty-icon" />
            <h3>{t('shop:shop.noProductsFound', 'No Products Found')}</h3>
            <p>
              {currentLang === 'ar'
                ? 'جرب البحث بكلمات أخرى أو اختر فئة مختلفة'
                : 'Try adjusting your search query or filters to find what you are looking for.'}
            </p>
            <button
              type="button"
              className="reset-filter-btn"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSortBy('featured');
              }}
            >
              {t('shop:filters.clearFilters', 'Clear Filters')}
            </button>
          </div>
        ) : (
          <>
            <div className="shop-products-grid">
              {paginatedProducts.map((product, i) => (
                <ProductCard key={product.id || product.slug} product={product} index={i} />
              ))}
            </div>

            {/* Professional Pagination Bar */}
            {totalPages > 1 && (
              <div className="shop-pagination-wrapper" data-aos="fade-up">
                <div className="pagination-controls-row">
                  <button
                    type="button"
                    className="pagination-arrow-btn"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous Page"
                  >
                    {currentLang === 'ar' ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                  </button>

                  <div className="pagination-pages-list">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={`page-${pageNum}`}
                        type="button"
                        className={`page-num-btn ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="pagination-arrow-btn"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next Page"
                  >
                    {currentLang === 'ar' ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
                  </button>
                </div>

                <span className="pagination-info-text">
                  {currentLang === 'ar'
                    ? `الصفحة ${currentPage} من أصل ${totalPages}`
                    : `Page ${currentPage} of ${totalPages}`}
                </span>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
