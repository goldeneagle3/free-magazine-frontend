import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { MdCalendarToday, MdModeComment } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BiCategory } from "react-icons/bi";
import moment from "moment";
import { Link } from "react-router-dom";
import "react-lazy-load-image-component/src/effects/blur.css";

import LikeComp from "../like/LikeComp";
import { BASE_URL, photosApiUrl } from "../../config/urls";

export default function PostCard({ post }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const postImage = `${BASE_URL}${photosApiUrl}/${post?.imageId}`;

  const infos = {
    display: "flex",
    alignItems: "center",
    color: "grey",
  };

  return (
    <Card
      sx={{
        maxWidth: { xs: 300, sm: 375 },
        width: "100%",
        bgcolor: "transparent",
        boxShadow: "none",
        mt: 1.5,
      }}
    >
      {post.imageMimType && (
        <Link to={`/posts/${post?.id}`}>
          <LazyLoadImage
            effect="blur"
            className="image__card"
            loading="lazy"
            src={postImage}
            alt="post media"
            style={{
              height: matches ? "280px" : "200px",
              maxWidth: matches ? "100%" : 250,
              width: "100%",
            }}
          />
        </Link>
      )}
      <CardContent sx={{ bgcolor: "#ffffffdf" }}>
        <Typography gutterBottom variant="h6" component="div">
          {post?.title?.length > 25
            ? post?.title?.substring(0, 25) + "..."
            : post?.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "space-evenly",
          }}
        >
          <h4 className="header-tertiary" style={infos}>
            <IconButton sx={{ width: 27, height: 27 }}>
              <MdCalendarToday />
            </IconButton>
            <Typography sx={{ fontSize: 11 }}>
              {moment(post?.createDateTime).fromNow()}
            </Typography>
          </h4>
          <h4 className="header-tertiary" style={infos}>
            <IconButton sx={{ width: 27, height: 27 }}>
              <BiCategory />
            </IconButton>
            <Typography sx={{ fontSize: 11 }}>{post?.category}</Typography>
          </h4>
          <LikeComp postId={post?.id} likes={post?.likes} />
          <h4 className="header-tertiary" style={infos}>
            <IconButton sx={{ width: 27, height: 27 }}>
              <MdModeComment />
            </IconButton>
            <Typography sx={{ fontSize: 11 }}>{post?.comments}</Typography>
          </h4>
        </Box>
        <Link to={`/users/${post?.username}`}>
          <h2 className="list-header u-text-center">{post?.username}</h2>
        </Link>
        {/* <p className="paragraph--min p-padding-top-small">
          {post?.subtitle ? post.subtitle : text}
        </p> */}
      </CardContent>
    </Card>
  );
}
