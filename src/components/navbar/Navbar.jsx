import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { AiOutlineLogout, AiOutlineMenu } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import {
  MdExpandLess,
  MdExpandMore,
  MdPerson,
  MdPeople,
  MdForward,
} from "react-icons/md";
import {
  Drawer,
  useMediaQuery,
  useTheme,
  Avatar,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  ListItemAvatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import * as _ from "lodash";

import Logo from "./../../assets/img/logodnm4.png";
import { useGetCategoriesQuery } from "../../features/categories/categorySlice";
import { useGetAuthorsQuery } from "../../features/user/usersSlice";
import {
  selectCurrentImage,
  selectCurrentUsername,
  selectCurrentUserRoles,
} from "../../features/auth/authSlice";
import useLogout from "../../hooks/useLogout.hook";
import { BRAND } from "../../config/constants";
import { BASE_URL, photosApiUrl } from "../../config/urls";
import { stringAvatar } from "../../utils/CustomProfileImage";

const drawerWidth = 200;

export default function Navbar(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const authUser = useSelector(selectCurrentUsername);
  const authUserImage = useSelector(selectCurrentImage);
  const authUserRoles = useSelector(selectCurrentUserRoles);
  const logout = useLogout();
  const { window } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [authorOpen, setAuthorOpen] = React.useState(false);
  const [categoryOpen, setCategoryOpen] = React.useState(false);
  const { data: ctgs } = useGetCategoriesQuery();
  const { data: athrs } = useGetAuthorsQuery();

  const signOut = async (e) => {
    e.preventDefault();
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  const handleAuthorClick = () => {
    setAuthorOpen(!authorOpen);
  };

  const handleCategoryClick = () => {
    setCategoryOpen(!categoryOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div style={{ backgroundColor: "#f0eeee", height: "100vh" }}>
      <Box
        sx={{
          mt: 3,
          p: 0.5,
          mb: 2,
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Link to="/home">
          <Avatar src={Logo} sx={{ width: "100%", height: 25 }} />
        </Link>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: "flex", color: theme.palette.primary.main }}
        >
          {BRAND}
        </Typography>
      </Box>
      <Divider />
      <List sx={{ bgcolor: "#f0eeee" }}>
        {/* Authors */}
        <ListItemButton onClick={handleAuthorClick}>
          <ListItemIcon sx={{ fontSize: 20 }}>
            <MdPeople />
          </ListItemIcon>
          <ListItemText sx={{ fontSize: 25 }} primary="Yazarlar" />
          {authorOpen ? <MdExpandLess /> : <MdExpandMore />}
        </ListItemButton>
        <Collapse in={authorOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {athrs &&
              athrs.map((a) => (
                <ListItemButton
                  key={a.id}
                  onClick={() => navigate(`/users/${a.username}`)}
                  sx={{ pl: 3 }}
                >
                  <ListItemIcon sx={{ fontSize: 15 }}>
                    <MdPerson />
                  </ListItemIcon>
                  <ListItemText primary={_.startCase(a.username)} />
                </ListItemButton>
              ))}
          </List>
        </Collapse>

        {/* Categories */}
        <ListItemButton onClick={handleCategoryClick}>
          <ListItemIcon sx={{ fontSize: 20 }}>
            <BiCategory />
          </ListItemIcon>
          <ListItemText primary="Kategoriler" />
          {categoryOpen ? <MdExpandLess /> : <MdExpandMore />}
        </ListItemButton>
        <Collapse in={categoryOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {ctgs &&
              ctgs.map((c) => (
                <ListItemButton
                  key={c.id}
                  onClick={() => navigate(`/posts/category/${c.name}`)}
                  sx={{ pl: 3 }}
                >
                  <ListItemIcon sx={{ fontSize: 15 }}>
                    <MdForward />
                  </ListItemIcon>
                  <ListItemText primary={_.startCase(c.name)} />
                </ListItemButton>
              ))}
          </List>
        </Collapse>
        <ListItemButton
          sx={{
            textAlign: "center",
            color: "#073b6b",
          }}
        >
          <Link to="/posts">
            <ListItemText primary="Tüm Yazılar!" />
          </Link>
        </ListItemButton>

        {authUser ? (
          <ListItemButton
            sx={{
              // textAlign:'center',
              bgcolor: "#073b6b",
              color: "#f4f2f2",
              ":hover": {
                bgcolor: "#f4f2f2",
                color: "#073b6b",
                borderRadius: "2%",
              },
            }}
            onClick={
              authUserRoles?.find((a) => a === "ROLE_AUTHOR")
                ? () => navigate(`/users/${authUser}`)
                : null
            }
          >
            <ListItemAvatar>
              <Avatar
                src={
                  authUserImage && `${BASE_URL}${photosApiUrl}/${authUserImage}`
                }
                {...stringAvatar(authUser.toUpperCase())}
              />
            </ListItemAvatar>
            <ListItemText primary={authUser} />
          </ListItemButton>
        ) : (
          <Link to="/auth">
            <ListItemButton
              sx={{
                textAlign: "center",
                bgcolor: "#073b6b",
                color: "#f4f2f2",
                ":hover": {
                  bgcolor: "#f4f2f2",
                  color: "#073b6b",
                  borderRadius: "2%",
                },
              }}
            >
              <ListItemText primary="Aramıza Katıl !" />
            </ListItemButton>
          </Link>
        )}

        {authUser && (
          <ListItemButton
            onClick={signOut}
            sx={{
              // textAlign: "center",
              p: 2,
              bgcolor: "#073b6b",
              color: "#f4f2f2",
              ":hover": {
                bgcolor: "#03192e",
                color: "#f4f2f2",
              },
            }}
          >
            <ListItemIcon
              sx={{
                fontSize: 20,
              }}
            >
              <AiOutlineLogout
                color="white"
                style={{ "&:hover": { color: "red" } }}
              />
            </ListItemIcon>
            <ListItemText primary="Çıkış Yap" />
          </ListItemButton>
        )}
      </List>
    </div>
  );

  if (matches) {
    return;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      {!mobileOpen && (
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{
            mr: 2,
            color: "black",
            position: "fixed",
            top: 4,
            left: 13,
            zIndex: 10000,
            bgcolor:'white'
          }}
        >
          <AiOutlineMenu />
        </IconButton>
      )}
      <Box
        component="nav"
        sx={{
          width: { lg: drawerWidth },
          flexShrink: { lg: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: "block",
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
