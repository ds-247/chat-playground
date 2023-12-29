import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TelegramIcon from "@mui/icons-material/Telegram";
import { NavLink } from "react-router-dom";
import auth from "../../services/authService";
import UserOptions from "./UserOptions";
import "./navbar.css";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const user = auth.getCurrentUser();

  const pages = [
    { label: "Home", to: "/" },
    { label: "Participants", to: "/users", condition: user },
    { label: "Login", to: "/login", condition: !user },
    { label: "Register", to: "/register", condition: !user },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ mb: "20px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TelegramIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ChatQt
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((link, index) =>
                link?.condition === undefined || link.condition ? (
                  <NavLink
                    key={`nav-link-${index}`}
                    className="nav-page"
                    aria-current="page"
                    to={link.to}
                  >
                    <MenuItem
                      key={`menu-item-${index}`}
                      onClick={handleCloseNavMenu}
                    >
                      <Typography textAlign="center">{link.label}</Typography>
                    </MenuItem>
                  </NavLink>
                ) : null
              )}
            </Menu>
          </Box>
          <TelegramIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ChatQt
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((link, index) =>
              link?.condition === undefined || link.condition ? (
                <NavLink
                  key={index}
                  className="nav-link"
                  aria-current="page"
                  to={link.to}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {link.label}
                  </Button>
                </NavLink>
              ) : null
            )}
          </Box>
          {user && <UserOptions user={user} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
