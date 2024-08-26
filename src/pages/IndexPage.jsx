import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../apis/user-api";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";
import { useMutation } from "react-query";
import indexImage from "../assets/img/index.jpg";
import { Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import HikingIcon from "@mui/icons-material/Hiking";

export const IndexPage = () => {
  const [user, setUser] = useUser();
  const navigate = useNavigate();
  const logoutMutation = useMutation(userLogout);

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
        toast.error(error.message);
      },
    });
  };
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          color: "white",
          textAlign: "center",
          backgroundColor: "#212529",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${indexImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          textShadow: "0 0.05rem 0.1rem rgba(0, 0, 0, 0.5)",
          boxShadow: "inset 0 0 5rem rgba(0, 0, 0, 0.5)",
        }}>
        <Box sx={{ height: "100%", maxWidth: "80vw", display: "flex", flexDirection: "column", p: 3, mx: "auto" }}>
          <Box component="header" sx={{ mb: "auto" }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                float: { xs: "none", sm: "left" },
                mb: { xs: 3, sm: 0 },
                fontWeight: (theme) => theme.typography.fontWeightBold,
              }}>
              YelpCamp
            </Typography>
            <Box component="nav" sx={{ float: { xs: "none", sm: "right" }, mt: 1 }}>
              {user.key ? (
                <NavLinkButton onClick={handleLogout} size="large">
                  ログアウト
                </NavLinkButton>
              ) : (
                <>
                  <NavLinkButton component={Link} to="/campgrounds/login" size="large">
                    ログイン
                  </NavLinkButton>
                  <NavLinkButton component={Link} to="/campgrounds/signup" size="large">
                    ユーザー登録
                  </NavLinkButton>
                </>
              )}
            </Box>
          </Box>
          <Box component="main" sx={{ px: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              YelpCampへようこそ！
              <br />
              全国のキャンプ場が簡単に一望できます。
              <br />
              キャンプ場の登録やレビューをして交流を深めていきましょう！
            </Typography>
            <Button
              component={Link}
              to="/campgrounds"
              variant="contained"
              size="large"
              endIcon={<HikingIcon />}
              sx={{
                fontWeight: (theme) => theme.typography.fontWeightBold,
                borderColor: "white",
                backgroundColor: "white",
                color: "#333",
                textShadow: "none",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}>
              キャンプ場へ
            </Button>
          </Box>
          <Box component="footer" sx={{ mt: "auto", color: "rgba(255, 255, 255, 0.5)" }}>
            <Typography variant="body1">&copy;YelpCamp 2024</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

const NavLinkButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(0.25, 0),
  fontWeight: theme.typography.fontWeightBold,
  color: "rgba(255, 255, 255, 0.5)",
  margin: theme.spacing(0, 0.5),
  borderBottom: "0.25rem solid transparent",
  textAlign: "center",
  "&:hover": {
    color: "rgba(255, 255, 255, 0.5)",
    borderBottom: "0.25rem solid rgba(255, 255, 255, 0.5)",
  },
}));
