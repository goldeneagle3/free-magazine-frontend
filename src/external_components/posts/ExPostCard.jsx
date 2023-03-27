import React from "react";
import "../../styles/sass/main.scss";
import { Avatar, Box, IconButton, Popover, Typography } from "@mui/material";
import { AiOutlineComment } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

import moment from "moment/moment";
import { Link } from "react-router-dom";
import LikeComp from "../../components/like/LikeComp";
import { stringAvatar } from "../../utils/CustomProfileImage";
import { parseHtmlText } from "../../utils/htmlParseConfig";
import { useSelector } from "react-redux";
import { selectCurrentUserRoles } from "../../features/auth/authSlice";
import { isEditor } from "../../validation/conditions/checkRole";
import { BASE_URL, photosApiUrl } from "../../config/urls";

export default function ExPostCard({ post }) {
  const userRoles = useSelector(selectCurrentUserRoles);
  const postImage = `${BASE_URL}${photosApiUrl}/${post?.image}`;
  const userImage = `${BASE_URL}${photosApiUrl}/${post?.profileImage}`;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const text2 = post?.content?.substring(0, 300).toString() + "...";
  let text;
  if (typeof text2 === "string") {
    text = parseHtmlText(text2);
  }
  return (
    <Box
      component={motion.div}
      initial={{ x: -100, opacity: 0 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", duration: 1 }}
      viewport={{ once: false, amount: 0.6 }}
      className="main__post"
      sx={{
        display: "flex",
        alignItems: "center",
        m: { xs: 0, md: 2 },
        width: "100%",
        maxWidth: 650,
      }}
    >
      <Box
        // component={motion.div}
        className="third__post"
        // animate={{ y: [-100, 0], duration: 2 }}
        // transition={{ type: "spring", duration: 1.8 }}
        sx={{
          p: { xs: 0.9, md: 1.2 },
          width: "100%",
          maxWidth: 650,
          maxHeight: 300,
          borderRadius: "9px",
        }}
      >
        {/* Top */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            // p: 0.8,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar
              sx={{
                width: { xs: 30, md: 50 },
                height: { xs: 30, md: 50 },
              }}
              src={userImage}
              {...stringAvatar(post?.username.toUpperCase())}
            />
            <Box sx={{ textAlign: "center", alignItems: "center", mt: 1.5 }}>
              <Link to={`/users/${post?.username}`}>
                <Typography
                  align="left"
                  sx={{ color: "black", fontSize: { xs: 10, md: 15 } }}
                >
                  {post.username}
                </Typography>
              </Link>
              <Typography
                align="left"
                sx={{
                  fontWeight: "500",
                  fontSize: { xs: 7, md: 10 },
                  color: "black",
                }}
                paragraph
              >
                {moment(post.createDateTime).fromNow()}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="h5">{post.category}</Typography>
            {isEditor(userRoles) && (
              <>
                <IconButton
                  aria-describedby={id}
                  variant="contained"
                  onClick={handleClick}
                >
                  <BsThreeDotsVertical />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Link to={"/editor/editPost/" + post?.id}>
                    <Typography sx={{ p: 2 }}>Yazıyı düzenle.</Typography>
                  </Link>
                </Popover>
              </>
            )}
          </Box>
        </Box>

        {/* Middle */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                textAlign: "left",
                fontSize: { xs: 13, md: 18 },
                fontWeight: "bold",
                fontFamily: "monospace",
                color: "black",
              }}
            >
              {post.title}
            </Typography>
            <Typography
              align="left"
              paragraph
              className="paragraph--parsed"
              sx={{
                p: 0.9,
                color: "black",
                fontSize: { xs: 11, md: 12 },
              }}
            >
              {text}
            </Typography>
          </Box>
          <LazyLoadImage
            className="image__card"
            style={{
              width: "110px",
              height: "110px",
              float: "left",
              borderRadius: "50%",
              shapeOutside: "circle(50%)",
            }}
            effect="blur"
            loading="lazy"
            alt="post media"
            src={postImage}
          />
        </Box>

        {/* Bottom */}
        <Box
          sx={{
            gridArea: "footer",
            display: "flex",
            justifyContent: "space-between",
            pt: 1.7,
            pb: 1.8,
            color: "black",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <LikeComp postId={post?.id} likes={post?.likes} />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton sx={{ width: 30, height: 30 }}>
                <AiOutlineComment color="black" />
              </IconButton>
              <Typography sx={{ fontSize: 13 }}>{post.comments}</Typography>
            </Box>
          </Box>
          <Link to={`/posts/${post.id}`} className="read-more-ex-post">
            <Typography sx={{ fontSize: 13 }}>Devamını Oku...</Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
