import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Check, Clock, Wallet, ArrowRight } from "lucide-react";

interface SubmitShayariProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  text: string;
  author: string;
  topics: string;
}

type SubmissionType = "free" | "premium";

export default function SubmitShayari({ isOpen, onClose }: SubmitShayariProps) {
  const [formData, setFormData] = useState<FormData>({
    text: "",
    author: "",
    topics: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionType, setSubmissionType] = useState<SubmissionType>("free");
  const [selectedCrypto, setSelectedCrypto] = useState<"ethereum" | "solana">(
    "ethereum"
  );
  const [step, setStep] = useState<"choose" | "form" | "payment">("choose");

  const cryptoAddresses = {
    ethereum: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    solana: "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({ text: "", author: "", topics: "" });
      setStep("choose");
    }, 2000);
  };

  const renderChooseType = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-200 mb-4">
        Choose Submission Type
      </h3>

      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => {
          setSubmissionType("free");
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

      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => {
          setSubmissionType("premium");
          setStep("form");
        }}
        className="bg-purple-900/50 p-6 rounded-lg cursor-pointer border border-purple-500 hover:border-purple-400"
      >
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-lg font-medium">Premium Review</h4>
          <Wallet size={24} className="text-purple-400" />
        </div>
        <p className="text-gray-400">
          Pay with crypto for guaranteed 24-hour review
        </p>
        <div className="flex gap-2 mt-4">
          <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
            Ethereum
          </span>
          <span className="px-3 py-1 bg-purple-500/20 rounded-full text-sm">
            Solana
          </span>
        </div>
      </motion.div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-200 mb-4">
        Complete Payment
      </h3>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedCrypto("ethereum")}
          className={`flex-1 p-4 rounded-lg border transition-all ${
            selectedCrypto === "ethereum"
              ? "border-purple-500 bg-purple-900/50"
              : "border-gray-600 bg-gray-700/50"
          }`}
        >
          <h4 className="font-medium mb-1">Ethereum</h4>
          <p className="text-sm text-gray-400">0.01 ETH</p>
        </button>

        <button
          onClick={() => setSelectedCrypto("solana")}
          className={`flex-1 p-4 rounded-lg border transition-all ${
            selectedCrypto === "solana"
              ? "border-purple-500 bg-purple-900/50"
              : "border-gray-600 bg-gray-700/50"
          }`}
        >
          <h4 className="font-medium mb-1">Solana</h4>
          <p className="text-sm text-gray-400">0.5 SOL</p>
        </button>
      </div>

      <div className="bg-gray-700/50 p-4 rounded-lg">
        <p className="text-sm text-gray-400 mb-2">Send payment to:</p>
        <p className="font-mono text-sm break-all bg-gray-800 p-2 rounded border border-gray-600">
          {cryptoAddresses[selectedCrypto]}
        </p>
      </div>

      <p className="text-sm text-gray-400">
        After payment, your submission will be reviewed within 24 hours.
      </p>

      <button
        onClick={handleSubmit}
        className="w-full bg-purple-600 text-white rounded-lg px-4 py-2 
          flex items-center justify-center gap-2 hover:bg-purple-500 
          transition-colors"
      >
        <Check size={18} />
        Confirm Submission
      </button>
    </div>
  );

  const renderForm = () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (submissionType === "premium") {
          setStep("payment");
        } else {
          handleSubmit(e);
        }
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Your Shayari
        </label>
        <textarea
          required
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white
            border border-gray-600 focus:border-purple-500 focus:ring-2 
            focus:ring-purple-500 focus:outline-none"
          rows={4}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Author Name
        </label>
        <input
          type="text"
          required
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder="Defaults to Unknown"
          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white
            border border-gray-600 focus:border-purple-500 focus:ring-2 
            focus:ring-purple-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">
          Tags (comma separated)
        </label>
        <input
          type="text"
          required
          value={formData.topics}
          onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
          className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white
            border border-gray-600 focus:border-purple-500 focus:ring-2 
            focus:ring-purple-500 focus:outline-none"
          placeholder="Love, Life, Philosophy"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white rounded-lg px-4 py-2 
          flex items-center justify-center gap-2 hover:bg-purple-500 
          transition-colors"
      >
        {submissionType === "premium" ? (
          <>
            Continue to Payment
            <ArrowRight size={18} />
          </>
        ) : (
          <>
            <Send size={18} />
            Submit Shayari
          </>
        )}
      </button>
    </form>
  );

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
                {step !== "choose" && (
                  <button
                    onClick={() => setStep("choose")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <ArrowRight size={20} className="rotate-180" />
                  </button>
                )}
                <h2 className="text-xl font-semibold">Submit Your Shayari</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <Check size={48} className="text-green-500 mx-auto mb-4" />
                <p className="text-lg text-gray-200">
                  {submissionType === "premium"
                    ? "Thank you for your submission! We will review it within 24 hours."
                    : "Thank you for your submission! Our admin will review it shortly."}
                </p>
              </motion.div>
            ) : (
              <>
                {step === "choose" && renderChooseType()}
                {step === "form" && renderForm()}
                {step === "payment" && renderPayment()}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
