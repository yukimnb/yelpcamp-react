import { useState, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../utils/userAPI";
import { AppContext } from "../components/ContextProvider";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [, setContext] = useContext(AppContext);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [validated, setValidated] = useState(false);
  const mutation = useMutation(userLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      mutation.mutate(formValues, {
        onSuccess: (data) => {
          const userInfo = {
            key: data.key,
            userId: data.id,
            userName: data.name,
          };
          setContext(userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          toast.success(`${data.name} としてログインしました`);
          navigate("/campgrounds");
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

  return (
    <>
      <h1 className="mb-3">ログイン</h1>
      <form className={validated ? "was-validated" : ""} onSubmit={handleSubmit} noValidate>
        <div className="row mb-3 g-1">
          <div className="col-auto">
            <label className="col-form-label" htmlFor="email">
              メールアドレス：
            </label>
          </div>
          <div className="col-auto">
            <input
              className="form-control"
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleForm}
              required
            />
          </div>
        </div>
        <div className="row mb-3 g-1">
          <div className="col-auto">
            <label className="col-form-label" htmlFor="password">
              パスワード：
            </label>
          </div>
          <div className="col-auto">
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleForm}
              required
              autoComplete="off"
            />
          </div>
        </div>
        <button className="btn btn-success mt-3">ログイン</button>
      </form>
    </>
  );
};
