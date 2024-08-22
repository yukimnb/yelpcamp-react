import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { userLogout } from "../apis/user-api";
import { toast } from "react-toastify";
import { useUser } from "./ContextProvider";
import { useErrorBoundary } from "react-error-boundary";
import { styled } from "@mui/material/styles";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const settings = [
  { linkName: "ログイン", link: "/campgrounds/login" },
  { linkName: "ユーザー登録", link: "/campgrounds/signup" },
];

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useUser();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const logoutMutation = useMutation(userLogout);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logoutMutation.mutate(null, {
      onSuccess: () => {
        setUser({
          type: "REMOVE_USER",
        });
        toast.success("ログアウトしました。");
        navigate("/");
      },
      onError: (error) => {
        showBoundary(error);
      },
    });
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#212529" }}>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: (theme) => theme.typography.fontWeightBold,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            YelpCamp
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavLinkButton component={Link} to={"/campgrounds"}>
              キャンプ場一覧
            </NavLinkButton>
            <NavLinkButton component={Link} to={"/campgrounds/create"}>
              キャンプ場作成
            </NavLinkButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
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
              }}>
              <MenuItem component={Link} to={"/campgrounds"}>
                <Typography textAlign="center">キャンプ場一覧</Typography>
              </MenuItem>
              <MenuItem component={Link} to={"/campgrounds/create"}>
                <Typography textAlign="center">キャンプ場作成</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component={Link}
            to={"/"}
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: (theme) => theme.typography.fontWeightBold,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            YelpCamp
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: (theme) => theme.palette.info.light }}>
                {user.key && user.name.toLocaleUpperCase().at(0)}
              </Avatar>
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
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
              onClose={handleCloseUserMenu}>
              {user.key ? (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">ログアウト</Typography>
                </MenuItem>
              ) : (
                settings.map((setting) => (
                  <MenuItem key={setting.linkName} component={Link} to={setting.link}>
                    <Typography textAlign="center">{setting.linkName}</Typography>
                  </MenuItem>
                ))
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const NavLinkButton = styled(Button)(({ theme }) => ({
  my: 2,
  color: "rgba(255,255,255,0.7)",
  fontWeight: theme.typography.fontWeightBold,
  display: "block",
  "&:hover": {
    color: "white",
  },
}));
