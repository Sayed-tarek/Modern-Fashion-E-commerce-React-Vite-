import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GiRunningShoe, GiFootprint, GiLeg } from 'react-icons/gi';
import { MdDirectionsRun } from 'react-icons/md';
import { FaWind, FaLeaf } from 'react-icons/fa6';
import { fetchCachedJson } from '../../../utils/apiCache';
import './TechnologyFeatures.css';

// React Icons Map
const ICON_MAP = {
  GiRunningShoe: GiRunningShoe,
  MdDirectionsRun: MdDirectionsRun,
  GiFootprint: GiFootprint,
  FaWind: FaWind,
  GiLeg: GiLeg,
  FaLeaf: FaLeaf,
};

export const TechnologyFeatures = () => {
  const { i18n, t } = useTranslation(['home', 'common']);
  const currentLang = i18n.language && i18n.language.startsWith('ar') ? 'ar' : 'en';

  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadFeatures = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCachedJson('/js/technology-features.json');

        if (isMounted) {
          setFeatures(data.slice(0, 6));
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load technology features:', err);
        if (isMounted) {
          setError(err.message || 'Failed to load data');
          setLoading(false);
        }
      }
    };

    loadFeatures();

    return () => {
      isMounted = false;
    };
  }, []);

  const getLocalizedText = (field, fallback) => {
    if (!field) return fallback;
    if (typeof field === 'string') return field;
    return field[currentLang] || field.en || fallback;
  };

  return (
    <section className="tech-features-section" aria-labelledby="tech-features-title">
      {/* Section Header */}
      <div className="tech-header" data-aos="fade-up">
        <span className="tech-badge">
          {t('home:techSection.badge', 'TECHNOLOGY')}
        </span>
        <h2 id="tech-features-title" className="tech-title">
          {t('home:techSection.title', 'Technology Behind Every Step')}
        </h2>
        <p className="tech-subtitle">
          {t(
            'home:techSection.subtitle',
            'Discover the innovative technologies designed to provide superior comfort, durability, and performance.'
          )}
        </p>
      </div>

      {/* Grid Content */}
      {error ? (
        <div className="tech-error">
          <p>{t('common:errors.somethingWentWrong', 'Failed to load technology features.')}</p>
        </div>
      ) : (
        <div className="tech-grid">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={`tech-skeleton-${index}`} className="tech-skeleton-card">
                  <div className="skeleton-icon shimmer" />
                  <div className="skeleton-title shimmer" />
                  <div className="skeleton-text-1 shimmer" />
                  <div className="skeleton-text-2 shimmer" />
                </div>
              ))
            : features.map((feature, i) => {
                const IconComponent = ICON_MAP[feature.icon] || GiRunningShoe;
                const title = getLocalizedText(feature.title, 'Feature Title');
                const description = getLocalizedText(feature.description, '');

                return (
                  <div
                    key={feature.id || feature.title}
                    className="tech-card"
                    data-aos="zoom-in"
                    data-aos-delay={(i % 3) * 150}
                  >
                    <div className="tech-icon-wrapper">
                      <IconComponent />
                    </div>
                    <h3 className="tech-card-title">{title}</h3>
                    <p className="tech-card-description">{description}</p>
                  </div>
                );
              })}
        </div>
      )}
    </section>
  );
};

export default TechnologyFeatures;
