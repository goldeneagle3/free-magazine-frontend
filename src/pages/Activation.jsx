import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../config/urls";
import FormLayout from "../layouts/FormLayout";
import { Stack, Typography } from "@mui/material";
import AuthButton from "../components/button/AuthButton";
import { checkTokenIsBroken } from "../validation/conditions/checkTokenIsBroken";

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
    message: "",
    open: false,
  });

  useEffect(() => {
    activation(token).then((data) => {
      // console.log(data);
      setValues({ ...values, open: true, message: data?.message });
    });
  }, [token]);


  return (
    <FormLayout>
      <>
        {checkTokenIsBroken(values.message) ? (
          <Typography textAlign="center" color="red" sx={{ mb: 2 }}>
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
    </FormLayout>
  );
};

export default Activation;
