import React from 'react';

export default function Tabs({ tabs, current, onChange }) {
  return (
    <div className="flex border-b mb-4">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-4 py-2 -mb-px border-b-2 ${
            current === t
              ? 'border-brand-500 text-brand-600'
              : 'border-transparent text-gray-600'
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
