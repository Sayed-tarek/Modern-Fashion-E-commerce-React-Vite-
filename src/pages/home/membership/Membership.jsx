import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiPercent, FiZap, FiTag, FiAward, FiGift, FiTruck } from 'react-icons/fi';
import { fetchCachedJson } from '../../../utils/apiCache';
import './Membership.css';

// React Icons Map
const ICON_MAP = {
  FiPercent: FiPercent,
  FiZap: FiZap,
  FiTag: FiTag,
  FiAward: FiAward,
  FiGift: FiGift,
  FiTruck: FiTruck,
};

export const Membership = () => {
  const { i18n, t } = useTranslation(['home', 'common']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadMembershipData = async () => {
      try {
        setLoading(true);
        const result = await fetchCachedJson('/js/membership.json');
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to load membership data:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMembershipData();

    return () => {
      isMounted = false;
    };
  }, []);

  const getLocalizedText = (field, fallback) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || fallback;
  };

  // Fallback default values
  const badgeText = getLocalizedText(data?.badge, t('home:membership.badge', 'MEMBERSHIP'));
  const titleText = getLocalizedText(data?.title, t('home:membership.title', 'Join the Aero Step Club'));
  const descText = getLocalizedText(
    data?.description,
    t('home:membership.subtitle', 'Become a member and enjoy exclusive discounts, early access to collections, reward points, and free shipping.')
  );
  const buttonText = getLocalizedText(data?.cta?.buttonText, t('home:membership.joinNow', 'Join Now'));
  const subtext = getLocalizedText(data?.cta?.subtext, t('home:membership.freeText', '100% Free Membership'));

  const cardGraphic = data?.cardGraphic || {
    title: 'AERO STEP VIP',
    number: '•••• •••• •••• 8824',
    holder: 'VIP MEMBER',
    expiry: '12/28',
  };

  const benefitsList = data?.benefits || [
    { id: '1', icon: 'FiPercent', title: { en: 'Welcome Discount', ar: 'خصم ترحيبي' } },
    { id: '2', icon: 'FiZap', title: { en: 'Early Access', ar: 'وصول مبكر' } },
    { id: '3', icon: 'FiTag', title: { en: 'Exclusive Offers', ar: 'عروض حصرية' } },
    { id: '4', icon: 'FiAward', title: { en: 'Reward Points', ar: 'نقاط مكافآت' } },
    { id: '5', icon: 'FiGift', title: { en: 'Birthday Gift', ar: 'هدية عيد الميلاد' } },
    { id: '6', icon: 'FiTruck', title: { en: 'Free Shipping', ar: 'شحن مجاني' } },
  ];

  if (loading) {
    return null;
  }

  return (
    <section className="membership-section" aria-label="Membership Program">
      <div className="membership-banner">
        {/* Left Column: Premium VIP Card Graphic */}
        <div className="membership-card-col" data-aos="fade-right">
          <div className="membership-vip-card">
            <div className="card-top">
              <span className="card-logo">{cardGraphic.title}</span>
              <div className="card-chip" />
            </div>
            <div className="card-number">{cardGraphic.number}</div>
            <div className="card-bottom">
              <span className="card-holder">{cardGraphic.holder}</span>
              <span className="card-expiry">{cardGraphic.expiry}</span>
            </div>
          </div>
        </div>

        {/* Middle Column: Content & Benefits */}
        <div className="membership-content-col" data-aos="fade-up">
          <span className="membership-badge">{badgeText}</span>
          <h2 className="membership-title">{titleText}</h2>
          <p className="membership-description">{descText}</p>

          <div className="membership-benefits-grid">
            {benefitsList.map((benefit) => {
              const IconComponent = ICON_MAP[benefit.icon] || FiGift;
              const benefitTitle = getLocalizedText(benefit.title, '');
              return (
                <div key={benefit.id} className="benefit-item">
                  <div className="benefit-icon">
                    <IconComponent />
                  </div>
                  <span className="benefit-text">{benefitTitle}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: CTA Button & Subtext */}
        <div className="membership-cta-col" data-aos="fade-left">
          <button type="button" className="membership-cta-btn">
            {buttonText}
          </button>
          <span className="membership-cta-subtext">{subtext}</span>
        </div>
      </div>
    </section>
  );
};

export default Membership;
