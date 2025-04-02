"use client";
import React, { useState, useEffect } from "react";
import { Hash, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTags } from "@/data/shayaris";

interface SidebarProps {
  selectedTopic: string;
  onTopicSelect: (topic: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({
  selectedTopic,
  onTopicSelect,
  isSidebarOpen,
  toggleSidebar,
}: SidebarProps) {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const data = await fetchTags();
        if (Array.isArray(data)) {
          setTags(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };
    getTags();
  }, []);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
        className="hidden lg:flex fixed top-4 left-4 z-50 p-2 rounded-lg bg-gray-800 text-white
          transition-all duration-300 ease-in-out"
        style={{
          left: isSidebarOpen ? "240px" : "16px",
        }}
      >
        {isSidebarOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </motion.button>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
              fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-lg text-white
              border-r border-purple-500/20
              lg:translate-x-0 lg:w-64 w-64
              z-40
              transition-all duration-300 ease-in-out
              ${!isSidebarOpen && "lg:-translate-x-64"}
            `}
          >
            <div className="p-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-8"
              >
                <Hash className="text-purple-400" size={24} />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onTopicSelect("")}
                  className="cursor-pointer text-2xl font-bold"
                >
                  Shayari Kunj
                </motion.button>
              </motion.div>

              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onTopicSelect("all")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all
                    ${
                      selectedTopic === "all"
                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                        : "hover:bg-gray-800"
                    }`}
                >
                  All Shayaris
                </motion.button>

                {tags.map((tag) => (
                  <motion.button
                    key={tag}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onTopicSelect(tag)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all
                      ${
                        selectedTopic === tag
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                          : "hover:bg-gray-800"
                      }`}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
