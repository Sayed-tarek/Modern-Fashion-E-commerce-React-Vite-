import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiPhone, FiMail, FiArrowUp } from 'react-icons/fi';
import { FaInstagram, FaFacebookF, FaXTwitter, FaTiktok, FaYoutube } from 'react-icons/fa6';
import brandLogoImg from "../../assets/images/header_bachground.jpg";
import './Footer.css';

export const Footer = () => {
  const { t } = useTranslation(['footer', 'common']);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Footer Grid */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col" data-aos="fade-up" data-aos-delay="100">
            <a href="/" className="footer-logo">
              <div className="logo-icon">
                <img src={brandLogoImg} alt="AERO STEP" className="brand-logo-img" />
              </div>
              <div className="footer-logo-text">
                <span className="logo-title">AERO STEP</span>
                <span className="logo-subtitle">MOVE AHEAD</span>
              </div>
            </a>

            <p className="brand-desc">
              {t(
                'footer:brandDescription',
                'Discover premium footwear & urban fashion engineered for ultimate comfort, durability, and modern style.'
              )}
            </p>

            {/* Contact Info */}
            <div className="contact-list">
              <div className="contact-item">
                <span className="contact-icon"><FiMapPin size={16} /></span>
                <span>{t('footer:contact.address', '124 Fashion Ave, New York, NY')}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><FiPhone size={16} /></span>
                <span dir="ltr" className="ltr-text">{t('footer:contact.phone', '+1 (800) 555-AERO')}</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon"><FiMail size={16} /></span>
                <span dir="ltr" className="ltr-text">{t('footer:contact.email', 'support@aerostep.com')}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-links">
              <a href="#instagram" className="social-icon-btn" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#facebook" className="social-icon-btn" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#twitter" className="social-icon-btn" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="#tiktok" className="social-icon-btn" aria-label="TikTok">
                <FaTiktok />
              </a>
              <a href="#youtube" className="social-icon-btn" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="200">
            <h4 className="footer-col-title">{t('footer:sections.shop', 'Shop')}</h4>
            <ul className="footer-links-list">
              <li><a href="#new" className="footer-link">{t('footer:links.newArrivals', 'New Arrivals')}</a></li>
              <li><a href="#bestsellers" className="footer-link">{t('footer:links.bestSellers', 'Best Sellers')}</a></li>
              <li><a href="#sneakers" className="footer-link">{t('footer:links.sneakers', 'Sneakers')}</a></li>
              <li><a href="#running" className="footer-link">{t('footer:links.runningShoes', 'Running Shoes')}</a></li>
              <li><a href="#lifestyle" className="footer-link">{t('footer:links.lifestyle', 'Lifestyle')}</a></li>
              <li><a href="#sale" className="footer-link">{t('footer:links.sale', 'Special Offers')}</a></li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="300">
            <h4 className="footer-col-title">{t('footer:sections.customerService', 'Customer Service')}</h4>
            <ul className="footer-links-list">
              <li><a href="#faqs" className="footer-link">{t('footer:links.faqs', 'Help Center & FAQs')}</a></li>
              <li><a href="#track" className="footer-link">{t('footer:links.trackOrder', 'Track Your Order')}</a></li>
              <li><a href="#shipping" className="footer-link">{t('footer:links.shipping', 'Shipping & Delivery')}</a></li>
              <li><a href="#returns" className="footer-link">{t('footer:links.returns', 'Easy Returns')}</a></li>
              <li><a href="#contact" className="footer-link">{t('footer:links.contactUs', 'Contact Us')}</a></li>
            </ul>
          </div>

          {/* Company & Legal Column */}
          <div className="footer-col" data-aos="fade-up" data-aos-delay="400">
            <h4 className="footer-col-title">{t('footer:sections.company', 'Company')}</h4>
            <ul className="footer-links-list">
              <li><a href="#story" className="footer-link">{t('footer:links.ourStory', 'Our Story')}</a></li>
              <li><a href="#sustainability" className="footer-link">{t('footer:links.sustainability', 'Sustainability')}</a></li>
              <li><a href="#careers" className="footer-link">{t('footer:links.careers', 'Careers')}</a></li>
              <li><a href="#privacy" className="footer-link">{t('footer:links.privacyPolicy', 'Privacy Policy')}</a></li>
              <li><a href="#terms" className="footer-link">{t('footer:links.termsAndConditions', 'Terms & Conditions')}</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Divider */}
        <div className="footer-divider" />

        {/* Bottom Footer Bar */}
        <div className="footer-bottom">
          <div className="copyright-text">
            © {new Date().getFullYear()} AERO STEP. {t('footer:legal.allRightsReserved', 'All Rights Reserved.')}
          </div>

          {/* Payment Badges */}
          <div className="payment-methods">
            <span className="payment-badge">VISA</span>
            <span className="payment-badge">MASTERCARD</span>
            <span className="payment-badge">APPLE PAY</span>
            <span className="payment-badge">PAYPAL</span>
            <span className="payment-badge">CASH ON DELIVERY</span>
          </div>

          {/* Back to Top */}
          <button type="button" className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <FiArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
