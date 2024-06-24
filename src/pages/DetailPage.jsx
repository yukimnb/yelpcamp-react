import { useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { getCampgroundDetail, deleteCampground } from "../utils/api";
import { Map } from "../components/Map";
import { AppContext } from "../components/ContextProvider";

export const DetailPage = () => {
  const { id } = useParams();
  const { data, error, isLoading, isError } = useQuery("detail", () => getCampgroundDetail(id));
  const deleteMutation = useMutation(deleteCampground);
  const [context] = useContext(AppContext);
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
        navigate("/campgrounds");
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
            {context.key && (
              <>
                <div className="card-body">
                  {context.userName === data.author_name && (
                    <>
                      <Link to="" className="btn btn-info">
                        編集する
                      </Link>
                      <button className="btn btn-danger" onClick={handleDelete}>
                        削除する
                      </button>
                    </>
                  )}
                  <Link to="" className="btn btn-success">
                    レビューを作成
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-md-5">
          <Map geometry={data.geometry} location={data.location} />
          {/* {% if reviews %}
        <h3 className="mt-4 mb-2">レビュー</h3>
        {% for review in reviews %}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-subtitle mb-2">{{ review.reviewer.username }}</h5>
              <p className="card-title starability-result"
                 data-rating="{{ review.rating }}">Rated: {{ review.rating }} stars</p>
              <p className="card-text">コメント : {{ review.comment }}</p>
              {% if user.id == review.reviewer_id %}
                <form action="{% url 'campgrounds:delete_review' id=campground.id review_id=review.id %}"
                      method="POST">
                  {% csrf_token %}
                  <button className="btn btn-sm btn-danger">削除する</button>
                </form>
              {% endif %}
            </div>
          </div>
        {% endfor %}
      </div>
    {% endif %} */}
        </div>
      </div>
    </>
  );
};
