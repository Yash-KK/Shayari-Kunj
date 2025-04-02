"use client"

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  error?: string;
  label?: string;
}

export default function Input({
  icon: Icon,
  error,
  label,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400"
          />
        )}
        <input
          className={`
            w-full bg-gray-700 rounded-lg
            ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2
            text-white placeholder-gray-400
            border border-gray-600
            focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none
            transition-colors
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}