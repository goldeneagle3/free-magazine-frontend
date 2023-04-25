import React from "react";
import ResourceNotFound from "../components/error/ResourceNotFound";
import UsersList from "../components/list/UsersList";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import { useGetAllUsersQuery } from "../features/user/usersSlice";
import ProfileLayout from "../layouts/ProfileLayout";

const Users = () => {
  const { data, isLoading, isError, error } = useGetAllUsersQuery();
  return (
    <ProfileLayout>
      {isLoading && <MainLoadingComp isLoading={isLoading} />}
      {isError && <ResourceNotFound isError={isError} error={error} />}
      <UsersList users={data} />
    </ProfileLayout>
  );
};

export default Users;
