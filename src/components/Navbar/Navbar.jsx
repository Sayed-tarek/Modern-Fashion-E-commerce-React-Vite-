import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from 'react-use-cart';
import { FiHeart } from 'react-icons/fi';
import LanguageSwitcher from '../../i18n/LanguageSwitcher';
import CartDrawer from '../CartDrawer/CartDrawer';
import WishlistDrawer from '../WishlistDrawer/WishlistDrawer';
import { useWishlist } from '../../context/WishlistContext';
import brandLogoImg from "../../assets/images/header_bachground.jpg";
import './Navbar.css';

export const Navbar = memo(() => {
  const { t } = useTranslation('navbar');
  const location = useLocation();
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isWishlistDrawerOpen, setIsWishlistDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isHome = location.pathname === '/';
  const isShop = location.pathname === '/shop';
  const isBestSellers = location.pathname === '/best-sellers';
  const isProduct = location.pathname.startsWith('/product');
  const isWishlist = location.pathname === '/wishlist';

  return (
    <>
      <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <div className="logo-icon">
              <img src={brandLogoImg} alt="AERO STEP" className="brand-logo-img" loading="lazy" decoding="async" />
            </div>
            <div className="logo-text">
              <span className="logo-title">AERO STEP</span>
              <span className="logo-subtitle">MOVE AHEAD</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="navbar-nav">
            <ul className="navbar-menu">
              <li>
                <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`}>
                  {t('nav.home', 'Home')}
                </Link>
              </li>
              <li>
                <Link to="/shop" className={`nav-link ${isShop ? 'active' : ''}`}>
                  {t('nav.shop', 'Shop')}
                </Link>
              </li>
              <li>
                <Link
                  to="/product/urban-classic-sneakers"
                  className={`nav-link ${isProduct ? 'active' : ''}`}
                >
                  {t('nav.productDetails', 'Product Details')}
                </Link>
              </li>
              <li>
                <Link
                  to="/best-sellers"
                  className={`nav-link badge-sale ${isBestSellers ? 'active' : ''}`}
                >
                  {t('nav.bestSellers', 'Best Sellers')}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            <div className="desktop-only-action">
              <LanguageSwitcher />
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              className={`nav-action-btn wishlist-header-btn ${isWishlist ? 'active' : ''}`}
              onClick={() => setIsWishlistDrawerOpen(true)}
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <FiHeart size={18} />
              <span className="btn-text cart-text-desktop">{t('nav.wishlist', 'Wishlist')}</span>
              {totalWishlistItems > 0 && (
                <span className="cart-badge wishlist-badge-num">{totalWishlistItems}</span>
              )}
            </button>

            <Link to="/login" className="nav-action-btn user-btn desktop-only-action" aria-label="Sign In">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span className="btn-text">{t('nav.login', 'Sign In')}</span>
            </Link>

            {/* Cart Button */}
            <button
              type="button"
              className="nav-action-btn cart-btn header-cart-btn"
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label="Cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="btn-text cart-text-desktop">{t('nav.cart', 'Cart')}</span>
              <span className="cart-badge">{totalItems}</span>
            </button>

            {/* Hamburger Menu Toggle */}
            <button 
              type="button"
              className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle Menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>

        {/* Mobile Backdrop Overlay */}
        <div
          className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobileMenu}
        />

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="drawer-header">
            <div className="logo-text">
              <span className="logo-title">AERO STEP</span>
              <span className="logo-subtitle">MOVE AHEAD</span>
            </div>
            <button
              type="button"
              className="close-btn"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="drawer-nav">
            <ul className="drawer-menu">
              <li>
                <Link to="/" onClick={closeMobileMenu} className={`drawer-link ${isHome ? 'active' : ''}`}>
                  {t('nav.home', 'Home')}
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={closeMobileMenu} className={`drawer-link ${isShop ? 'active' : ''}`}>
                  {t('nav.shop', 'Shop')}
                </Link>
              </li>
              <li>
                <Link to="/product/urban-classic-sneakers" onClick={closeMobileMenu} className={`drawer-link ${isProduct ? 'active' : ''}`}>
                  {t('nav.productDetails', 'Product Details')}
                </Link>
              </li>
              <li>
                <Link to="/best-sellers" onClick={closeMobileMenu} className={`drawer-link ${isBestSellers ? 'active' : ''}`}>
                  {t('nav.bestSellers', 'Best Sellers')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="drawer-footer">
            <LanguageSwitcher />

            <Link to="/login" className="drawer-action-btn user-btn" onClick={closeMobileMenu}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>{t('nav.login', 'Sign In')}</span>
            </Link>
            <button
              type="button"
              className="drawer-action-btn drawer-cart-btn"
              onClick={() => {
                closeMobileMenu();
                setIsCartDrawerOpen(true);
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span>{t('nav.cart', 'Cart')}</span>
              <span className="drawer-cart-badge">{totalItems}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
      />

      {/* Wishlist Drawer Component */}
      <WishlistDrawer
        isOpen={isWishlistDrawerOpen}
        onClose={() => setIsWishlistDrawerOpen(false)}
      />
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
