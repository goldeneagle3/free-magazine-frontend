import { Stack } from "@mui/material";
import React from "react";
import { MdPhone } from "react-icons/md";
import { SiGmail, SiMicrosoftoutlook } from "react-icons/si";

import ContactBoxInfoBoxComp from "./ContactBoxInfoBoxComp";
import { googleMail, outlookMail, phoneNumber } from "../../config/constants";

const ContactBoxComp = () => {
  return (
    <Stack spacing={1.2} sx={{ maxWidth: 400, margin: "auto", mb: 6 }}>
      <ContactBoxInfoBoxComp icon={<MdPhone />} text={phoneNumber} />
      <ContactBoxInfoBoxComp icon={<SiGmail />} text={googleMail} />
      <ContactBoxInfoBoxComp icon={<SiMicrosoftoutlook />} text={outlookMail} />
    </Stack>
  );
};

export default ContactBoxComp;
