import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";
import { AiFillInstagram, AiOutlineLogout } from "react-icons/ai";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";

import { BRAND } from "../../config/constants";
import Logo from "./../../assets/img/logodnm4.png";
import {
  selectCurrentImage,
  selectCurrentUsername,
  selectCurrentUserRoles,
} from "../../features/auth/authSlice";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import AuthButton from "../button/AuthButton";
import {
  isAdmin,
  isAuthor,
  isEditor,
} from "../../validation/conditions/checkRole";
import useLogout from "../../hooks/useLogout.hook";
import { stringAvatar } from "../../utils/CustomProfileImage";
import { useGetCategoriesQuery } from "../../features/categories/categorySlice";

const pages = [
  { id: 0, pageName: "/posts", navName: "Tüm Yazıları Gör" },
  { id: 1, pageName: "/construction", navName: "İletişim" },
];

const DesktopNavbar = () => {
  const navigate = useNavigate();
  const username = useSelector(selectCurrentUsername);
  const userRoles = useSelector(selectCurrentUserRoles);
  const image = useSelector(selectCurrentImage);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const signOut = useLogout();
  const { data: categories } = useGetCategoriesQuery();

  const items = categories && [...categories];
  items?.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

  const imageUrl = `${BASE_URL}${photosApiUrl}/${image}`;

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      handleCloseUserMenu();
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  if (!matches) {
    return;
  }

  return (
    <AppBar position="static" sx={{ boxShadow: "none", mb: 2 }}>
      <Container
        maxWidth="xl"
        sx={{
          background: "linear-gradient(to right bottom, #6a98c4, #073b6b)",
        }}
      >
        <Toolbar disableGutters>
          <Avatar src={Logo} sx={{ maxWidth: "100%", height: "auto" }} />
          <Link to="/home" style={{ marginLeft: "1rem", color: "inherit" }}>
            <h3 className="list-header">{BRAND}</h3>
          </Link>
          <Box sx={{ flexGrow: 1, display: "flex", mx: 3 }}>
            {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => navigate(page.pageName)}
                sx={{
                  mx: 2,
                  px: 1,
                  fontSize: "1.1rem",
                  fontWeight: "900",
                  my: 2,
                  color: "#f0eeee",
                  fontSizeAdjust: "inherit",
                  display: "block",
                  ":hover": {
                    bgcolor: "#9b1c46",
                  },
                }}
              >
                {page.navName}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 1, mx: 3 }}
            >
              <a href="https://www.facebook.com">
                <BsFacebook size={20} color="#f0eeee" />
              </a>
              <a href="https://www.instagram.com">
                <AiFillInstagram size={20} color="#f0eeee" />
              </a>
              <a href="https://twitter.com">
                <BsTwitter size={20} color="#f0eeee" />
              </a>
              <a href="https://youtube.com">
                <BsYoutube size={20} color="#f0eeee" />
              </a>
            </Stack>
            {username ? (
              <Tooltip title="Ayarları Aç">
                <Button
                  variant="text"
                  sx={{ gap: 2 }}
                  onClick={handleOpenUserMenu}
                >
                  <Avatar
                    {...stringAvatar(username.toUpperCase())}
                    src={imageUrl}
                  />
                  <Typography sx={{ color: "#f0eeee" }}>{username}</Typography>
                </Button>
              </Tooltip>
            ) : (
              <Link to="/auth">
                <AuthButton text="Aramıza Katıl !" />
              </Link>
            )}
            {username && (
              <Menu
                sx={{ mt: "45px", p: 0 }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {isAuthor(userRoles) && (
                  <div>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/users/${username}`}>
                        <Typography textAlign="center">Profile Git</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/users/editUser/${username}`}>
                        <Typography textAlign="center">
                          Profil Düzenle
                        </Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        to={
                          isEditor(userRoles)
                            ? "/editor/newPost"
                            : "/posts/newPost"
                        }
                      >
                        <Typography textAlign="center">
                          Yeni Yazı Ekle
                        </Typography>
                      </Link>
                    </MenuItem>
                  </div>
                )}
                {isAdmin(userRoles) && (
                  <div>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/administration/users`}>
                        <Typography textAlign="center">Kullanıcılar</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/administration/categories`}>
                        <Typography textAlign="center">Kategoriler</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link to={`/administration/deactivatedPosts`}>
                        <Typography textAlign="center">
                          Deaktif Yazılar
                        </Typography>
                      </Link>
                    </MenuItem>
                  </div>
                )}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button
                    onClick={handleSignOut}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "transparent",
                      width: "100%",
                      gap: 3,
                      px: 1,
                      ":hover": {
                        bgcolor: "transparent",
                      },
                    }}
                  >
                    <Typography textAlign="center">Çıkış Yap</Typography>
                    <AiOutlineLogout />
                  </Button>
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              mx: 1,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              flexWrap: "wrap",
            }}
          >
            {items?.map((category) => (
              <Button
                key={category?.id}
                onClick={() => navigate(`/posts/category/${category?.name}`)}
                sx={{
                  mx: { md: 1, lg: 2 },
                  my: 1,
                  px: 1,
                  fontSize: "1.1rem",
                  fontWeight: "900",
                  color: "#dadcdf",
                  display: "block",
                  ":hover": {
                    bgcolor: "#c5608236",
                    borderBottom: "1px solid #9b1c46",
                    borderRight: "2px solid #9b1c46",
                  },
                }}
              >
                {category?.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DesktopNavbar;
