import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { createCampground } from "../apis/campground-api";
import { getForwardGeocoding } from "../apis/mapbox-api";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";
import { useErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import {
  Grid,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  OutlinedInput,
  Button,
  FormHelperText,
} from "@mui/material";

export const CreatePage = () => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [user] = useUser();

  useEffect(() => {
    if (!user.key) {
      toast.warning("キャンプ場作成にはログインが必要です");
      navigate("/campgrounds/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultValues = {
    title: "",
    price: 0,
    location: "",
    geometry: {},
    description: "",
    image1: "",
    image2: "",
    image3: "",
    author: user.id,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const getGeocodeMutation = useMutation(getForwardGeocoding);
  const createMutation = useMutation(createCampground);

  const onSubmit = (formValues) => {
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      if (key.startsWith("image") && formValues[key]) {
        formData.append(key, formValues[key][0]);
      } else {
        formData.append(key, formValues[key]);
      }
    });
    getGeocodeMutation.mutate(formValues.location, {
      onSuccess: ({ geometry }) => {
        formData.set("geometry", JSON.stringify(geometry));
        createMutation.mutate(formData, {
          onSuccess: () => {
            toast.success("キャンプ場を作成しました");
            navigate("/campgrounds");
          },
          onError: (error) => {
            showBoundary(error);
          },
        });
      },
      onError: (error) => {
        showBoundary(error);
      },
    });
  };

  return (
    <>
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 3 }}>
        キャンプ場の新規登録
      </Typography>
      <Grid container>
        <Grid item sm={1} md={2}></Grid>
        <Grid item xs={12} sm={10} md={8}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 3, mb: 5 }}>
            <Box>
              <TextField
                label="タイトル"
                variant="outlined"
                fullWidth
                name="title"
                error={errors.title}
                helperText={errors.title?.message}
                {...register("title", {
                  required: "タイトルは必須です",
                  maxLength: { value: 50, message: "タイトルは50文字以内で入力してください" },
                })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box>
              <TextField
                label="場所"
                variant="outlined"
                fullWidth
                name="location"
                error={errors.location}
                helperText={errors.location?.message}
                {...register("location", {
                  required: "場所は必須です",
                })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel htmlFor="price">価格</InputLabel>
                <OutlinedInput
                  type="number"
                  id="price"
                  label="価格"
                  placeholder="0"
                  name="price"
                  startAdornment={
                    <InputAdornment position="start" sx={{ ml: 1, mr: 2 }}>
                      &yen;
                    </InputAdornment>
                  }
                  error={errors.price}
                  {...register("price", {
                    required: "価格は必須です",
                    min: { value: 0, message: "価格は0以上の数値で入力してください" },
                  })}
                />
                <FormHelperText error={errors.price}>{errors.price?.message}</FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <TextField
                multiline
                label="説明"
                variant="outlined"
                fullWidth
                name="description"
                rows={4}
                error={errors.description}
                helperText={errors.description?.message}
                {...register("description", {
                  required: "説明は必須です",
                })}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            {/* image要素 * 3作成 */}
            {[...Array(3)].map((_, i) => {
              const idx = i + 1;
              return (
                <Box key={idx}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor={`image${idx}`} shrink>
                      画像{idx}
                    </InputLabel>
                    <OutlinedInput
                      type="file"
                      name={`image${idx}`}
                      id={`image${idx}`}
                      label={`画像${idx}`}
                      inputProps={{ accept: "image/*" }}
                      notched
                      error={errors[`image${idx}`]}
                      {...register(`image${idx}`, {
                        required: idx === 1 ? "キャンプ場の登録には1枚以上の画像が必要です" : false,
                      })}
                    />
                    <FormHelperText error={errors[`image${idx}`]}>{errors[`image${idx}`]?.message}</FormHelperText>
                  </FormControl>
                </Box>
              );
            })}
            <Box>
              <Button type="submit" variant="contained" color="success" sx={{ mr: 3 }}>
                登録する
              </Button>
              <Button component={Link} color="error" to="/campgrounds">
                キャンセル
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
