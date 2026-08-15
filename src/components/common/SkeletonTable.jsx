import React from 'react';
import './SkeletonTable.css';

/**
 * Reusable Skeleton Table component
 * @param {number} rows - Number of skeleton rows to render
 * @param {number} columns - Number of columns to render
 */
export const SkeletonTable = ({ rows = 5, columns = 5, className = '' }) => {
  const rowArray = Array.from({ length: rows });
  const colArray = Array.from({ length: columns });

  return (
    <div className={`skeleton-table-wrapper ${className}`}>
      <table className="skeleton-table">
        <thead>
          <tr>
            {colArray.map((_, colIdx) => (
              <th key={colIdx}>
                <div className="skeleton-box skeleton-table-header-cell shimmer" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowArray.map((_, rowIdx) => (
            <tr key={rowIdx}>
              {colArray.map((_, colIdx) => (
                <td key={colIdx}>
                  <div
                    className="skeleton-box skeleton-table-cell shimmer"
                    style={{ width: colIdx === 0 ? '70%' : colIdx === columns - 1 ? '40%' : '85%' }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
