import React from 'react';

const ProgressBar = ({ current, threshold }) => {
  const percentage = Math.min((current / threshold) * 100, 100);
  
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-600">
          Progress to Free Gift
        </span>
        <span className="text-sm font-medium">
          ${current} / ${threshold}
        </span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar