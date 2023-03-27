import React from "react";
import ResourceNotFound from "../components/error/ResourceNotFound";
import MainLoadingComp from "../components/loading/MainLoadingComp";

const DataFetchingScreen = ({ isLoading, isError, error }) => {
  return (
    <div>
      {isLoading && <MainLoadingComp isLoading={isLoading} />}
      {isError && <ResourceNotFound isError={isError} error={error} />}
    </div>
  );
};

export default DataFetchingScreen;
