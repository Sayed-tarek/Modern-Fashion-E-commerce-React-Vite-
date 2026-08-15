import React from 'react';
import { useTranslation } from 'react-i18next';
import './SizeSelector.css';

export const SizeSelector = ({ sizes = [], selectedSize, onSelectSize }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language && i18n.language.startsWith('ar');

  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="size-selector-container">
      <div className="size-header">
        <span className="size-label">{isAr ? 'اختر المقاس:' : 'Select Size:'}</span>
        <button
          type="button"
          className="size-guide-btn"
          onClick={() => alert(isAr ? 'دليل المقاسات: يطبق المقاس القياسي المعتاد.' : 'Size Guide: Standard EU / US shoe sizing applies.')}
        >
          {isAr ? 'دليل المقاسات' : 'Size Guide'}
        </button>
      </div>

      <div className="size-options-row">
        {sizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              className={`size-option-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectSize(size)}
              aria-label={`Select size ${size}`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
