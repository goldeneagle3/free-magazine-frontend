import React from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import ProfileLayout from "../layouts/ProfileLayout";
import FormLayout from "../layouts/FormLayout";
import SignInForm from "../components/auth/SignInForm";
import SignUpForm from "../components/auth/SignUpForm";
import "../styles/sass/main.scss";
import { MaterialUISwitch } from "../utils/MaterialUISwitch";

const Auth = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <ProfileLayout>
      <FormGroup sx={{ mb: 2, mt: 4 }}>
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} />}
          label={checked ? "Giriş yap" : "Üye ol"}
          checked={checked}
          onChange={handleChange}
        />
      </FormGroup>
      <FormLayout
        text={checked ? "Mekana Giriş Yap" : "Yeni Yazar Adayı"}
      >
        {checked ? <SignInForm /> : <SignUpForm setChecked />}
      </FormLayout>
    </ProfileLayout>
  );
};

export default Auth;
