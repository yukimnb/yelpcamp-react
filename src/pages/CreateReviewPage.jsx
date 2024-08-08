import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams, Link } from "react-router-dom";
import { createReview } from "../apis/review-api";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";
import { useErrorBoundary } from "react-error-boundary";

export const CreateReviewPage = () => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [user] = useUser();
  const [validated, setValidated] = useState(false);
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    rating: "5",
    comment: "",
    campground: id,
    reviewer: user.id,
  });

  const createMutation = useMutation(createReview);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      createMutation.mutate([id, formValues], {
        onSuccess: () => {
          toast.success("レビューを作成しました");
          navigate(`/campgrounds/${id}`);
        },
        onError: (error) => {
          showBoundary(error);
        },
      });
    }
    setValidated(true);
  };

  const handleForm = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <h1 className="mb-3">レビュー</h1>
          <form className={validated ? "was-validated" : ""} onSubmit={handleSubmit} noValidate>
            <div>
              <fieldset className="starability-basic">
                <input
                  type="radio"
                  id="rate1"
                  name="rating"
                  value="1"
                  onChange={handleForm}
                  checked={formValues.rating === "1"}
                />
                <label htmlFor="rate1">1 star</label>
                <input
                  type="radio"
                  id="rate2"
                  name="rating"
                  value="2"
                  onChange={handleForm}
                  checked={formValues.rating === "2"}
                />
                <label htmlFor="rate2">2 stars</label>
                <input
                  type="radio"
                  id="rate3"
                  name="rating"
                  value="3"
                  onChange={handleForm}
                  checked={formValues.rating === "3"}
                />
                <label htmlFor="rate3">3 stars</label>
                <input
                  type="radio"
                  id="rate4"
                  name="rating"
                  value="4"
                  onChange={handleForm}
                  checked={formValues.rating === "4"}
                />
                <label htmlFor="rate4">4 stars</label>
                <input
                  type="radio"
                  id="rate5"
                  name="rating"
                  value="5"
                  onChange={handleForm}
                  checked={formValues.rating === "5"}
                />
                <label htmlFor="rate5">5 stars</label>
              </fieldset>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="comment">
                コメント
              </label>
              <textarea
                className="form-control"
                name="comment"
                id="comment"
                cols="30"
                rows="3"
                value={formValues.comment}
                onChange={handleForm}
                required></textarea>
            </div>
            <button className="btn btn-success me-3">投稿する</button>
            <Link to={`/campgrounds/${id}`}>キャンセル</Link>
          </form>
        </div>
      </div>
    </>
  );
};
