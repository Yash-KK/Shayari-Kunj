import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface ChoosePaymentTypeProps {
  setStep: (step: "form" | "choose" | "payment") => void;
}
const ChoosePaymentType = ({ setStep }: ChoosePaymentTypeProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-200 mb-4">
        Choose Submission Type
      </h3>

      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => {
          setStep("form");
        }}
        className="bg-gray-700/50 p-6 rounded-lg cursor-pointer border border-gray-600 hover:border-purple-500"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-medium">Free Submission</h4>
          <Clock size={24} className="text-gray-400" />
        </div>
        <p className="text-gray-400">
          Submit for free and wait for admin approval (1-2 weeks)
        </p>
      </motion.div>
    </div>
  );
};
export default ChoosePaymentType;
