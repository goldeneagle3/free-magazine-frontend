import ProfileLayout from "../layouts/ProfileLayout";
import FormLayout from "../layouts/FormLayout";
import NewPostComp from "../components/post-single/NewPostComp";

const NewPost = () => {
  return (
    <ProfileLayout>
      <FormLayout text="Yeni Yazınız">
        <NewPostComp />
      </FormLayout>
    </ProfileLayout>
  );
};

export default NewPost;
