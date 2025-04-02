import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight, Cross } from "lucide-react";
import ChoosePaymentType from "./SubmitShayari/ChooseSubmitType";
import Form from "./SubmitShayari/Form";
import { submitShayari } from "@/data/shayaris";

interface SubmitShayariProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  description: string;
  author: string;
  tags: string;
}

export default function SubmitShayari({ isOpen, onClose }: SubmitShayariProps) {
  const [formData, setFormData] = useState<FormData>({
    description: "",
    author: "",
    tags: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [step, setStep] = useState<"choose" | "form" | "payment">("choose");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    try {
      const response = await submitShayari({ formData, tagsArray });

      const result = await response.json();
      if (result.status) {
        setIsSubmitted(false);
        onClose();
        setFormData({ description: "", author: "", tags: "" });
        setStep("choose");
      } else {
        setDisplayError(true);
      }
    } catch (error) {
      console.error("Error submitting shayari:", error);
      setDisplayError(true);
    }
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
                  Thank you for your submission! Our admin will review it
                  shortly.
                </p>
              </motion.div>
            ) : (
              <>
                {step === "choose" && <ChoosePaymentType setStep={setStep} />}
                {step === "form" && (
                  <Form
                    formData={formData}
                    setFormData={setFormData}
                    handleSubmit={handleSubmit}
                  />
                )}
              </>
            )}

            {displayError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <Cross size={48} className="text-red-500 mx-auto mb-4" />
                <p className="text-lg text-gray-200">
                  Oops! Something went wrong while submitting your Shayari.
                  Please try again later.{" "}
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
