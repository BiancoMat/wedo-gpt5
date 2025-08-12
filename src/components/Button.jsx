import React from 'react';

export default function Button({ variant = 'primary', className = '', ...props }) {
  const base = 'px-4 py-2 rounded font-medium focus:outline-none focus:ring';
  const styles =
    variant === 'secondary'
      ? 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300'
      : 'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-300';
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
