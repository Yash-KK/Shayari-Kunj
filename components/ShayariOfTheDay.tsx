import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import type { Shayari } from "../data/shayaris";

interface ShayariOfTheDayProps {
  isOpen: boolean;
  onClose: () => void;
  shayari: Shayari;
}

export default function ShayariOfTheDay({
  isOpen,
  onClose,
  shayari,
}: ShayariOfTheDayProps) {
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              w-full max-w-lg bg-gray-800 rounded-xl p-6 shadow-2xl z-50
              border border-purple-500/20"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-purple-400" />
                <h2 className="text-xl font-semibold">Shayari of the Day</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-gray-200 leading-relaxed">
                {shayari.description}
              </p>
              <p className="text-right text-gray-400">- {shayari.author}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {shayari.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-purple-600/50 text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
