import errorImage from "../assets/img/error.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ErrorFallBack = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    resetErrorBoundary();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="text-center">
      <img src={errorImage} alt="error" />
      <h1 className="mb-5">以下のエラーが発生してしまいました。</h1>
      <p>
        <b>
          {error.name}: {error.message}
        </b>
      </p>
      <hr />

      <p>エラーハンドリングの考慮不足のためお手数ですが、戻るボタンをクリックしてください。</p>
      <button className="mb-5" onClick={handleBack}>
        一覧へ戻る
      </button>
    </div>
  );
};

ErrorFallBack.propTypes = {
  error: PropTypes.object,
  resetErrorBoundary: PropTypes.func,
};
