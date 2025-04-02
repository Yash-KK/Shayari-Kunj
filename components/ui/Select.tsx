"use client"
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export default function Select({
  label,
  error,
  className = '',
  children,
  ...props
}: SelectProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={`
            w-full bg-gray-700 rounded-lg px-4 py-2
            text-white appearance-none
            border border-gray-600
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none
            transition-colors
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          size={20}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}