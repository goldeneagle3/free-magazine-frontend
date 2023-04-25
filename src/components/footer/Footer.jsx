import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { MdEmail, MdPhone } from "react-icons/md";

import Logo from "./../../assets/img/logodnm4.png";
import "./../../styles/sass/main.scss";
import { BRAND } from "../../config/constants";
import { shortIntroText } from "../../utils/shortIntroText";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__logo-box">
        <img
          className="footer__logo"
          srcSet={`${Logo} 1x, ${Logo} 2x`}
          alt="Full logo"
          src={Logo}
        />
        <h3 className="list-header">{BRAND}</h3>
      </div>
      <Container sx={{ margin: "auto" }}>
        <Grid container spacing={2} sx={{ p: 3 }}>
          <Grid xs={12} md={6} sx={{ mb: { xs: 3, md: 0 } }}>
            <div className="footer__navigation">
              <ul className="footer__list">
                <li className="footer__item">
                  <Link to="/home" className="footer__link">
                    Ana Sayfa
                  </Link>
                </li>
                <li className="footer__item">
                  <Link to="/contact-us" className="footer__link">
                    İletişim
                  </Link>
                </li>
                <li className="footer__item">
                  <Link to="/construction" className="footer__link">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li className="footer__item">
                  <Link to="/construction" className="footer__link">
                    Kullanım Şartları
                  </Link>
                </li>
              </ul>
              <Stack
                spacing={1}
                sx={{
                  mt: 2,
                  ml: { xs: 3, md: 0 },
                  justifyContent: "flex-start",
                  color: "white",
                  letterSpacing: 1,
                }}
              >
                <Stack
                  direction="row"
                  spacing={5}
                  sx={{ alignItems: "center" }}
                >
                  <MdEmail />
                  <p>gugultas@gmail.com</p>
                </Stack>
                <Stack
                  direction="row"
                  spacing={5}
                  sx={{ alignItems: "center" }}
                >
                  <MdPhone />
                  <p>212 000 00 00</p>
                </Stack>
              </Stack>
            </div>
          </Grid>
          <Grid xs={12} md={6}>
            <p className="footer__copyright">{shortIntroText}</p>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, mb: 0, pb: 0 }}>
          <p style={{ color: "#af70ee" }}>{BRAND} 0.0.1</p>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
