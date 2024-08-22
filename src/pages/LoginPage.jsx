import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../apis/user-api";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";
import { useErrorBoundary } from "react-error-boundary";
import { Box, Card, CardContent, Grid, Typography, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export const LoginPage = () => {
  const [, setUser] = useUser();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const loginMutation = useMutation(userLogin);

  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (formValues) => {
    loginMutation.mutate(formValues, {
      onSuccess: (data) => {
        setUser({ type: "SET_USER", data });
        toast.success(`${data.name} としてログインしました`);
        navigate("/campgrounds");
      },
      onError: (error) => {
        showBoundary(error);
      },
    });
  };

  return (
    <Grid container sx={{ alignItems: "center", height: "100%" }}>
      <Grid item sm={1} md={3}></Grid>
      <Grid item xs={12} sm={10} md={6}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Card variant="outlined" sx={{ mb: 10 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="h4" component="h1" align="center" sx={{ mb: 2 }}>
                ログイン
              </Typography>
              <Box>
                <TextField
                  type="email"
                  name="email"
                  label="メールアドレス"
                  variant="outlined"
                  fullWidth
                  error={errors.email}
                  helperText={errors.email?.message}
                  {...register("email", {
                    required: "メールアドレスは必須です",
                    pattern: {
                      value: /([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                      message: "メールアドレスの形式が正しくありません",
                    },
                  })}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box>
                <TextField
                  type="password"
                  name="password"
                  label="パスワード"
                  variant="outlined"
                  fullWidth
                  error={errors.password}
                  helperText={errors.password?.message}
                  {...register("password", {
                    required: "パスワードは必須です",
                    minLength: { value: 8, message: "パスワードは8文字以上で入力してください" },
                  })}
                  InputLabelProps={{ shrink: true }}
                  autoComplete="off"
                />
              </Box>
              <Button type="submit" variant="contained" color="success" sx={{ mt: 1 }}>
                ログイン
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};
