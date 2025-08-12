import React from 'react';

export default function Empty({ title = 'Nessun elemento', children }) {
  return (
    <div className="py-10 text-center text-gray-500">
      <p className="mb-2 font-medium">{title}</p>
      {children && <div className="text-sm">{children}</div>}
    </div>
  );
}
