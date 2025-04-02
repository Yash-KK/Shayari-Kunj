"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Button from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}: ModalProps) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`
              fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              w-[calc(100%-2rem)] ${sizes[size]} bg-gray-800 rounded-xl p-6 md:p-8
              shadow-2xl z-50 border border-purple-500/20
              max-h-[calc(100vh-4rem)] overflow-y-auto
            `}
          >
            <div className="flex items-center justify-between mb-6">
              {title && (
                <h2 className="text-xl font-semibold text-white">{title}</h2>
              )}
              <Button
                variant="ghost"
                size="sm"
                icon={X}
                onClick={onClose}
                className="ml-auto"
              >
                Close
              </Button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}