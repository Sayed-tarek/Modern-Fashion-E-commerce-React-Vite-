import React from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = ({ className = "" }) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";
  const isArabic = currentLanguage.startsWith("ar");

  const toggleLanguage = () => {
    const nextLang = isArabic ? "en" : "ar";
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`lang-switcher-btn ${className}`}
      aria-label="Toggle Language"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lang-icon"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="lang-text">{isArabic ? "English" : "العربية"}</span>
    </button>
  );
};

export default LanguageSwitcher;
