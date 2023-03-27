import React from "react";
import { Avatar, Box, Divider } from "@mui/material";

import "./../../styles/sass/main.scss";
import { BASE_URL, photosApiUrl } from "../../config/urls";

const ProfileBox = ({ user }) => {
  const imageUrl = `${BASE_URL}${photosApiUrl}/${user?.image}`;
  return (
    <div className="profile">
      <div className="profile__box">
        <div className="profile__box__main">
          <Avatar
            src={imageUrl}
            sx={{
              width: {
                xs: 60,
                md: 70,
                lg: 120,
              },
              height: {
                xs: 60,
                md: 70,
                lg: 120,
              },
            }}
          />
          <Box>
            <h3 className="heading-secondary--profile">{user?.username}</h3>
            {(user?.firstName || user?.lastName) && (
              <h5 className="heading-tertiary">
                {user.username &&
                  user?.firstName + " " + user?.lastName + " / "}
                Yazar
              </h5>
            )}
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
