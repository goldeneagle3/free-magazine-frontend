import React from "react";
import { useParams } from "react-router-dom";
import SingleMailComp from "../components/mail/SingleMailComp";
import { useGetSingleMessageQuery } from "../features/contact/contactSlice";
import ProfileLayout from "../layouts/ProfileLayout";
import DataFetchingScreen from "../utils/DataFetchingScreen";

const SingleMail = () => {
  const { messageId } = useParams();

  const { data, isLoading, isError, error } =
    useGetSingleMessageQuery(messageId);

  return (
    <ProfileLayout>
      <DataFetchingScreen
        isError={isError}
        isLoading={isLoading}
        error={error}
      />
      <SingleMailComp message={data} />
    </ProfileLayout>
  );
};

export default SingleMail;
