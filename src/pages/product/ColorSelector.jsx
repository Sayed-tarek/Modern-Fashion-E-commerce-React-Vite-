import React from 'react';
import { useTranslation } from 'react-i18next';
import './ColorSelector.css';

const COLOR_MAP = {
  White: '#FFFFFF',
  Black: '#1A1A1A',
  Grey: '#808080',
  Blue: '#2563EB',
  Red: '#DC2626',
  Green: '#16A34A',
  Beige: '#F5F5DC',
};

const COLOR_AR = {
  White: 'أبيض',
  Black: 'أسود',
  Grey: 'رمادي',
  Blue: 'أزرق',
  Red: 'أحمر',
  Green: 'أخضر',
  Beige: 'بيج',
};

export const ColorSelector = ({ colors = [], selectedColor, onSelectColor }) => {
  const { i18n } = useTranslation();
  const isAr = i18n.language && i18n.language.startsWith('ar');

  if (!colors || colors.length === 0) return null;

  const currentSelected = selectedColor || colors[0];
  const displayVal = isAr ? (COLOR_AR[currentSelected] || currentSelected) : currentSelected;

  return (
    <div className="color-selector-container">
      <div className="selector-header">
        <span className="selector-label">{isAr ? 'اللون:' : 'Color:'}</span>
        <span className="selected-value">{displayVal}</span>
      </div>

      <div className="color-options-row">
        {colors.map((color) => {
          const bgHex = COLOR_MAP[color] || '#D1D5DB';
          const isSelected = selectedColor === color;
          const label = isAr ? (COLOR_AR[color] || color) : color;

          return (
            <button
              key={color}
              type="button"
              className={`color-option-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectColor(color)}
              aria-label={`Select color ${label}`}
            >
              <span className="color-dot" style={{ backgroundColor: bgHex }} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
