import React from "react";
import { Box, List, Stack, Typography } from "@mui/material";

import { useGetCategoriesQuery } from "../../features/categories/categorySlice";
import CategoriesSideList from "../list/CategoriesSideList";
import SidePost from "../post-single/SidePost";
import { useGetThreeRandomPostsQuery } from "../../features/posts/postSlice";
import MainLoadingComp from "../loading/MainLoadingComp";
import ResourceNotFound from "../error/ResourceNotFound";
import { useGetAuthorsQuery } from "../../features/user/usersSlice";
import { Link } from "react-router-dom";
import { shortIntroText } from "../../utils/shortIntroText";
import { dipnot } from "../../utils/dipnot";

export const RightSide = () => {
  const boxStyle = { border: "1px solid #cccccc48", p: 1 };
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
        gap: 1,
        px: { xs: 3, sm: 19, md: 0 },
      }}
    >
      {/* Authors */}
      <Stack sx={boxStyle}>
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
                <br />
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
      </Stack>

      {/* Top Posts */}
      <Stack sx={boxStyle}>
        <h4 className="list-header u-margin-bottom-small">Popüler Yazılar</h4>
        {postsLoading ? (
          <MainLoadingComp isLoading={postsLoading} />
        ) : postIsError ? (
          <ResourceNotFound isError={postIsError} error={postError} />
        ) : (
          sidePosts && sidePosts?.map((p) => <SidePost key={p?.id} post={p} />)
        )}
      </Stack>

      {/* Categories */}
      <Stack sx={{ ...boxStyle, pb: 4 }}>
        <h4 className="list-header p-padding-bottom-small">Kategoriler</h4>
        {isLoading ? (
          <MainLoadingComp isLoading={isLoading} />
        ) : isError ? (
          <ResourceNotFound isError={isError} error={error} />
        ) : (
          data?.map((c) => <CategoriesSideList key={c.id} category={c} />)
        )}
      </Stack>

      {/* Bilgilendirme */}
      <Stack sx={{ ...boxStyle, pb: 4 }}>
        <h4 className="list-header u-margin-bottom-small u-margin-top-medium">
          Bilgilendirme
        </h4>
        <p className="paragraph--parsed">{shortIntroText}</p>
      </Stack>

      {/* Dipnot - Misafir Kullanici */}
      <Stack sx={{ ...boxStyle, pb: 4 }}>
        <h4 className="list-header u-margin-bottom-small u-margin-top-medium">
          &#33; Dipnot
        </h4>
        <p className="paragraph--parsed">{dipnot}</p>
      </Stack>
    </Box>
  );
};
