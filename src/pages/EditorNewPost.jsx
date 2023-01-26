import React from "react";
import EditorNewPostComp from "../components/post-single/EditorNewPostComp";
import FormLayout from "../layouts/FormLayout";
import ProfileLayout from "../layouts/ProfileLayout";

const EditorNewPost = () => {
  return (
    <ProfileLayout>
      <FormLayout text="Yeni Yazınız (Editor)">
        <EditorNewPostComp />
      </FormLayout>
    </ProfileLayout>
  );
};

export default EditorNewPost;
