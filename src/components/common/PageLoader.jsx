import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PageLoader.css';

/**
 * Premium PageLoader Component
 * Handles smooth route transition loading with logo, progress track, and accessibility support.
 */
export const PageLoader = ({ isManualLoading = false }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsFadingOut(false);

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 320);

    const removeTimer = setTimeout(() => {
      setIsLoading(false);
      setIsFadingOut(false);
    }, 520);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [location.pathname, location.search]);

  const active = isLoading || isManualLoading;

  if (!active && !isFadingOut) return null;

  return (
    <div
      className={`page-loader-overlay ${isFadingOut ? 'fade-out' : 'fade-in'}`}
      role="status"
      aria-label="Loading page content"
    >
      <div className="page-loader-content">
        <div className="page-loader-brand">
          <div className="page-loader-logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 28L20 8L32 28H24L20 20L16 28H8Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="page-loader-brand-text">
            <span className="page-loader-title">AERO STEP</span>
            <span className="page-loader-subtitle">MOVE AHEAD</span>
          </div>
        </div>

        <div className="page-loader-progress-track">
          <div className="page-loader-progress-bar" />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
