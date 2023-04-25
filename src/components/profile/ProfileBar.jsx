import React from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { AiOutlineEdit, AiOutlineLogout } from "react-icons/ai";
import { BsFillFileRichtextFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import useLogout from "../../hooks/useLogout.hook";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import {
  isAdmin,
  isAuthor,
  isEditor,
} from "../../validation/conditions/checkRole";
import { useSelector } from "react-redux";
import { selectCurrentUserRoles } from "../../features/auth/authSlice";
import { stringAvatar } from "../../utils/CustomProfileImage";
import { IoIosPeople } from "react-icons/io";
import { MdOutlineCategory } from "react-icons/md";

const ProfileBar = ({ user, image }) => {
  const navigate = useNavigate();
  const logout = useLogout();

  const userRoles = useSelector(selectCurrentUserRoles);

  const signOut = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  const imageUrl = image && `${BASE_URL}${photosApiUrl}/${image}`;

  return (
    <Stack spacing={3} sx={{ mb: 6 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "right",
          pt: 1,
          pr: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Avatar src={imageUrl} {...stringAvatar(user.toUpperCase())} />
          <Typography variant="h5">{user}</Typography>
        </Box>
        <Box>
          <IconButton onClick={signOut}>
            <AiOutlineLogout />
          </IconButton>
        </Box>
      </Box>
      {isAuthor(userRoles) && (
        <Stack direction="row" spacing={1}>
          <Button
            onClick={() =>
              navigate(isEditor(userRoles) ? "/editor/newPost" : "/posts/newPost")
            }
            sx={{ width: { md: 95, lg: 130 }, color: "black" }}
            variant="text"
            startIcon={<BsFillFileRichtextFill />}
          >
            Yeni Yazı
          </Button>
          <Button
            onClick={() => navigate("/users/editUser/" + user)}
            sx={{ width: { md: 95, lg: 130 }, color: "black" }}
            variant="text"
            startIcon={<AiOutlineEdit />}
          >
            Profil Düzenle
          </Button>
        </Stack>
      )}
      {isAdmin(userRoles) && (
        <Stack direction="row" spacing={1}>
          <Button
            onClick={() => navigate("/administration/users")}
            sx={{ width: { md: 95, lg: 130 }, color: "black" }}
            variant="contained"
            startIcon={<IoIosPeople />}
          >
            Kullanıcılar
          </Button>
          <Button
            onClick={() => navigate("/administration/categories")}
            sx={{ width: { md: 95, lg: 130 }, color: "black" }}
            variant="contained"
            startIcon={<MdOutlineCategory />}
          >
            Kategoriler
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default ProfileBar;
