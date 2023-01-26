import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import MainLoadingComp from "../components/loading/MainLoadingComp";

import useRefreshToken from "../hooks/useRefreshToken.hook";
import MainLayout from "../layouts/MainLayout";
import { checkAuthByCookie } from "../validation/conditions/checkAuthByBrowserCookie";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

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
    checkAuthByCookie() ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {!checkAuthByCookie() ? (
        <Outlet />
      ) : isLoading ? (
        <MainLayout>
          <MainLoadingComp isLoading={isLoading} />
        </MainLayout>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
