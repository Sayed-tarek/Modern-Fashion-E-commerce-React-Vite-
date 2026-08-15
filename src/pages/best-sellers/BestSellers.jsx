import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiX, FiInbox, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar, FaFire } from 'react-icons/fa6';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import ProductCard from '../home/featured-products/ProductCard';
import SkeletonCard from '../home/featured-products/SkeletonCard';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import { fetchCachedJson } from '../../utils/apiCache';
import './BestSellers.css';

const ITEMS_PER_PAGE = 8;

const CATEGORY_TRANSLATIONS = {
  'Sneakers': { en: 'Sneakers', ar: 'الأحذية الرياضية' },
  'Running Shoes': { en: 'Running Shoes', ar: 'أحذية الجري' },
  'Boots': { en: 'Boots', ar: 'الأحذية البوت' },
  'Hoodies': { en: 'Hoodies', ar: 'الهوديز' },
  'Oversized Hoodies': { en: 'Oversized Hoodies', ar: 'هوديز أوفرسايز' },
  'T-Shirts': { en: 'T-Shirts', ar: 'التيشيرتات' },
  'Jackets': { en: 'Jackets', ar: 'الجاكيتات' },
  'Sweatpants': { en: 'Sweatpants', ar: 'البناطيل الرياضية' },
  'Accessories': { en: 'Accessories', ar: 'الإكسسوارات' },
};

export const BestSellers = () => {
  const { i18n, t } = useTranslation(['home', 'common']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let isMounted = true;

    const loadBestSellers = async () => {
      try {
        setLoading(true);
        const data = await fetchCachedJson('/js/just-landed.json');
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch just-landed.json:', error);
        if (isMounted) setLoading(false);
      }
    };

    loadBestSellers();

    return () => {
      isMounted = false;
    };
  }, []);

  // Reset page to 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, sortBy]);

  const getLocalizedText = useCallback((field, fallback) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || fallback;
  }, [currentLang]);

  // Dynamically extract categories & translate cleanly
  const categoriesList = useMemo(() => {
    if (!products || products.length === 0) return [];

    const categoryMap = new Map();

    products.forEach((p) => {
      let enName = '';
      let arName = '';

      if (typeof p.category === 'string') {
        enName = p.category;
        arName = CATEGORY_TRANSLATIONS[p.category]?.ar || p.category;
      } else if (p.category && typeof p.category === 'object') {
        enName = p.category.en || '';
        arName = p.category.ar || CATEGORY_TRANSLATIONS[enName]?.ar || enName;
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
      { id: 'All', en: 'All Best Sellers', ar: 'الكل', count: products.length },
      ...Array.from(categoryMap.values()),
    ];
  }, [products]);

  // Sort Options for CustomSelect
  const sortOptions = useMemo(() => [
    { value: 'featured', label: currentLang === 'ar' ? 'المميزة' : 'Featured' },
    { value: 'price-low', label: currentLang === 'ar' ? 'السعر: الأقل إلى الأعلى' : 'Price: Low to High' },
    { value: 'price-high', label: currentLang === 'ar' ? 'السعر: الأعلى إلى الأقل' : 'Price: High to Low' },
    { value: 'rating', label: currentLang === 'ar' ? 'الأعلى تقييماً' : 'Highest Rated' },
    { value: 'newest', label: currentLang === 'ar' ? 'الأحدث' : 'Newest' },
  ], [currentLang]);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (selectedCategory !== 'All') {
      list = list.filter((p) => {
        const catEn = typeof p.category === 'object' ? p.category?.en : p.category;
        return catEn === selectedCategory;
      });
    }

    // Search Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      list = list.filter((p) => {
        const title = getLocalizedText(p.title, '').toLowerCase();
        const brand = (p.brand || '').toLowerCase();
        const cat = getLocalizedText(p.category, '').toLowerCase();
        return title.includes(query) || brand.includes(query) || cat.includes(query);
      });
    }

    // Sort
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

    const toolbar = document.querySelector('.toolbar-bar');
    if (toolbar) {
      toolbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [totalPages]);

  const currentCount = Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length);
  const progressPercent = filteredProducts.length > 0 ? (currentCount / filteredProducts.length) * 100 : 0;

  return (
    <div className="best-sellers-page-wrapper">
      <Navbar />

      <main className="best-sellers-container">
        {/* Luxury Hero Banner */}
        <div className="best-sellers-banner" data-aos="fade-up">
          <div className="banner-content">
            <span className="banner-badge">
              <FaFire size={14} />
              <span>{currentLang === 'ar' ? 'الأكثر مبيعاً والإقبال' : 'BEST SELLERS'}</span>
            </span>

            <h1 className="banner-title">
              {currentLang === 'ar' ? 'تشكيلة الأكثر مبيعاً' : 'Best Sellers Collection'}
            </h1>

            <p className="banner-subtitle">
              {currentLang === 'ar'
                ? 'اكتشف المنتجات الأكثر إقبالاً وطلباً من قِبل آلاف العملاء، والمصممة لتوفير أفضل مستوى من الراحة والأناقة.'
                : 'Discover our most loved products chosen by thousands of customers worldwide for superior comfort and performance.'}
            </p>

            {/* Banner Stats */}
            <div className="banner-stats-row">
              <div className="stat-item">
                <FaStar className="stat-icon-gold" size={16} />
                <span className="stat-val">4.9 / 5.0</span>
                <span className="stat-lbl">{currentLang === 'ar' ? 'تقييم العملاء' : 'Customer Rating'}</span>
              </div>
              <div className="stat-sep" />
              <div className="stat-item">
                <span className="stat-val">+10,000</span>
                <span className="stat-lbl">{currentLang === 'ar' ? 'عميل سعيد' : 'Happy Clients'}</span>
              </div>
              <div className="stat-sep" />
              <div className="stat-item">
                <span className="stat-val">Top Choice</span>
                <span className="stat-lbl">{currentLang === 'ar' ? 'الاختيار الأول' : 'Top Selection'}</span>
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

        {/* Toolbar: Search & CustomSelect */}
        <div className="toolbar-bar" data-aos="fade-up" data-aos-delay="150">
          <div className="search-box">
            <FiSearch size={18} />
            <input
              type="text"
              placeholder={currentLang === 'ar' ? 'ابحث عن المنتج الأكثر مبيعاً...' : 'Search best seller...'}
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

          <div className="toolbar-right">
            <CustomSelect
              label={currentLang === 'ar' ? 'ترتيب حسب' : 'Sort By'}
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
            />
          </div>
        </div>

        {/* Progress Bar & Summary Counter */}
        <div className="results-summary-row" data-aos="fade-up" data-aos-delay="200">
          <div className="progress-text-row">
            <span>
              {currentLang === 'ar'
                ? `عرض ${currentCount} من أصل ${filteredProducts.length} منتج أكثر مبيعاً`
                : `Showing ${currentCount} of ${filteredProducts.length} Best Sellers`}
            </span>
            {(selectedCategory !== 'All' || searchQuery !== '') && (
              <div className="active-filter-tag">
                <span>{currentLang === 'ar' ? 'تصفية نشطة' : 'Active Filter'}</span>
              </div>
            )}
          </div>

          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Product Cards Grid */}
        {loading ? (
          <div className="best-sellers-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={`best-skel-${i}`} />
            ))}
          </div>
        ) : paginatedProducts.length === 0 ? (
          <div className="empty-state-box" data-aos="zoom-in">
            <FiInbox className="empty-icon" />
            <h3>{currentLang === 'ar' ? 'لم يتم العثور على منتجات' : 'No Products Found'}</h3>
            <p>
              {currentLang === 'ar'
                ? 'جرب البحث بكلمات أخرى أو اختر فئة مختلفة'
                : 'Try adjusting your search query or filters.'}
            </p>
          </div>
        ) : (
          <>
            <div className="best-sellers-grid">
              {paginatedProducts.map((product, i) => (
                <ProductCard key={product.id || product.slug} product={product} index={i} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pagination-wrapper" data-aos="fade-up">
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

export default BestSellers;
