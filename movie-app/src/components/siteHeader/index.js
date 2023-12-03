import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Avatar from "@mui/material/Avatar";
import { deepPurple } from "@mui/material/colors";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = ({ history }) => {
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const userOpen = Boolean(userAnchorEl);

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const menuOpen = Boolean(menuAnchorEl);

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "People", path: "/people" },
    {
      label: "Movie",
      children: [
        { label: "Now Playing", path: "/movies/now-playing" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "Trend", path: "/movies/trend" },
      ],
    },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: false });
  };

  const handleUserMenu = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#0d253f" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={menuAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={menuOpen}
                onClose={() => setMenuAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) =>
                opt.children ? (
                  <>
                    <Button
                      key={opt.label}
                      color="inherit"
                      onClick={handleMenu}
                    >
                      {opt.label}
                    </Button>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={menuAnchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={menuOpen}
                      onClose={() => setMenuAnchorEl(null)}
                    >
                      {opt.children.map((opt) => (
                        <MenuItem
                          key={opt.label}
                          onClick={() => handleMenuSelect(opt.path)}
                        >
                          {opt.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                )
              )}
              {isUserLoggedIn ? (
                <>
                  <IconButton
                    onClick={handleUserMenu}
                    sx={{ p: 0 }}
                    name="profile"
                  >
                    <Avatar
                      sx={{ bgcolor: deepPurple[500], marginLeft: "10px" }}
                    >
                      OP
                    </Avatar>
                  </IconButton>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={userAnchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={userOpen}
                    onClose={() => setUserAnchorEl(null)}
                  >
                    <MenuItem onClick={() => navigate("/favorites")}>
                      <Typography textAlign="center">Favorites</Typography>
                    </MenuItem>
                    <MenuItem name="logout" onClick={handleLogout}>
                      <Typography textAlign="center">Log out</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  name="signin"
                  color="inherit"
                  sx={{ border: "1px #fff solid" }}
                  onClick={handleLogin}
                >
                  sign in
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
