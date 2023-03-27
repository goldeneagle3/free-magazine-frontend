import React from "react";
import ContactBoxComp from "../components/contact/ContactBoxComp";
import ContactFormComp from "../components/contact/ContactFormComp";
import FormLayout from "../layouts/FormLayout";
import ProfileLayout from "../layouts/ProfileLayout";

const Contact = () => {
  return (
    <ProfileLayout bgColorBlack={true}>
      <FormLayout text="İLETİŞİM HATTI">
        <ContactBoxComp />
        <ContactFormComp />
      </FormLayout>
    </ProfileLayout>
  );
};

export default Contact;
