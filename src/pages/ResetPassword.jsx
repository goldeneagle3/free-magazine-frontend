import React from "react";
import { useParams } from "react-router-dom";
import FormLayout from "../layouts/FormLayout";
import ResetPasswordComp from "../components/auth/ResetPasswordComp";
import FormPageLayout from "../layouts/FormPageLayout";

const ResetPassword = () => {
  const { token } = useParams();

  return (
    <FormPageLayout>
      <FormLayout text="Şifre Resetleme">
        <ResetPasswordComp token={token} />
      </FormLayout>
    </FormPageLayout>
  );
};

export default ResetPassword;
