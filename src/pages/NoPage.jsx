import { Stack } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import AuthButton from "../components/button/AuthButton";
import ReturnButton from "../components/button/ReturnButton";
import MainLayout from "../layouts/MainLayout";
import NoFoundImage from "./../assets/img/404.png";

const NoPage = () => {
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";

  return (
    <MainLayout>
      <Stack spacing={4} sx={{ alignItems: "center" }}>
        <img
          src={NoFoundImage}
          alt="Page Not Found"
          style={{ height: "350px" }}
        />
        <h4 className="heading-tertiary">Aradığınız Sayfa Bulunamadı.</h4>
        <ReturnButton />
        <Link to={from}>
          <AuthButton text="Anasayfaya Dön" />
        </Link>
      </Stack>
    </MainLayout>
  );
};

export default NoPage;
