import { Link } from "react-router-dom";

export const NavBar = () => {
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
            <Link to="/campgrounds/create" className="nav-link">
              キャンプ場作成
            </Link>
          </div>
          <div className="navbar-nav ms-auto">
            <Link className="nav-link">ログアウト</Link>
            <Link to="/campgrounds/login" className="nav-link">
              ログイン
            </Link>
            <Link className="nav-link">ユーザー登録</Link>
          </div>
        </div>
        <span className="badge rounded-pill text-bg-warning ms-2">username</span>
      </div>
    </nav>
  );
};
