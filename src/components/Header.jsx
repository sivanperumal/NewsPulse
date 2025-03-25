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
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Brightness4,
  Brightness7,
  FavoriteBorder,
  Close,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../context/Auth.context";
import { Link, useNavigate } from "react-router-dom";
import {
  removeBlogFav,
  removeProdFav,
  useFav,
} from "../redux/slices/favourite.slice";
import { useTheme } from "../context/theme.context";
import { useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorFav, setAnchorFav] = React.useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFav = (event) => {
    setAnchorFav(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFavClose = () => {
    setAnchorFav(null);
    navigate("/favourite/list");
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
  const handleRemoveFav = (name, item) => {
    if (name === "product") {
      dispatch(removeProdFav(item));
    } else {
      dispatch(removeBlogFav(item));
    }
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

          {favCount > 0 && (
            <>
              <IconButton
                size="large"
                aria-label="Favourite Product and Blog list"
                aria-controls="menu-favbar"
                aria-haspopup="true"
                onClick={handleFav}
                color="primary"
              >
                <Badge badgeContent={favCount} color="error">
                  <FavoriteBorder />
                </Badge>
              </IconButton>
              <Menu
                id="menu-favbar"
                anchorEl={anchorFav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorFav)}
                onClose={handleFavClose}
              >
                {products.length > 0 && (
                  <MenuItem>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      <Link to="/favourite/list">Product Favorite Items</Link>
                    </Typography>
                  </MenuItem>
                )}

                {products?.map((product) => {
                  return (
                    <MenuItem key={product.id}>
                      <ListItemText primary={product.title.showDots(18)} />
                      <ListItemIcon
                        onClick={() => handleRemoveFav("product", product)}
                      >
                        <Close fontSize="small" />
                      </ListItemIcon>
                    </MenuItem>
                  );
                })}

                {blogs.length > 0 && (
                  <MenuItem>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      <Link to="/favourite/list">Blog Favorite Items</Link>
                    </Typography>
                  </MenuItem>
                )}
                {blogs?.map((blog, index) => {
                  return (
                    <MenuItem key={index}>
                      <ListItemText primary={blog.title.showDots(18)} />
                      <ListItemIcon
                        onClick={() => handleRemoveFav("blog", blog)}
                      >
                        <Close fontSize="small" />
                      </ListItemIcon>
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          )}

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
