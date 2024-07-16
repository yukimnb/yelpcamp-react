import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getCampgroundDetail, deleteCampground } from "../utils/campgroundAPI";
import { getReview, deleteReview } from "../utils/reviewAPI";
import { Map } from "../components/Map";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";

export const DetailPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery("detail", () => getCampgroundDetail(id));
  const { data: reviews } = useQuery("reviews", () => getReview(id));
  const deleteMutation = useMutation(deleteCampground);
  const deleteReviewMutation = useMutation(deleteReview);
  const [user] = useUser();
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success("キャンプ場を削除しました");
        navigate("/campgrounds");
      },
      onError: (error) => {
        console.log("Error", error);
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
        console.log("Error", error);
      },
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-7">
          <div id="campgroundCarousel" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={data.image1} className="d-block w-100" alt="" />
              </div>
              {data.image2 && (
                <div className="carousel-item">
                  <img src={data.image2} className="d-block w-100" alt="" />
                </div>
              )}
              {data.image3 && (
                <div className="carousel-item">
                  <img src={data.image3} className="d-block w-100" alt="" />
                </div>
              )}
            </div>
            {(data.image2 || data.image3) && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#campgroundCarousel"
                  data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#campgroundCarousel"
                  data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{data.title}</h5>
              <p className="card-text">{data.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-muted">{data.location}</li>
              <li className="list-group-item">登録者：{data.author_name}</li>
              <li className="list-group-item">&yen; {data.price} / 泊</li>
            </ul>
            {user.key && (
              <>
                <div className="card-body">
                  {user.name === data.author_name && (
                    <>
                      <Link to={`/campgrounds/${data.id}/edit`} className="btn btn-info me-2" state={data}>
                        編集する
                      </Link>
                      <button className="btn btn-danger me-2" onClick={handleDelete}>
                        削除する
                      </button>
                    </>
                  )}
                  <Link to={`/campgrounds/${data.id}/createreview`} className="btn btn-success">
                    レビューを作成
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-md-5">
          <Map geometry={data.geometry} location={data.location} />
          {reviews && <h3 className="mt-4 mb-2">レビュー</h3>}
          {reviews &&
            reviews
              .sort((a, b) => b.id - a.id)
              .map((object) => (
                <div className="card mb-3" key={object.id}>
                  <div className="card-body">
                    <h5 className="card-subtitle mb-2">{object.reviewer_name}</h5>
                    <p className="card-title starability-result" data-rating={object.rating}>
                      Rated: {object.rating} stars
                    </p>
                    <p className="card-text">コメント : {object.comment}</p>
                    {user.name === object.reviewer_name && (
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteReview(object.id)}>
                        削除する
                      </button>
                    )}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};
