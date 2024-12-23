import React from 'react';
import clsx from 'clsx';

export function Card({ title, value, isPercentage, isMonetary, isNumber }) {
  const formattedValue = isNumber ? parseInt(value).toLocaleString() :
    isMonetary ? parseFloat(value).toLocaleString() : value;

  const isPositive = !isNaN(parseFloat(value)) && parseFloat(value) >= 0;

  return (
    <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
      <h3 className="text-xs md:text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className={clsx(
        'text-lg md:text-2xl font-semibold',
        isPercentage || isMonetary ? (isPositive ? 'text-green-600' : 'text-red-600') : 'text-gray-900'
      )}>
        {formattedValue}{isPercentage ? '%' : ''}
      </p>
    </div>
  );
}