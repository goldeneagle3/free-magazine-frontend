import { Stack } from "@mui/system";
import React from "react";

const ContactBoxInfoBoxComp = ({ icon, text }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: "100%",
        border: "1px",
        borderRadius: "7px",
        p: 1.5,
        bgcolor: "#2f2d2d",
        fontSize: 30,
        color: "white",
      }}
    >
      {icon}
      <h5 className="info-text white-1">{text}</h5>
    </Stack>
  );
};

export default ContactBoxInfoBoxComp;
