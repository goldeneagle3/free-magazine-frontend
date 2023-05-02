import React from "react";
import { motion } from "framer-motion";

import "./../../styles/sass/main.scss";
import { useTheme } from "@mui/material";

export default function AuthButton({ text }) {
  const theme = useTheme();
  return (
    <motion.button
      animate={{ x: [40, 0], y: [-200, 0], opacity: [0.4, 1] }}
      whileHover={{
        scale: 1.02,
        textShadow: `0px 0px 8px ${theme.palette.primary.main}`,
        boxShadow: `0px 0px 8px ${theme.palette.primary.main}`,
      }}
      className="custom-button"
    >
      {text.toUpperCase()}
    </motion.button>
  );
}
