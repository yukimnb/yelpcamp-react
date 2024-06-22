import { useState, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import { getForwardGeocoding, createCampground } from "../utils/api";
import { AppContext } from "../components/ContextProvider";

export const CreatePage = () => {
  const navigate = useNavigate();
  const [context] = useContext(AppContext);
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
    author: context.userId,
  });

  const getGeocodeMutation = useMutation(getForwardGeocoding);
  const createMutation = useMutation(createCampground);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
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
              navigate("/campgrounds");
            },
            // TODO: もう少し詳細なエラーハンドリングを行う
            onError: (error) => {
              console.log("Error", error);
            },
          });
        },
        // TODO: もう少し詳細なエラーハンドリングを行う
        onError: (error) => {
          console.log("Error", error);
        },
      });
    }
    setValidated(true);
  };

  const handleForm = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
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
            <div className="mb-3">
              <label className="form-label" htmlFor="image1">
                画像1
              </label>
              <input
                className="form-control"
                type="file"
                name="image1"
                id="image1"
                accept="image/*"
                onChange={handleImage}
                required
              />
              <div className="invalid-feedback">キャンプ場の登録には1枚以上の画像が必要です</div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="image2">
                画像2
              </label>
              <input
                className="form-control"
                type="file"
                name="image2"
                id="image2"
                accept="image/*"
                onChange={handleImage}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="image3">
                画像3
              </label>
              <input
                className="form-control"
                type="file"
                name="image3"
                id="image3"
                accept="image/*"
                onChange={handleImage}
              />
            </div>
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
