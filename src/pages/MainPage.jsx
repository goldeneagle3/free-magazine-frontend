import {
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

import ResourceNotFound from "../components/error/ResourceNotFound";
import CategoriesSideList from "../components/list/CategoriesSideList";
import MainLoadingComp from "../components/loading/MainLoadingComp";
import AuthorsAvatar from "../components/mainPageComps/AuthorsAvatar";
import DesktopNavbar from "../components/navbar/DesktopNavbar";
import PostCard from "../components/post-card/PostCard";
import PostCarousel from "../components/post-carousel/PostCarousel";
import PlainPostCard from "../components/post-single/PlainPostCard";
import SidePost from "../components/post-single/SidePost";
import { RightSide } from "../components/sides/RightSide";
import { BRAND } from "../config/constants";
import { useGetCategoriesQuery } from "../features/categories/categorySlice";
import {
  useGetFirstFivePostsQuery,
  useGetFourPostsForTopQuery,
  useGetMainPagePostsQuery,
  useGetThreeRandomPostsQuery,
} from "../features/posts/postSlice";
import PostsList from "../features/posts/PostsList";
import MainPageLayout from "../layouts/MainPageLayout";
import Logo from "./../assets/img/logodnm4.png";
import LogoCart from "../components/logo/LogoCart";
import MiniFooter from "../components/footer/MiniFooter";
import { shortestIntroText } from "../utils/shortestIntroText";
import Navbar from "../components/navbar/Navbar";
import ShowTopsOfMasterpiecesComp from "../components/masterpiece/ShowTopsOfMasterpiecesComp";

const MainPage = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const { data, isLoading } = useGetFirstFivePostsQuery();
  const { data: fourPost, isLoading: fourLoading } =
    useGetFourPostsForTopQuery();
  const { data: mainPosts, isLoading: mainLoading } =
    useGetMainPagePostsQuery();
  const { data: categories, isLoading: categoryLoading } =
    useGetCategoriesQuery();
  const {
    data: sidePosts,
    isLoading: postsLoading,
    isError: postIsError,
    error: postError,
  } = useGetThreeRandomPostsQuery();
  return (
    <>
      <DesktopNavbar />
      <Navbar />
      {matches ? (
        <>
          <MainPageLayout>
            {(isLoading || fourLoading || mainLoading || categoryLoading) && (
              <MainLoadingComp
                isLoading={
                  isLoading || fourLoading || mainLoading || categoryLoading
                }
              />
            )}

            <>
              <Grid container spacing={5}>
                {fourPost?.map((a) => (
                  <Grid item md={3} key={a.id}>
                    <PlainPostCard post={a} />
                  </Grid>
                ))}
                <Grid item xs={12} md={8}>
                  <PostCarousel posts={data} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Stack>
                    <Stack alignItems="center">
                      <img
                        src={Logo}
                        alt="logo"
                        style={{
                          objectFit: "cover",
                          width: "11rem",
                          maxHeight: "100%",
                          justifyContent: "center",
                        }}
                      />
                      <h3 className="list-header">{BRAND}</h3>
                    </Stack>
                    <p
                      className="paragraph--parsed"
                      style={{ textAlign: "center", marginTop: "1rem" }}
                    >
                      {shortestIntroText}
                    </p>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={8}
                  container
                  sx={{
                    p: 0,
                    bgcolor: "transparent",
                    borderRadius: "10px",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                >
                  <AuthorsAvatar />
                </Grid>
                <Grid item xs={12} md={8} sx={{ mt: 0 }}>
                  {/* <PostsList /> */}
                  <Grid
                    container
                    spacing={4}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                      overflowY: "none",
                      mt: 4,
                      p: 1,
                    }}
                  >
                    <ImageList variant="masonry" cols={2} gap={8}>
                      {mainPosts?.map((post) => (
                        <ImageListItem item key={post?.id}>
                          <PostCard post={post} />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{ mt: 0, mx: { xs: 4, sm: 19, md: 0 } }}
                >
                  <Stack spacing={4}>
                    <ShowTopsOfMasterpiecesComp />
                    <Stack sx={{ border: "1px solid #ccc", p: 1 }}>
                      <h4 className="list-header p-padding-bottom-small">
                        Kategoriler
                      </h4>
                      {categories?.map((c) => (
                        <CategoriesSideList key={c.id} category={c} />
                      ))}
                    </Stack>
                    <Stack sx={{ border: "1px solid #ccc", p: 1 }}>
                      <h4 className="list-header u-margin-bottom-small u-margin-top-medium">
                        Popüler Yazılar
                      </h4>
                      {postsLoading ? (
                        <MainLoadingComp isLoading={postsLoading} />
                      ) : postIsError ? (
                        <ResourceNotFound
                          isError={postIsError}
                          error={postError}
                        />
                      ) : (
                        sidePosts &&
                        sidePosts?.map((p) => <SidePost key={p?.id} post={p} />)
                      )}
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </>
          </MainPageLayout>
          <MiniFooter />
        </>
      ) : (
        <>
          <Grid
            container
            spacing={5}
            sx={{ px: { xs: 1, sm: 8, md: 0 }, p: 2, bgcolor: "white" }}
          >
            <Grid item xs={12} md={8}>
              <PostCarousel posts={data} />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Stack>
                <LogoCart />
                <p
                  style={{ textAlign: "center", marginTop: "1rem" }}
                  className="paragraph--parsed p-padding-right-medium p-padding-left-medium"
                >
                  {shortestIntroText}
                </p>
              </Stack>
            </Grid>
          </Grid>
          <div className="container">
            <Stack spacing={2} sx={{ p: 1, pt: 3 }} alignItems="center">
              <PostsList propData={fourPost} />
              <PostsList propData={mainPosts} />
            </Stack>
            <RightSide />
          </div>
          <MiniFooter />
        </>
      )}
    </>
  );
};

export default MainPage;
