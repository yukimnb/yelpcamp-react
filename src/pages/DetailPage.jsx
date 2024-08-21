import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getCampgroundDetail, deleteCampground } from "../apis/campground-api";
import { getReview, deleteReview } from "../apis/review-api";
import { Map } from "../components/Map";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";
import { useErrorBoundary } from "react-error-boundary";
import {
  Grid,
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
        showBoundary(error);
      },
    });
  };

  const handleDeleteReview = (reviewId) => {
    deleteReviewMutation.mutate(reviewId, {
      onSuccess: () => {
        toast.success("レビューを削除しました");
        navigate(0);
      },
      onError: (error) => {
        showBoundary(error);
      },
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card variant="outlined" sx={{ mb: { xs: 0, md: 3 } }}>
            <SwiperBox>
              <Swiper modules={[Navigation, Autoplay]} slidesPerView={1} navigation autoplay={{ delay: 5000 }}>
                <SwiperSlide>
                  <CardMedia component="img" image={data.image1} height={350} />
                </SwiperSlide>
                {data.image2 && (
                  <SwiperSlide>
                    <CardMedia component="img" image={data.image2} height={350} />
                  </SwiperSlide>
                )}
                {data.image3 && (
                  <SwiperSlide>
                    <CardMedia component="img" image={data.image3} height={350} />
                  </SwiperSlide>
                )}
              </Swiper>
            </SwiperBox>
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
            {user.key && (
              <CardActions>
                {user.name === data.author_name && (
                  <>
                    <Button
                      component={Link}
                      to={`/campgrounds/${data.id}/edit`}
                      variant="contained"
                      color="info"
                      sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}
                      state={data}>
                      {isSm ? "編集" : "編集する"}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleDelete}
                      sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}>
                      {isSm ? "削除" : "削除する"}
                    </Button>
                  </>
                )}
                <Button
                  component={Link}
                  to={`/campgrounds/${data.id}/createreview`}
                  variant="contained"
                  color="success"
                  sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}>
                  レビューを作成
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Map geometry={data.geometry} location={data.location} />
          {reviews.length > 0 && (
            <>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 1, fontWeight: (theme) => theme.typography.fontWeightBold }}>
                レビュー
              </Typography>
              {reviews
                .sort((a, b) => b.id - a.id)
                .map((object) => (
                  <Card variant="outlined" sx={{ mb: 3 }} key={object.id}>
                    <CardContent sx={{ p: 1.5 }}>
                      <Typography variant="h6" component="p">
                        {object.reviewer_name}
                      </Typography>
                      <Rating name="read-only" value={Number(object.rating)} size="large" readOnly />
                      <Typography variant="body1">コメント : {object.comment}</Typography>
                    </CardContent>

                    {user.name === object.reviewer_name && (
                      <CardActions sx={{ p: 0.5 }}>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ fontWeight: (theme) => theme.typography.fontWeightBold }}
                          onClick={() => handleDeleteReview(object.id)}>
                          削除する
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                ))}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
