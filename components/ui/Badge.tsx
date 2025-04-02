import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export default function Badge({
  children,
  variant = 'primary',
  className = ''
}: BadgeProps) {
  const variants = {
    primary: 'bg-purple-600/50 border-purple-400/30',
    secondary: 'bg-gray-700/50 border-gray-600',
    outline: 'bg-transparent border-purple-500'
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`
        inline-flex items-center px-3 py-1 rounded-full
        text-sm text-white border backdrop-blur-sm
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </motion.span>
  );
}