import React from "react";
import { Box, List, Typography } from "@mui/material";

import { useGetCategoriesQuery } from "../../features/categories/categorySlice";
import CategoriesSideList from "../list/CategoriesSideList";
import SidePost from "../post-single/SidePost";
import { useGetThreeRandomPostsQuery } from "../../features/posts/postSlice";
import MainLoadingComp from "../loading/MainLoadingComp";
import ResourceNotFound from "../error/ResourceNotFound";
import { useGetAuthorsQuery } from "../../features/user/usersSlice";
import { Link } from "react-router-dom";

export const RightSide = () => {
  const { data, isLoading, isError, error } = useGetCategoriesQuery();
  const {
    data: authors,
    isLoading: athLoading,
    isError: athIsErr,
    error: athErr,
  } = useGetAuthorsQuery();
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
        px: { xs: 4, sm: 19, md: 0 }
      }}
    >
      {/* Authors */}
      <h4 className="list-header">Yazarlar</h4>
      <List dense>
        {athLoading ? (
          <MainLoadingComp isLoading={athLoading} />
        ) : isError ? (
          <ResourceNotFound isError={athIsErr} error={athErr} />
        ) : (
          authors?.map((author) => (
            <Link to={"/users/" + author?.username} key={author?.id}>
              <h3 className="side-list-text">{author?.username}</h3>
            </Link>
          ))
        )}
      </List>
      <Typography
        variant="body2"
        sx={{ color: "GrayText", textAlign: "left", mb: 2 }}
        flexWrap={true}
      >
        Yazar kontenjanımız : {authors?.length} / 10
      </Typography>

      {/* Top Posts */}
      <h4 className="list-header u-margin-bottom-small u-margin-top-medium">
        Popüler Yazılar
      </h4>
      {postsLoading ? (
        <MainLoadingComp isLoading={postsLoading} />
      ) : postIsError ? (
        <ResourceNotFound isError={postIsError} error={postError} />
      ) : (
        sidePosts && sidePosts?.map((p) => <SidePost key={p?.id} post={p} />)
      )}

      {/* Categories */}
      <h4 className="list-header p-padding-bottom-small">Kategoriler</h4>
      {isLoading ? (
        <MainLoadingComp isLoading={isLoading} />
      ) : isError ? (
        <ResourceNotFound isError={isError} error={error} />
      ) : (
        data?.map((c) => <CategoriesSideList key={c.id} category={c} />)
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
