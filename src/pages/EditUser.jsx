import React from "react";
import EditUserComp from "../components/profile/EditUserComp";

import ProfileLayout from "../layouts/ProfileLayout";
import FormLayout from "../layouts/FormLayout";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { username } = useParams();

  return (
    <ProfileLayout>
      <FormLayout text="Profil Düzenleme">
        <EditUserComp username={username} />
      </FormLayout>
    </ProfileLayout>
  );
};

export default EditUser;
