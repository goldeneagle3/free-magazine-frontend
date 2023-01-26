import React from "react";
import { Box } from "@mui/material";

import { useGetCategoriesQuery } from "../../features/categories/categorySlice";
import CategoriesSideList from "../list/CategoriesSideList";
import SidePost from "../post-single/SidePost";
import { useGetThreeRandomPostsQuery } from "../../features/posts/postSlice";
import MainLoadingComp from "../loading/MainLoadingComp";
import ResourceNotFound from "../error/ResourceNotFound";

export const RightSide = () => {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  const {
    data: sidePosts,
    isLoading: postsLoading,
    isError: postIsError,
    error: postError,
  } = useGetThreeRandomPostsQuery();

  return (
    <Box
      sx={{
        mr: 2,
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        gap: { md: 0, lg: 1 },
      }}
    >
      <h4 className="list-header p-padding-bottom-small">Kategoriler</h4>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : isError ? (
        <ResourceNotFound isError={isError} error={error} />
      ) : (
        data?.map((c) => <CategoriesSideList key={c.id} category={c} />)
      )}

      <h4 className="list-header u-margin-bottom-small u-margin-top-medium">
        Popular Yazılar
      </h4>
      {postsLoading ? (
        <MainLoadingComp isLoading={postsLoading} />
      ) : postIsError ? (
        <ResourceNotFound isError={postIsError} error={postError} />
      ) : (
        sidePosts && sidePosts?.map((p) => <SidePost key={p?.id} post={p} />)
      )}

      <h4 className="list-header u-margin-bottom-small u-margin-top-medium">
        Bilgilendirme
      </h4>
      <p className="paragraph">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum officiis
        minus voluptatibus laborum ab nemo accusantium itaque quibusdam
        reprehenderit, sunt delectus veritatis est earum in, recusandae velit
        assumenda eaque magni doloribus veniam perferendis? Fuga laborum natus
        qui sit eos dolores vel minus rem officiis amet, sint reprehenderit eius
        aspernatur voluptas!
      </p>
    </Box>
  );
};
