import { useGetPostsQuery } from "./postSlice";
import ExPostCard from "../../external_components/posts/ExPostCard";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import PostCard from "../../components/post-card/PostCard";
import MainLoadingComp from "../../components/loading/MainLoadingComp";
import ResourceNotFound from "../../components/error/ResourceNotFound";

const PostsList = ({ propData }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const matchesTab = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const {
    data: allPost,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  const data = propData ? propData : allPost;

  let content;
  if (isLoading) {
    content = <MainLoadingComp isLoading={isLoading} />;
  } else if (isError) {
    content = <ResourceNotFound isError={isError} error={error} />;
  } else if (isSuccess) {
    if (matches) {
      if (data?.length === 0) {
        content = <h2> No post</h2>;
      } else {
        content = data.map((post) => <ExPostCard key={post.id} post={post} />);
      }
    } else if (matchesTab) {
      content = (
        <Grid container sx={{ mb: 5 }}>
          {data?.map((p) => (
            <Grid sm={6} key={p?.id}>
              <PostCard post={p} />
            </Grid>
          ))}
        </Grid>
      );
    } else {
      if (data?.length < 1) {
        content = <h2> No post</h2>;
      } else {
        content = data.map((post) => <PostCard key={post.id} post={post} />);
      }
    }
  }

  return <>{content}</>;
};
export default PostsList;
