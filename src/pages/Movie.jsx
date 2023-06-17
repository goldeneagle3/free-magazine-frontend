import React from "react";
import { useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../features/masterpiece/masterpieceSlice";
import MainLayout from "../layouts/MainLayout";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import MasterpieceById from "../components/masterpiece/MasterpieceById";

const Movie = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetMovieByIdQuery(id);

  return (
    <MainLayout>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : (
        <MasterpieceById data={data} />
      )}
    </MainLayout>
  );
};

export default Movie;
