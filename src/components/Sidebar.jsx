import React, { memo } from 'react';
import { TrendingUp, X } from 'lucide-react';
import clsx from 'clsx';

const IndexButton = memo(({ index, isSelected, onClick }) => (
  <button
    onClick={() => onClick(index.index_name)}
    className={clsx(
      'w-full text-left px-4 py-2 rounded-lg transition-colors',
      'hover:bg-blue-50 hover:text-blue-700',
      isSelected
        ? 'bg-blue-100 text-blue-700 font-medium'
        : 'text-gray-700'
    )}
  >
    {index.index_name}
  </button>
));

export function Sidebar({ indices, selectedIndex, onSelectIndex, isOpen, onClose }) {
  return (
    <div className={clsx(
      'fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    )}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">Market Indices</h2>
          </div>
          <button
            onClick={onClose}
            className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-5rem)]">
        <div className="space-y-1 p-2">
          {indices.map((index) => (
            <IndexButton
              key={index.index_name}
              index={index}
              isSelected={selectedIndex === index.index_name}
              onClick={onSelectIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
}