import { QuoteIcon, Calendar, PenSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Shayari } from "@/data/shayaris";
import ShayariCard from "./ShayariCard";


interface RenderShayariListProps {
    setIsShayariOfDayOpen: (value:boolean) => void
    setIsSubmitOpen: (value:boolean) => void
    filteredShayaris: Shayari[]
} 
const RenderShayariList = ({setIsShayariOfDayOpen, setIsSubmitOpen, filteredShayaris}: RenderShayariListProps) => {
  return (
    <>
      <div className="flex flex-col gap-6 mb-12">
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
    </>
  );
};

export default RenderShayariList;
