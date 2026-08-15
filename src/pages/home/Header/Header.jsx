import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import headerBg from "../../../assets/images/header_bachground.jpg";
import Navbar from "../../../components/Navbar/Navbar";
import "./Header.css";

function Header() {
  const { t } = useTranslation(['home', 'common']);

  return (
    <div className="header-wrapper">
      <Navbar />

      <div className="hero-container-outer">
        <div className="hero-banner" style={{ '--header-bg': `url(${headerBg})` }}>
          <div className="hero-content">
            <span className="hero-subtitle" data-aos="fade-up">
              {t('home:hero.badge', 'PREMIUM COLLECTION')}
            </span>
            <h1 className="hero-heading" data-aos="fade-up" data-aos-delay="100">
              {t('home:hero.title', 'Elevate Your Style')}
            </h1>
            <p className="hero-description" data-aos="fade-up" data-aos-delay="200">
              {t('home:hero.subtitle', 'Technology, style, and comfort for every step. Choose the best for yourself and your pace.')}
            </p>

            {/* Hero Action Buttons */}
            <div className="hero-actions" data-aos="fade-up" data-aos-delay="300">
              <Link to="/shop" className="btn btn-primary">
                <span>{t('home:hero.exploreCollection', 'Explore Collection')}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
              <Link to="/best-sellers" className="btn btn-secondary">
                <span>{t('common:buttons.shopNow', 'Shop Now')}</span>
              </Link>
            </div>
          </div>

          {/* Floating Feature Cards & Rating Pill */}
          <div className="hero-features-floating">
            <div className="hero-feature-cards">
              <div className="feature-card" data-aos="zoom-in" data-aos-delay="100">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <div className="feature-info">
                  <h4>{t('home:features.freeShipping.title', 'Free Shipping')}</h4>
                  <p>{t('home:features.freeShipping.subtitle', 'On orders over $100')}</p>
                </div>
              </div>

              <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.38 3.46L16 2a4 4 0 0 0-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
                  </svg>
                </div>
                <div className="feature-info">
                  <h4>{t('home:features.tryBeforePay.title', 'Try Before Payment')}</h4>
                  <p>{t('home:features.tryBeforePay.subtitle', '14 days easy returns')}</p>
                </div>
              </div>

              <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
                <div className="feature-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 12 11 14 15 10"></polyline>
                  </svg>
                </div>
                <div className="feature-info">
                  <h4>{t('home:features.originalProducts.title', '100% Original Products')}</h4>
                  <p>{t('home:features.originalProducts.subtitle', 'Guaranteed quality')}</p>
                </div>
              </div>
            </div>

            <div className="rating-pill-card" data-aos="zoom-in" data-aos-delay="400">
              <div className="avatar-stack">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Client 1" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Client 2" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Client 3" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80" alt="Client 4" />
              </div>
              <div className="rating-info">
                <span className="rating-title">{t('home:features.socialProof.title', '10,000+ Happy Clients')}</span>
                <div className="rating-stars">
                  <span className="rating-score">{t('home:features.socialProof.rating', '4.9')}</span>
                  <span className="stars">★★★★★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;