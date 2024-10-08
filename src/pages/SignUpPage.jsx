import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { userSignUp, userLogin } from "../apis/user-api";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";
import { Box, Card, CardContent, Grid, Typography, Button, TextField, FormHelperText } from "@mui/material";
import { useForm } from "react-hook-form";

export const SignUpPage = () => {
  const [, setUser] = useUser();
  const navigate = useNavigate();
  const signUpMutation = useMutation(userSignUp);
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
    signUpMutation.mutate(
      {
        email: formValues.email,
        password1: formValues.password,
        password2: formValues.password,
      },
      {
        onSuccess: () => {
          loginMutation.mutate(formValues, {
            onSuccess: (data) => {
              setUser({ type: "SET_USER", data });
              toast.success(`ユーザー ${data.name} を作成しログインしました`);
              navigate("/campgrounds");
            },
            onError: (error) => {
              toast.error(error.message);
            },
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <Grid container sx={{ alignItems: "center", height: "100%" }}>
      <Grid item sm={1} md={3}></Grid>
      <Grid item xs={12} sm={10} md={6}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Card variant="outlined" sx={{ mb: 10 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <Typography variant="h4" component="h1" align="center" sx={{ mb: 2 }}>
                ユーザー登録
              </Typography>
              <Box>
                <TextField
                  type="email"
                  name="email"
                  label="メールアドレス"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
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
                <FormHelperText>※ ローカルパートがユーザー名として登録されます</FormHelperText>
              </Box>
              <Box>
                <TextField
                  type="password"
                  name="password"
                  label="パスワード"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
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
                ユーザー登録
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};
