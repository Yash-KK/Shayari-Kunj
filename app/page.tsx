"use client";
import React, { useState } from "react";
import { QuoteIcon, ArrowRight, Calendar, PenSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { shayaris } from "@/data/shayaris";
import ShayariCard from "@/components/ShayariCard";
import Sidebar from "@/components/SideBar";
import ShayariOfTheDay from "@/components/ShayariOfTheDay";
import SubmitShayari from "@/components/SubmitShayari";

function App() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShayariOfDayOpen, setIsShayariOfDayOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);

  const getShayariOfTheDay = () => {
    const today = new Date().toDateString();
    const seed = today
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const index = seed % shayaris.length;
    return shayaris[index];
  };

  const filteredShayaris = shayaris.filter((shayari) => {
    const matchesTopic =
      selectedTopic === "all" || shayari.tags.includes(selectedTopic);
    return matchesTopic;
  });

  const hasMore = filteredShayaris.length < shayaris.length;

  const renderLandingPage = () => (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div
        className="text-center max-w-3xl mx-auto"
      >
        <div
          className="flex justify-center mb-6"
        >
          <QuoteIcon size={60} className="text-purple-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
          Shayari Kunj – Alfazon Ka Ek Mehka Hua Bagh{" "}
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Dil ki gehraiyon se nikle alfaaz, jo mohabbat, zindagi aur jazbaat ka
          aaina hain. Hindi, Urdu aur English Shayari ka ek anokha sangam
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedTopic("all")}
          className="bg-purple-600 text-white px-8 py-4 rounded-full font-semibold 
            flex items-center gap-2 mx-auto hover:bg-purple-500 transition-colors
            shadow-lg shadow-purple-500/20"
        >
          Apni Shayari Ki Duniya Mein Kho Jao →
          <ArrowRight size={20} />
        </motion.button>
      </div>

      <div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
      >
        {["Love", "Life", "Philosophy"].map((topic, index) => (
          <div
            key={topic}
            // whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg text-center
      border border-purple-500/20 cursor-pointer"
            onClick={() => setSelectedTopic(topic)}
          >
            <h3 className="text-xl font-semibold mb-2 text-purple-400">
              {topic}
            </h3>
            <p className="text-gray-400">
              {topic === "Love"
                ? "Mohabbat ke rang, shayari ke sang."
                : topic === "Life"
                ? "Zindagi ki kahani, alfaazon ki zubaani."
                : "Soch jo dil aur dimaag dono ko choo jaaye."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderShayariList = () => (
    <>
      <div
        className="flex flex-col gap-6 mb-12"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <QuoteIcon size={40} className="text-purple-400" />
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              शायरियों का संग्रह
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsShayariOfDayOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/50 rounded-lg
                hover:bg-purple-600 transition-colors"
            >
              <Calendar size={20} />
              Shayari of the Day
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSubmitOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/50 rounded-lg
                hover:bg-purple-600 transition-colors"
            >
              <PenSquare size={20} />
              Submit Shayari
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredShayaris.map((shayari, index) => (
            <motion.div
              key={shayari.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
            >
              <ShayariCard shayari={shayari} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* {hasMore && (
        <div ref={ref} className="h-20 flex items-center justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
        </div>
      )} */}
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <Sidebar
        selectedTopic={selectedTopic}
        onTopicSelect={setSelectedTopic}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <main
        className={`transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"} p-8`}
      >
        <div className="max-w-7xl mx-auto">
          {selectedTopic ? renderShayariList() : renderLandingPage()}
        </div>
      </main>

      <ShayariOfTheDay
        isOpen={isShayariOfDayOpen}
        onClose={() => setIsShayariOfDayOpen(false)}
        shayari={getShayariOfTheDay()}
      />

      <SubmitShayari
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
      />
    </div>
  );
}

export default App;
