import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  styled,
  Tooltip,
  tooltipClasses,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineCategory, MdPeopleOutline } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { BsDoorClosed } from "react-icons/bs";

import "./../../styles/sass/main.scss";
import { useSelector } from "react-redux";
import {
  selectCurrentUsername,
  selectCurrentUserRoles,
} from "../../features/auth/authSlice";
import { useGetCategoriesQuery } from "../../features/categories/categorySlice";
import { useGetAuthorsQuery } from "../../features/user/usersSlice";
import useLogout from "../../hooks/useLogout.hook";
import MainLoadingComp from "../loading/MainLoadingComp";
import {
  isAdmin,
  isAuthor,
  isEditor,
} from "../../validation/conditions/checkRole";

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    fontSize: "1rem",
  },
}));

const linkStyles = {
  color: "white",
};

const ModernNavbar = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const { data: ctgs, isLoading } = useGetCategoriesQuery();
  const { data: athrs } = useGetAuthorsQuery();
  const logout = useLogout();

  const username = useSelector(selectCurrentUsername);
  const userRoles = useSelector(selectCurrentUserRoles);

  // Categories
  const [category, setCategory] = React.useState(null);
  const categoryOpen = Boolean(category);
  const handleCategoryClick = (event) => {
    setCategory(event.currentTarget);
  };
  const handleCategoryClose = () => {
    setCategory(null);
  };

  // Authors
  const [author, setAuthor] = React.useState(null);
  const authorOpen = Boolean(author);
  const handleAuthorClick = (event) => {
    setAuthor(event.currentTarget);
  };
  const handleAuthorClose = () => {
    setAuthor(null);
  };

  // Settings
  const [settings, setSettings] = React.useState(null);
  const settingsOpen = Boolean(settings);
  const handleSettingsClick = (event) => {
    setSettings(event.currentTarget);
  };
  const handleSettingsClose = () => {
    setSettings(null);
  };

  const signOut = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  if (matches) {
    return;
  }

  const iconStyle = {
    bgcolor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    "&:hover": { color: theme.palette.primary.light },
  };

  if (isLoading) {
    <MainLoadingComp isLoading={isLoading} />;
  }

  return (
    <div className="modern__navbar">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Home Page */}
        <BootstrapTooltip title="Ana Sayfa" placement="right">
          <Link to="/home">
            <IconButton size="large" sx={iconStyle}>
              <AiOutlineHome style={{ fontSize: "1.9rem" }} />
            </IconButton>
          </Link>
        </BootstrapTooltip>

        {/* Categories */}
        <BootstrapTooltip title="Kategoriler" placement="right">
          <IconButton
            onClick={handleCategoryClick}
            aria-controls={categoryOpen ? "categories" : undefined}
            aria-haspopup="true"
            aria-expanded={categoryOpen ? "true" : undefined}
            size="large"
            sx={iconStyle}
          >
            <MdOutlineCategory style={{ fontSize: "1.9rem" }} />
          </IconButton>
        </BootstrapTooltip>

        {/* Authors */}
        <BootstrapTooltip title="Yazarlar" placement="right">
          <IconButton
            onClick={handleAuthorClick}
            aria-controls={authorOpen ? "authors" : undefined}
            aria-haspopup="true"
            aria-expanded={authorOpen ? "true" : undefined}
            size="large"
            sx={iconStyle}
          >
            <MdPeopleOutline style={{ fontSize: "1.9rem" }} />
          </IconButton>
        </BootstrapTooltip>

        {/* Settings */}
        {username && isAuthor(userRoles) && (
          <BootstrapTooltip title="Ayarlar" placement="right">
            <IconButton
              onClick={handleSettingsClick}
              aria-controls={settingsOpen ? "settings" : undefined}
              aria-haspopup="true"
              aria-expanded={settingsOpen ? "true" : undefined}
              size="large"
              sx={iconStyle}
            >
              <AiOutlineSetting style={{ fontSize: "1.9rem" }} />
            </IconButton>
          </BootstrapTooltip>
        )}

        {/* Authentication */}
        {!username && (
          <BootstrapTooltip title="Aramıza Katıl" placement="right">
            <Link to="/auth">
              <IconButton size="large" sx={iconStyle}>
                <BsDoorClosed style={{ fontSize: "1.9rem" }} />
              </IconButton>
            </Link>
          </BootstrapTooltip>
        )}

        {username && (
          <BootstrapTooltip title="Çıkış Yap!" placement="right">
            <IconButton onClick={signOut} size="large" sx={iconStyle}>
              <AiOutlineLogout style={{ fontSize: "1.9rem" }} />
            </IconButton>
          </BootstrapTooltip>
        )}
      </Box>
      <Menu
        anchorEl={category}
        id="categories"
        open={categoryOpen}
        onClose={handleCategoryClose}
        onClick={handleCategoryClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: -4,
            ml: 9,
            bgcolor: theme.palette.primary.dark,
            color: "white",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 10,
              left: -5,
              width: 10,
              height: 10,
              bgcolor: theme.palette.primary.dark,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {ctgs &&
          ctgs.map((c) => (
            <MenuItem key={c?.id}>
              <Link
                to={`/posts/category/${c?.name}`}
                style={{ color: "wheat" }}
              >
                <ListItemIcon>
                  <IoMdPerson style={{ color: "wheat" }} />
                </ListItemIcon>
                {c?.name}
              </Link>
            </MenuItem>
          ))}
      </Menu>
      <Menu
        anchorEl={author}
        id="authors"
        open={authorOpen}
        onClose={handleAuthorClose}
        onClick={handleAuthorClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: -4,
            ml: 9,
            bgcolor: theme.palette.primary.dark,
            color: "white",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 10,
              left: -5,
              width: 10,
              height: 10,
              bgcolor: theme.palette.primary.dark,
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {athrs &&
          athrs.map((a) => (
            <MenuItem key={a?.id}>
              <Link to={`/users/${a.username}`} style={{ color: "white" }}>
                <ListItemIcon>
                  <IoMdPerson style={{ color: "white" }} />
                </ListItemIcon>
                {a.username}
              </Link>
            </MenuItem>
          ))}
      </Menu>
      {isAuthor(userRoles) && (
        <Menu
          anchorEl={settings}
          id="settings"
          open={settingsOpen}
          onClose={handleSettingsClose}
          onClick={handleSettingsClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: -4,
              ml: 9,
              bgcolor: theme.palette.primary.dark,
              color: "white",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 10,
                left: -5,
                width: 10,
                height: 10,
                bgcolor: theme.palette.primary.dark,
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {isAuthor(userRoles) && (
            <div>
              <MenuItem>
                <Link to={`/users/${username}`} style={linkStyles}>
                  <Typography textAlign="center">Profile Git</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/users/editUser/${username}`} style={linkStyles}>
                  <Typography textAlign="center">Profil Düzenle</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to={
                    isEditor(userRoles) ? "/editor/newPost" : "/posts/newPost"
                  }
                  style={linkStyles}
                >
                  <Typography textAlign="center">Yeni Yazı Ekle</Typography>
                </Link>
              </MenuItem>
            </div>
          )}
          {isAdmin(userRoles) && (
            <div>
              <MenuItem>
                <Link to={`/administration/users`} style={linkStyles}>
                  <Typography textAlign="center">Kullanıcılar</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/administration/categories`} style={linkStyles}>
                  <Typography textAlign="center">Kategoriler</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/administration/mails`} style={linkStyles}>
                  <Typography textAlign="center">Mail Sayfası</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to={`/administration/deactivatedPosts`}
                  style={linkStyles}
                >
                  <Typography textAlign="center">Deaktif Yazılar</Typography>
                </Link>
              </MenuItem>
            </div>
          )}
        </Menu>
      )}
    </div>
  );
};

export default ModernNavbar;
