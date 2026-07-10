import { AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const IntroAnimation = ({ onFinish }) => {
  const greetings = useMemo(
    () => [
      "Hello",
      "नमस्ते",
      "Hola",
      "Bonjour",
      "Ciao",
      "Olá",
      "Здравствуйте",
      "Merhaba",
      "Γειά",
      "Hej",
      "Hallo",
      "Salam",
    ],
    [],
  );
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((i) => i + 1);
      }, 180);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden "
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.5,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={index}
              className="text-5xl md:text-7xl lg:text-8xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.1 }}
            >
              {greetings[index]}
            </motion.h1>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
