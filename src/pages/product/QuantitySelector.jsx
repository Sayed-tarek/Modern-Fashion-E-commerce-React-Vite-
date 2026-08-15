import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import './QuantitySelector.css';

export const QuantitySelector = ({ quantity = 1, onIncrease, onDecrease, maxStock = 99 }) => {
  return (
    <div className="quantity-selector-box" aria-label="Select quantity">
      <button
        type="button"
        className="qty-btn"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
      >
        <FiMinus size={14} />
      </button>

      <span className="qty-value">{quantity}</span>

      <button
        type="button"
        className="qty-btn"
        onClick={onIncrease}
        disabled={quantity >= maxStock}
        aria-label="Increase quantity"
      >
        <FiPlus size={14} />
      </button>
    </div>
  );
};

export default QuantitySelector;
