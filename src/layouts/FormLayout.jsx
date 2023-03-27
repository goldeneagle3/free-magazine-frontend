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
            border: { xs: 0, md: 1 },
            margin: "3rem auto",
            padding: { xs: 2, md: 3 },
            borderColor: { md: "#cccccc" },
            borderRadius: { xs: 0, md: "5px" },
            maxWidth: 800,
            width: "100%",
          }}
        >
          <Typography
            sx={{
              mb: 5,
              fontWeight: 900,
              fontFamily: '"Roboto", sans-serif',
              borderLeft: "2px dotted black",
              borderRight: "2px dotted black",
              borderTop: "2px dotted black",
              pt:3
            }}
            variant="h4"
            align="center"
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
