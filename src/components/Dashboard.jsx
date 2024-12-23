import React from 'react';
import { Card } from './Card';
import { PriceChart } from './PriceChart';
import { RatiosChart } from './RatiosChart';

export function Dashboard({ data }) {
  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{data.index_name}</h1>
        <p className="text-gray-600">
          Date: {new Date(data.index_date).toLocaleDateString()}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <Card
          title="Volume"
          value={data.volume}
          isNumber={true}
        />
        <Card
          title="Turnover (₹ Cr)"
          value={data.turnover_rs_cr}
          isMonetary={true}
        />
        <Card
          title="Points Change"
          value={data.points_change}
          isMonetary={true}
        />
        <Card
          title="Change %"
          value={data.change_percent}
          isPercentage={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-8">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Price Movement</h2>
          <div className="h-[300px] md:h-[400px]">
            <PriceChart data={data} />
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Key Ratios</h2>
          <div className="h-[300px] md:h-[400px]">
            <RatiosChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}