import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { userSignUp, userLogin } from "../apis/user-api";
import { toast } from "react-toastify";
import { useUser } from "../components/ContextProvider";
import { useErrorBoundary } from "react-error-boundary";

export const SignUpPage = () => {
  const [, setUser] = useUser();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const [validated, setValidated] = useState(false);
  const signUpMutation = useMutation(userSignUp);
  const loginMutation = useMutation(userLogin);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      signUpMutation.mutate(
        {
          email: formValues.email,
          password1: formValues.password,
          password2: formValues.password,
        },
        {
          onSuccess: () => {
            loginMutation.mutate(formValues, {
              onSuccess: (data) => {
                setUser({ type: "SET_USER", data });
                toast.success(`ユーザー ${data.name} を作成しログインしました`);
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
        }
      );
    }
    setValidated(true);
  };

  const handleForm = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1 className="mb-3">ユーザー登録</h1>
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
        <button className="btn btn-success mt-3">ユーザー登録</button>
      </form>
    </>
  );
};
