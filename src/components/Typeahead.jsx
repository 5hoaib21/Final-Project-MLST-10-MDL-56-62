"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Typeahead({ 
  words = ["Developer", "Designer", "Innovator"], 
  delay = 2500 
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Proti delay interval por por loop keywords er index change hobe
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, delay);

    return () => clearInterval(interval);
  }, [words, delay]);

  return (
    <span className="inline-flex items-center relative text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 font-bold">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          // Initial entry configuration state
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          // Final visible rendering dynamic interpolation properties
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          // Exit layout transformation configurations
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ 
            duration: 0.4, 
            ease: "easeInOut" 
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>

      {/* Motion-based Blinking Typing Cursor */}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ 
          duration: 0.8, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="w-[3px] h-[1em] ml-1 bg-purple-500 dark:bg-pink-500 inline-block align-middle"
      />
    </span>
  );
}