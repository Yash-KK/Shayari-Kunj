"use client"
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all";

  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-500/20",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-gray-700/50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...(props as HTMLMotionProps<"button">)}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
      )}
    </motion.button>
  );
}
