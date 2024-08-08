import { useState } from "react";
import { useMutation } from "react-query";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { updateCampground } from "../apis/campground-api";
import { getForwardGeocoding } from "../apis/mapbox-api";
import { toast } from "react-toastify";
import { useErrorBoundary } from "react-error-boundary";

export const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const getGeocodeMutation = useMutation(getForwardGeocoding);
  const updateMutation = useMutation(updateCampground);

  const { state: data } = useLocation();
  const [validated, setValidated] = useState(false);
  const [formValues, setFormValues] = useState(data);
  const [newImages, setNewImages] = useState({
    newImage1: undefined,
    newImage2: undefined,
    newImage3: undefined,
  });

  const handleSubmit = (e) => {
    setValidated(true);
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formData = new FormData();
      Object.keys(formValues).forEach((key) => {
        if (formValues[key] !== data[key]) {
          formData.append(key, formValues[key]);
        }
        if (key.includes("image")) {
          const [first, ...rest] = key;
          const newKey = "new" + first.toUpperCase() + rest.join("");
          if (newImages[newKey] && formData.has(key)) {
            formData.set(key, newImages[newKey]);
          } else if (newImages[newKey] && !formData.has(key)) {
            formData.append(key, newImages[newKey]);
          }
        }
      });
      if (formData.has("location")) {
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
      } else {
        updateMutation.mutate([id, formData], {
          onSuccess: () => {
            toast.success("キャンプ場を更新しました");
            navigate(`/campgrounds/${id}`);
          },
          onError: (error) => {
            showBoundary(error);
          },
        });
      }
    }
  };

  const handleForm = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImage = (e) => {
    setNewImages((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };
  const handleDeleteImage = (e) => {
    setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.checked ? "" : data[e.target.name] }));
  };

  return (
    <>
      <div className="row">
        <h1 className="text-center">キャンプ場の編集</h1>
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
                  <label className="form-label" htmlFor={`newImage${idx}`}>
                    画像{idx}
                  </label>
                  {data[`image${idx}`] && (
                    <>
                      <label className="ms-2">現在:</label>
                      <a className="mx-1" href={formValues[`image${idx}`]}>
                        {formValues[`image${idx}`]?.match(/[\w-]+.\w+$/)}
                      </a>
                      {idx !== 1 && (
                        <>
                          <input
                            type="checkbox"
                            name={`image${idx}`}
                            id={`image${idx}`}
                            className="ms-2"
                            onChange={handleDeleteImage}
                          />
                          <label htmlFor={`image${idx}`}>クリア</label>
                        </>
                      )}
                    </>
                  )}
                  <input
                    className="form-control"
                    type="file"
                    name={`newImage${idx}`}
                    id={`newImage${idx}`}
                    accept="image/*"
                    onChange={handleImage}
                  />
                </div>
              );
            })}

            <div className="mb-3">
              <button className="btn btn-success me-3">更新する</button>
              <Link to={`/campgrounds/${id}`}>キャンセル</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
