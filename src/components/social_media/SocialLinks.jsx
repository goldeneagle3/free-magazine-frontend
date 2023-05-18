import { Stack, useTheme } from "@mui/material";
import React from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";

const SocialLinks = ({ color, size }) => {
  const theme = useTheme();
  const navColor =
    color === "light"
      ? theme.palette.primary.light
      : theme.palette.primary.dark;
  const navSize = size === "small" ? 9 : 20;

  return (
    <Stack
      direction="row"
      spacing={size === "small" ? 0.5 : 2}
      alignItems="center"
      sx={{ mt: { xs: 0, md: 1 }, mx: { xs: 0, md: 3 } }}
    >
      <a href="https://www.facebook.com">
        <BsFacebook size={navSize} color={navColor} />
      </a>
      <a href="https://www.instagram.com">
        <BsInstagram size={navSize} color={navColor} />
      </a>
      <a href="https://twitter.com">
        <BsTwitter size={navSize} color={navColor} />
      </a>
      <a href="https://youtube.com">
        <BsYoutube size={navSize} color={navColor} />
      </a>
    </Stack>
  );
};

export default SocialLinks;
