import { useContext } from "react";
import { AppContext } from "./ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../utils/api";

export const NavBar = () => {
  const [context, setContext] = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const statusCode = await userLogout();
    if (statusCode === 200) {
      setContext({});
      localStorage.removeItem("userInfo");
      navigate("/");
    } else {
      // TODO: もう少し詳細なエラーハンドリングを行う
      console.log("ログアウトに失敗しました");
    }
  };

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          YelpCamp
        </Link>
        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/campgrounds" className="nav-link">
              キャンプ場一覧
            </Link>
            {context.key && (
              <Link to="/campgrounds/create" className="nav-link">
                キャンプ場作成
              </Link>
            )}
          </div>
          <div className="navbar-nav ms-auto">
            {context.key ? (
              <Link className="nav-link" onClick={handleLogout}>
                ログアウト
              </Link>
            ) : (
              <>
                <Link to="/campgrounds/login" className="nav-link">
                  ログイン
                </Link>
                <Link to="/campgrounds/signup" className="nav-link">
                  ユーザー登録
                </Link>
              </>
            )}
          </div>
        </div>
        {context.key && <span className="badge rounded-pill text-bg-warning ms-2">{context.user}</span>}
      </div>
    </nav>
  );
};
