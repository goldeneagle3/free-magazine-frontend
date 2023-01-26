import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import MainLoadingComp from "../components/loading/MainLoadingComp";

import { selectCurrentToken } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth.hook";
import useRefreshToken from "../hooks/useRefreshToken.hook";
import MainLayout from "../layouts/MainLayout";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const accessToken = useSelector(selectCurrentToken);
  const { persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <MainLayout>
          <MainLoadingComp isLoading={isLoading} />{" "}
        </MainLayout>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
