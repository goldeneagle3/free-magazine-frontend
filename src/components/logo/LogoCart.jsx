import React from "react";
import { Stack } from "@mui/material";

import Logo from "./../../assets/img/logodnm4.png";
import { BRAND } from "../../config/constants";

const LogoCart = ({ isMini }) => {
  return (
    <Stack alignItems="center">
      {isMini ? (
        <>
          <img
            src={Logo}
            alt="logo"
            style={{
              objectFit: "cover",
              width: "3rem",
              maxHeight: "100%",
              justifyContent: "center",
            }}
          />
          <h3 className="list-header--mini">{BRAND}</h3>
        </>
      ) : (
        <>
          <img
            src={Logo}
            alt="logo"
            style={{
              objectFit: "cover",
              width: "9rem",
              maxHeight: "100%",
              justifyContent: "center",
            }}
          />
          <h3 className="list-header">{BRAND}</h3>
        </>
      )}
    </Stack>
  );
};

export default LogoCart;
