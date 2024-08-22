import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createReview } from "../apis/review-api";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";
import { useErrorBoundary } from "react-error-boundary";
import { Box, Card, CardContent, Grid, Typography, Button, TextField, Rating } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

export const CreateReviewPage = () => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [user] = useUser();
  const { id } = useParams();
  const createMutation = useMutation(createReview);

  useEffect(() => {
    if (!user.key) {
      toast.warning("レビューにはログインが必要です");
      navigate("/campgrounds/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultValues = {
    campground: id,
    reviewer: user.id,
  };

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (formValues) => {
    createMutation.mutate([id, formValues], {
      onSuccess: () => {
        toast.success("レビューを作成しました");
        navigate(`/campgrounds/${id}`);
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
          <Card sx={{ mb: 10 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="h4" component="h1" align="center" sx={{ mb: 1 }}>
                レビュー
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography component="legend" sx={{ pt: "4px" }}>
                  評価:{" "}
                </Typography>
                <Controller
                  name="rating"
                  control={control}
                  defaultValue={5}
                  render={({ field }) => (
                    <Rating {...field} size="large" error={errors.rating} value={Number(field.value)} />
                  )}
                />
              </Box>

              <Box>
                <TextField
                  multiline
                  rows={4}
                  name="comment"
                  label="コメント"
                  variant="outlined"
                  fullWidth
                  error={errors.comment}
                  helperText={errors.comment?.message}
                  {...register("comment", {
                    required: "コメントは必須です",
                    maxLength: { value: 100, message: "コメントは100文字以内で入力してください" },
                  })}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Button type="submit" variant="contained" color="success" sx={{ mt: 1 }}>
                投稿する
              </Button>
              <Button component={Link} variant="outlined" to={`/campgrounds/${id}`} color="error">
                キャンセル
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};
