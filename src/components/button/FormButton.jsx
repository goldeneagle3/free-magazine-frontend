import React from 'react';
import { Button, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

export default function FormButton({
  text,
  color,
  bgcolor,
  width,
  isDisabled,
  onClick
}) {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      component={motion.button}
      whileHover={{
        scale: 1.04,
        textShadow: '0px 0px 8px rgb(255,255,255)',
        boxShadow: '0px 0px 8px rgb(255,255,255)',
      }}
      animate={{ opacity: [0, 1], y: [150, 0] }}
      disabled={isDisabled}
      sx={{
        margin: 'auto',
        color: color,
        bgcolor: bgcolor,
        '&:hover': {
          bgcolor: color,
          color: bgcolor,
        },
        width: width,
        transition: theme.transitions.duration.shorter,
      }}
    >
      {text}
    </Button>
  );
}

