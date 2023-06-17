import React from "react";
import { Link } from "react-router-dom";
import { BiShoppingBag, BiShow } from "react-icons/bi";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
  useTheme,
} from "@mui/material";

import { BASE_URL, photosApiUrl } from "../../config/urls";
import { MdReadMore } from "react-icons/md";
import { genres } from "../../utils/genres";
import UpdateMasterpiece from "./UpdateMasterpiece";
import { selectCurrentUserRoles } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";
import { isAdmin, isEditor } from "../../validation/conditions/checkRole";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const SingleMasterpiece = ({ data, title, genre }) => {
  const theme = useTheme();
  const userRoles = useSelector(selectCurrentUserRoles);
  const imageUrl = data?.image && `${BASE_URL}${photosApiUrl}/${data?.image}`;

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h4 className="list-header">{title}</h4>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Link
            to={
              genre === genres.MUSIC
                ? "/musicById/" + data?.id
                : genre === genres.PICTURE
                ? "/pictureById/" + data?.id
                : genre === genres.MOVIE
                ? "/movieById/" + data?.id
                : ""
            }
          >
            <IconButton>
              <MdReadMore size={20} />
            </IconButton>
          </Link>
          {(isAdmin(userRoles) || isEditor(userRoles)) && (
            <UpdateMasterpiece data={data} genre={genre} />
          )}
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box item>
          <Img
            alt="complex"
            src={imageUrl}
            sx={{ maxHeight: "23rem", width: "100%", height: "100%" }}
          />
        </Box>
        <Box sx={{ p: 0.5 }}>
          <Grid item xs>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Tooltip title={data?.title}>
                <Typography align="left" fontWeight={900} sx={{ fontSize: 11 }}>
                  {data?.title?.length > 25
                    ? data.title?.substring(0, 25) + "..."
                    : data.title}
                </Typography>
              </Tooltip>
              <Typography> {data?.owner} </Typography>
            </Stack>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="center" spacing={3}>
                {data?.showLink && (
                  <Tooltip title="Erişim Linki 1">
                    <a href={data?.showLink}>
                      <BiShow size={15} color={theme.palette.primary.dark} />
                    </a>
                  </Tooltip>
                )}
                {data?.showLink2 && (
                  <Tooltip title="Erişim Linki 2">
                    <a href={data?.showLink2}>
                      <BiShow size={15} color={theme.palette.primary.dark} />
                    </a>
                  </Tooltip>
                )}
                {data?.marketLink && (
                  <Tooltip title="Satın Alma Linki">
                    <a href={data?.marketLink}>
                      <BiShoppingBag
                        size={15}
                        color={theme.palette.primary.dark}
                      />
                    </a>
                  </Tooltip>
                )}
              </Stack>
            </Stack>
          </Grid>
        </Box>
      </Box>
    </Stack>
  );
};

export default SingleMasterpiece;
