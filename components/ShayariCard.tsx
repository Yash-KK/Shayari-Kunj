import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Heart } from "lucide-react";
import ShayariModal from "./ShayariModal";
import { Shayari } from "@/data/shayaris";

interface ShayariCardProps {
  shayari: Shayari;
}

export default function ShayariCard({ shayari }: ShayariCardProps) {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shayari.description);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!liked) {
      setLikeCount((prev) => prev + 1);
    } else {
      setLikeCount((prev) => prev - 1);
    }
    setLiked(!liked);
  };
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all relative group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex justify-between items-start mb-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
          >
            <Heart
              size={20}
              className={liked ? "fill-purple-400 text-purple-400" : ""}
            />
            <span className="text-sm">{likeCount}</span>
          </motion.button>

          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            {copied ? (
              <Check className="text-green-500" size={20} />
            ) : (
              <Copy className="text-purple-400" size={20} />
            )}
          </button>
        </div>

        <p
          className={`text-lg text-gray-200 font-medium mb-4 leading-relaxed}`}
        >
          {shayari.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {shayari.tags.map((tag, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1 }}
              className="px-3 py-1 bg-purple-600/50 backdrop-blur-sm text-white text-sm rounded-full
                border border-purple-400/30"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
          className="text-gray-400 text-right"
        >
          - {shayari.author}
        </motion.p>
      </motion.div>

      <ShayariModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shayari={shayari}
        liked={liked}
        likeCount={likeCount}
        onLike={handleLike}
      />
    </>
  );
}
