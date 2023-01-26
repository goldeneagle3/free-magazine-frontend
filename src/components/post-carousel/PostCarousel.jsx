import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { BASE_URL, photosApiUrl } from "../../config/urls";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const PostCarousel = ({ posts }) => {
  return (
    <Carousel
      // indicators={false}
      navButtonsAlwaysVisible
      sx={{ borderRadius: "5px" }}
      duration={600}
    >
      {posts?.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};
function Item(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const smMatches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Paper elevation={0}>
      <Link to={"/posts/" + props.item?.id}>
        <Img
          alt="complex"
          src={`${BASE_URL}${photosApiUrl}/${props?.item?.imageId}`}
          sx={{
            width: "100%",
            height: matches ? "450px" : smMatches ? "350px" : "250px",
            position: "relative",
          }}
        />
        <h3 className="carousel__body__title">{props?.item?.title}</h3>
      </Link>
    </Paper>
  );
}

export default PostCarousel;
