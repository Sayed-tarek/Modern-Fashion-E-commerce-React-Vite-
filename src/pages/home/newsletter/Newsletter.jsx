import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMail, FiSend, FiCheckCircle } from 'react-icons/fi';
import './Newsletter.css';

export const Newsletter = () => {
  const { t } = useTranslation(['home', 'common']);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section className="newsletter-section" aria-label="Newsletter Subscription">
      <div className="newsletter-banner" data-aos="zoom-in">
        {/* Top Icon Badge */}
        <div className="newsletter-icon-badge">
          <FiMail />
        </div>

        {/* Header Titles */}
        <h2 className="newsletter-title">
          {t('home:newsletter.title', 'Stay in Style')}
        </h2>
        <p className="newsletter-subtitle">
          {t(
            'home:newsletter.subtitle',
            'Subscribe to receive exclusive offers, new arrivals and fashion inspiration.'
          )}
        </p>

        {/* Subscription Form */}
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="newsletter-input-wrapper">
            <span className="input-icon">
              <FiMail size={18} />
            </span>
            <input
              type="email"
              className="newsletter-input"
              placeholder={t('home:newsletter.placeholder', 'Enter your email address...')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
          </div>

          <button type="submit" className="newsletter-btn">
            <span>{t('home:newsletter.subscribe', 'Subscribe')}</span>
            <FiSend size={16} />
          </button>
        </form>

        {/* Success Toast */}
        {isSubmitted && (
          <div className="newsletter-success-toast">
            <FiCheckCircle size={18} color="#4ADE80" />
            <span>
              {t('home:newsletter.successMessage', 'Thank you for subscribing to our newsletter!')}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
