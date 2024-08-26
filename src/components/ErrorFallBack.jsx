import errorImage from "../assets/img/error.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";

export const ErrorFallBack = ({ error, resetErrorBoundary }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBack = () => {
    resetErrorBoundary();
    navigate("/");
    window.location.reload();
  };

  return (
    <Container
      fixed
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 2,
      }}>
      <Box component="img" src={errorImage} alt="error" sx={{ width: "60%" }} />

      <Typography variant="h5" component="h1">
        以下のエラーが発生してしまいました。
      </Typography>
      <Typography variant="h6" component="h2" sx={{ fontWeight: theme.typography.fontWeightBold }}>
        {error.name}: {error.message}
      </Typography>

      <Typography variant="body1">
        エラーハンドリングの考慮不足のためお手数ですが、戻るボタンをクリックしてください。
      </Typography>
      <Button sx={{ mb: 5 }} variant="contained" onClick={handleBack}>
        TOPへ戻る
      </Button>
    </Container>
  );
};

ErrorFallBack.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};
