import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import type { Shayari } from "../data/shayaris";

interface ShayariModalProps {
  isOpen: boolean;
  onClose: () => void;
  shayari: Shayari;
  // liked: boolean;
  // likeCount: number;
  // onLike: (e: React.MouseEvent) => void;
}

export default function ShayariModal({
  isOpen,
  onClose,
  shayari,
  // liked,
  // likeCount,
  // onLike,
}: ShayariModalProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shayari.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
              w-full max-w-3xl bg-gray-800 rounded-xl p-8 shadow-2xl z-50
              border border-purple-500/20"
          >
            <div className="flex justify-between items-start mb-6">
              {/* <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onLike}
                className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Heart
                  size={24}
                  className={liked ? "fill-purple-400 text-purple-400" : ""}
                />
                <span className="text-sm">{likeCount}</span>
              </motion.button> */}

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <p
                className={`font-mono text-2xl text-gray-200 font-medium leading-relaxed`}
              >
                {shayari.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {shayari.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 bg-purple-600/50 backdrop-blur-sm text-white text-sm rounded-full
                      border border-purple-400/30"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <motion.p
                  initial={{ opacity: 0.6 }}
                  whileHover={{ opacity: 1 }}
                  className="text-gray-400 text-lg"
                >
                  - {shayari.author}
                </motion.p>

                <button
                  onClick={handleCopy}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  {copied ? (
                    <Check className="text-green-500" size={24} />
                  ) : (
                    <Copy size={24} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
