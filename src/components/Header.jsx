import React, { useMemo } from "react";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Avatar,
  Badge,
  ToggleButton,
} from "@mui/material";
import { Brightness4, Brightness7, Favorite } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/Auth.context";
import { Link, useNavigate } from "react-router-dom";
import { useFav } from "../redux/slices/favourite.slice";
import { useTheme } from "../context/theme.context";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { blogs, products } = useFav();
  const favCount = useMemo(
    () => blogs.length + products.length,
    [blogs, products]
  );

  const handleLogout = () => {
    logout();
    navigate("/");
    handleClose();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: `${theme.palette.header.background}`,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ mr: 2, color: `${theme.palette.header.color}` }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: `${theme.palette.header.color}` }}
        >
          Blog Dashboard
        </Typography>

        <Box>
          <ToggleButton
            value="check"
            onClick={toggleTheme}
            sx={{ border: `none` }}
          >
            {theme.palette.mode === "light" ? (
              <Brightness4
                sx={{
                  color: `${theme.palette.header.color}`,
                }}
              />
            ) : (
              <Brightness7
                sx={{
                  color: `${theme.palette.header.color}`,
                }}
              />
            )}
            {/* <CheckIcon
              sx={{
                color: `${theme.palette.color}`,
              }}
            /> */}
          </ToggleButton>
          <IconButton color="inherit">
            <Badge badgeContent={favCount} color="error">
              <Link to="/favourite/list">
                <Favorite />
              </Link>
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
