import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { createCampground } from "../utils/campgroundAPI";
import { getForwardGeocoding } from "../utils/mapboxAPI";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";
import { useErrorBoundary } from "react-error-boundary";

export const CreatePage = () => {
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [user] = useUser();
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    price: 0,
    location: "",
    geometry: {},
    description: "",
    image1: "",
    image2: "",
    image3: "",
    author: user.id,
  });

  const getGeocodeMutation = useMutation(getForwardGeocoding);
  const createMutation = useMutation(createCampground);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
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
    }
    setValidated(true);
  };

  const handleForm = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  return (
    <>
      <div className="row">
        <h1 className="text-center">キャンプ場の新規登録</h1>
        <div className="offset-md-2 col-md-8">
          <form className={validated ? "was-validated" : ""} onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label" htmlFor="title">
                タイトル
              </label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                value={formValues.title}
                onChange={handleForm}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="location">
                場所
              </label>
              <input
                className="form-control"
                type="text"
                name="location"
                id="location"
                value={formValues.location}
                onChange={handleForm}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="price">
                価格
              </label>
              <div className="input-group">
                <span className="input-group-text" id="price-label">
                  &yen;
                </span>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  placeholder="0"
                  aria-label="価格"
                  aria-describedby="price-label"
                  name="price"
                  value={formValues.price}
                  onChange={handleForm}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="description">
                説明
              </label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                value={formValues.description}
                onChange={handleForm}
                required></textarea>
            </div>
            {/* image要素 * 3作成 */}
            {[...Array(3)].map((_, i) => {
              const idx = i + 1;
              return (
                <div className="mb-3" key={idx}>
                  <label className="form-label" htmlFor={`image${idx}`}>
                    画像{idx}
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name={`image${idx}`}
                    id={`image${idx}`}
                    accept="image/*"
                    onChange={handleImage}
                    required={idx === 1 && true}
                  />
                  {idx === 1 && <div className="invalid-feedback">キャンプ場の登録には1枚以上の画像が必要です</div>}
                </div>
              );
            })}
            <div className="mb-3">
              <button className="btn btn-success">登録する</button>
            </div>
          </form>
          <Link to="/campgrounds">一覧に戻る</Link>
        </div>
      </div>
    </>
  );
};
