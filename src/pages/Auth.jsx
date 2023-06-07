import React from "react";
import { FormControlLabel, FormGroup } from "@mui/material";
import FormLayout from "../layouts/FormLayout";
import SignInForm from "../components/auth/SignInForm";
import SignUpForm from "../components/auth/SignUpForm";
import "../styles/sass/main.scss";
import { MaterialUISwitch } from "../utils/MaterialUISwitch";
import FormPageLayout from "../layouts/FormPageLayout";

const Auth = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <FormPageLayout>
      <FormGroup sx={{ mb: 2, mt: 4 }}>
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} />}
          label={checked ? "Giriş yap" : "Üye ol"}
          checked={checked}
          onChange={handleChange}
        />
      </FormGroup>
      <FormLayout text={checked ? "Dergiye Giriş Yap" : "Yeni Yazar Adayı"}>
        {checked ? <SignInForm /> : <SignUpForm setChecked />}
      </FormLayout>
    </FormPageLayout>
  );
};

export default Auth;
