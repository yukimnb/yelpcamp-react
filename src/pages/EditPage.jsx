import { useState } from "react";
import { useMutation } from "react-query";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { updateCampground } from "../apis/campground-api";
import { getForwardGeocoding } from "../apis/mapbox-api";
import { toast } from "react-toastify";
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

export const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const getGeocodeMutation = useMutation(getForwardGeocoding);
  const updateMutation = useMutation(updateCampground);

  const { state: data } = useLocation();

  const [newImages, setNewImages] = useState({
    new1: undefined,
    new2: undefined,
    new3: undefined,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: data });

  const handleImage = (e) => {
    setNewImages((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

  const handleDeleteImage = (e) => {
    setValue(e.target.name, e.target.checked ? "" : data[e.target.name]);
  };

  const onSubmit = (formValues) => {
    const formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      if (formValues[key] !== data[key]) {
        formData.append(key, formValues[key]);
      }
    });

    Object.keys(newImages).forEach((key) => {
      if (newImages[key]) {
        const newKey = key.replace("new", "image");
        if (formData.has(newKey)) {
          formData.set(newKey, newImages[key]);
        } else {
          formData.append(newKey, newImages[key]);
        }
      }
    });

    getGeocodeMutation.mutate(formValues.location, {
      onSuccess: ({ geometry }) => {
        formData.set("geometry", JSON.stringify(geometry));
        updateMutation.mutate([id, formData], {
          onSuccess: () => {
            toast.success("キャンプ場を更新しました");
            navigate(`/campgrounds/${id}`);
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
        キャンプ場の編集
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
                    <InputLabel htmlFor={`new${idx}`} shrink>
                      画像{idx}
                    </InputLabel>
                    <OutlinedInput
                      type="file"
                      name={`new${idx}`}
                      id={`new${idx}`}
                      label={`画像${idx}`}
                      inputProps={{ accept: "image/*" }}
                      notched
                      onChange={handleImage}
                    />
                    <FormHelperText>
                      現在:
                      <Typography component="a" sx={{ ml: 1, textDecoration: "none" }} href={data[`image${idx}`]}>
                        {data[`image${idx}`]?.match(/[\w-]+.\w+$/)}
                      </Typography>
                      {idx !== 1 && data[`image${idx}`] && (
                        <>
                          <input
                            type="checkbox"
                            name={`image${idx}`}
                            id={`image-clear${idx}`}
                            onChange={handleDeleteImage}
                            style={{ marginLeft: "1rem", accentColor: "grey" }}
                          />
                          <Typography component="label" variant="body2" htmlFor={`image-clear${idx}`}>
                            クリア
                          </Typography>
                        </>
                      )}
                    </FormHelperText>
                  </FormControl>
                </Box>
              );
            })}
            <Box>
              <Button type="submit" variant="contained" color="success" sx={{ mr: 3 }}>
                更新する
              </Button>
              <Button component={Link} color="error" to={`/campgrounds/${id}`}>
                キャンセル
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
