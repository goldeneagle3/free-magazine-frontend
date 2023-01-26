import React from "react";
import { Stack } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import ConstructionImage from "./../assets/img/construction.png";
import MainLayout from "../layouts/MainLayout";
import AuthButton from "../components/button/AuthButton";
import ReturnButton from "../components/button/ReturnButton";

const Construction = () => {
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home";
  return (
    <MainLayout>
      <Stack spacing={4} sx={{ alignItems: "center" }}>
        <img
          src={ConstructionImage}
          alt="logo"
          style={{
            height: "350px",
          }}
        />
        <h4 className="heading-primary--sub">Yapım Aşamasında</h4>
        <ReturnButton />
        <Link to={from}>
          <AuthButton text="Anasayfaya Dön" />
        </Link>
      </Stack>
      ;
    </MainLayout>
  );
};

export default Construction;
