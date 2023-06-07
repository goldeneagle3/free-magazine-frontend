import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../config/urls";
import FormLayout from "../layouts/FormLayout";
import LogoCart from "../components/logo/LogoCart";
import { Alert, Snackbar, Stack, Typography } from "@mui/material";
import AuthButton from "../components/button/AuthButton";

const activation = async (params) => {
  try {
    let response = await fetch(BASE_URL + "/auth/confirmUser/" + params, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const Activation = () => {
  const { token } = useParams();
  const [values, setValues] = useState({
    error: "",
    open: false,
  });

  useEffect(() => {
    activation(token).then((data) => {
      if (data?.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", open: true });
      }
    });
  }, [token]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setValues({ ...values, open: false });
  };

  return (
    <FormLayout>
      <>
        {values?.error ? (
          <Typography textAlign="center" color="red">
            Hesabınız aktive edilemedi. Lütfen tekrar deneyin.
          </Typography>
        ) : (
          <Stack spacing={1} textAlign="center" sx={{ mb: 3 }}>
            <Typography fontWeight={1000} color="green">
              Hesabınız aktive edilmiştir. Giriş yaptıysanız anasayfaya
              yönelebilirsiniz eğer yapmasaydınız giriş yapabilirsiniz.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Link to="/auth">
                <AuthButton text="Giriş Yap" />
              </Link>
              <Link to="/home">
                <AuthButton text="Anasayfaya Git" />
              </Link>
            </Stack>
          </Stack>
        )}
      </>

      <LogoCart />

      <Snackbar
        open={values.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Tebrikler! Hesabınız başarıyla aktive edilmiştir.
        </Alert>
      </Snackbar>
    </FormLayout>
  );
};

export default Activation;
