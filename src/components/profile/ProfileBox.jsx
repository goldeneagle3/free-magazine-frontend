import React from "react";
import { Avatar, Box, Divider, Stack, Tooltip, useTheme } from "@mui/material";

import "./../../styles/sass/main.scss";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import {
  BsFacebook,
  BsGlobe,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

const ProfileBox = ({ user }) => {
  const theme = useTheme();
  const imageUrl = user?.image && `${BASE_URL}${photosApiUrl}/${user?.image}`;
  return (
    <div className="profile">
      <div className="profile__box">
        <div className="profile__box__main">
          <Avatar
            src={imageUrl}
            sx={{
              width: {
                xs: 80,
                md: 90,
                lg: 120,
              },
              height: {
                xs: 80,
                md: 90,
                lg: 120,
              },
            }}
          />
          <Box sx={{ alignItems: "center", textAlign: "center" }}>
            <h3 className="heading-secondary--profile">{user?.username}</h3>
            {(user?.firstName || user?.lastName) && (
              <h5 className="heading-tertiary">
                {user.username && user?.firstName + " " + user?.lastName}
              </h5>
            )}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 1 }}
            >
              {user?.facebook && (
                <Tooltip title="Facebook">
                  <a href={user?.facebook}>
                    <BsFacebook size={15} color={theme.palette.primary.dark} />
                  </a>
                </Tooltip>
              )}
              {user?.instagram && (
                <Tooltip title="Instagram">
                  <a href={user?.instagram}>
                    <BsInstagram size={15} color={theme.palette.primary.dark} />
                  </a>
                </Tooltip>
              )}
              {user?.twitter && (
                <Tooltip title="Twitter">
                  <a href={user?.twitter}>
                    <BsTwitter size={15} color={theme.palette.primary.dark} />
                  </a>
                </Tooltip>
              )}
              {user?.youtube && (
                <Tooltip title="Youtube">
                  <a href={user?.youtube}>
                    <BsYoutube size={15} color={theme.palette.primary.dark} />
                  </a>
                </Tooltip>
              )}
              {user?.blog && (
                <Tooltip title="Blog">
                  <a href={user?.blog}>
                    <BsGlobe size={15} color={theme.palette.primary.dark} />
                  </a>
                </Tooltip>
              )}
            </Stack>
          </Box>
        </div>
        <Divider />
        <div className="profile__box__sub"></div>
        <div className="profile__box__description">
          <p className="paragraph--min p-padding p-padding-bottom-big">
            {user?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
