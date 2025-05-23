import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth.context";
import ArticleIcon from "@mui/icons-material/Article";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "../context/theme.context";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { theme, resetTheme } = useTheme();
  const menuItems = [
    {
      text: "Blogs",
      icon: <ArticleIcon />,
      path: "/blogs",
    },
    {
      text: "Users",
      icon: <PeopleIcon />,
      path: "/user/list",
    },
    {
      text: "Products",
      icon: <ShoppingBasketIcon />,
      path: "/product/list",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    resetTheme();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          background: `${theme.palette.sidebar.background}`,
          color: `${theme.palette.sidebar.color}`,
        },
      }}
    >
      <Toolbar /> {/* This creates space for the app bar */}
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon sx={{ color: `${theme.palette.sidebar.color}` }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        <ListItem button onClick={handleLogout}>
          <ListItemIcon sx={{ color: `${theme.palette.sidebar.color}` }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
