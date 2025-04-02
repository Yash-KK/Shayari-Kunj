import { motion } from "framer-motion";
import { QuoteIcon, ArrowRight } from "lucide-react";

interface LandingPageProps {
  setSelectedTopic: (topic: string) => void;
}
const LandingPage = ({ setSelectedTopic }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <QuoteIcon size={60} className="text-purple-400" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400">
          <div className="font-bubblegum text-8xl">Shayari Kunj</div>
          <div className="font-bubblegum ">
            {" "}
            – Alfazon Ka Ek Mehka Hua Bagh{" "}
          </div>
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

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {["Love", "Life", "Philosophy"].map((topic) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            key={topic}
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
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
