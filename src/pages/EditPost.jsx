import React from "react";
import EditPostComp from "../components/post-single/EditPostComp";

import ProfileLayout from "../layouts/ProfileLayout";
import FormLayout from "../layouts/FormLayout";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { postId } = useParams();

  return (
    <ProfileLayout>
      <FormLayout text="Metin Düzenle">
        <EditPostComp postId={postId} />
      </FormLayout>
    </ProfileLayout>
  );
};

export default EditPost;
