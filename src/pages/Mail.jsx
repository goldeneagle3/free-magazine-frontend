import React from "react";
import MailListComp from "../components/mail/MailListComp";
import { useGetMessagesQuery } from "../features/contact/contactSlice";
import ProfileLayout from "../layouts/ProfileLayout";
import DataFetchingScreen from "../utils/DataFetchingScreen";

const Mail = () => {
  const { data, isLoading, isError, error } = useGetMessagesQuery();

  return (
    <ProfileLayout>
      <h3 className="heading-secondary">Mail Sayfası</h3>
      <DataFetchingScreen
        isError={isError}
        isLoading={isLoading}
        error={error}
      />
      <MailListComp mails={data} />
    </ProfileLayout>
  );
};

export default Mail;
