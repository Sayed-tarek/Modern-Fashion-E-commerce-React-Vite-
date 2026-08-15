import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../home/featured-products/ProductCard';
import './RelatedProducts.css';

export const RelatedProducts = ({ currentProduct, allProducts = [] }) => {
  const navigate = useNavigate();

  if (!allProducts || allProducts.length === 0) return null;

  // Extract category string / object key
  const getCategoryKey = (cat) => {
    if (!cat) return '';
    if (typeof cat === 'string') return cat;
    return cat.en || cat.ar || '';
  };

  const currentCat = getCategoryKey(currentProduct?.category);

  // Filter products from same category, excluding current product
  let relatedList = allProducts.filter(
    (p) => p.id !== currentProduct?.id && getCategoryKey(p.category) === currentCat
  );

  // Fallback: if fewer than 4 related items, fill with other products
  if (relatedList.length < 4) {
    const extraItems = allProducts.filter(
      (p) => p.id !== currentProduct?.id && !relatedList.some((r) => r.id === p.id)
    );
    relatedList = [...relatedList, ...extraItems];
  }

  const displayedProducts = relatedList.slice(0, 4);

  const handleCardClick = (slug) => {
    navigate(`/product/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="related-products-section" aria-labelledby="related-products-heading">
      <div className="related-header">
        <h2 id="related-products-heading" className="related-title">
          Related Products
        </h2>
        <p className="related-subtitle">
          Explore similar products curated to complete your modern style.
        </p>
      </div>

      <div className="related-grid">
        {displayedProducts.map((prod) => (
          <div
            key={prod.id || prod.slug}
            onClick={() => handleCardClick(prod.slug)}
            style={{ cursor: 'pointer' }}
          >
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
