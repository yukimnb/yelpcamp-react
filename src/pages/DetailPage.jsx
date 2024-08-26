import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getCampgroundDetail, deleteCampground } from "../apis/campground-api";
import { getReview, deleteReview } from "../apis/review-api";
import { Map } from "../components/Map";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";
import { useErrorBoundary } from "react-error-boundary";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
  useTheme,
  useMediaQuery,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const SwiperBox = styled(Box)`
  .swiper-button-prev,
  .swiper-button-next {
    --swiper-navigation-color: white;
  }
`;

export const DetailPage = () => {
  const { id } = useParams();
  const [user] = useUser();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const deleteMutation = useMutation(deleteCampground);
  const deleteReviewMutation = useMutation(deleteReview);
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const { data } = useQuery("detail", () => getCampgroundDetail(id), {
    onError: (error) => {
      showBoundary(error);
    },
  });

  const { data: reviews } = useQuery("reviews", () => getReview(id), {
    onError: (error) => {
      showBoundary(error);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("キャンプ場を削除しました");
        navigate("/campgrounds");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const handleDeleteReview = (reviewId) => {
    deleteReviewMutation.mutate(reviewId, {
      onSuccess: () => {
        toast.success("レビューを削除しました");
        setTimeout(() => {
          navigate(0);
        }, 1000);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      <Map geometry={data.geometry} location={data.location} />
      <Card variant="outlined" sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mb: 3 }}>
        <SwiperBox sx={{ display: "flex", width: { xs: "100%", md: "50%" }, px: 1, py: 2 }}>
          <Swiper modules={[Navigation, Autoplay]} slidesPerView={1} navigation autoplay={{ delay: 5000 }}>
            <SwiperSlide>
              <CardMedia
                component="img"
                image={data.image1}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </SwiperSlide>
            {data.image2 && (
              <SwiperSlide>
                <CardMedia
                  component="img"
                  image={data.image2}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
            )}
            {data.image3 && (
              <SwiperSlide>
                <CardMedia
                  component="img"
                  image={data.image3}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </SwiperSlide>
            )}
          </Swiper>
        </SwiperBox>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 1,
              pb: 0,
            }}>
            <Typography variant="h5" component="h1">
              {data.title}
            </Typography>
            <Typography variant="body1" component="p">
              {data.description}
            </Typography>
            <List>
              <Divider />
              <ListItem>
                <ListItemText primary={data.location} sx={{ color: "text.secondary" }} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`登録者：${data.author_name}`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary={`¥ ${data.price} / 泊`} />
              </ListItem>
              <Divider />
            </List>
          </CardContent>

          <CardActions>
            <Button
              component={Link}
              to={`/campgrounds/${data.id}/createreview`}
              variant="contained"
              color="success"
              sx={{ fontWeight: theme.typography.fontWeightBold }}>
              レビューを作成
            </Button>
            {user.name === data.author_name && (
              <>
                <Button
                  component={Link}
                  to={`/campgrounds/${data.id}/edit`}
                  variant="contained"
                  color="info"
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                  state={data}>
                  {isSm ? "編集" : "編集する"}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  sx={{ fontWeight: theme.typography.fontWeightBold }}>
                  {isSm ? "削除" : "削除する"}
                </Button>
              </>
            )}
          </CardActions>
        </Box>
      </Card>

      {reviews.length > 0 && (
        <>
          <Typography variant="h5" component="h2" sx={{ ml: 2, mb: 1, fontWeight: theme.typography.fontWeightBold }}>
            レビュー
            <Typography component="span" variant="h5" sx={{ ml: 1, fontWeight: theme.typography.fontWeightBold }}>
              ({reviews.length}件)
            </Typography>
          </Typography>

          {reviews
            .sort((a, b) => b.id - a.id)
            .map((object) => (
              <Card variant="outlined" sx={{ mb: 3, px: { xs: 0, sm: 4 } }} key={object.id}>
                <CardContent>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                    <Typography variant="h6" component="p">
                      {object.reviewer_name} さん
                    </Typography>
                    <Typography
                      variant="h6"
                      component="p"
                      sx={{ ml: 4, color: theme.palette.warning.main, fontWeight: theme.typography.fontWeightBold }}>
                      {object.rating}
                    </Typography>
                    <Rating name="read-only" value={Number(object.rating)} readOnly sx={{ pt: "3px" }} />
                  </Box>
                  <Typography variant="body1" sx={{ mx: 3, mt: 2 }}>
                    {object.comment}
                  </Typography>
                </CardContent>

                {user.name === object.reviewer_name && (
                  <CardActions sx={{ display: "flex", justifyContent: "flex-end", mb: 1, px: 2 }}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ fontWeight: theme.typography.fontWeightBold }}
                      onClick={() => handleDeleteReview(object.id)}>
                      削除する
                    </Button>
                  </CardActions>
                )}
              </Card>
            ))}
        </>
      )}
    </>
  );
};
