import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import Logo from "../assets/img/logodnm4.png";
import { BRAND } from "../config/constants";

const FormLayout = ({ children, text }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box
          sx={{
            border: 1,
            margin: "5rem auto",
            padding: { xs: 2, md: 3 },
            borderColor: { xs: "#fff", md: "#cccccc" },
            borderRadius: "5px",
            maxWidth: 800,
            width: "100%",
          }}
        >
          <Typography
            sx={{ mb: 2, fontWeight: 800 }}
            variant="h4"
            align="center"
            component="h1"
          >
            {text}
          </Typography>
          {children}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img
          src={Logo}
          alt="logo"
          style={{
            objectFit: "cover",
            width: "11rem",
            maxHeight: "100%",
            justifyContent: "center",
          }}
        />
        <h3 className="list-header">{BRAND}</h3>
      </Grid>
    </Grid>
  );
};

export default FormLayout;
