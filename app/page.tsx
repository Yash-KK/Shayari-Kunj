"use client";
import React, { useState, useEffect } from "react";
import { fetchShayaris, Shayari } from "@/data/shayaris";
import Sidebar from "@/components/SideBar";
import ShayariOfTheDay from "@/components/ShayariOfTheDay";
import SubmitShayari from "@/components/SubmitShayari";
import LandingPage from "@/components/LandingPage";
import ShayariList from "@/components/ShayariList";

function App() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isShayariOfDayOpen, setIsShayariOfDayOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [shayaris, setShayaris] = useState<Shayari[]>([]);

  useEffect(() => {
    const loadShayaris = async () => {
      const data = await fetchShayaris();
      setShayaris(data);
    };

    loadShayaris();
  }, []);

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
          {selectedTopic ? (
            <ShayariList
              setIsShayariOfDayOpen={setIsShayariOfDayOpen}
              setIsSubmitOpen={setIsSubmitOpen}
              filteredShayaris={filteredShayaris}
            />
          ) : (
            <LandingPage setSelectedTopic={setSelectedTopic} />
          )}
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
