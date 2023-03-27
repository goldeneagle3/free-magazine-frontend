import { Avatar, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import { useGetAuhorsForCardQuery } from "../../features/user/usersSlice";
import { stringAvatar } from "../../utils/CustomProfileImage";

const AuthorsAvatar = () => {
  const { data } = useGetAuhorsForCardQuery();

  return (
    <Grid container>
      {data?.map((author) => (
        <Grid key={author.id} item xs={4} sm={3} md={2}>
          <Link to={`/users/${author.username}`}>
            <Stack
              spacing={1}
              alignItems="center"
              textAlign="center"
              sx={{ m: 1 }}
            >
              <Avatar
                src={`${BASE_URL}${photosApiUrl}/${author?.image}`}
                {...stringAvatar(author?.username.toUpperCase())}
                sx={{
                  width: 50,
                  height: 50,
                  border: "2px outset #144598df",
                  fontSize: 30,
                  ":hover": {
                    transform: "scale(1.1)",
                    transition: "ease-in-out .2s",
                  },
                }}
              />
              <Typography variant="body2" fontWeight={800} > {author?.username} </Typography>
            </Stack>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default AuthorsAvatar;
