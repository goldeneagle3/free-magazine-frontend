import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Box } from "@mui/material";

import "./../../styles/sass/main.scss";

import { BASE_URL, photosApiUrl } from "../../config/urls";
import { stringAvatar } from "../../utils/CustomProfileImage";

const ProfileCard = ({ author, bgImage }) => {
  const photoImage = `${BASE_URL}${photosApiUrl}/${author?.imageId}`;

  const bgStyle = {
    backgroundImage: `url(${author?.imageName ? photoImage : bgImage})`,
    backgroundColor: "grey",
  };

  return (
    <div className="card">
      <div className="card__side card__side--front">
        <div style={bgStyle} className="card__picture">
          &nbsp;
        </div>
        <div className="card__heading">
          <span className="card__heading-span card__heading-span--1">
            {author?.username}
          </span>
        </div>
        <div className="card__details">
          <p className="paragraph--min p-padding-top-small">
            {/* {author?.description} */}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
            corrupti laboriosam pariatur, iure repellendus ab in, vel
            perferendis id voluptates sed. Officia beatae modi architecto
            voluptate corporis. Nostrum ex alias quia, fuga est opt
          </p>
        </div>
      </div>
      <div className="card__side card__side--back card__side--back-2">
        <div className="card__cta">
          <div className="card__price-box">
            <p className="card__price-only">
              {author?.firstName || author?.lastName
                ? author?.firstName + " " + author?.lastName
                : author?.username}
            </p>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                mt: 2,
              }}
            >
              <Avatar
                src={photoImage}
                {...stringAvatar(author?.username.toUpperCase())}
                alt="E"
                sx={{ width: 70, height: 70 }}
              />
            </Box>
          </div>
          <Link to={`/users/${author?.username}`} className="btn btn--white">
            Profile Git !
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
