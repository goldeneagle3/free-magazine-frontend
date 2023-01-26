import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { useGetAuthorsQuery } from "../../features/user/usersSlice";
import Logo from "./../../assets/img/logodnm4.png";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import ResourceNotFound from "../error/ResourceNotFound";
import MainLoadingComp from "../loading/MainLoadingComp";
import { BRAND } from "../../config/constants";
import { AiFillInstagram } from "react-icons/ai";

const LeftSide = () => {
  const { data, isLoading, isError, error } = useGetAuthorsQuery();

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        ml: 1,
        gap: { md: 0, lg: 0.1 },
        zIndex: 12000,
      }}
    >
      <h4 className="list-header">Yazarlar</h4>
      <List dense>
        {isLoading ? (
          <MainLoadingComp isLoading={isLoading} />
        ) : isError ? (
          <ResourceNotFound isError={isError} error={error} />
        ) : (
          data?.map((author) => (
            <ListItem key={author?.id}>
              <ListItemText sx={{ fontSize: 30 }}>
                <Link to={"/users/" + author?.username}>
                  <h3 className="side-list-text">{author?.username}</h3>
                </Link>
              </ListItemText>
            </ListItem>
          ))
        )}
      </List>
      <Typography
        variant="body2"
        sx={{ color: "GrayText", textAlign: "left", ml: 2 }}
        flexWrap={true}
      >
        Yazar kontenjanımız : {data?.length} / 10
      </Typography>
      <Link to="/home">
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            gap: 0.7,
          }}
        >
          <img
            src={Logo}
            style={{
              height: "10rem",
            }}
            alt="media"
            // variant="square"
          />
          <h3 className="list-header">{BRAND}</h3>
        </Box>
      </Link>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="flex-start"
        sx={{ mb: 1 }}
        className="u-margin-left-small"
      >
        <a href="https://www.facebook.com">
          <BsFacebook size={17} color="#0e055c" />
        </a>
        <a href="https://www.instagram.com">
          <AiFillInstagram size={17} color="#0e055c" />
        </a>
        <a href="https://twitter.com">
          <BsTwitter size={17} color="#0e055c" />
        </a>
        <a href="https://youtube.com">
          <BsYoutube size={17} color="#0e055c" />
        </a>
      </Stack>
      <p className="paragraph--min u-margin-left-small">@Copyright by 3E at 2023</p>
    </Box>
  );
};

export default LeftSide;
