import { Stack } from "@mui/material";
import React from "react";
import { MdEmail, MdPhone } from "react-icons/md";
import ContactBoxInfoBoxComp from "./ContactBoxInfoBoxComp";

const ContactBoxComp = () => {
  return (
    <Stack spacing={2} sx={{ maxWidth: 400, margin: "auto", mb: 6 }}>
      <ContactBoxInfoBoxComp icon={<MdPhone />} text="+90212 000 00 00" />
      <ContactBoxInfoBoxComp icon={<MdEmail />} text="gugultas@gmail.com" />
    </Stack>
  );
};

export default ContactBoxComp;
