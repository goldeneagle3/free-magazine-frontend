import React from "react";
import { motion } from "framer-motion";

import "./../../styles/sass/main.scss";

export default function AuthButton({ text }) {
  return (
    <motion.button
      animate={{ x: [40, 0], y: [-200, 0], opacity: [0.4, 1] }}
      whileHover={{
        scale: 1.02,
        textShadow: "0px 0px 8px #9b1c46",
        boxShadow: "0px 0px 8px rgb(240,255,255)",
      }}
      className="custom-button"
    >
      {text.toUpperCase()}
    </motion.button>
  );
}
