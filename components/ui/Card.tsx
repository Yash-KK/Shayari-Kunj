"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, onClick, className = '', hover = true }: CardProps) {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      onClick={onClick}
      whileHover={hover ? { scale: 1.02 } : undefined}
      className={`
        bg-gray-800 rounded-lg p-6 shadow-lg
        border border-purple-500/20
        transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''}
        ${hover ? 'hover:shadow-xl' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}