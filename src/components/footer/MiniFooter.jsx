import React from "react";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

import LogoCart from "../logo/LogoCart.jsx";
import SocialLinks from "../social_media/SocialLinks.jsx";

const MiniFooter = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      sx={{
        bgcolor: theme.palette.primary.dark,
        color: "white",
        maxWidth: "100%",
        height: "auto",
        mt: { xs: 0, md: 10 },
        mb: 0,
        px: { xs: 0.5, md: 5 },
        py: 1,
        justifyContent: "center",
      }}
    >
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <LogoCart isMini={matches && true} />
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "3rem" },
            fontFamily: '"Anybody", cursive;',
            color: theme.palette.primary.light,
          }}
        >
          ÖZGÜN , KESKİN VE SAĞLAM
        </Typography>

        <SocialLinks color="light" size={matches && "small"} />
      </Stack>
    </Stack>
  );
};

export default MiniFooter;
